import { component, Component, property, Quaternion, TransformComponent, Vec3, type Entity, type Maybe } from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';

@component()
export class AnimationDissolve extends Component {

  @property() private visualEntity: Maybe<Entity> = null;
  @property() private duration: number = 0.5;

  private visualTransform!: TransformComponent;
  private baseScale: Vec3 = new Vec3(1, 1, 1);
  private isPlaying: boolean = false;
  private elapsed: number = 0;

  public readonly onComplete = new Signal();

  public setup(): void {
    this.visualTransform = this.visualEntity?.getComponent(TransformComponent)!;
    if (this.visualTransform) {
      this.baseScale = this.visualTransform.localScale;
    }
  }

  public play(): void {
    this.isPlaying = true;
    this.elapsed = 0;
  }

  public reset(): void {
    this.isPlaying = false;
    this.elapsed = 0;
    if (this.visualTransform) {
      this.visualTransform.localScale = this.baseScale;
      this.visualTransform.localRotation = Quaternion.fromEuler(new Vec3(0, 0, 0));
    }
  }

  public gameTick(dt: number): void {
    if (!this.visualTransform) return;
    if (!this.isPlaying) return;

    this.elapsed += dt;
    const t = Math.min(this.elapsed / this.duration, 1);

    const easeIn = t * t;
    const angle = easeIn * 360;
    this.visualTransform.localRotation = Quaternion.fromEuler(new Vec3(0, angle, 0));

    const scale = 1 - t;
    this.visualTransform.localScale = new Vec3(
      this.baseScale.x * scale,
      this.baseScale.y * scale,
      this.baseScale.z * scale,
    );

    if (t >= 1) {
      this.isPlaying = false;
      this.onComplete.trigger();
    }
  }
}
