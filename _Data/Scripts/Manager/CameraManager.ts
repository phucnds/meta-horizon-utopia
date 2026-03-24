import {CameraService, CameraMode, component, Component, property, subscribe, TransformComponent, Vec3, type Entity, type Maybe, Quaternion, OnWorldUpdateEventPayload, OnWorldUpdateEvent} from 'meta/worlds';

@component()
export class CameraManager extends Component {
  
@property() private targetEntity: Maybe<Entity> = null;

  @property() positionOffset: Vec3 = new Vec3(-25, 60, -40);
  @property() rotationOffset: Vec3 = new Vec3(40, -150, -20);

  private targetTransform: Maybe<TransformComponent> = null;

  public async setupCamera(player: Entity ): Promise<void> {
    
    this.targetEntity = player;
    if (!this.targetEntity) return;

    this.targetTransform = this.targetEntity.getComponent(TransformComponent);


    // Attach camera to anchor instead of player directly
    CameraService.get().setCameraMode(CameraMode.Attached, {
      target: this.targetEntity,
      positionOffset: this.positionOffset,
      rotationOffset: Quaternion.fromEuler(this.rotationOffset),
      duration: 0,
    });
  }
}
