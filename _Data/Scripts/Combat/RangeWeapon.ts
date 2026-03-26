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
import { ObjectPoolMeta } from '../Core/ObjectPoolMeta';

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
  private projectilePool!: ObjectPoolMeta<Projectile>;
  private currentTarget: Entity | null = null;
  private activeProjectiles: Projectile[] = [];

  protected override async onSetup(): Promise<void> {
    if (this.projectileTemplate) {
      this.projectilePool = new ObjectPoolMeta<Projectile>(
        this.projectileTemplate,
        Projectile,
        {
          onCreate: async (projectile) => {
            await projectile.setup();
          },
        },
      );
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

  // @subscribe(OnWorldUpdateEvent)
  public override onWorldUpdate(dt: number): void {
    if (this.currentTarget) {
      this.rotateHeadToTarget(this.currentTarget);
    }

    for (const projectile of this.activeProjectiles) {
      projectile.updateProjectile(dt);
    }

    this.handleUpdate(dt);
  }

  protected attack(target: Entity): void {
    if (!this.projectilePool) return;

    this.currentTarget = target;

    const firePos = this.getFirePosition();
    const dir = this.getDirectionToTarget(target);
    if (!dir) return;

    const borrowed = this.projectilePool.borrow();
    if (!borrowed) return;

    const { component: projectile } = borrowed;
    const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;

    const returnToPool = () => {
      this.removeProjectile(projectile);
      this.projectilePool.return(projectile);
      // projectile.onHit.off(returnToPool);
      projectile.onDeactivated.off(returnToPool);
    };

    // projectile.onHit.on(returnToPool, this);
    projectile.onDeactivated.on(returnToPool, this);
    this.activeProjectiles.push(projectile);
    projectile.shoot(firePos, dir, this.getDamage(), target, headRotation);
  }

  private removeProjectile(projectile: Projectile): void {
    const idx = this.activeProjectiles.indexOf(projectile);
    if (idx !== -1) this.activeProjectiles.splice(idx, 1);
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
