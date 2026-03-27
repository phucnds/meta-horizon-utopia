import { component, Component, OnEntityStartEvent, subscribe } from 'meta/worlds';
import { GameState, GameStateManager } from './GameStateManager';
import { PlayerLevel } from './PlayerLevel';
import { PlayerStatsManager, Stat } from './PlayerStatsManager';
import { Signal } from '../EventSystem/Signal';
import { delay } from '../Utils/AsyncUtils';

const TRANSITION_DELAY = 3000;

@component()
export class UpgradeManager extends Component {

  public readonly onNextWave = new Signal();

  private playerLevel = new PlayerLevel();
  private playerStats = new PlayerStatsManager();
  private pendingLevelUps: number = 0;

  @subscribe(OnEntityStartEvent)
  onStart() {
    GameStateManager.get().onStateChanged.on(this.onGameStateChanged, this);
    this.playerLevel.onLevelUp.on(this.onLevelUp, this);
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
    this.playerStats.addStat(stat, value);
  }

  private onGameStateChanged(state?: GameState): void {
    switch (state) {
      case GameState.WAVE_TRANSITION:
        this.onWaveTransition();
        break;
    }
  }

  private async onWaveTransition(): Promise<void> {
    const prevLevel = this.playerLevel.getLevel();
    this.pendingLevelUps = 0;
    this.playerLevel.addWaveXp();

    console.log(`[UpgradeManager] Wave complete - XP: ${this.playerLevel.getCurrentXp()}/${this.playerLevel.getXpToNextLevel()} | Level: ${this.playerLevel.getLevel()}`);

    await delay(TRANSITION_DELAY);

    if (this.pendingLevelUps > 0) {
      console.log(`[UpgradeManager] Level up! ${prevLevel} -> ${this.playerLevel.getLevel()} (${this.pendingLevelUps} level ups)`);
      GameStateManager.get().setState(GameState.UPGRADE_SELECTION);
    } else {
      this.onNextWave.trigger();
    }
  }

  private onLevelUp(): void {
    this.pendingLevelUps++;
  }
}
