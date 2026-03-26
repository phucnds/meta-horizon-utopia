import {
  component,
  Quaternion,
  PhysicsService,
  property,
  Service,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
  TemplateAsset,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Projectile } from './Projectile';
import { BaseEnemy } from './BaseEnemy';
import { distanceXZ, angleXZ } from './MathUtils';
import { ObjectPool } from '../Core/ObjectPool';

@component()
export class RangeWeapon extends Weapon {

  @property() private attackRange: number = 15;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;

  @property() private rotateSpeed: number = 5;
  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private poolSize: number = 10;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackSpeed(): number { return this.attackSpeed; }
  protected getDamage(): number { return this.damage; }

  private physicsService = Service.inject(PhysicsService);
  private projectilePool!: ObjectPool<Projectile>;
  private currentTarget: Entity | null = null;
  private isAimed: boolean = false;
  private isReadyToFire: boolean = false;

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

  protected override async onSetup(): Promise<void> {
    if (this.projectileTemplate) {
      this.projectilePool = new ObjectPool<Projectile>(
        this.projectileTemplate,
        Projectile,
        async (projectile) => {
          await projectile.setup();
        },
      );
      await this.projectilePool.init(this.poolSize);
    }
  }

  public override onWorldUpdate(dt: number): void {
    // Update projectiles
    this.projectilePool?.forEachActive((projectile) => {
      // projectile.updateProjectile(dt);
    });

    // Cooldown + find target (from Weapon base)
    this.handleUpdate(dt);

    // Has target → validate
    if (this.currentTarget) {
      if (!this.isTargetValid(this.currentTarget)) {
        this.currentTarget = null;
        this.isReadyToFire = false;
        this.isAimed = false;
        return;
      }

      // Slerp rotate toward target
      this.rotateHeadToTarget(this.currentTarget, dt);

      // Aimed → fire
      if (this.isReadyToFire && this.isAimed) {
        this.fireProjectile(this.currentTarget);
        this.isReadyToFire = false;
        this.isAimed = false;
      }
    }
  }

  protected attack(target: Entity): void {
    this.currentTarget = target;
    this.isReadyToFire = true;
  }

  private fireProjectile(target: Entity): void {
    if (!this.projectilePool) return;

    const firePos = this.getFirePosition();
    const dir = this.getDirectionToTarget(target);
    if (!dir) return;

    const projectile = this.projectilePool.borrow();
    if (!projectile) return;

    const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;

    const releaseToPool = () => {
      projectile.onDeactivated.off(releaseToPool);
      this.projectilePool.release(projectile);
    };

    projectile.onDeactivated.on(releaseToPool, this);
    projectile.shoot(firePos, dir, this.getDamage(), headRotation);
  }

  // --- Aiming ---

  private rotateHeadToTarget(target: Entity, dt: number): void {
    if (!this.headEntity) return;

    const headTf = this.headEntity.getComponent(TransformComponent);
    if (!headTf) return;

    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return;

    const angleRad = angleXZ(headTf.worldPosition, targetPos);
    const targetDeg = angleRad * (180 / Math.PI) + 180;
    const targetRot = Quaternion.fromEuler(new Vec3(0, targetDeg, 0));

    const t = Math.min(this.rotateSpeed * dt, 1);
    headTf.worldRotation = Quaternion.slerp(headTf.worldRotation, targetRot, t);

    const dot = this.quaternionDot(headTf.worldRotation, targetRot);
    this.isAimed = dot > 0.999;
  }

  private quaternionDot(a: Quaternion, b: Quaternion): number {
    return Math.abs(a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w);
  }

  private getFirePosition(): Vec3 {
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }
    return this.player.getPosition();
  }
}
