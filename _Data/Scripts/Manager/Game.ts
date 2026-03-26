import { component, Component, type Maybe, type Entity, OnEntityStartEvent, OnWorldUpdateEvent, type OnWorldUpdateEventPayload, property, subscribe, FocusedInteractionService } from 'meta/worlds';
import { CameraManager } from './CameraManager';
import { GameState, GameStateManager } from './GameStateManager';
import { Player } from '../Combat/Player';
import { PlayerWeapons } from '../Combat/PlayerWeapons';
import { delay } from '../Utils/AsyncUtils';

@component()
export class Game extends Component {

  @property() private playerEntity: Maybe<Entity> = null;
  @property() private cameraManagerEntity: Maybe<Entity> = null;

  private player: Maybe<Player> = null;
  private playerWeapons: Maybe<PlayerWeapons> = null;

  @subscribe(OnEntityStartEvent)
  async onStart() {

    await delay(500);
    if (!this.playerEntity || !this.cameraManagerEntity) return;
    const cameraManager = this.cameraManagerEntity.getComponent(CameraManager);
    if (!cameraManager) return;
    cameraManager.setupCamera(this.playerEntity);

    // Setup player
    this.player = this.playerEntity.getComponent(Player);
    if (this.player) {
      this.player.setup();
      this.player.onDied.on(this.onPlayerDied, this);
    }

    // Setup weapons
    this.playerWeapons = this.playerEntity.getComponent(PlayerWeapons) ?? null;
    if (this.playerWeapons && this.playerEntity) {
      this.playerWeapons.setup(this.playerEntity);
    }

    await delay(1000);
    
    this.startGame();
  }

  public async setup() {
    GameStateManager.get().setState(GameState.MENU);
  }

  public startGame(): void {
    GameStateManager.get().setState(GameState.GAME);
    if (this.player) {
      this.player.setActive(true);
    }
  }

  public waveComplete(): void {
    GameStateManager.get().setState(GameState.WAVE_TRANSITION);
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    if (this.playerWeapons) {
      this.playerWeapons.gamestick(payload.deltaTime);
    }
  }

  private onPlayerDied(): void {
    GameStateManager.get().setState(GameState.GAME_OVER);
  }
}
