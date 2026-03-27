import { Component, NetworkMode, TemplateAsset, TransformComponent, Vec3, WorldService, type Entity } from 'meta/worlds';
import { VisibilityComponent } from './VisibilityComponent';
import { delay } from '../Utils/AsyncUtils';

const HIDE_POSITION = new Vec3(0, -999, 0);

export class ObjectPool<T extends Component> {

  private worldService: WorldService;
  private template: TemplateAsset;
  private componentType: abstract new (...args: any[]) => T;

  private pool: PoolEntry<T>[] = [];        // all spawned entries
  private active: PoolEntry<T>[] = [];       // currently borrowed
  private isExpanding: boolean = false;

  private onCreateCallback?: (component: T, entity: Entity) => Promise<void>;

  constructor(
    template: TemplateAsset,
    componentType: abstract new (...args: any[]) => T,
    onCreate?: (component: T, entity: Entity) => Promise<void>,
  ) {
    this.template = template;
    this.componentType = componentType;
    this.worldService = WorldService.get();
    this.onCreateCallback = onCreate;
  }

  public async init(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.spawnOne();
    }
  }

  public borrow(): T | null {
    const entry = this.pool.find(e => e.isReady && !e.isBorrowed);
    if (!entry) {
      this.tryExpand();
      return null;
    }

    entry.isBorrowed = true;
    this.active.push(entry);
    this.show(entry);

    // Pre-expand when running low
    const available = this.pool.filter(e => e.isReady && !e.isBorrowed).length;
    if (available <= 1) {
      this.tryExpand();
    }

    return entry.component;
  }

  public release(component: T): void {
    const idx = this.active.findIndex(e => e.component === component);
    if (idx === -1) return;

    const entry = this.active[idx];
    if (!entry.isBorrowed) return;

    entry.isBorrowed = false;
    this.active.splice(idx, 1);
    this.hide(entry);
  }

  public releaseAll(): void {
    for (let i = this.active.length - 1; i >= 0; i--) {
      this.release(this.active[i].component);
    }
  }

  public getActive(): readonly T[] {
    return this.active.map(e => e.component);
  }

  public getActiveCount(): number {
    return this.active.length;
  }

  public forEachActive(fn: (component: T) => void): void {
    // Copy to avoid mutation during iteration
    const snapshot = [...this.active];
    for (const entry of snapshot) {
      if (entry.isBorrowed) {
        fn(entry.component);
      }
    }
  }

  private show(entry: PoolEntry<T>): void {
    entry.entity.getComponent(VisibilityComponent)?.show();
  }

  private hide(entry: PoolEntry<T>): void {
    entry.entity.getComponent(VisibilityComponent)?.hide();
    const tf = entry.entity.getComponent(TransformComponent);
    if (tf) tf.worldPosition = HIDE_POSITION;
  }

  private tryExpand(): void {
    if (this.isExpanding) return;
    this.isExpanding = true;
    this.spawnOne().then(() => {
      this.isExpanding = false;
    });
  }

  private async spawnOne(): Promise<void> {
    const entity = await this.worldService.spawnTemplate({
      templateAsset: this.template,
      networkMode: NetworkMode.LocalOnly,
    });

    const component = entity.getComponent(this.componentType) as T;
    if (!component) {
      console.error(`[ObjectPool] Entity missing component: ${this.componentType.name}`);
      return;
    }

    await delay(100);

    if (this.onCreateCallback) {
      await this.onCreateCallback(component, entity);
    }

    this.hide({ entity, component, isBorrowed: false, isReady: true });

    this.pool.push({
      entity,
      component,
      isBorrowed: false,
      isReady: true,
    });
  }
}

interface PoolEntry<T extends Component> {
  entity: Entity;
  component: T;
  isBorrowed: boolean;
  isReady: boolean;
}
