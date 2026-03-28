import { CustomUiComponent, UiViewModel, uiViewModel } from "meta/worlds";
import {
	Component,
	component,
	type Maybe,
	OnEntityStartEvent,
	property,
	subscribe,
} from "meta/worlds";
import { CurrencyManager } from "../Manager/CurrencyManager";

@uiViewModel()
class PlayerCurrencyViewModel extends UiViewModel {
	@property() public currencyString: string = "0";
}

@component()
export class PlayerCurrencyPanel extends Component {

	private _viewModel: PlayerCurrencyViewModel = new PlayerCurrencyViewModel();
	private _uiComponent: Maybe<CustomUiComponent> = null;
	private _currencyManager: Maybe<CurrencyManager> = null;

	@subscribe(OnEntityStartEvent)
	private onStart(): void {
		this._uiComponent = this.entity.getComponentOrThrow(CustomUiComponent);
		this._uiComponent.dataContext = this._viewModel;
	}

	public setup(currencyManager: CurrencyManager): void {
		this._currencyManager = currencyManager;
		this._currencyManager.onCurrencyChanged.on(this.onCurrencyChanged, this);
		this.updateDisplay(this._currencyManager.get());
		console.log(`[PlayerCurrencyPanel] setup complete, currency: ${this._currencyManager.get()}`);
	}

	public show(): void {
		if (this._uiComponent) {
			this._uiComponent.isVisible = true;
		}
	}

	public hide(): void {
		if (this._uiComponent) {
			this._uiComponent.isVisible = false;
		}
	}

	private onCurrencyChanged(amount?: number): void {
		console.log(`[PlayerCurrencyPanel] currency changed: ${amount}`);
		this.updateDisplay(amount ?? 0);
	}

	private updateDisplay(amount: number): void {
		this._viewModel.currencyString = amount.toString();
	}
}
