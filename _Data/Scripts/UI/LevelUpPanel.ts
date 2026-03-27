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
const onTapEvent1 = new UiEvent('onTapEvent1');
const onTapEvent2 = new UiEvent('onTapEvent2');
const onTapEvent3 = new UiEvent('onTapEvent3');

@uiViewModel()
class LevelUpPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
    onTapEvent1,
    onTapEvent2,
    onTapEvent3,
  };
}

@component()
export class LevelUpPanel extends BasePanel<LevelUpPanelViewModel> {

  public onTap = new Signal();
  public onTap1 = new Signal();
  public onTap2 = new Signal();
  public onTap3 = new Signal();

  protected createViewModel(): LevelUpPanelViewModel {
    return new LevelUpPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('[LevelUpPanel] Tap - next wave');
    this.onTap.trigger();
  }

  @subscribe(onTapEvent1)
  onTap1Handler() {
    console.log('[LevelUpPanel] Tap - upgrade 1');
    this.onTap1.trigger();
  }

  @subscribe(onTapEvent2)
  onTap2Handler() {
    console.log('[LevelUpPanel] Tap - upgrade 2');
    this.onTap2.trigger();
  }

  @subscribe(onTapEvent3)
  onTap3Handler() {
    console.log('[LevelUpPanel] Tap - upgrade 3');
    this.onTap3.trigger();
  }
}
