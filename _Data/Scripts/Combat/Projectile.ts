import {
  component,
  Component,
  property,
  Quaternion,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BaseEnemy } from './BaseEnemy';
import { SensorProjectile } from '../Sensor/SensorProjectile';
import { delay } from '../Utils/AsyncUtils';

@component()
export class Projectile extends Component {
  @property() private sensor: Maybe<Entity> = null;

  public readonly onHit = new Signal<Entity>();
  public readonly onDeactivated = new Signal();

  @property() private moveSpeed: number = 15;
  @property() private lifetime: number = 3;

  private direction: Vec3 = new Vec3(0, 0, 0);
  private transform!: TransformComponent;
  private isActive: boolean = false;
  private damage: number = 0;
  private aliveTime: number = 0;
  private targetEntity: Maybe<Entity> = null;
  private sensorProjectile: Maybe<SensorProjectile> = null;

  private hasSetup: boolean = false;

  public async setup(): Promise<void> {
    await delay(50);
    if (this.hasSetup) return;
    this.hasSetup = true;

    this.transform = this.entity.getComponent(TransformComponent)!;
    this.sensorProjectile = this.sensor?.getComponent(SensorProjectile) ?? null;

    this.sensorProjectile?.setupSensor(this.entity);
    this.sensorProjectile?.onDetachEnemy.on(this.hitTarget, this);
  }

  public shoot(startPos: Vec3, direction: Vec3, damage: number, target: Entity, rotation?: Quaternion): void {
    this.transform.worldPosition = startPos;
    if (rotation) {
      this.transform.worldRotation = rotation;
    }
    this.direction = direction;
    this.damage = damage;
    this.targetEntity = target;
    this.aliveTime = 0;

    this.isActive = true;
  }

  public updateProjectile(dt: number): void {
    if (!this.isActive) return;

    this.sensorProjectile?.updateSensor();

    const pos = this.transform.worldPosition;
    const newPos = new Vec3(
      pos.x + this.direction.x * this.moveSpeed * dt,
      pos.y,
      pos.z + this.direction.z * this.moveSpeed * dt,
    );
    this.transform.worldPosition = newPos;

    this.aliveTime += dt;
    if (this.aliveTime >= this.lifetime) {
      this.deactivate();
    }
  }

  private hitTarget(): void {
    if (!this.isActive || !this.targetEntity) return;

    const enemy = this.targetEntity.getComponent(BaseEnemy);
    if (enemy && !enemy.isDead()) {
      enemy.takeDamage(this.damage);
    }

    this.onHit.trigger(this.targetEntity);
    this.deactivate();
  }

  private deactivate(): void {
    if (!this.isActive) return;

    this.isActive = false;
    this.targetEntity = null;
    this.onDeactivated.trigger();
    console.log('Deactivating projectile');
  }
}
