import {
  component,
  Quaternion,
  NetworkMode,
  property,
  TransformComponent,
  Vec3,
  WorldService,
  type Entity,
  type Maybe,
  Component,
  TemplateAsset,
} from 'meta/worlds';
import { Projectile } from './Projectile';
import { GameTimer } from '../Utils/GameTimer';
import { delay } from '../Utils/AsyncUtils';
import { BaseEnemy } from './BaseEnemy';
import { distanceXZ, angleXZ } from './MathUtils';
import { DetectEnemy } from './DetectEnemy';

@component()
export class Gun extends Component {

  @property() private player: Maybe<Entity> = null;
  @property() private attackRange: number = 15;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;

  @property() private rotateSpeed: number = 5;
  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private detectEnemyEntity: Maybe<Entity> = null;


  private worldService = WorldService.get();
  private currentTarget: Entity | null = null;
  private detectEnemy: Maybe<DetectEnemy> = null;
  private activeProjectiles: Projectile[] = [];
  private isActive: boolean = false;
  private isAimed: boolean = false;
  private isShooting: boolean = false;

  private findTimer = new GameTimer(0.2);
  private attackCooldown!: GameTimer;
  private canShoot: boolean = true;

  public async setup(): Promise<void> {
    this.attackCooldown = new GameTimer(1 / this.attackSpeed);
    this.isActive = true;
    this.detectEnemy = this.detectEnemyEntity?.getComponent(DetectEnemy) ?? null;
    if (this.detectEnemy) {
      this.detectEnemy.setup(this.entity, this.attackRange);
      console.log('[Gun] Detected enemy:', this.detectEnemy.getEnemies().size);
    }
    console.log('[Gun] Activated');
  }

  public onWorldUpdate(dt: number): void {
    if (!this.isActive) return;

    // Update projectiles
    for (const p of [...this.activeProjectiles]) {
      p.updateProjectile(dt);
    }

    // No target → find one every 0.2s
    if (!this.currentTarget) {
      this.findTimer.tick(dt);
      if (this.findTimer.tryFinishPeriod()) {
        const target = this.findClosestEnemy();
        if (target && this.isTargetValid(target)) {
          this.currentTarget = target;
          this.canShoot = true;
        }
      }
      return;
    }

    // Has target → validate
    if (!this.isTargetValid(this.currentTarget)) {
      this.currentTarget = null;
      this.canShoot = true;
      return;
    }

    // Rotate head toward target
    this.rotateHeadToTarget(this.currentTarget, dt);

    // Shoot when aimed and ready
    if (this.canShoot && this.isAimed && !this.isShooting) {
      this.canShoot = false;
      this.isAimed = false;
      this.isShooting = true;
      this.shoot(this.currentTarget).then(() => {
        this.isShooting = false;
        this.attackCooldown.reset();

        console.log('[Gun] Shot enemy:', this.currentTarget?.name);
      });
      return;
    }

    // After shot → wait for cooldown → allow next shot
    if (!this.canShoot) {
      this.attackCooldown.tick(dt);
      if (this.attackCooldown.tryFinishPeriod()) {
        this.canShoot = true;
      }
    }
  }

  private async shoot(target: Entity): Promise<void> {
    if (!this.projectileTemplate) return;

    const firePos = this.getFirePosition();
    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return;

    const dx = targetPos.x - firePos.x;
    const dz = targetPos.z - firePos.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len === 0) return;
    const dir = new Vec3(dx / len, 0, dz / len);

    const entity = await this.worldService.spawnTemplate({
      templateAsset: this.projectileTemplate,
      networkMode: NetworkMode.LocalOnly,
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

    const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;
    projectile.shoot(firePos, dir, this.damage, headRotation);
  }

  private getFirePosition(): Vec3 {
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }
    return this.getPlayerPosition();
  }

  // --- Find Target ---

  private findClosestEnemy(): Entity | null {
    if (!this.detectEnemy) return null;

    const myPos = this.getPlayerPosition();
    let closest: Entity | null = null;
    let minDist = this.attackRange;

    for (const entity of this.detectEnemy.getEnemies()) {
      const tf = entity.getComponent(TransformComponent);
      if (!tf) continue;

      const dist = distanceXZ(myPos, tf.worldPosition);
      if (dist < minDist) {
        minDist = dist;
        closest = entity;
      }
    }

    return closest;
  }

  // --- Target Validation ---

  private isTargetValid(target: Entity): boolean {
    const enemy = target.getComponent(BaseEnemy);
    if (!enemy || enemy.isDead()) return false;

    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return false;

    return distanceXZ(this.getPlayerPosition(), targetPos) <= this.attackRange;
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

  private getPlayerPosition(): Vec3 {
    return this.player?.getComponent(TransformComponent)?.worldPosition ?? new Vec3(0, 0, 0);
  }

  private getTargetPosition(target: Entity): Vec3 | null {
    const tf = target.getComponent(TransformComponent);
    return tf ? tf.worldPosition : null;
  }
}
