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
import { VisibilityComponent } from '../Core/VisibilityComponent';
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
  private sensorProjectile: Maybe<SensorProjectile> = null;

  private hasSetup: boolean = false;

  public async setup(): Promise<void> {

    if (this.hasSetup) return;
    this.hasSetup = true;

    this.transform = this.entity.getComponent(TransformComponent)!;
    this.sensorProjectile = this.sensor?.getComponent(SensorProjectile) ?? null;

    this.sensorProjectile?.setupSensor(this.entity);
    this.sensorProjectile?.onDetectEnemy.on(this.onSensorHit, this);
    this.entity.getComponent(VisibilityComponent)?.show();
  }

  public async shoot(startPos: Vec3, direction: Vec3, damage: number, rotation?: Quaternion): Promise<void> {
    
    this.direction = new Vec3(direction.x, direction.y, direction.z);
    this.damage = damage;
    this.aliveTime = 0;

    this.transform.worldPosition = new Vec3(startPos.x, startPos.y, startPos.z);
    if (rotation) {
      this.transform.worldRotation = rotation;
    }

    this.isActive = true;
    await delay(100);
    this.entity.getComponent(VisibilityComponent)?.show();
    // console.log('[Projectile] Show');
  }

  public updateProjectile(dt: number): void {
    if (!this.isActive) return;

    try {
      const pos = this.transform.worldPosition;
      this.transform.worldPosition = new Vec3(
        pos.x + this.direction.x * this.moveSpeed * dt,
        pos.y,
        pos.z + this.direction.z * this.moveSpeed * dt,
      );

      this.sensorProjectile?.updateSensor();
    } catch (e) {
      this.isActive = false;
      return;
    }

    if (!this.isActive) return;

    this.aliveTime += dt;
    if (this.aliveTime >= this.lifetime) {
      this.deactivate();
    }
  }

  private onSensorHit(hitEntity?: Entity): void {
    if (!this.isActive || !hitEntity) return;

    const enemy = hitEntity.getComponent(BaseEnemy);
    if (enemy && !enemy.isDead()) {
      enemy.takeDamage(this.damage);
    }

    this.onHit.trigger(hitEntity);
    this.deactivate();
  }

  private async deactivate(): Promise<void> {
    if (!this.isActive) return;

    this.isActive = false;
    this.damage = 0;
    this.aliveTime = 0;
    this.sensorProjectile?.deactivateSensor();
    this.entity.getComponent(VisibilityComponent)?.hide();
    await delay(100);
    this.onDeactivated.trigger();
  }
}
