import { component, ExecuteOn, OnTriggerExitEvent, OnTriggerExitEventPayload, OnTriggerEnterEvent, OnTriggerEnterEventPayload, subscribe, TransformComponent, Vec3 } from 'meta/worlds';
import { Sensor } from '../Sensor/Sensor';
import { BaseEnemy } from './BaseEnemy';
import { ColliderSphereComponent, type Entity } from 'meta/worlds';

@component()
export class DetectEnemy extends Sensor {

  private enemies: Set<Entity> = new Set();

  private collider!: ColliderSphereComponent;

  public setup(actor: Entity, radius: number): void {
    this.setupSensor(actor);
    this.collider = this.entity.getComponent(ColliderSphereComponent)!;
    this.entity.getComponent(TransformComponent)!.localScale = new Vec3(radius, radius, radius);
  }

  public getEnemies(): Set<Entity> {
    return this.enemies;
  }

  @subscribe(OnTriggerEnterEvent, { execution: ExecuteOn.Everywhere })
  protected override onTriggerEnter(event: OnTriggerEnterEventPayload) {
    super.onTriggerEnter(event);
    if (!this.isActive) return;

    const other = event.triggerEntity;
    if (!other) return;
    const enemy = other.getComponent(BaseEnemy);
    if (!enemy || enemy.isDead()) return;

    this.enemies.add(other);
    // console.log('[DetectEnemy] Detected enemy:', other.name);
    enemy.onDied.on(() => this.removeEnemy(other), this);
  }

  @subscribe(OnTriggerExitEvent, { execution: ExecuteOn.Everywhere })
  protected override onTriggerExit(event: OnTriggerExitEventPayload) {
    super.onTriggerExit(event);
    if (!this.isActive) return;

    const other = event.triggerEntity;
    if (!other) return;
    // console.log('[DetectEnemy] Lost enemy:', other.name);
    this.removeEnemy(other);
  }

  private removeEnemy(entity: Entity): void {
    this.enemies.delete(entity);
  }
}
