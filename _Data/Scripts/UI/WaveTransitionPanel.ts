import {
  component,
  property,
  SoundComponent,
  subscribe,
  UiEvent,
  UiViewModel,
  uiViewModel,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BasePanel } from './BasePanel';

const onTapEvent = new UiEvent('onTapEvent');

@uiViewModel()
class WaveTransitionPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class WaveTransitionPanel extends BasePanel<WaveTransitionPanelViewModel> {
  public onTap = new Signal();

  protected createViewModel(): WaveTransitionPanelViewModel {
    return new WaveTransitionPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }
}
