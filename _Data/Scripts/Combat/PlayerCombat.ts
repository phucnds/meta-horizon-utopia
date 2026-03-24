import {
  component,
  Component,
  OnWorldUpdateEvent,
  OnWorldUpdateEventPayload,
  property,
  subscribe,
  TemplateAsset,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { HealthComponent } from './HealthComponent';
import type { IDamageable } from './IDamageable';
import { BaseEnemy } from './BaseEnemy';
import { Projectile } from './Projectile';
import { distanceXZ, directionXZ } from './MathUtils';
import { ObjectPool } from '../Core/ObjectPool';

@component()
export class PlayerCombat extends Component implements IDamageable {

  public readonly onDamaged = new Signal<number>();
  public readonly onDied = new Signal();

  @property() private maxHp: number = 100;
  @property() private attackRange: number = 15;
  @property() private attackDelay: number = 0.5;
  @property() private damage: number = 5;

  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private poolSize: number = 10;

  private health!: HealthComponent;
  private transform!: TransformComponent;
  private projectilePool!: ObjectPool<Projectile>;
  private attackTimer: number = 0;
  private isActive: boolean = false;

  // Danh sách enemy entities đăng ký bởi EnemyManager
  private enemyEntities: Entity[] = [];

  public async setup(): Promise<void> {
    this.health = new HealthComponent(this.maxHp);
    this.health.onDamaged.on(this.handleDamaged, this);
    this.health.onDied.on(this.handleDied, this);

    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    if (this.projectileTemplate) {
      this.projectilePool = new ObjectPool<Projectile>(this.projectileTemplate, Projectile);
      await this.projectilePool.init(this.poolSize);
    }

    this.isActive = true;
  }

  public registerEnemy(enemy: Entity): void {
    this.enemyEntities.push(enemy);
  }

  public unregisterEnemy(enemy: Entity): void {
    const idx = this.enemyEntities.indexOf(enemy);
    if (idx !== -1) this.enemyEntities.splice(idx, 1);
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    if (!this.isActive || this.health.isDead()) return;

    const dt = payload.deltaTime;
    this.attackTimer += dt;

    if (this.attackTimer >= this.attackDelay) {
      const target = this.findClosestEnemy();
      if (target) {
        this.attackTimer = 0;
        this.shoot(target);
      }
    }
  }

  private findClosestEnemy(): Entity | null {
    const myPos = this.transform.worldPosition;
    let closest: Entity | null = null;
    let minDist = this.attackRange;

    for (const enemyEntity of this.enemyEntities) {
      const enemy = enemyEntity.getComponent(BaseEnemy);
      if (!enemy || enemy.isDead()) continue;

      const enemyTf = enemyEntity.getComponent(TransformComponent);
      if (!enemyTf) continue;

      const dist = distanceXZ(myPos, enemyTf.worldPosition);
      if (dist < minDist) {
        minDist = dist;
        closest = enemyEntity;
      }
    }

    return closest;
  }

  private shoot(target: Entity): void {
    const projectile = this.projectilePool.borrow();
    if (!projectile) return;

    const myPos = this.transform.worldPosition;
    const targetTf = target.getComponent(TransformComponent);
    if (!targetTf) return;

    const targetPos = targetTf.worldPosition;
    const dir = directionXZ(myPos, targetPos);

    projectile.shoot(myPos, dir, this.damage, target);
    projectile.onHit.on(() => {
      this.projectilePool.return(projectile);
    }, this);
  }

  // IDamageable
  public takeDamage(damage: number): void {
    this.health.takeDamage(damage);
  }

  public isDead(): boolean {
    return this.health.isDead();
  }

  public getHealth(): HealthComponent {
    return this.health;
  }

  private handleDamaged(damage?: number): void {
    this.onDamaged.trigger(damage ?? 0);
  }

  private handleDied(): void {
    this.isActive = false;
    this.onDied.trigger();
  }

  public setActive(active: boolean): void {
    this.isActive = active;
  }
}
