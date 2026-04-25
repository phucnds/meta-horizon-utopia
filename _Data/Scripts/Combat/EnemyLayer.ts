import {
  component,
  Component,
  OnEntityStartEvent,
  OnWorldUpdateEvent,
  OnWorldUpdateEventPayload,
  property,
  subscribe,
  TransformComponent,
  Vec3,
  type Maybe,
} from 'meta/worlds';

@component()
export class EnemyLayer extends Component {

  @property() private multiplier: number = 0.1;

  private transform: Maybe<TransformComponent> = null;
  private baseY: number = 0;

  @subscribe(OnEntityStartEvent)
  onStart() {
    this.transform = this.entity.getComponent(TransformComponent);
    if (this.transform) {
      this.baseY = this.transform.worldPosition.y;
    }
  }


  @subscribe(OnWorldUpdateEvent)
  onUpdate(_payload: OnWorldUpdateEventPayload) {
    if (!this.transform) return;
    const pos = this.transform.worldPosition;
    this.transform.worldPosition = new Vec3(
      pos.x,
      this.baseY + pos.z * this.multiplier,
      pos.z,
    );
  }
}
