import {
  component,
  Component,
  MeshComponent,
  property,
  type Entity,
} from 'meta/worlds';
import { delay } from '../Utils/AsyncUtils';

@component()
export class VisibilityComponent extends Component {

  @property() private readonly meshEntities: readonly Entity[] = [];

  private meshComps: MeshComponent[] = [];

  public async setup(): Promise<void> {
    await delay(100);
    this.meshComps = [];
    for (const entity of this.meshEntities) {
      const mesh = entity.getComponent(MeshComponent);
      if (mesh) {
        this.meshComps.push(mesh);
        mesh.isVisibleSelf = false;
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
