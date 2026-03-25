import {
  component,
  OnWorldUpdateEvent,
  type OnWorldUpdateEventPayload,
  PhysicsService,
  property,
  Service,
  subscribe,
  TemplateAsset,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Projectile } from './Projectile';
import { BaseEnemy } from './BaseEnemy';
import { distanceXZ } from './MathUtils';
import { ObjectPool } from '../Core/ObjectPool';

@component()
export class RangeWeapon extends Weapon {

  @property() private attackRange: number = 15;
  @property() private attackDelay: number = 0.5;
  @property() private damage: number = 5;

  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private poolSize: number = 10;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackDelay(): number { return this.attackDelay; }
  protected getDamage(): number { return this.damage; }

  private physicsService = Service.inject(PhysicsService);
  private projectilePool!: ObjectPool<Projectile>;

  protected override async onSetup(): Promise<void> {
    if (this.projectileTemplate) {
      this.projectilePool = new ObjectPool<Projectile>(this.projectileTemplate, Projectile);
      await this.projectilePool.init(this.poolSize);
    }
  }

  protected async findTarget(): Promise<Entity | null> {
    const myPos = this.player.getPosition();
    const range = this.getAttackRange();

    try {
      const overlaps = await this.physicsService.sphereOverlapQuery({
        center: myPos,
        radius: range,
        collisionLayerMask: 0xFFFFFFFF,
        reportOverlappingEntities: true,
        includeTriggers: true,
      });

      let closest: Entity | null = null;
      let minDist = range;

      for (const entity of overlaps.overlappingShapeEntities) {
        if (!entity) continue;

        const enemy = entity.getComponent(BaseEnemy);
        if (!enemy || enemy.isDead()) continue;

        const enemyTf = entity.getComponent(TransformComponent);
        if (!enemyTf) continue;

        const dist = distanceXZ(myPos, enemyTf.worldPosition);
        if (dist < minDist) {
          minDist = dist;
          closest = entity;
        }
      }

      return closest;
    } catch (e) {
      return null;
    }
  }

  private currentTarget: Entity | null = null;

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    const dt = payload.deltaTime;

    if (this.currentTarget) {
      this.rotateHeadToTarget(this.currentTarget);
    }

    this.handleUpdate(dt);
  }

  protected attack(target: Entity): void {
    if (!this.projectilePool) return;

    this.currentTarget = target;

    // Get fire position from firePointEntity
    const firePos = this.getFirePosition();
    const dir = this.getDirectionToTarget(target);
    if (!dir) return;

    // Borrow projectile from pool and shoot
    const projectile = this.projectilePool.borrow();
    if (!projectile) return;

    const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;
    projectile.shoot(firePos, dir, this.getDamage(), target, headRotation);
    projectile.onHit.on(() => {
      this.projectilePool.return(projectile);
    }, this);
  }

  private rotateHeadToTarget(target: Entity): void {
    if (!this.headEntity) return;

    const headTf = this.headEntity.getComponent(TransformComponent);
    if (!headTf) return;

    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return;

    headTf.lookAt(targetPos);
  }

  private getFirePosition(): Vec3 {
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }
    return this.player.getPosition();
  }
}
