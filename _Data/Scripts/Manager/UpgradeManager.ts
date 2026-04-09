import { component, Component, OnEntityStartEvent, property, subscribe, type Entity, type Maybe } from 'meta/worlds';
import { GameState, GameStateManager } from './GameStateManager';
import { PlayerLevel } from './PlayerLevel';
import { PlayerStatsManager, Stat } from './PlayerStatsManager';
import { Signal } from '../EventSystem/Signal';
import { delay } from '../Utils/AsyncUtils';
import { WaveTransitionPanel } from '../UI/WaveTransitionPanel';
import type { UpgradeItem } from '../UpgradeItem/UpgradeItemDataConfig';

const TRANSITION_DELAY = 1000;

@component()
export class UpgradeManager extends Component {

  public readonly onNextWave = new Signal();

  @property() private waveTransitionPanel1Entity: Maybe<Entity> = null;
  @property() private waveTransitionPanel2Entity: Maybe<Entity> = null;

  private counter: number = 0;

  private playerLevel = new PlayerLevel();
  private playerStats = new PlayerStatsManager();
  private pendingLevelUps: number = 0;
  private waveTransitionPanel1: Maybe<WaveTransitionPanel> = null;
  private waveTransitionPanel2: Maybe<WaveTransitionPanel> = null;

  public onTapOption1 = new Signal<UpgradeItem>();
  public onTapOption2 = new Signal<UpgradeItem>();
  public onTapOption3 = new Signal<UpgradeItem>();

  public setup(): void {

    GameStateManager.get().onStateChanged.on(this.onGameStateChanged, this);
    this.playerLevel.onLevelUp.on(this.onLevelUp, this);

    this.waveTransitionPanel1 = this.waveTransitionPanel1Entity?.getComponent(WaveTransitionPanel) ?? null;
    this.waveTransitionPanel2 = this.waveTransitionPanel2Entity?.getComponent(WaveTransitionPanel) ?? null;

    this.waveTransitionPanel1?.setup();
    this.waveTransitionPanel2?.setup();

    const w1 = this.waveTransitionPanel1;
    if (w1) {
      w1.onTapOption1.on((data) => data && this.triggerData(w1, data, this.onTapOption1), this);
      w1.onTapOption2.on((data) => data && this.triggerData(w1, data, this.onTapOption2), this);
      w1.onTapOption3.on((data) => data && this.triggerData(w1, data, this.onTapOption3), this);
    }
    const w2 = this.waveTransitionPanel2;
    if (w2) {
      w2.onTapOption1.on((data) => data && this.triggerData(w2, data, this.onTapOption1), this);
      w2.onTapOption2.on((data) => data && this.triggerData(w2, data, this.onTapOption2), this);
      w2.onTapOption3.on((data) => data && this.triggerData(w2, data, this.onTapOption3), this);
    }

    this.waveTransitionPanel1?.hide();
    this.waveTransitionPanel2?.hide();
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
    this.showWaveTransitionPanel(this.counter);
    this.pendingLevelUps = 0;
    this.playerLevel.addWaveXp();

    await delay(TRANSITION_DELAY);

    if (this.pendingLevelUps > 0) {
      this.showCaseWaveTransitionPanel(this.counter);
    } else {
      this.waveTransitionPanel1?.hide();
      this.waveTransitionPanel2?.hide();
      this.onNextWave.trigger();
    }
    this.counter++;
  }

  private onLevelUp(): void {
    this.pendingLevelUps++;
  }

  private showWaveTransitionPanel(counter: number): void {
    if (counter % 2 === 0) this.waveTransitionPanel2?.show();
    else this.waveTransitionPanel1?.show();
  }

  private showCaseWaveTransitionPanel(counter: number): void {
    if (counter % 2 === 0) this.waveTransitionPanel2?.showCase();
    else this.waveTransitionPanel1?.showCase();
  }

  private triggerData(panel: WaveTransitionPanel, data: UpgradeItem, signal: Signal<UpgradeItem>): void {
    signal.trigger(data);
    panel.hide();
  }
}
