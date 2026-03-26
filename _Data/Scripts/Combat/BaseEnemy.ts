import {
  Component,
  TransformComponent,
  Quaternion,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { HealthComponent } from './HealthComponent';
import type { IDamageable } from './IDamageable';
import { distanceXZ, directionXZ, angleXZ } from './MathUtils';
import { VisibilityComponent } from '../Core/VisibilityComponent';

export abstract class BaseEnemy extends Component implements IDamageable {

  public readonly onDied = new Signal<Entity>();

  protected health!: HealthComponent;
  protected targetEntity: Maybe<Entity> = null;
  protected transform!: TransformComponent;

  protected maxHp: number = 10;
  protected moveSpeed: number = 0.5;
  protected isActive: boolean = false;

  public setup(target: Entity, maxHp: number): void {
    this.targetEntity = target;
    this.maxHp = maxHp;
    this.health = new HealthComponent(maxHp);
    this.health.onDied.on(this.handleDeath, this);

    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    this.isActive = true;
    this.onSetup();
  }

  protected onSetup(): void {}

  protected canUpdate(): boolean {
    return this.isActive && !this.health.isDead() && !!this.targetEntity;
  }

  protected abstract onUpdate(dt: number): void;

  public takeDamage(damage: number): void {
    this.health.takeDamage(damage);
  }

  public isDead(): boolean {
    return this.health.isDead();
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
  }

  protected lookAtTarget(): void {
    const pos = this.getPosition();
    const targetPos = this.getTargetPosition();
    const angle = angleXZ(pos, targetPos);
    this.transform.worldRotation = Quaternion.fromEuler(new Vec3(0, angle, 0));
  }

  private handleDeath(): void {
    this.isActive = false;
    this.onDied.trigger(this.entity);
    this.onDeathEffect();
  }

  protected onDeathEffect(): void {
    this.entity.getComponent(VisibilityComponent)?.hide();
  }

  public reset(maxHp?: number): void {
    if (maxHp != null) this.maxHp = maxHp;
    this.health.reset();
    this.isActive = true;
    this.entity.getComponent(VisibilityComponent)?.show();
  }
}
