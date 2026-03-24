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
class MenuPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class MenuPanel extends BasePanel<MenuPanelViewModel> {

  public onTap = new Signal();

  protected createViewModel(): MenuPanelViewModel {
    return new MenuPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }
}
