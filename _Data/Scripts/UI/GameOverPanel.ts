import {
  component,
  property,
  subscribe,
  UiEvent,
  UiViewModel,
  uiViewModel,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BasePanel } from './BasePanel';
import { SoundManager } from '../Manager/SoundManager';

const onTapEvent = new UiEvent('onTapEvent');
const onTapUpgradeEvent = new UiEvent('onTapUpgradeEvent');
const onTapRankingEvent = new UiEvent('onTapRankingEvent');

@uiViewModel()
class GameOverPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
    onTapUpgradeEvent,
    onTapRankingEvent,
  };
}

@component()
export class GameOverPanel extends BasePanel<GameOverPanelViewModel> {

  public onTap = new Signal();
  public onTapUpgrade = new Signal();
  public onTapRanking = new Signal();


  public override onPanelStart(): void {
    this.customUI!.isVisible = false;
  }
  protected createViewModel(): GameOverPanelViewModel {
    return new GameOverPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();

    SoundManager.Instance?.playUiClickSound();
  }

  @subscribe(onTapUpgradeEvent)
  onTapRetryHandler() {
    console.log('Tap Upgrade');
    this.onTapUpgrade.trigger();

    SoundManager.Instance?.playUiClickSound();
  }

  @subscribe(onTapRankingEvent)
  onTapRankingHandler() {
    console.log('Tap Ranking');
    this.onTapRanking.trigger();

    SoundManager.Instance?.playUiClickSound();
  }
}
