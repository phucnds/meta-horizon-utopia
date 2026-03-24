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
class StageCompletePanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class StageCompletePanel extends BasePanel<StageCompletePanelViewModel> {

  public onTap = new Signal();

  protected createViewModel(): StageCompletePanelViewModel {
    return new StageCompletePanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }
}
