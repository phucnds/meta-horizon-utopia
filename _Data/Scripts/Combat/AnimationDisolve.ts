import { component, Component, property, Quaternion, TransformComponent, Vec3, VfxComponent, type Entity, type Maybe } from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';

@component()
export class AnimationDissolve extends Component {

  @property() private visualEntity: Maybe<Entity> = null;
  @property() private duration: number = 0.5;
  @property() private explosionEntity: Maybe<Entity> = null;
  @property() private layerMultiplier: number = 0.05;

  private visualTransform: Maybe<TransformComponent> = null;
  private vfxExplosion: Maybe<VfxComponent> = null;
  private baseScale: Vec3 = new Vec3(1, 1, 1);
  private baseY: number = 0;
  private isPlaying: boolean = false;
  private elapsed: number = 0;

  private offset: number = 100;

  public readonly onComplete = new Signal();

  public setup(): void {
    this.visualTransform = this.visualEntity?.getComponent(TransformComponent) ?? null;
    this.vfxExplosion = this.explosionEntity?.getComponent(VfxComponent) ?? null;
    this.captureBaseFromVisual();
  }

  private captureBaseFromVisual(): void {
    if (!this.visualTransform) return;
    this.baseScale = this.visualTransform.localScale;
    this.baseY = this.visualTransform.worldPosition.y;
  }

  public play(): void {
    this.isPlaying = true;
    this.elapsed = 0;
    this.vfxExplosion?.play();
  }

  public reset(): void {
    this.isPlaying = false;
    this.elapsed = 0;
    if (this.visualTransform) {
      this.visualTransform.localScale = this.baseScale;
      this.visualTransform.localRotation = Quaternion.fromEuler(new Vec3(0, 0, 0));
    }
    this.captureBaseFromVisual();
  }

  public gameTick(_dt: number): void {
    if (!this.visualTransform) return;
    if (!this.isPlaying) {
      this.applyLayerOffset();
      return;
    }

    this.elapsed += _dt;
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

  private applyLayerOffset(): void {
    if (!this.visualTransform) return;
    const pos = this.visualTransform.worldPosition;
    this.visualTransform.worldPosition = new Vec3(
      pos.x,
      this.baseY + (pos.z - this.offset) * this.layerMultiplier,
      pos.z,
    );
  }
}
