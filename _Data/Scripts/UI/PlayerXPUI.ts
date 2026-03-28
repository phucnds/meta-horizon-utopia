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

const FULL_PRIMARY_COLOUR = `#35CDFF`;
const FULL_SECONDARY_COLOUR = `#1C89AD`;

@uiViewModel()
class PlayerXPUIModel extends UiViewModel {
	public levelText: string = "Lv 1";
	public xpPercentage: number = 0;
	public primaryHealthColour: string = FULL_PRIMARY_COLOUR;
	public secondaryHealthColour: string = FULL_SECONDARY_COLOUR;
}

@component()
export class PlayerXPUI extends Component {
	@property()
	private _primaryColour: Color = Color.fromHex(FULL_PRIMARY_COLOUR);
	@property()
	private _secondaryColour: Color = Color.fromHex(FULL_SECONDARY_COLOUR);

	private _viewModel: PlayerXPUIModel = new PlayerXPUIModel();
	private _uiComponent: Maybe<CustomUiComponent> = null;

	@subscribe(OnEntityStartEvent)
	private onStart(): void {
		this._uiComponent = this.entity.getComponentOrThrow(CustomUiComponent);
		this._uiComponent.dataContext = this._viewModel;
		this._viewModel.primaryHealthColour = this._primaryColour.toHex();
		this._viewModel.secondaryHealthColour = this._secondaryColour.toHex();

    this.hide();
	}

	public setXP(currentXp: number, xpToNextLevel: number, level: number): void {
		this._viewModel.levelText = `Lv ${level}`;
		this._viewModel.xpPercentage = xpToNextLevel > 0
			? (currentXp / xpToNextLevel) * 100
			: 0;
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


}
