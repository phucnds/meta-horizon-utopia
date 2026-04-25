import {
  Color,
  ColorComponent,
  Component,
  TransformComponent,
  Quaternion,
  Vec3,
  type Entity,
  type Maybe,
  SoundComponent,
  property,
  component,
  VfxComponent,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { HealthComponent } from './HealthComponent';
import type { IDamageable } from './IDamageable';
import { distanceXZ, directionXZ } from './MathUtils';
import { VisibilityComponent } from '../Core/VisibilityComponent';
import { AnimationMoving } from './AnimationMoving';
import { AnimationDissolve } from './AnimationDisolve';
import { BossBehaviour } from './BossBehaviour';

@component()
export abstract class BaseEnemy extends Component implements IDamageable {

  @property() protected vfxDamageEntity: Maybe<Entity> = null;

  public readonly onDied = new Signal<Entity>();

  protected enemyAttackSoundComponent: Maybe<SoundComponent> = null;
  protected enemyDeathSoundComponent: Maybe<SoundComponent> = null;
  protected enemyHitSoundComponent: Maybe<SoundComponent> = null;

  protected bossBehaviour: Maybe<BossBehaviour> = null;

  protected health!: HealthComponent;
  protected targetEntity: Maybe<Entity> = null;
  protected transform!: TransformComponent;
  protected animationMoving: Maybe<AnimationMoving> = null;
  protected animationDissolve: Maybe<AnimationDissolve> = null;
  protected vfxDamage: Maybe<VfxComponent> = null;
  private isDying: boolean = false;

  protected maxHp: number = 10;
  protected damageMultiplier: number = 1;
  @property() protected moveSpeed: number = 1;
  protected isActive: boolean = false;
  private hasInit: boolean = false;

  protected isFacingRight: boolean = false;

  // Hit flash
  @property() private hitFlashColor: Color = new Color(1, 0, 0, 1);
  @property() private hitFlashDuration: number = 0.15;
  private hitFlashTimer: number = 0;
  private isFlashing: boolean = false;
  private colorComponent: Maybe<ColorComponent> = null;
  private originalColor: Maybe<Color> = null;

  public setup(target: Entity, maxHp: number): void {
    if (!this.hasInit) {
      const tf = this.entity.getComponent(TransformComponent);
      if (tf) this.transform = tf;

      this.animationMoving = this.entity.getComponent(AnimationMoving) ?? null;
      this.animationMoving?.setup();

      this.animationDissolve = this.entity.getComponent(AnimationDissolve) ?? null;
      this.animationDissolve?.setup();

      this.bossBehaviour = this.entity.getComponent(BossBehaviour) ?? null;

      this.vfxDamage = this.vfxDamageEntity?.getComponent(VfxComponent) ?? null;

      this.initColor();

      this.hasInit = true;
    }

    // Reset hit flash state so pooled enemies don't respawn red
    this.isFlashing = false;
    this.hitFlashTimer = 0;
    if (this.colorComponent && this.originalColor) {
      this.colorComponent.color = this.originalColor;
    }

    this.targetEntity = target;
    this.maxHp = maxHp;
    this.health = new HealthComponent(maxHp);
    this.health.onDied.on(this.handleDeath, this);

    this.isDying = false;
    this.isActive = true;
    this.onSetup();
  }

  public setDamageMultiplier(multiplier: number): void {
    this.damageMultiplier = multiplier;
  }

  public setupSounds(enemyAttackSound: Entity, enemyDeathSound: Entity, enemyHitSound: Entity): void {
    this.enemyAttackSoundComponent = enemyAttackSound.getComponent(SoundComponent) ?? null;
    this.enemyDeathSoundComponent = enemyDeathSound.getComponent(SoundComponent) ?? null;
    this.enemyHitSoundComponent = enemyHitSound.getComponent(SoundComponent) ?? null;
  }

  protected onSetup(): void {}

  protected canUpdate(): boolean {
    return this.isActive && !this.health.isDead() && !!this.targetEntity;
  }

  public gameTick(dt: number): void {
    if (this.isDying) {
      this.animationDissolve?.gameTick(dt);
      return;
    }
    this.updateHitFlash(dt);
    if (!this.canUpdate()) return;
    this.onUpdate(dt);
    this.animationDissolve?.gameTick(dt);
  }

  protected abstract onUpdate(dt: number): void;

  public takeDamage(damage: number, isCrit: boolean = false): void {
    if (!this.health) return;
    this.health.takeDamage(damage);
    this.enemyHitSoundComponent?.play();
    this.startHitFlash();
    this.vfxDamage?.setCustomParam("number", damage);
    this.vfxDamage?.setCustomParam(
      "color",
      isCrit ? new Color(1, 0.2, 0.1, 1) : new Color(1, 1, 1, 1),
    );
    this.vfxDamage?.setCustomParam(
      "scale", isCrit ? 1.2 : 1);
    this.vfxDamage?.play();
  }

  public isDead(): boolean {
    return !this.health || this.health.isDead();
  }

  protected getPosition(): Vec3 {
    return this.transform.worldPosition;
  }

  protected getTargetPosition(): Vec3 {
    const targetTf = this.targetEntity?.getComponent(TransformComponent);
    if (!targetTf) return new Vec3(0, 0, 0);
    return targetTf.worldPosition;
  }

  protected distanceToTarget(): number {
    return distanceXZ(this.getPosition(), this.getTargetPosition());
  }

  protected moveTowardTarget(dt: number): void {
    const pos = this.getPosition();
    const targetPos = this.getTargetPosition();
    const dir = directionXZ(pos, targetPos);
    const step = this.moveSpeed * dt;

    this.transform.worldPosition = new Vec3(
      pos.x + dir.x * step,
      pos.y,
      pos.z + dir.z * step,
    );

    this.animationMoving?.setMoving(true);
    this.animationMoving?.gameTick(dt);
    this.bossBehaviour?.onMove();
  }

  protected lookAtTarget(): void {
    const pos = this.getPosition();
    const targetPos = this.getTargetPosition();
    const dx = targetPos.x - pos.x;
    if (dx > 1e-4) this.isFacingRight = true;
    else if (dx < -1e-4) this.isFacingRight = false;

    const zDeg = this.isFacingRight ? 180 : 0;
    this.transform.worldRotation = Quaternion.fromEuler(new Vec3(0, 0, zDeg));
  }

  private handleDeath(): void {
    this.isActive = false;
    this.isDying = true;
    this.animationMoving?.setMoving(false);

    if (this.animationDissolve) {
      this.animationDissolve.onComplete.on(this.onDissolveComplete, this);
      this.animationDissolve.play();
      this.enemyDeathSoundComponent?.play();
    } else {
      this.onDissolveComplete();
    }
  }

  private onDissolveComplete(): void {
    this.isDying = false;
    this.animationDissolve?.onComplete.off(this.onDissolveComplete);
    this.entity.enabledSelf = false;
    this.onDied.trigger(this.entity);
  }

  private initColor(): void {
    const colorEntities = this.entity.getChildrenWithComponent(ColorComponent, true);
    if (colorEntities.length === 0) return;

    const colorComp = colorEntities[0].getComponent(ColorComponent);
    if (!colorComp) return;

    this.colorComponent = colorComp;
    this.originalColor = colorComp.color;
  }

  private startHitFlash(): void {
    if (!this.colorComponent || !this.originalColor) return;
    this.isFlashing = true;
    this.hitFlashTimer = this.hitFlashDuration;
    this.colorComponent.color = this.hitFlashColor;
  }

  private updateHitFlash(dt: number): void {
    if (!this.isFlashing || !this.colorComponent || !this.originalColor) return;

    this.hitFlashTimer -= dt;
    if (this.hitFlashTimer <= 0) {
      this.isFlashing = false;
      this.hitFlashTimer = 0;
      this.colorComponent.color = this.originalColor;
      return;
    }

    const t = this.hitFlashTimer / this.hitFlashDuration;
    this.colorComponent.color = Color.lerp(this.originalColor, this.hitFlashColor, t);
  }

  public reset(maxHp?: number): void {
    if (maxHp != null) this.maxHp = maxHp;
    this.health.reset();
    this.isActive = true;
    this.isFacingRight = false;
    this.isDying = false;
    this.animationMoving?.setMoving(false);
    this.animationDissolve?.reset();
    this.isFlashing = false;
    this.hitFlashTimer = 0;
    if (this.colorComponent && this.originalColor) {
      this.colorComponent.color = this.originalColor;
    }
    this.entity.enabledSelf = true;
    this.entity.getComponent(VisibilityComponent)?.show();
  }
}
