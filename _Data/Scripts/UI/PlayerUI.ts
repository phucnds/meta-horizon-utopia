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

import { CancellationToken } from "../Utility/CancellationToken";
import { secondsToMilliseconds } from "../Utility/TimeConversion";
import { easeOutQuad, tweenNumber } from "../Utility/Tween";

const FADE_DURATION = 0.2;

const FULL_OPACITY = 1;
const NO_OPACITY = 0;

const FULL_PERCENTAGE = 70;
const HURT_PERCENTAGE = 35;

const FULL_PRIMARY_COLOUR = `#FF516E`;
const FULL_SECONDARY_COLOUR = `#AF001D`;
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
  private _fadeTime: number = FADE_DURATION;
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

  private _fadeTimeMs: number = 0;
  private _viewModel: PlayerHealthUIModel = new PlayerHealthUIModel();
  private _uiComponent: Maybe<CustomUiComponent> = null;
  private _isVisible: boolean = false;

  private _timeSinceActivated: number = 0;
  private _tweenCancellationToken: Maybe<CancellationToken> = null;

  @subscribe(OnEntityStartEvent)
  private onStart(): void {
    this._fadeTimeMs = secondsToMilliseconds(this._fadeTime);
    this._uiComponent = this.entity.getComponentOrThrow(CustomUiComponent);
    this._uiComponent.dataContext = this._viewModel;

    this.hideImmediate();
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

    this.cancelAsync();
    this._tweenCancellationToken = new CancellationToken();
    this._isVisible = true;
    void tweenNumber(
      this._viewModel.panelOpacity,
      FULL_OPACITY,
      this._fadeTimeMs,
      (v: number) => (this._viewModel.panelOpacity = v),
      easeOutQuad,
      this._tweenCancellationToken,
    );
  }

  public hide(): void {
    this.cancelAsync();
    this._tweenCancellationToken = new CancellationToken();
    this._isVisible = false;
    void tweenNumber(
      this._viewModel.panelOpacity,
      NO_OPACITY,
      this._fadeTimeMs,
      (v: number) => (this._viewModel.panelOpacity = v),
      easeOutQuad,
      this._tweenCancellationToken,
    );
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

  public showImmediate(): void {
    if (this._uiComponent) {
      this._uiComponent.isVisible = true;
    }
  }

  public hideImmediate(): void {
    if (this._uiComponent) {
      this._uiComponent.isVisible = false;
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

  private cancelAsync(): void {
    if (this._tweenCancellationToken === null) {
      return;
    }

    this._tweenCancellationToken.cancel();
    this._tweenCancellationToken = null;
  }
}
