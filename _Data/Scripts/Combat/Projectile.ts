import {
  component,
  Component,
  property,
  Quaternion,
  SoundComponent,
  TransformComponent,
  Vec3,
  VfxComponent,
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
  // @property() private trail: Maybe<Entity> = null;

  public readonly onHit = new Signal<Entity>();
  public readonly onDeactivated = new Signal();

  @property() private moveSpeed: number = 15;
  @property() private lifetime: number = 3;
  // @property() private trailLength: number = .4;

  private direction: Vec3 = new Vec3(0, 0, 0);
  private transform!: TransformComponent;
  private isActive: boolean = false;
  private damage: number = 0;
  private isCrit: boolean = false;
  private aliveTime: number = 0;
  private sensorProjectile: Maybe<SensorProjectile> = null;
  // private trailVfx: Maybe<VfxComponent> = null;

  private hasSetup: boolean = false;

  public async setup(): Promise<void> {

    if (this.hasSetup) return;
    this.hasSetup = true;

    this.transform = this.entity.getComponent(TransformComponent)!;
    this.sensorProjectile = this.sensor?.getComponent(SensorProjectile) ?? null;
    // this.trailVfx = this.trail?.getComponent(VfxComponent) ?? null;

    this.sensorProjectile?.setupSensor(this.entity);
    this.sensorProjectile?.onDetachEnemy.on(this.onSensorHit, this);
    this.entity.getComponent(VisibilityComponent)?.show();

  }

  public shoot(startPos: Vec3, direction: Vec3, damage: number, rotation?: Quaternion, isCrit: boolean = false): void {
    this.direction = new Vec3(direction.x, direction.y, direction.z);
    this.damage = damage;
    this.isCrit = isCrit;
    this.aliveTime = 0;

    this.transform.worldPosition = new Vec3(startPos.x, startPos.y, startPos.z);
    if (rotation) {
      this.transform.worldRotation = rotation;
    }

    this.isActive = true;
    this.entity.getComponent(VisibilityComponent)?.show();
    
    this.activateTrail();

  }

  private async activateTrail(): Promise<void> {
    await delay(100);
    // if (this.trail) this.trailVfx?.setCustomParam('size', this.trailLength);
  }

  public updateProjectile(dt: number): void {
    if (!this.isActive) return;

    const pos = this.transform.worldPosition;
    this.transform.worldPosition = new Vec3(
      pos.x + this.direction.x * this.moveSpeed * dt,
      pos.y,
      pos.z + this.direction.z * this.moveSpeed * dt,
    );

    this.sensorProjectile?.updateSensor();
    if (!this.isActive) return; // sensor hit may have deactivated

    this.aliveTime += dt;
    if (this.aliveTime >= this.lifetime) {
      this.deactivate();
    }
  }

  private onSensorHit(hitEntity?: Entity): void {
    if (!this.isActive || !hitEntity) return;

    const enemy = hitEntity.getComponent(BaseEnemy);
    if (enemy && !enemy.isDead()) {
      enemy.takeDamage(this.damage, this.isCrit);
      // console.log('[Projectile] Enemy hit - damage:', this.damage);
    }

    this.onHit.trigger(hitEntity);
    this.destroy();
  }

  private deactivate(): void {
    if (!this.isActive) return;
    this.destroy();
  }

  private destroy(): void {
    if (!this.isActive) return;

    this.isActive = false;
    this.damage = 0;
    this.isCrit = false;
    this.aliveTime = 0;
    this.onDeactivated.trigger();
  }
}
