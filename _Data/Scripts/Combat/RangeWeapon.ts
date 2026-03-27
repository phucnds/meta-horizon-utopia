import {
  component,
  NetworkMode,
  Quaternion,
  property,
  TransformComponent,
  Vec3,
  WorldService,
  type Entity,
  type Maybe,
  TemplateAsset,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Projectile } from './Projectile';
import { angleXZ } from './MathUtils';
import { DetectEnemy } from './DetectEnemy';
import { delay } from '../Utils/AsyncUtils';

@component()
export class RangeWeapon extends Weapon {

  @property() private attackRange: number = 15;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;
  @property() private poolSize: number = 50;

  @property() private rotateSpeed: number = 5;
  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private detectEnemyEntity: Maybe<Entity> = null;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackSpeed(): number { return this.attackSpeed; }
  protected getDamage(): number { return this.damage; }

  private worldService = WorldService.get();
  private activeProjectiles: Projectile[] = [];
  private currentTarget: Entity | null = null;
  private isAimed: boolean = false;
  private isShooting: boolean = false;
  private isReady: boolean = false;

  protected override async onSetup(): Promise<void> {
    this.detectEnemy = this.detectEnemyEntity?.getComponent(DetectEnemy) ?? null;
    this.detectEnemy?.setup(this.entity, this.attackRange);
    this.isReady = true;

    for (let i = 0; i < this.poolSize; i++) {
      const projectileEntity = await this.worldService.spawnTemplate({
        templateAsset: this.projectileTemplate!,
        networkMode: NetworkMode.Networked,
      });
      const projectile = projectileEntity.getComponent(Projectile);
      if (!projectile) continue;
      this.activeProjectiles.push(projectile);

    }
  }

  private onProjectileDeactivated(projectile: Projectile): void {
    const idx = this.activeProjectiles.indexOf(projectile);
    if (idx !== -1) this.activeProjectiles.splice(idx, 1);
  }

  public override gameTick(dt: number): void {
    if (!this.isReady || !this.canAttack()) return;

    // Update active projectiles
    for (let i = this.activeProjectiles.length - 1; i >= 0; i--) {
      this.activeProjectiles[i].updateProjectile(dt);
    }

    if (this.isShooting) return;

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

  protected attack(_target: Entity): void { }

  private fireProjectile(target: Entity): void {
    if (!this.projectileTemplate || this.isShooting) return;

    console.log('[RangeWeapon] Fire projectile');

    this.isShooting = false;
    this.currentTarget = null;
    this.isAimed = false;
    this.attackCooldown.reset();

    return;

    // const firePos = this.getFirePosition();
    // const dir = this.getDirectionToTarget(target);
    // if (!dir) return;

    // this.isShooting = true;
    // const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;

    // this.spawnProjectile(firePos, dir, headRotation).then(() => {
    //   this.isShooting = false;
    //   this.currentTarget = null;
    //   this.isAimed = false;
    //   this.attackCooldown.reset();
    // });
  }

  private async spawnProjectile(firePos: Vec3, dir: Vec3, rotation?: Quaternion): Promise<void> {
    const entity = await this.worldService.spawnTemplate({
      templateAsset: this.projectileTemplate!,
      networkMode: NetworkMode.Networked,
    });

    await delay(100);

    const projectile = entity.getComponent(Projectile);
    if (!projectile) return;

    await projectile.setup();

    const removeFromList = () => {
      projectile.onDeactivated.off(removeFromList);
      const idx = this.activeProjectiles.indexOf(projectile);
      if (idx !== -1) this.activeProjectiles.splice(idx, 1);
    };

    projectile.onDeactivated.on(removeFromList, this);
    this.activeProjectiles.push(projectile);

    await projectile.shoot(firePos, dir, this.getDamage(), rotation);
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
