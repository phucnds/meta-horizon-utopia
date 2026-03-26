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
  Component,
  subscribe,
  OnEntityStartEvent,
  OnWorldUpdateEvent,
  OnWorldUpdateEventPayload,
  TemplateAsset,
} from 'meta/worlds';
import { distanceXZ, angleXZ } from './Combat/MathUtils';
import { BaseEnemy } from './Combat/BaseEnemy';
import { Projectile } from './Combat/Projectile';
import { ObjectPoolMeta } from './Core/ObjectPoolMeta';
import { GameTimer } from './Utils/GameTimer';
import { delay } from './Utils/AsyncUtils';

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
  @property() private poolSize: number = 10;

  private physicsService = Service.inject(PhysicsService);
  private projectilePool!: ObjectPoolMeta<Projectile>;
  private activeProjectiles: Projectile[] = [];
  private pendingRemoves: Projectile[] = [];
  private currentTarget: Entity | null = null;
  private isActive: boolean = false;
  private isFinding: boolean = false;
  private isAimed: boolean = false;

  private findTimer = new GameTimer(0.2);
  private attackCooldown!: GameTimer;
  private canShoot: boolean = true;

  @subscribe(OnEntityStartEvent)
  private async onStart(): Promise<void> {
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

    await delay(2000);
    this.attackCooldown = new GameTimer(1 / this.attackSpeed);
    this.isActive = true;
    console.log('[Gun] Activated');
  }

  @subscribe(OnWorldUpdateEvent)
  public onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    
    if (!this.isActive) return;
    const dt = payload.deltaTime;

    // No target → find one every 0.2s
    if (!this.currentTarget) {
      this.findTimer.tick(dt);
      if (this.findTimer.tryFinishPeriod() && !this.isFinding) {
        this.isFinding = true;
        this.findTarget().then((target) => {
          this.isFinding = false;
          if (target && this.isTargetValid(target)) {
            this.currentTarget = target;
            this.canShoot = true;
            console.log('[Gun] Target found');
          }
        });
      }
      return;
    }

    // Has target → validate
    if (!this.isTargetValid(this.currentTarget)) {
      console.log('[Gun] Target invalid, clearing');
      this.currentTarget = null;
      this.canShoot = true;
      return;
    }

    // Rotate head toward target
    this.rotateHeadToTarget(this.currentTarget, dt);

    // Shoot when aimed and ready
    if (this.canShoot && this.isAimed) {
      this.shoot(this.currentTarget);
      this.canShoot = false;
      this.isAimed = false;
      this.attackCooldown.reset();
      return;
    }

    // After shot → wait for cooldown → allow next shot
    if (!this.canShoot) {
      this.attackCooldown.tick(dt);
      if (this.attackCooldown.tryFinishPeriod()) {
        this.canShoot = true;
      }
    }

    this.updateProjectiles(dt);
  }

  private updateProjectiles(dt: number): void {
    if (this.pendingRemoves.length > 0) {
      for (const p of this.pendingRemoves) {
        const idx = this.activeProjectiles.indexOf(p);
        if (idx !== -1) this.activeProjectiles.splice(idx, 1);
      }
      this.pendingRemoves.length = 0;
    }

    for (const projectile of this.activeProjectiles) {
      projectile.updateProjectile(dt);
    }
  }

  private shoot(target: Entity): void {
    if (!this.projectilePool) return;

    const firePos = this.getFirePosition();
    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return;

    const dx = targetPos.x - firePos.x;
    const dz = targetPos.z - firePos.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len === 0) return;
    const dir = new Vec3(dx / len, 0, dz / len);

    const borrowed = this.projectilePool.borrow();
    if (!borrowed) return;

    const { component: projectile } = borrowed;
    const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;

    const returnToPool = () => {
      projectile.onDeactivated.off(returnToPool);
      this.pendingRemoves.push(projectile);
      this.projectilePool.return(projectile);
    };

    projectile.onDeactivated.on(returnToPool, this);
    projectile.shoot(firePos, dir, this.damage, target, headRotation);
    this.activeProjectiles.push(projectile);
    console.log(`[Gun] Shoot! damage: ${this.damage}`);
  }

  private getFirePosition(): Vec3 {
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }
    return this.getPlayerPosition();
  }

  // --- Find Target ---

  private async findTarget(): Promise<Entity | null> {
    const myPos = this.getPlayerPosition();
    const range = this.attackRange;

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

    // Check if close enough to target angle
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
