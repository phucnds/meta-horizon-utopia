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

const onTapEvent = new UiEvent('onTapEvent');

@uiViewModel()
class GameOverPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class GameOverPanel extends BasePanel<GameOverPanelViewModel> {

  public onTap = new Signal();

  protected createViewModel(): GameOverPanelViewModel {
    return new GameOverPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }
}
