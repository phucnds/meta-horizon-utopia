import { component, Component, ExecuteOn, MeshComponent, OnTriggerEnterEvent, OnTriggerEnterEventPayload, OnTriggerExitEvent, OnTriggerExitEventPayload, property, subscribe, TransformComponent, Vec3, type Entity, type Maybe } from 'meta/worlds';

@component()
export class Sensor extends Component {

  @property() private isDebug: boolean = false;

  protected player: Entity | null = null;

  protected offset: Vec3 = new Vec3(0, 0, 0);
  protected actorTransform: Maybe<TransformComponent> = null;
  protected transform: Maybe<TransformComponent> = null;

  protected isActive: boolean = false;

  public deactivateSensor(): void {
    this.isActive = false;
  }

  public async setupSensor(actor: Entity): Promise<void> {
    
    this.player = actor

    this.actorTransform = actor.getComponent(TransformComponent);
    this.transform = this.entity.getComponent(TransformComponent);
    this.offset = this.transform?.localPosition ?? new Vec3(0, 0, 0);
    this.isActive = true;


    this.entity.getComponent(MeshComponent)!.isVisibleSelf = this.isDebug;
  }

  public updateSensor(): void {
    if (!this.actorTransform || !this.transform || !this.isActive) return;
    try {
      this.transform.worldPosition = this.actorTransform.worldPosition.add(this.offset);
    } catch (e) {
      this.isActive = false;
    }
  }

  @subscribe(OnTriggerEnterEvent, { execution: ExecuteOn.Everywhere })
  protected onTriggerEnter(event: OnTriggerEnterEventPayload) {
    const other = event.triggerEntity;
    if (other) {
      // console.log('TriggerEnter other', other.name);
    }

  }

  @subscribe(OnTriggerExitEvent, { execution: ExecuteOn.Everywhere })
  protected onTriggerExit(event: OnTriggerExitEventPayload) {
    const other = event.triggerEntity;
    if (other) {
      // console.log('TriggerExit other', other.name);
    }

  }


}
