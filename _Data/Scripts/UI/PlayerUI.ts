import { CustomUiComponent, UiViewModel, uiViewModel } from "meta/worlds";
import {
	Color,
	Component,
	component,
	type Maybe,
	OnEntityStartEvent,
	property,
	subscribe,
} from "meta/worlds";

const FULL_PERCENTAGE = 70;
const HURT_PERCENTAGE = 35;

const FULL_PRIMARY_COLOUR = `#35CDFF`;
const FULL_SECONDARY_COLOUR = `#1C89AD`;
const HURT_PRIMARY_COLOUR = `#FBE87E`;
const HURT_SECONDARY_COLOUR = `#FDB93A`;
const LOW_PRIMARY_COLOUR = `#FF3C3C`;
const LOW_SECONDARY_COLOUR = `#C41313`;

@uiViewModel()
class PlayerHealthUIModel extends UiViewModel {
	public healthAmountText: string = "1";
	public panelOpacity: number = 1;
	public healthPercentage: number = 100;
	public primaryHealthColour: string = ``;
	public secondaryHealthColour: string = ``;
}

@component()
export class PlayerUI extends Component {
	@property()
	private _activeTime: number = 1;
	@property()
	private _fullHealthPercentage: number = FULL_PERCENTAGE;
	@property()
	private _hurtHealthPercentage: number = HURT_PERCENTAGE;

	@property()
	private _fullPrimaryColour: Color = Color.fromHex(FULL_PRIMARY_COLOUR);
	@property()
	private _fullSecondaryColour: Color = Color.fromHex(FULL_SECONDARY_COLOUR);
	@property()
	private _hurtPrimaryColour: Color = Color.fromHex(HURT_PRIMARY_COLOUR);
	@property()
	private _hurtSecondaryColour: Color = Color.fromHex(HURT_SECONDARY_COLOUR);
	@property()
	private _lowPrimaryColour: Color = Color.fromHex(LOW_PRIMARY_COLOUR);
	@property()
	private _lowSecondaryColour: Color = Color.fromHex(LOW_SECONDARY_COLOUR);

	private _viewModel: PlayerHealthUIModel = new PlayerHealthUIModel();
	private _uiComponent: Maybe<CustomUiComponent> = null;
	private _isVisible: boolean = false;
	private _timeSinceActivated: number = 0;

	@subscribe(OnEntityStartEvent)
	private onStart(): void {
		this._uiComponent = this.entity.getComponentOrThrow(CustomUiComponent);
		this._uiComponent.dataContext = this._viewModel;
	}

	public onUpdate(deltaTime: number): void {
		if (this._isVisible === false) {
			return;
		}

		this._timeSinceActivated += deltaTime;
		if (this._timeSinceActivated > this._activeTime) {
			this.hide();
		}
	}

	public show(): void {
		if (this._isVisible === true) {
			return;
		}

		this._isVisible = true;
		this._viewModel.panelOpacity = 1;
	}

	public hide(): void {
		this._isVisible = false;
		this._viewModel.panelOpacity = 0;
	}

	public setRemainingHealth(amount: number, healthPercentage: number): void {
		this._timeSinceActivated = 0;
		const percentage = healthPercentage * 100;
		this._viewModel.healthAmountText = amount.toString();
		this._viewModel.healthPercentage = percentage;
		this.setColour(percentage);
		if (percentage <= 0) {
			this.hide();
		}
	}

	private setColour(healthPercentage: number): void {
		if (healthPercentage > this._fullHealthPercentage) {
			this._viewModel.primaryHealthColour = this._fullPrimaryColour.toHex();
			this._viewModel.secondaryHealthColour = this._fullSecondaryColour.toHex();
		} else if (healthPercentage > this._hurtHealthPercentage) {
			this._viewModel.primaryHealthColour = this._hurtPrimaryColour.toHex();
			this._viewModel.secondaryHealthColour = this._hurtSecondaryColour.toHex();
		} else {
			this._viewModel.primaryHealthColour = this._lowPrimaryColour.toHex();
			this._viewModel.secondaryHealthColour = this._lowSecondaryColour.toHex();
		}
	}
}
