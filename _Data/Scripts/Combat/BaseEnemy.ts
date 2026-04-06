import {
  Component,
  TransformComponent,
  Quaternion,
  Vec3,
  type Entity,
  type Maybe,
  SoundComponent,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { HealthComponent } from './HealthComponent';
import type { IDamageable } from './IDamageable';
import { distanceXZ, directionXZ, angleXZ } from './MathUtils';
import { VisibilityComponent } from '../Core/VisibilityComponent';
import { AnimationMoving } from './AnimationMoving';
import { AnimationDissolve } from './AnimationDisolve';

export abstract class BaseEnemy extends Component implements IDamageable {

  public readonly onDied = new Signal<Entity>();

  protected enemyAttackSoundComponent: Maybe<SoundComponent> = null;
  protected enemyDeathSoundComponent: Maybe<SoundComponent> = null;
  protected enemyHitSoundComponent: Maybe<SoundComponent> = null;

  protected health!: HealthComponent;
  protected targetEntity: Maybe<Entity> = null;
  protected transform!: TransformComponent;
  protected animationMoving: Maybe<AnimationMoving> = null;
  protected animationDissolve: Maybe<AnimationDissolve> = null;
  private isDying: boolean = false;

  protected maxHp: number = 10;
  protected moveSpeed: number = 1;
  protected isActive: boolean = false;
  private hasInit: boolean = false;

  public setup(target: Entity, maxHp: number): void {
    if (!this.hasInit) {
      const tf = this.entity.getComponent(TransformComponent);
      if (tf) this.transform = tf;

      this.animationMoving = this.entity.getComponent(AnimationMoving) ?? null;
      this.animationMoving?.setup();

      this.animationDissolve = this.entity.getComponent(AnimationDissolve) ?? null;
      this.animationDissolve?.setup();

      this.hasInit = true;
    }

    this.targetEntity = target;
    this.maxHp = maxHp;
    this.health = new HealthComponent(maxHp);
    this.health.onDied.on(this.handleDeath, this);

    this.isDying = false;
    this.isActive = true;
    this.onSetup();
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
    if (!this.canUpdate()) return;
    this.onUpdate(dt);
  }

  protected abstract onUpdate(dt: number): void;

  public takeDamage(damage: number): void {
    if (!this.health) return;
    this.health.takeDamage(damage);
    this.enemyHitSoundComponent?.play();
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
  }

  protected lookAtTarget(): void {
    const pos = this.getPosition();
    const targetPos = this.getTargetPosition();
    const angle = angleXZ(pos, targetPos);
    this.transform.worldRotation = Quaternion.fromEuler(new Vec3(0, angle, 0));
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
    this.entity.getComponent(VisibilityComponent)?.hide();
    this.onDied.trigger(this.entity);
  }

  public reset(maxHp?: number): void {
    if (maxHp != null) this.maxHp = maxHp;
    this.health.reset();
    this.isActive = true;
    this.isDying = false;
    this.animationMoving?.setMoving(false);
    this.animationDissolve?.reset();
    this.entity.getComponent(VisibilityComponent)?.show();
  }
}
