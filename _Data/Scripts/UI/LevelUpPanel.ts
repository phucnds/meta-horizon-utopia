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
class LevelUpPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class LevelUpPanel extends BasePanel<LevelUpPanelViewModel> {

  public onTap = new Signal();

  protected createViewModel(): LevelUpPanelViewModel {
    return new LevelUpPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('[LevelUpPanel] Tap - next wave');
    this.onTap.trigger();
  }
}
