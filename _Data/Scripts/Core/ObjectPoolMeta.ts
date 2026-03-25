import { Component, NetworkMode, TemplateAsset, TransformComponent, Vec3, WorldService, type Entity } from 'meta/worlds';
import { delay } from '../Utils/AsyncUtils';

const HIDE_POSITION = new Vec3(0, -999, 0);
const SPAWN_DELAY = 100;

export interface PoolCallbacks<T extends Component> {
  onCreate?: (component: T, entity: Entity) => Promise<void>;
  onBorrow?: (component: T, entity: Entity) => void;
  onReturn?: (component: T, entity: Entity) => void;
}

export class ObjectPoolMeta<T extends Component> {

  private template: TemplateAsset;
  private componentType: abstract new (...args: any[]) => T;
  private worldService: WorldService;
  private items: PoolItem<T>[] = [];
  private callbacks: PoolCallbacks<T>;

  constructor(
    template: TemplateAsset,
    componentType: abstract new (...args: any[]) => T,
    callbacks?: PoolCallbacks<T>,
  ) {
    this.template = template;
    this.componentType = componentType;
    this.worldService = WorldService.get();
    this.callbacks = callbacks ?? {};
  }

  public async init(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.spawnOne();
    }
  }

  public borrow(): { component: T; entity: Entity } | null {
    const item = this.items.find(i => i.isReady && !i.isBorrowed);
    if (!item) return null;

    item.isBorrowed = true;
    this.callbacks.onBorrow?.(item.component, item.entity);

    return { component: item.component, entity: item.entity };
  }

  public return(component: T): void {
    const item = this.items.find(i => i.component === component);
    if (!item) return;

    this.callbacks.onReturn?.(item.component, item.entity);

    const tf = item.entity.getComponent(TransformComponent);
    if (tf) tf.worldPosition = HIDE_POSITION;

    item.isBorrowed = false;
  }

  public returnAll(): void {
    for (const item of this.items) {
      if (item.isBorrowed) {
        this.return(item.component);
      }
    }
  }

  private async spawnOne(): Promise<void> {
    const entity = await this.worldService.spawnTemplate({
      templateAsset: this.template,
      networkMode: NetworkMode.Networked,
    });

    const component = entity.getComponent(this.componentType) as T;
    if (!component) {
      console.error(`[ObjectPoolMeta] Entity missing component: ${this.componentType.name}`);
      return;
    }

    await delay(SPAWN_DELAY);

    const tf = entity.getComponent(TransformComponent);
    if (tf) tf.worldPosition = HIDE_POSITION;

    if (this.callbacks.onCreate) {
      await this.callbacks.onCreate(component, entity);
    }

    this.items.push({
      entity,
      component,
      isBorrowed: false,
      isReady: true,
    });
  }
}

interface PoolItem<T extends Component> {
  entity: Entity;
  component: T;
  isBorrowed: boolean;
  isReady: boolean;
}
