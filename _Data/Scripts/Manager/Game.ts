import { component, Component, type Maybe, type Entity, OnEntityStartEvent, property, subscribe, FocusedInteractionService } from 'meta/worlds';
import { CameraManager } from './CameraManager';

@component()
export class Game extends Component {

  @property() private playerEntity: Maybe<Entity> = null;
  @property() private cameraManagerEntity: Maybe<Entity> = null;

  @subscribe(OnEntityStartEvent)
  onStart() {
    if (!this.playerEntity || !this.cameraManagerEntity) return;
    const cameraManager = this.cameraManagerEntity.getComponent(CameraManager);
    if (!cameraManager) return;
    cameraManager.setupCamera(this.playerEntity);
    this.setup();
  }


  public async setup() {
    this.focusedInteractionMode();
  }

  private focusedInteractionMode(): void {
    FocusedInteractionService.get().enableFocusedInteraction(
      {
        disableFocusExitButton: true,
        disableEmotesButton: true,
      }
    );
  }
}
