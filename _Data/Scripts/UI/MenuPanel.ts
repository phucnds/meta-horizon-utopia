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
const onTapEvent2 = new UiEvent('onTapEvent2');

@uiViewModel()
class MenuPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
    onTapEvent2,
  };
}

@component()
export class MenuPanel extends BasePanel<MenuPanelViewModel> {

  public onTap = new Signal();
  public onTap2 = new Signal();
  
  protected createViewModel(): MenuPanelViewModel {
    return new MenuPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }

  @subscribe(onTapEvent2)
  onTapHandler2() {
    console.log('Tap 2');
    this.onTap2.trigger();
  }
}
