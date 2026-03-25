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
import { GameStateManager } from '../Manager/GameStateManager';

const onTapEvent = new UiEvent('onTapEvent');

@uiViewModel()
class GamePanelViewModel extends UiViewModel {

  @property()
  waveString: string = "0";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class GamePanel extends BasePanel<GamePanelViewModel> {

  public onTap = new Signal();

  protected createViewModel(): GamePanelViewModel {
    return new GamePanelViewModel();
  }

  protected override onPanelStart(): void {
    this.viewModel.waveString = "0";

    // console.log("this.viewModel.waveString");
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }
}
