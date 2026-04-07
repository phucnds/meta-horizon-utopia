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
  SoundComponent,
  SoundPlayInfo,
} from 'meta/worlds';
import { Player } from './Player';
import { Projectile } from './Projectile';
import { GameTimer } from '../Utils/GameTimer';
import { delay } from '../Utils/AsyncUtils';
import { angleXZ, directionXZ } from './MathUtils';
import type { PlayerStatsManager } from '../Manager/PlayerStatsManager';
import { Stat } from '../Manager/PlayerStatsManager';

@component()
export class Gun extends Component {

  @property() private player: Maybe<Entity> = null;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;

  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private shootSound: Maybe<Entity> = null;

  @property() private multiShoot: number = 2;

  private worldService = WorldService.get();
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
    this.isActive = true;
    // console.log('[Gun] Activated');
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
        this.shootSoundComponent?.play();
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
    if (!this.canPlayerShoot() || !this.projectileTemplate || !this.targetTransform) return;

    const entity = await this.worldService.spawnTemplate({
      templateAsset: this.projectileTemplate,
      networkMode: NetworkMode.LocalOnly,
    });

    await delay(100);

    if (!this.canPlayerShoot()) return;

    const firePos = this.getFirePosition();
    const dir = this.getShootDirectionFromHead(firePos);
    if (!dir) {
      entity.destroy();
      return;
    }

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

    const isCrit = Math.random() * 100 < this.critChance;
    const finalDamage = isCrit ? this.getTotalDamage() * this.critPercent : this.getTotalDamage();

    const headTf = this.headEntity?.getComponent(TransformComponent);
    const headRotation = headTf?.worldRotation;
    projectile.shoot(firePos, dir, finalDamage, headRotation);
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
}
