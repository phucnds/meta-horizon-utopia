import { component, ExecuteOn, OnTriggerEnterEvent, OnTriggerEnterEventPayload, OnTriggerExitEvent, OnTriggerExitEventPayload, OnWorldUpdateEvent, OnWorldUpdateEventPayload, property, subscribe, TransformComponent, Vec3, type Entity, type Maybe } from 'meta/worlds';
import { Sensor } from './Sensor';
import { Signal } from '../EventSystem/Signal';
import { BaseEnemy } from '../Combat/BaseEnemy';


@component()
export class SensorRangeWeapon extends Sensor {
  public onDetectGround = new Signal();

  @subscribe(OnTriggerEnterEvent, { execution: ExecuteOn.Everywhere })
  protected override onTriggerEnter(event: OnTriggerEnterEventPayload) {
    super.onTriggerEnter(event);

    const other = event.triggerEntity;
    if (!other) return;
    const animalCol = other.getComponent(BaseEnemy);
    if (!animalCol) return;
    
    this.onDetectGround.trigger();

  }

  @subscribe(OnTriggerExitEvent, { execution: ExecuteOn.Everywhere })
  protected override onTriggerExit(event: OnTriggerExitEventPayload) {
    super.onTriggerExit(event);

    const other = event.triggerEntity;
    if (!other) return;
    const animalCol = other.getComponent(BaseEnemy);
    if (!animalCol) return;
    // console.log('TriggerExit Ground');
  }
}
