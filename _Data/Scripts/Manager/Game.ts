import { component, Component, type Maybe, type Entity, OnEntityStartEvent, OnWorldUpdateEvent, type OnWorldUpdateEventPayload, property, subscribe, FocusedInteractionService, CustomUiComponent, SoundComponent } from 'meta/worlds';
import { CameraManager } from './CameraManager';
import { GameState, GameStateManager } from './GameStateManager';
import { WaveManager } from './WaveManager';
import { Player } from '../Combat/Player';
import { PlayerWeapons } from '../Combat/PlayerWeapons';
import { DataEnemies } from '../../DataConfig/DataEnemies';
import { WAVE_DATA } from '../../DataConfig/WaveData';
import { GamePanel } from '../UI/GamePanel';
import { LevelUpPanel } from '../UI/LevelUpPanel';
import { MenuPanel } from '../UI/MenuPanel';
import { GameOverPanel } from '../UI/GameOverPanel';
import { UIManager } from './UIManager';
import { delay } from '../Utils/AsyncUtils';
import { UpgradeManager } from './UpgradeManager';
import { Stat } from './PlayerStatsManager';
import { PlayerUI } from '../UI/PlayerUI';
import { PlayerXPUI } from '../UI/PlayerXPUI';
import { UpgradePlayerStats } from '../UI/UpgradePlayerStats';
import { CurrencyManager } from './CurrencyManager';
import { InputManager } from './InputManager';

@component()
export class Game extends Component {

  @property() private playerEntity: Maybe<Entity> = null;
  @property() private waveManagerEntity: Maybe<Entity> = null;
  @property() private cameraManagerEntity: Maybe<Entity> = null;
  @property() private dataEnemiesEntity: Maybe<Entity> = null;
  @property() private uiManagerEntity: Maybe<Entity> = null;
  @property() private upgradeManagerEntity: Maybe<Entity> = null;
  @property() private loadingPanelEntity: Maybe<Entity> = null;
  @property() private inputManagerEntity: Maybe<Entity> = null;
  @property() private targetEntity: Maybe<Entity> = null;


  private player: Maybe<Player> = null;
  private playerWeapons: Maybe<PlayerWeapons> = null;
  private waveManager: Maybe<WaveManager> = null;
  private uiManager: Maybe<UIManager> = null;
  private upgradeManager: Maybe<UpgradeManager> = null;
  private playerUI: Maybe<PlayerUI> = null;
  private playerXPUI: Maybe<PlayerXPUI> = null;
  private inputManager: Maybe<InputManager> = null;

  private currencyPerWave: number = 100;
  private currencyManager = new CurrencyManager();
  private _isUpgradeOverlay = false;

  @property() private soundWinEntity: Maybe<Entity> = null;
  @property() private soundLoseEntity: Maybe<Entity> = null;
  private soundWinComponent: Maybe<SoundComponent> = null;
  private soundLoseComponent: Maybe<SoundComponent> = null;

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
      if (this.targetEntity) {
        this.playerWeapons.setTarget(this.targetEntity);
      }
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
              await this.waveManager.registerEnemyTemplate(type, template);
            }
          }
        }

        this.waveManager.onWaveComplete.on(this.onWaveComplete, this);
        this.waveManager.onAllWavesComplete.on(this.onAllWavesComplete, this);
        this.waveManager.onStartWave.on(this.onStartWave, this);
      }
    }

    // Setup input manager
    if (this.inputManagerEntity) {
      this.inputManager = this.inputManagerEntity.getComponent(InputManager) ?? null;
      if (this.inputManager && this.targetEntity) {
        this.inputManager.setup(this.targetEntity);
      }
    }

    // Setup UI manager
    if (this.uiManagerEntity) {
      this.uiManager = this.uiManagerEntity.getComponent(UIManager) ?? null;
    }

    // Setup PlayerUI via UIManager
    if (this.uiManager) {
      this.playerUI = this.uiManager.getPlayerUI();
      if (this.playerUI && this.player) {
        this.player.onDamaged.on(this.onPlayerDamaged, this);
      }
    }

    // Setup upgrade manager
    if (this.upgradeManagerEntity) {
      this.upgradeManager = this.upgradeManagerEntity.getComponent(UpgradeManager) ?? null;
      this.upgradeManager?.onNextWave.on(this.onNextWave, this);

      const playerStats = this.upgradeManager?.getPlayerStats();
      if (playerStats && this.playerWeapons) {
        playerStats.registerDependent(this.playerWeapons);
      }
    }

    // Setup PlayerXPUI via UIManager
    if (this.uiManager && this.upgradeManager) {
      this.playerXPUI = this.uiManager.getPlayerXPUI();
      if (this.playerXPUI) {
        const playerLevel = this.upgradeManager.getPlayerLevel();
        this.playerXPUI.setXP(playerLevel.getCurrentXp(), playerLevel.getXpToNextLevel(), playerLevel.getLevel());
        playerLevel.onXpChanged.on(this.updateXPUI, this);
        playerLevel.onLevelUp.on(this.onPlayerLevelChanged, this);
      }
    }

    // Setup PlayerCurrencyPanel via UIManager
    if (this.uiManager) {
      const currencyPanel = this.uiManager.getPlayerCurrencyPanel();
      if (currencyPanel) {
        currencyPanel.setup(this.currencyManager);
      }
    }

    // Setup UpgradePlayerStats via UIManager
    if (this.uiManager && this.upgradeManager) {
      const upgradePlayerStats = this.uiManager.getUpgradePlayerStats();
      if (upgradePlayerStats) {
        upgradePlayerStats.setup(this.upgradeManager.getPlayerStats(), this.currencyManager);
        upgradePlayerStats.onUpgrade.on(this.onPermanentUpgrade, this);
        upgradePlayerStats.onHide.on(this.onUpgradeHide, this);
      }
    }

    // Setup menu panel — start game on tap
    if (this.uiManager) {
      const menuPanel = this.uiManager.getPanel(MenuPanel);
      menuPanel?.onTap.on(this.startGame, this);
    }

    // Setup game over panel — retry on tap
    if (this.uiManager) {
      const gameOverPanel = this.uiManager.getPanel(GameOverPanel);
      gameOverPanel?.onTap.on(this.onRetry, this);
      gameOverPanel?.onTapUpgrade.on(this.showUpgradePanel, this);
    }

    // Setup level up panel
    if (this.uiManager) {
      const levelUpPanel = this.uiManager.getPanel(LevelUpPanel);
      levelUpPanel?.onTap.on(this.onNextWave, this);

      levelUpPanel?.onTapRate1.on(() => this.onUpgradeSelected(Stat.AttackSpeed, 5), this);
      levelUpPanel?.onTapRate2.on(() => this.onUpgradeSelected(Stat.AttackSpeed, 10), this);
      levelUpPanel?.onTapRate3.on(() => this.onUpgradeSelected(Stat.AttackSpeed, 20), this);

      levelUpPanel?.onTapDamage1.on(() => this.onUpgradeSelected(Stat.Attack, 5), this);
      levelUpPanel?.onTapDamage2.on(() => this.onUpgradeSelected(Stat.Attack, 10), this);
      levelUpPanel?.onTapDamage3.on(() => this.onUpgradeSelected(Stat.Attack, 20), this);

      levelUpPanel?.onTapHealth1.on(() => this.onUpgradeSelected(Stat.MaxHealth, 5), this);
      levelUpPanel?.onTapHealth2.on(() => this.onUpgradeSelected(Stat.MaxHealth, 10), this);
      levelUpPanel?.onTapHealth3.on(() => this.onUpgradeSelected(Stat.MaxHealth, 20), this);
    }


    this.soundWinComponent = this.soundWinEntity?.getComponent(SoundComponent) ?? null;
    this.soundLoseComponent = this.soundLoseEntity?.getComponent(SoundComponent) ?? null;
    await delay(100);

    // Start at MENU state, wait for player action
    this.uiManager?.showMenuPanel();
    this.loadingPanelEntity!.getComponent(CustomUiComponent)!.isVisible = false;
  }

  private showUpgradePanel(): void {
    if (this._isUpgradeOverlay) return;
    this._isUpgradeOverlay = true;
    this.uiManager?.hideGameOverPanel();
    this.uiManager?.showUpgradePanel();
  }

  private onUpgradeHide(): void {
    if (!this._isUpgradeOverlay) return;
    this._isUpgradeOverlay = false;
    this.uiManager?.hideUpgradePanel();
    this.uiManager?.showGameOverPanel();
  }

  public async startGame(): Promise<void> {
    this.uiManager?.hideMenuPanel();
    GameStateManager.get().setState(GameState.GAME);

    if (this.player) {
      this.player.setActive(true);
      if (this.playerUI) {
        const health = this.player.getHealth();
        this.playerUI.setRemainingHealth(health.getHp(), health.getHp() / health.getMax());
      }
    }

    await this.playerWeapons?.activeWeapons();
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

    if (this.playerUI) {
      this.playerUI.onUpdate(dt);
    }
  }

  private onWaveComplete(waveIndex?: number): void {
    console.log(`[Game] Wave ${(waveIndex ?? 0) + 1} complete`);
    this.currencyManager.add(this.currencyPerWave);
    GameStateManager.get().setState(GameState.WAVE_TRANSITION);
    this.soundWinComponent?.play();
  }

  private updateXPUI(): void {
    if (!this.playerXPUI || !this.upgradeManager) return;
    const playerLevel = this.upgradeManager.getPlayerLevel();
    this.playerXPUI.setXP(playerLevel.getCurrentXp(), playerLevel.getXpToNextLevel(), playerLevel.getLevel());
  }

  private onAllWavesComplete(): void {
    console.log('[Game] All waves complete');
    GameStateManager.get().setState(GameState.STAGE_COMPLETE);
  }

  private onStartWave(waveIndex?: number): void {
    if (this.uiManager && this.waveManager) {
      const gamePanel = this.uiManager.getPanel(GamePanel);
      gamePanel?.updateWaveString(waveIndex ?? 0, this.waveManager.getTotalWaves());
    }
  }

  private onNextWave(): void {
    GameStateManager.get().setState(GameState.GAME);
    this.waveManager?.startWave();
  }

  private onUpgradeSelected(stat: Stat, value: number): void {
    this.upgradeManager?.applyUpgrade(stat, value);
    this.onNextWave();
  }

  private onPlayerLevelChanged(): void {
    this.updateXPUI();
  }

  private onPermanentUpgrade(data?: { stat: Stat; cost: number }): void {
    if (!data) return;
    console.log(`[Game] Permanent upgrade: ${Stat[data.stat]} (cost: ${data.cost})`);
  }

  private onPlayerDamaged(): void {
    if (!this.player || !this.playerUI) return;
    const health = this.player.getHealth();
    this.playerUI.setRemainingHealth(health.getHp(), health.getHp() / health.getMax());
    this.playerUI.show();
  }

  private async onRetry(): Promise<void> {
    console.log('[Game] Retry — resetting game');

    this._isUpgradeOverlay = false;

    this.player?.getHealth().reset();
    this.player?.setActive(false);

    // Reset wave manager
    this.waveManager?.stopWave();

    // Reset temporary stats (keep permanent)
    this.upgradeManager?.getPlayerStats().resetAddends();

    // Reset player level
    this.upgradeManager?.getPlayerLevel().reset();
    this.updateXPUI();

    // Restart game directly
    await this.startGame();
  }

  private onPlayerDied(): void {
    this.waveManager?.stopWave();
    GameStateManager.get().setState(GameState.GAME_OVER);
    this.soundLoseComponent?.play();
  }
}
