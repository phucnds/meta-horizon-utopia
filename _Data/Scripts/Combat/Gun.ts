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
import { angleXZ } from './MathUtils';
import type { PlayerStatsManager } from '../Manager/PlayerStatsManager';
import { Stat } from '../Manager/PlayerStatsManager';

@component()
export class Gun extends Component {

  @property() private player: Maybe<Entity> = null;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;

  @property() private rotateSpeed: number = 5;
  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;

  private worldService = WorldService.get();
  private targetTransform: TransformComponent | null = null;
  private activeProjectiles: Projectile[] = [];
  private isActive: boolean = false;
  private isShooting: boolean = false;

  private attackCooldown!: GameTimer;
  private canShoot: boolean = true;

  private statBonusDamage: number = 0;
  private statBonusAttackSpeed: number = 0;

  private getTotalDamage(): number { return this.damage + this.statBonusDamage; }
  private getTotalAttackSpeed(): number { return this.attackSpeed + this.statBonusAttackSpeed; }

  public setTarget(target: Entity): void {
    this.targetTransform = target.getComponent(TransformComponent) ?? null;
  }

  public updateWeaponStats(statsManager: PlayerStatsManager): void {
    this.statBonusDamage = statsManager.getStat(Stat.Attack) - statsManager.getBaseStat(Stat.Attack);
    this.statBonusAttackSpeed = statsManager.getStat(Stat.AttackSpeed) - statsManager.getBaseStat(Stat.AttackSpeed);
    if (this.attackCooldown) {
      this.attackCooldown.setDelay(1 / this.getTotalAttackSpeed());
    }
  }

  public async setup(): Promise<void> {
    this.attackCooldown = new GameTimer(1 / this.getTotalAttackSpeed());
    this.isActive = true;
    console.log('[Gun] Activated');
  }

  public onWorldUpdate(dt: number): void {
    if (!this.isActive || !this.targetTransform) return;

    // Update projectiles
    for (const p of [...this.activeProjectiles]) {
      p.updateProjectile(dt);
    }

    // Rotate head toward target
    this.rotateHeadToTarget(dt);

    // Shoot when ready
    if (this.canShoot && !this.isShooting) {
      this.canShoot = false;
      this.isShooting = true;
      this.shoot().then(() => {
        this.isShooting = false;
        this.attackCooldown.reset();
      });
      return;
    }

    // Wait for cooldown
    if (!this.canShoot) {
      this.attackCooldown.tick(dt);
      if (this.attackCooldown.tryFinishPeriod()) {
        this.canShoot = true;
      }
    }
  }

  private async shoot(): Promise<void> {
    if (!this.projectileTemplate || !this.targetTransform) return;

    const firePos = this.getFirePosition();
    const targetPos = this.targetTransform.worldPosition;

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
    projectile.shoot(firePos, dir, this.getTotalDamage(), headRotation);
  }

  private rotateHeadToTarget(dt: number): void {
    if (!this.headEntity || !this.targetTransform) return;

    const headTf = this.headEntity.getComponent(TransformComponent);
    if (!headTf) return;

    const targetPos = this.targetTransform.worldPosition;
    const angleRad = angleXZ(headTf.worldPosition, targetPos);
    const targetDeg = angleRad * (180 / Math.PI) + 180;
    const targetRot = Quaternion.fromEuler(new Vec3(0, targetDeg, 0));

    const t = Math.min(this.rotateSpeed * dt, 1);
    headTf.worldRotation = Quaternion.slerp(headTf.worldRotation, targetRot, t);
  }

  private getFirePosition(): Vec3 {
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }
    return this.player?.getComponent(TransformComponent)?.worldPosition ?? new Vec3(0, 0, 0);
  }
}
