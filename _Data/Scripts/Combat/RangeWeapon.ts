import {
  component,
  Quaternion,
  property,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
  TemplateAsset,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Projectile } from './Projectile';
import { angleXZ } from './MathUtils';
import { ObjectPool } from '../Core/ObjectPool';
import { DetectEnemy } from './DetectEnemy';

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
  @property() private detectEnemyEntity: Maybe<Entity> = null;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackSpeed(): number { return this.attackSpeed; }
  protected getDamage(): number { return this.damage; }

  private projectilePool!: ObjectPool<Projectile>;
  private currentTarget: Entity | null = null;
  private isAimed: boolean = false;

  protected override async onSetup(): Promise<void> {
    this.detectEnemy = this.detectEnemyEntity?.getComponent(DetectEnemy) ?? null;
    this.detectEnemy?.setup(this.entity, this.attackRange);
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

  public override gameTick(dt: number): void {
    if (!this.canAttack()) return;

    // Update projectiles
    this.projectilePool?.forEachActive((projectile) => {
      projectile.updateProjectile(dt);
    });

    // Has target → validate + aim + fire
    if (this.currentTarget) {
      if (!this.isTargetValid(this.currentTarget)) {
        this.currentTarget = null;
        this.isAimed = false;
        return;
      }

      this.rotateHeadToTarget(this.currentTarget, dt);

      if (this.isAimed) {
        this.fireProjectile(this.currentTarget);
        this.currentTarget = null;
        this.isAimed = false;
        this.attackCooldown.reset();
      }
      return;
    }

    // No target → tick cooldown → find target when ready
    this.attackCooldown.tick(dt);
    if (this.attackCooldown.tryFinishPeriod()) {
      const target = this.findClosestEnemy();
      if (target && this.isTargetValid(target)) {
        this.currentTarget = target;
      }
    }
  }

  protected attack(_target: Entity): void {
    // Not used — RangeWeapon manages its own flow
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
