import {
  component,
  Component,
  OnWorldUpdateEvent,
  OnWorldUpdateEventPayload,
  property,
  subscribe,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import type { IDamageable } from './IDamageable';
import { BaseEnemy } from './BaseEnemy';
import { VisibilityComponent } from '../Core/VisibilityComponent';

@component()
export class Projectile extends Component {

  public readonly onHit = new Signal<Entity>();

  @property() private moveSpeed: number = 15;
  @property() private lifetime: number = 3;
  @property() private hitRange: number = 1.0;

  private direction: Vec3 = new Vec3(0, 0, 0);
  private transform!: TransformComponent;
  private isActive: boolean = false;
  private timer: number = 0;
  private damage: number = 0;
  private targetEntity: Maybe<Entity> = null;

  public shoot(startPos: Vec3, direction: Vec3, damage: number, target: Entity): void {
    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    this.transform.worldPosition = (startPos);
    this.direction = direction;
    this.damage = damage;
    this.targetEntity = target;
    this.isActive = true;
    this.timer = 0;
    this.entity.getComponent(VisibilityComponent)?.show();
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    if (!this.isActive) return;

    const dt = payload.deltaTime;
    this.timer += dt;

    if (this.timer >= this.lifetime) {
      this.deactivate();
      return;
    }

    // Move
    const pos = this.transform.worldPosition;
    const newPos = new Vec3(
      pos.x + this.direction.x * this.moveSpeed * dt,
      pos.y,
      pos.z + this.direction.z * this.moveSpeed * dt,
    );
    this.transform.worldPosition = (newPos);

    // Check hit target
    if (this.targetEntity) {
      const targetTf = this.targetEntity.getComponent(TransformComponent);
      if (targetTf) {
        const targetPos = targetTf.worldPosition;
        const dx = newPos.x - targetPos.x;
        const dz = newPos.z - targetPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist <= this.hitRange) {
          this.hitTarget();
        }
      }
    }
  }

  private hitTarget(): void {
    if (!this.targetEntity) return;

    const enemy = this.targetEntity.getComponent(BaseEnemy);
    if (enemy) {
      enemy.takeDamage(this.damage);
    }

    this.onHit.trigger(this.targetEntity);
    this.deactivate();
  }

  private deactivate(): void {
    this.isActive = false;
    this.entity.getComponent(VisibilityComponent)?.hide();
  }
}
