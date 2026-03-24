import { component, Component, type Maybe, type Entity, OnEntityStartEvent, property, subscribe, FocusedInteractionService } from 'meta/worlds';
import { CameraManager } from './CameraManager';
import { GameState, GameStateManager } from './GameStateManager';
import { PlayerCombat } from '../Combat/PlayerCombat';
import { delay } from '../Utils/AsyncUtils';

@component()
export class Game extends Component {

  @property() private playerEntity: Maybe<Entity> = null;
  @property() private cameraManagerEntity: Maybe<Entity> = null;

  private playerCombat: Maybe<PlayerCombat> = null;

  @subscribe(OnEntityStartEvent)
  async onStart() {
    if (!this.playerEntity || !this.cameraManagerEntity) return;
    const cameraManager = this.cameraManagerEntity.getComponent(CameraManager);
    if (!cameraManager) return;
    cameraManager.setupCamera(this.playerEntity);

    // Setup player combat
    this.playerCombat = this.playerEntity.getComponent(PlayerCombat);
    if (this.playerCombat) {
      this.playerCombat.setup();
      this.playerCombat.onDied.on(this.onPlayerDied, this);
    }

    await delay(1000);
    this.startGame();
  }

  public async setup() {
    GameStateManager.get().setState(GameState.MENU);
  }

  public startGame(): void {
    GameStateManager.get().setState(GameState.GAME);
    if (this.playerCombat) {
      this.playerCombat.setActive(true);
    }
  }

  public waveComplete(): void {
    GameStateManager.get().setState(GameState.WAVE_TRANSITION);
  }

  private onPlayerDied(): void {
    GameStateManager.get().setState(GameState.GAME_OVER);
  }
}
