import { component, Component, OnEntityStartEvent, OnFocusedInteractionInputEndedEvent, OnFocusedInteractionInputEventPayload, OnFocusedInteractionInputMovedEvent, OnFocusedInteractionInputStartedEvent, subscribe, TransformComponent, Vec3, type Entity, type Maybe } from 'meta/worlds';

@component()
export class InputManager extends Component {

  private target: Maybe<TransformComponent> = null;
  private isDragging: boolean = false;

  public setup(target: Entity) {
    this.target = target.getComponent(TransformComponent);
  }

  /** Raycast onto the XZ plane at the target's Y and return the hit point */
  private raycastXZPlane(payload: OnFocusedInteractionInputEventPayload): Maybe<Vec3> {
    if (!this.target) return null;

    const origin = payload.worldRayOrigin;
    const dir = payload.worldRayDirection;

    // Plane Y = target's current Y
    const planeY = this.target.worldPosition.y;

    // Avoid division by zero / near-parallel rays
    if (Math.abs(dir.y) < 0.0001) return null;

    const t = (planeY - origin.y) / dir.y;
    if (t < 0) return null; // intersection is behind the ray

    return new Vec3(
      origin.x + dir.x * t,
      planeY,
      origin.z + dir.z * t,
    );
  }

  @subscribe(OnFocusedInteractionInputStartedEvent)
  onInputStarted(payload: OnFocusedInteractionInputEventPayload) {
    if (!this.target) return;
    this.isDragging = true;

    const hit = this.raycastXZPlane(payload);
    if (hit) {
      this.target.worldPosition = hit;
      console.log('hit', this.target.worldPosition);
    }
  }

  @subscribe(OnFocusedInteractionInputMovedEvent)
  onInputMoved(payload: OnFocusedInteractionInputEventPayload) {
    if (!this.target || !this.isDragging) return;

    const hit = this.raycastXZPlane(payload);
    if (hit) {
      this.target.worldPosition = hit;
    }
  }

  @subscribe(OnFocusedInteractionInputEndedEvent)
  onInputEnded(payload: OnFocusedInteractionInputEventPayload) {
    this.isDragging = false;
  }
}
