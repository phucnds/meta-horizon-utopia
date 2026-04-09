import { component, Component, OnEntityStartEvent, property, subscribe, type Entity, type Maybe } from 'meta/worlds';
import { GameState, GameStateManager } from './GameStateManager';
import { PlayerLevel } from './PlayerLevel';
import { PlayerStatsManager, Stat } from './PlayerStatsManager';
import { Signal } from '../EventSystem/Signal';
import { delay } from '../Utils/AsyncUtils';
import { UIManager } from './UIManager';
import { WaveTransitionPanel } from '../UI/WaveTransitionPanel';

const TRANSITION_DELAY = 3000;

@component()
export class UpgradeManager extends Component {

  public readonly onNextWave = new Signal();

  @property() private waveTransitionPanelEntity: Maybe<Entity> = null;

  private playerLevel = new PlayerLevel();
  private playerStats = new PlayerStatsManager();
  private pendingLevelUps: number = 0;
  private uiManager: Maybe<UIManager> = null;
  private waveTransitionPanel: Maybe<WaveTransitionPanel> = null;

  @subscribe(OnEntityStartEvent)
  onStart() {
    this.waveTransitionPanel = this.waveTransitionPanelEntity?.getComponent(WaveTransitionPanel) ?? null;
    GameStateManager.get().onStateChanged.on(this.onGameStateChanged, this);
    this.playerLevel.onLevelUp.on(this.onLevelUp, this);
  }

  onDestroy(): void {
    GameStateManager.get().onStateChanged.off(this.onGameStateChanged);
    this.playerLevel.onLevelUp.off(this.onLevelUp);
  }

  public getPlayerLevel(): PlayerLevel {
    return this.playerLevel;
  }

  public getPlayerStats(): PlayerStatsManager {
    return this.playerStats;
  }

  public getPendingLevelUps(): number {
    return this.pendingLevelUps;
  }

  public applyUpgrade(stat: Stat, value: number): void {
    this.playerStats.addStatPercent(stat, value);
  }

  private onGameStateChanged(state?: GameState): void {
    switch (state) {
      case GameState.WAVE_TRANSITION:
        this.onWaveTransition();
        break;
    }
  }

  private async onWaveTransition(): Promise<void> {
    this.pendingLevelUps = 0;
    this.playerLevel.addWaveXp();

    await delay(TRANSITION_DELAY);

    

    if (this.pendingLevelUps > 0) {
      this.waveTransitionPanel?.showCase();
      // GameStateManager.get().setState(GameState.UPGRADE_SELECTION);
    } else {
      this.onNextWave.trigger();
    }
  }

  private onLevelUp(): void {
    this.pendingLevelUps++;
  }
}
