import {
  component,
  property,
  subscribe,
  UiEvent,
  UiViewModel,
  uiViewModel,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BasePanel } from './BasePanel';

import { CurrencyManager } from '../Manager/CurrencyManager';

const onTapEvent = new UiEvent('onTapEvent');

@uiViewModel()
class GamePanelViewModel extends UiViewModel {

  @property()
  waveString: string = "1";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };

  @property() public currencyString: string = "0";
}

@component()
export class GamePanel extends BasePanel<GamePanelViewModel> {


  private _currencyManager: Maybe<CurrencyManager> = null;
  
  public onTap = new Signal();

  protected createViewModel(): GamePanelViewModel {
    return new GamePanelViewModel();
  }

  protected override onPanelStart(): void {
    this.viewModel.waveString = "1";
  }

  public updateWaveString(waveIndex: number, totalWaves: number): void {
    this.viewModel.waveString = `${waveIndex + 1}`;
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }

  public setupCurrency(currencyManager: CurrencyManager): void {
		this._currencyManager?.onCurrencyChanged.off(this.onCurrencyChanged);
		this._currencyManager = currencyManager;
		this._currencyManager.onCurrencyChanged.on(this.onCurrencyChanged, this);
		this.updateDisplay(this._currencyManager.get());
		console.log(`[PlayerCurrencyPanel] setup complete, currency: ${this._currencyManager.get()}`);
	}

  private onCurrencyChanged(amount?: number): void {
		console.log(`[PlayerCurrencyPanel] currency changed: ${amount}`);
		this.updateDisplay(amount ?? 0);
	}

	private updateDisplay(amount: number): void {
		this.viewModel.currencyString = amount.toString();
	}
}
