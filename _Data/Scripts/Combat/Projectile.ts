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
import type { IDamageable } from './IDamageable';
import { BaseEnemy } from './BaseEnemy';
import { VisibilityComponent } from '../Core/VisibilityComponent';
import { SensorProjectile } from '../Sensor/SensorProjectile';
import { delay } from '../Utils/AsyncUtils';

@component()
export class Projectile extends Component {
  @property() private sensor: Maybe<Entity> = null;

  public readonly onHit = new Signal<Entity>();
  public readonly onDeactivated = new Signal();

  @property() private moveSpeed: number = 15;
  @property() private range: number = 20;

  private direction: Vec3 = new Vec3(0, 0, 0);
  private transform!: TransformComponent;
  private isActive: boolean = false;
  private damage: number = 0;
  private startPos: Vec3 = new Vec3(0, 0, 0);
  private targetEntity: Maybe<Entity> = null;
  private sensorProjectile: Maybe<SensorProjectile> = null;

  private hasSetup: boolean = false;



  public async setup(): Promise<void> {
    await delay(50);
    if (this.hasSetup) return;
    this.hasSetup = true;

    this.sensorProjectile = this.sensor?.getComponent(SensorProjectile) ?? null;
    // this.visibility = this.entity.getComponent(VisibilityComponent) ?? null;

    this.sensorProjectile?.setupSensor(this.entity);
    this.sensorProjectile?.onDetachEnemy.on(this.hitTarget, this);
  }

  public async shoot(startPos: Vec3, direction: Vec3, damage: number, target: Entity, rotation?: Quaternion): Promise<void> {
    if (!this.hasSetup) await this.setup();


    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    this.transform.worldPosition = startPos;
    if (rotation) {
      this.transform.worldRotation = rotation;
    }
    this.direction = direction;
    this.damage = damage;
    this.targetEntity = target;

    this.startPos = new Vec3(startPos.x, startPos.y, startPos.z);

    // await delay(1000);

    this.isActive = true;
  }

  public updateProjectile(dt: number): void {
    if (!this.isActive) return;

    // Move
    const pos = this.transform.worldPosition;
    const newPos = new Vec3(
      pos.x + this.direction.x * this.moveSpeed * dt,
      pos.y,
      pos.z + this.direction.z * this.moveSpeed * dt,
    );
    this.transform.worldPosition = newPos;

    // Check out of range
    const dx = newPos.x - this.startPos.x;
    const dz = newPos.z - this.startPos.z;
    const distFromStart = Math.sqrt(dx * dx + dz * dz);
    if (distFromStart >= this.range) {
      this.deactivate();
    }
  }

  private async hitTarget(): Promise<void> {
    if (!this.targetEntity) return;

    const enemy = this.targetEntity.getComponent(BaseEnemy);
    if (enemy) {
      enemy.takeDamage(this.damage);
      // console.log('hitTarget', this.damage);
    }

    this.onHit.trigger(this.targetEntity);
    await this.deactivate();
  }

  private async deactivate(): Promise<void> {
    this.isActive = false;
    // this.visibility?.hide();
    // await delay(50);



    // await delay(200);
    this.onDeactivated.trigger();



  }
}
