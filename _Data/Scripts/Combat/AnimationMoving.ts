import { component, Component, property, TransformComponent, Vec3, type Entity, type Maybe } from 'meta/worlds';

@component()
export class AnimationMoving extends Component {

  @property() private visualEntity: Maybe<Entity> = null;
  @property() private bounceSpeed: number = 8;
  @property() private bounceAmount: number = 0.15;

  private visualTransform!: TransformComponent;
  private isMoving: boolean = false;
  private bounceTime: number = 0;
  private baseScale: Vec3 = new Vec3(1, 1, 1);

  public setup(): void {
    this.visualTransform = this.visualEntity?.getComponent(TransformComponent)!;
    if (this.visualTransform) {
      this.baseScale = this.visualTransform.localScale;
    }
  }

  public setMoving(moving: boolean): void {
    this.isMoving = moving;
    if (!moving) {
      this.bounceTime = 0;
      if (this.visualTransform) {
        this.visualTransform.localScale = this.baseScale;
      }
    }
  }

  public gameTick(dt: number): void {
    if (!this.visualTransform) return;
    if (!this.isMoving) return;

    this.bounceTime += dt * this.bounceSpeed;
    const squash = Math.sin(this.bounceTime) * this.bounceAmount;

    this.visualTransform.localScale = new Vec3(
      this.baseScale.x + squash * 0.5,
      this.baseScale.y,
      this.baseScale.z - squash,
    );
  }
}
