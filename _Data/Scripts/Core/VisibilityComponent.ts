import {
  component,
  Component,
  MeshComponent,
  property,
  type Entity,
} from 'meta/worlds';

@component()
export class VisibilityComponent extends Component {

  @property() private readonly meshEntities: readonly Entity[] = [];

  private meshComps: MeshComponent[] = [];

  public setup(): void {
    this.meshComps = [];
    for (const entity of this.meshEntities) {
      const mesh = entity.getComponent(MeshComponent);
      if (mesh) {
        this.meshComps.push(mesh);
      }
    }
  }

  public show(): void {
    for (const mesh of this.meshComps) {
      mesh.isVisibleSelf = true;
    }
  }

  public hide(): void {
    for (const mesh of this.meshComps) {
      mesh.isVisibleSelf = false;
    }
  }

  public isVisible(): boolean {
    return this.meshComps.length > 0 && this.meshComps[0].isVisibleSelf;
  }

  public toggle(): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }
}
