import {
  component,
  Quaternion,
  property,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
  Component,
  TemplateAsset,
  SoundComponent,
} from 'meta/worlds';
import { Player } from './Player';
import { Projectile } from './Projectile';
import { GameTimer } from '../Utils/GameTimer';
import { angleXZ, directionXZ } from './MathUtils';
import type { PlayerStatsManager } from '../Manager/PlayerStatsManager';
import { Stat } from '../Manager/PlayerStatsManager';
import { GameState, GameStateManager } from '../Manager/GameStateManager';
import { ObjectPool } from '../Core/ObjectPool';

@component()
export class Gun extends Component {

  @property() private player: Maybe<Entity> = null;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;

  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private shootSound: Maybe<Entity> = null;

  @property() private multiShoot: number = 10;
  @property() private spreadDegPerShot: number = 15;
  @property() private maxDeg: number = 170;
  @property() private projectilePoolSize: number = 20;

  private baseMultiShoot: number = 0;

  private projectilePool: Maybe<ObjectPool<Projectile>> = null;
  private targetTransform: TransformComponent | null = null;
  private activeProjectiles: Projectile[] = [];
  private isActive: boolean = false;
  private isShooting: boolean = false;
  private shootSoundComponent: Maybe<SoundComponent> = null;

  private attackCooldown!: GameTimer;
  private canShoot: boolean = true;

  private statBonusDamage: number = 0;
  private statBonusAttackSpeed: number = 0;
  private critChance: number = 0;
  private critPercent: number = 1.5;

  private getTotalDamage(): number { return this.damage + this.statBonusDamage; }
  private getTotalAttackSpeed(): number { return this.attackSpeed + this.statBonusAttackSpeed; }

  private canPlayerShoot(): boolean {
    const p = this.player?.getComponent(Player);
    if (!p) return true;
    return p.getIsActive() && !p.isDead();
  }

  public setTarget(target: Entity): void {
    this.targetTransform = target.getComponent(TransformComponent) ?? null;
    this.shootSoundComponent = this.shootSound?.getComponent(SoundComponent) ?? null;
    if (this.shootSoundComponent) {
      // console.log('shootSoundComponent', this.shootSoundComponent);
    }
  }

  public updateWeaponStats(statsManager: PlayerStatsManager): void {
    this.statBonusDamage = statsManager.getStat(Stat.Attack) - statsManager.getBaseStat(Stat.Attack);
    this.statBonusAttackSpeed = statsManager.getStat(Stat.AttackSpeed) - statsManager.getBaseStat(Stat.AttackSpeed);
    this.critChance = statsManager.getStat(Stat.CriticalChance);
    this.critPercent = statsManager.getStat(Stat.CriticalPercent);
    if (this.attackCooldown) {
      this.attackCooldown.setDelay(1 / this.getTotalAttackSpeed());
    }
  }

  public async setup(): Promise<void> {
    this.attackCooldown = new GameTimer(1 / this.getTotalAttackSpeed());
    if (this.projectileTemplate && !this.projectilePool) {
      this.projectilePool = new ObjectPool<Projectile>(
        this.projectileTemplate,
        Projectile,
        async (projectile) => { await projectile.setup(); },
      );
      await this.projectilePool.init(this.projectilePoolSize);
    }
    this.isActive = true;
    if (this.baseMultiShoot === 0) this.baseMultiShoot = this.multiShoot;
  }

  public resetMultiShoot(): void {
    if (this.baseMultiShoot !== 0) this.multiShoot = this.baseMultiShoot;
  }

  public onWorldUpdate(dt: number): void {
    if (!this.isActive || !this.targetTransform) return;

    // Update projectiles
    for (const p of [...this.activeProjectiles]) {
      p.updateProjectile(dt);
    }

    if (!this.canPlayerShoot()) return;

    this.rotateHeadToTarget();

    if (this.canShoot && !this.isShooting) {
      this.canShoot = false;
      this.isShooting = true;
      this.shoot().then(() => {
        this.isShooting = false;
        if (!this.canPlayerShoot()) return;
        if (GameStateManager.get().getState() == GameState.GAME) {
          this.shootSoundComponent?.play();
        }
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
    if (!this.canPlayerShoot() || !this.projectilePool || !this.targetTransform || GameStateManager.get().getState() !== GameState.GAME) return;

    const count = Math.max(1, Math.floor(this.multiShoot));
    const projectiles: Projectile[] = [];
    for (let i = 0; i < count; i++) {
      const proj = this.projectilePool.borrow();
      if (proj) projectiles.push(proj);
    }
    if (projectiles.length === 0) return;

    const firePos = this.getFirePosition();
    const baseDir = this.getShootDirectionFromHead(firePos);
    if (!baseDir) {
      for (const p of projectiles) this.projectilePool.release(p);
      return;
    }

    const headTf = this.headEntity?.getComponent(TransformComponent);
    const headPos = headTf?.worldPosition ?? firePos;

    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      const dir = this.getMultishotDirection(baseDir, i, projectiles.length);

      const releaseToPool = () => {
        projectile.onDeactivated.off(releaseToPool);
        const idx = this.activeProjectiles.indexOf(projectile);
        if (idx !== -1) this.activeProjectiles.splice(idx, 1);
        this.projectilePool?.release(projectile);
      };

      projectile.onDeactivated.on(releaseToPool, this);
      this.activeProjectiles.push(projectile);

      const isCrit = Math.random() * 100 < this.critChance;
      const finalDamage = isCrit ? this.getTotalDamage() * this.critPercent : this.getTotalDamage();

      const shotRotation = this.flatDirToHeadYaw(dir, headPos);
      projectile.shoot(firePos, dir, finalDamage, shotRotation, isCrit);
    }
  }

  private getMultishotDirection(baseDir: Vec3, index: number, total: number): Vec3 {
    if (total <= 1) return baseDir;
    const spreadDeg = Math.min(this.multiShoot * this.spreadDegPerShot, this.maxDeg);
    const spreadRad = (spreadDeg * Math.PI) / 180;
    const t = (index / (total - 1)) * 2 - 1;
    const yaw = Math.atan2(baseDir.x, baseDir.z) + t * (spreadRad * 0.5);
    return new Vec3(Math.sin(yaw), 0, Math.cos(yaw));
  }

  private flatDirToHeadYaw(dir: Vec3, origin: Vec3): Quaternion {
    const aim = new Vec3(origin.x + dir.x, origin.y, origin.z + dir.z);
    const angleRad = angleXZ(origin, aim);
    const targetDeg = angleRad * (180 / Math.PI) + 180;
    return Quaternion.fromEuler(new Vec3(0, targetDeg, 0));
  }

  private getShootDirectionFromHead(firePos: Vec3): Vec3 | null {
    const headTf = this.headEntity?.getComponent(TransformComponent);
    if (headTf) {
      const f = headTf.worldForward;
      const flatLen = Math.sqrt(f.x * f.x + f.z * f.z);
      if (flatLen > 1e-6) {
        return new Vec3(f.x / flatLen, 0, f.z / flatLen);
      }
    }
    if (!this.targetTransform) return null;
    const dir = directionXZ(firePos, this.targetTransform.worldPosition);
    if (dir.x === 0 && dir.z === 0) return null;
    return dir;
  }

  private rotateHeadToTarget(): void {
    if (!this.headEntity || !this.targetTransform) return;

    const headTf = this.headEntity.getComponent(TransformComponent);
    if (!headTf) return;

    const targetPos = this.targetTransform.worldPosition;
    const angleRad = angleXZ(headTf.worldPosition, targetPos);
    const targetDeg = angleRad * (180 / Math.PI) + 180;
    headTf.worldRotation = Quaternion.fromEuler(new Vec3(0, targetDeg, 0));
  }

  private getFirePosition(): Vec3 {
    
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }

    return this.player?.getComponent(TransformComponent)?.worldPosition ?? new Vec3(0, 0, 0);
  }

  public doubleShoot(): void {
    this.multiShoot++;
    // console.log('doubleShoot', this.multiShoot);
  }

  public tripleShoot(): void {
    this.multiShoot += 2;
  }
}
