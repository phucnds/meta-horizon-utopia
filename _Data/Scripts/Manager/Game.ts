import { component, Component, type Maybe, type Entity, OnEntityStartEvent, OnWorldUpdateEvent, type OnWorldUpdateEventPayload, property, subscribe, FocusedInteractionService } from 'meta/worlds';
import { CameraManager } from './CameraManager';
import { GameState, GameStateManager } from './GameStateManager';
import { WaveManager } from './WaveManager';
import { Player } from '../Combat/Player';
import { PlayerWeapons } from '../Combat/PlayerWeapons';
import { DataEnemies } from '../../DataConfig/DataEnemies';
import { WAVE_DATA } from '../../DataConfig/WaveData';
import { delay } from '../Utils/AsyncUtils';

@component()
export class Game extends Component {

  @property() private playerEntity: Maybe<Entity> = null;
  @property() private waveManagerEntity: Maybe<Entity> = null;
  @property() private cameraManagerEntity: Maybe<Entity> = null;
  @property() private dataEnemiesEntity: Maybe<Entity> = null;

  private player: Maybe<Player> = null;
  private playerWeapons: Maybe<PlayerWeapons> = null;
  private waveManager: Maybe<WaveManager> = null;

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

    // Setup wave manager
    if (this.waveManagerEntity) {
      this.waveManager = this.waveManagerEntity.getComponent(WaveManager) ?? null;
      if (this.waveManager && this.playerEntity) {
        this.waveManager.setPlayer(this.playerEntity);
        this.waveManager.setWaveConfigs(WAVE_DATA);

        // Register enemy templates from DataEnemies
        if (this.dataEnemiesEntity) {
          const dataEnemies = this.dataEnemiesEntity.getComponent(DataEnemies);
          if (dataEnemies) {
            dataEnemies.setup();
            for (const [type, template] of dataEnemies.getEnemyMap()) {
              this.waveManager.registerEnemyTemplate(type, template);
            }
          }
        }

        this.waveManager.onWaveComplete.on(this.onWaveComplete, this);
        this.waveManager.onAllWavesComplete.on(this.onAllWavesComplete, this);
      }
    }

    await delay(1000);

    await this.playerWeapons?.activeWeapons();
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
    this.waveManager?.startWave(0);
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    const dt = payload.deltaTime;

    if (this.playerWeapons) {
      this.playerWeapons.gamestick(dt);
    }

    if (this.waveManager) {
      this.waveManager.gameTick(dt);
    }
  }

  private onWaveComplete(waveIndex?: number): void {
    console.log(`[Game] Wave ${(waveIndex ?? 0) + 1} complete`);
    GameStateManager.get().setState(GameState.WAVE_TRANSITION);
  }

  private onAllWavesComplete(): void {
    console.log('[Game] All waves complete');
    GameStateManager.get().setState(GameState.STAGE_COMPLETE);
  }

  private onPlayerDied(): void {
    this.waveManager?.stopWave();
    GameStateManager.get().setState(GameState.GAME_OVER);
  }
}
