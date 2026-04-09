import {
  component,
  Component,
  type Maybe,
  type Entity,
  OnEntityStartEvent,
  OnWorldUpdateEvent,
  type OnWorldUpdateEventPayload,
  property,
  subscribe,
  SoundComponent,
} from 'meta/worlds';
import { CameraManager } from './CameraManager';
import { GameState, GameStateManager } from './GameStateManager';
import { WaveManager } from './WaveManager';
import { Player } from '../Combat/Player';
import { PlayerWeapons } from '../Combat/PlayerWeapons';
import { DataEnemies } from '../../DataConfig/DataEnemies';
import { WAVE_DATA } from '../../DataConfig/WaveData';
import { GamePanel } from '../UI/GamePanel';
import { WaveTransitionPanel } from '../UI/WaveTransitionPanel';
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
import { UpgradeItem } from '../UpgradeItem/UpgradeItemDataConfig';

const START_DELAY_MS = 500;
const POST_SOUND_INIT_DELAY_MS = 100;

@component()
export class Game extends Component {
  @property() private playerEntity: Maybe<Entity> = null;
  @property() private waveManagerEntity: Maybe<Entity> = null;
  @property() private cameraManagerEntity: Maybe<Entity> = null;
  @property() private dataEnemiesEntity: Maybe<Entity> = null;
  @property() private uiManagerEntity: Maybe<Entity> = null;
  @property() private upgradeManagerEntity: Maybe<Entity> = null;
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
  private menuPanel: Maybe<MenuPanel> = null;
  private gameOverPanel: Maybe<GameOverPanel> = null;
  private waveTransitionPanel: Maybe<WaveTransitionPanel> = null;
  private upgradePlayerStats: Maybe<UpgradePlayerStats> = null;

  private readonly currencyPerWave = 100;
  private currencyManager = new CurrencyManager();
  private _isUpgradeOverlay = false;

  @property() private soundWinEntity: Maybe<Entity> = null;
  @property() private soundLoseEntity: Maybe<Entity> = null;
  private soundWinComponent: Maybe<SoundComponent> = null;
  private soundLoseComponent: Maybe<SoundComponent> = null;

  @subscribe(OnEntityStartEvent)
  async onStart(): Promise<void> {
    
    await delay(START_DELAY_MS);
    GameStateManager.get().setState(GameState.LOADING);
    if (!this.playerEntity || !this.cameraManagerEntity) return;

    const cameraManager = this.cameraManagerEntity.getComponent(CameraManager);
    if (!cameraManager) return;
    cameraManager.setupCamera(this.playerEntity);

    this.unwireCoreEvents();
    this.unwireUiPanelSignals();

    this.setupPlayer();
    this.setupWeapons();
    await this.setupWaveManager();
    this.setupInputManager();
    this.setupUiManager();
    this.setupUpgradeManager();
    this.setupPlayerUI();
    this.setupXpUi();
    this.setupCurrencyPanel();
    this.setupUpgradePlayerStats();
    this.setupMenuPanel();
    this.setupGameOverPanel();
    this.setupWaveTransitionPanel();
    this.setupSounds();
    await delay(POST_SOUND_INIT_DELAY_MS);

    // this.uiManager?.showMenuPanel();
   
  }

  onDestroy(): void {
    this.unwireCoreEvents();
    this.unwireUiPanelSignals();
  }

  private setupPlayer(): void {
    this.player = this.playerEntity!.getComponent(Player);
    if (!this.player) return;
    this.player.setup();
    this.player.onDied.on(this.onPlayerDied, this);
  }

  private setupWeapons(): void {
    this.playerWeapons = this.playerEntity!.getComponent(PlayerWeapons) ?? null;
    if (!this.playerWeapons || !this.playerEntity) return;
    this.playerWeapons.setup(this.playerEntity);
    if (this.targetEntity) this.playerWeapons.setTarget(this.targetEntity);
  }

  private async setupWaveManager(): Promise<void> {
    if (!this.waveManagerEntity || !this.playerEntity) return;
    this.waveManager = this.waveManagerEntity.getComponent(WaveManager) ?? null;
    if (!this.waveManager) return;

    this.waveManager.setPlayer(this.playerEntity);
    this.waveManager.setWaveConfigs(WAVE_DATA);

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

  private setupInputManager(): void {
    if (!this.inputManagerEntity || !this.targetEntity) return;
    this.inputManager = this.inputManagerEntity.getComponent(InputManager) ?? null;
    this.inputManager?.setup(this.targetEntity);
  }

  private setupUiManager(): void {
    if (!this.uiManagerEntity) return;
    this.uiManager = this.uiManagerEntity.getComponent(UIManager) ?? null;
    this.uiManager?.onStart();
  }

  private setupPlayerUI(): void {
    if (!this.uiManager || !this.player) return;
    this.playerUI = this.uiManager.getPlayerUI();
    if (this.playerUI) this.player.onDamaged.on(this.onPlayerDamaged, this);
  }

  private setupUpgradeManager(): void {
    if (!this.upgradeManagerEntity) return;
    this.upgradeManager = this.upgradeManagerEntity.getComponent(UpgradeManager) ?? null;
    this.upgradeManager?.onNextWave.on(this.onNextWave, this);

    const playerStats = this.upgradeManager?.getPlayerStats();
    if (playerStats && this.playerWeapons) {
      playerStats.unregisterDependent(this.playerWeapons);
      playerStats.registerDependent(this.playerWeapons);
    }
  }

  private setupXpUi(): void {
    if (!this.uiManager || !this.upgradeManager) return;
    this.playerXPUI = this.uiManager.getPlayerXPUI();
    if (!this.playerXPUI) return;

    const playerLevel = this.upgradeManager.getPlayerLevel();
    this.playerXPUI.setXP(
      playerLevel.getCurrentXp(),
      playerLevel.getXpToNextLevel(),
      playerLevel.getLevel(),
    );
    playerLevel.onXpChanged.on(this.updateXPUI, this);
    playerLevel.onLevelUp.on(this.onPlayerLevelChanged, this);
  }

  private setupCurrencyPanel(): void {
    if (!this.uiManager) return;
    const gamePanel = this.uiManager.getPanel(GamePanel);
    gamePanel?.setupCurrency(this.currencyManager);
    
  }

  private setupUpgradePlayerStats(): void {
    if (!this.uiManager || !this.upgradeManager) return;
    this.upgradePlayerStats = this.uiManager.getUpgradePlayerStats();
    if (!this.upgradePlayerStats) return;
    this.upgradePlayerStats.setup(this.upgradeManager.getPlayerStats(), this.currencyManager);
    this.upgradePlayerStats.onUpgrade.on(this.onPermanentUpgrade, this);
    this.upgradePlayerStats.onHide.on(this.onUpgradeHide, this);
  }

  private setupMenuPanel(): void {
    this.menuPanel = this.uiManager?.getPanel(MenuPanel) ?? null;
    this.menuPanel?.onTap.on(this.startGame, this);
  }

  private setupGameOverPanel(): void {
    this.gameOverPanel = this.uiManager?.getPanel(GameOverPanel) ?? null;
    this.gameOverPanel?.onTap.on(this.onRetry, this);
    this.gameOverPanel?.onTapUpgrade.on(this.showUpgradePanel, this);
  }

  private setupWaveTransitionPanel(): void {
    this.waveTransitionPanel = this.uiManager?.getPanel(WaveTransitionPanel) ?? null;

    this.waveTransitionPanel?.onTapOption1.on(this.onWaveTransitionOptionSelected, this);
    this.waveTransitionPanel?.onTapOption2.on(this.onWaveTransitionOptionSelected, this);
    this.waveTransitionPanel?.onTapOption3.on(this.onWaveTransitionOptionSelected, this);
  }

  private setupSounds(): void {
    this.soundWinComponent = this.soundWinEntity?.getComponent(SoundComponent) ?? null;
    this.soundLoseComponent = this.soundLoseEntity?.getComponent(SoundComponent) ?? null;
  }

  private unwireCoreEvents(): void {
    this.player?.onDied.off(this.onPlayerDied);
    this.player?.onDamaged.off(this.onPlayerDamaged);
    this.waveManager?.onWaveComplete.off(this.onWaveComplete);
    this.waveManager?.onAllWavesComplete.off(this.onAllWavesComplete);
    this.waveManager?.onStartWave.off(this.onStartWave);
    this.upgradeManager?.onNextWave.off(this.onNextWave);
    const playerLevel = this.upgradeManager?.getPlayerLevel();
    playerLevel?.onXpChanged.off(this.updateXPUI);
    playerLevel?.onLevelUp.off(this.onPlayerLevelChanged);
  }

  private unwireUiPanelSignals(): void {
    this.upgradePlayerStats?.onUpgrade.off(this.onPermanentUpgrade);
    this.upgradePlayerStats?.onHide.off(this.onUpgradeHide);
    this.menuPanel?.onTap.off(this.startGame);
    this.gameOverPanel?.onTap.off(this.onRetry);
    this.gameOverPanel?.onTapUpgrade.off(this.showUpgradePanel);

    this.waveTransitionPanel?.onTapOption1.off(this.onWaveTransitionOptionSelected);
    this.waveTransitionPanel?.onTapOption2.off(this.onWaveTransitionOptionSelected);
    this.waveTransitionPanel?.onTapOption3.off(this.onWaveTransitionOptionSelected);
  }

  private onWaveTransitionOptionSelected(upgradeItem?: UpgradeItem): void {
    this.applyUpgradeItem(upgradeItem);
  }

  private applyUpgradeItem(upgradeItem?: UpgradeItem): void {
    if (!upgradeItem) return;
    const playerStats = this.upgradeManager?.getPlayerStats();
    if (!playerStats) return;

    const stat = upgradeItem.getStat() as Stat;
    const value = upgradeItem.getValue();
    const percentValue = upgradeItem.getPercentValue();

    if (value !== 0) playerStats.addStat(stat, value);
    if (percentValue !== 0) playerStats.addStatPercent(stat, percentValue);
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
    // this.uiManager?.hideMenuPanel();
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
    this.playerWeapons?.gamestick(dt);
    this.waveManager?.gameTick(dt);
    this.playerUI?.onUpdate(dt);
  }

  private onWaveComplete(_waveIndex?: number): void {
    this.currencyManager.add(this.currencyPerWave);
    GameStateManager.get().setState(GameState.WAVE_TRANSITION);
    this.soundWinComponent?.play();
  }

  private updateXPUI(): void {
    if (!this.playerXPUI || !this.upgradeManager) return;
    const playerLevel = this.upgradeManager.getPlayerLevel();
    this.playerXPUI.setXP(
      playerLevel.getCurrentXp(),
      playerLevel.getXpToNextLevel(),
      playerLevel.getLevel(),
    );
  }

  private onAllWavesComplete(): void {
    console.log('[Game] All waves complete');
    GameStateManager.get().setState(GameState.STAGE_COMPLETE);
  }

  private onStartWave(waveIndex?: number): void {
    if (!this.uiManager || !this.waveManager) return;
    const gamePanel = this.uiManager.getPanel(GamePanel);
    gamePanel?.updateWaveString(waveIndex ?? 0, this.waveManager.getTotalWaves());
  }

  private onNextWave(): void {
    GameStateManager.get().setState(GameState.GAME);
    this.waveManager?.startWave();
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
    this.waveManager?.stopWave();
    this.upgradeManager?.getPlayerStats().resetAddends();
    this.upgradeManager?.getPlayerLevel().reset();
    this.updateXPUI();

    await this.startGame();
  }

  private onPlayerDied(): void {
    this.waveManager?.stopWave();
    GameStateManager.get().setState(GameState.GAME_OVER);
    this.soundLoseComponent?.play();
  }
}
