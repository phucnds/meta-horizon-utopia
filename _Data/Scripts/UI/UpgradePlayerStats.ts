import { CustomUiComponent, UiViewModel, uiViewModel, UiEvent } from "meta/worlds";
import {
  Component,
  component,
  type Maybe,
  OnEntityStartEvent,
  property,
  subscribe,
} from "meta/worlds";
import { Signal } from "../EventSystem/Signal";
import { Stat } from "../Manager/PlayerStatsManager";

// --- Events ---

const onDame = new UiEvent("Dame");
const onCrit = new UiEvent("Crit");
const onAtkspd = new UiEvent("Atkspd");
const onHP = new UiEvent("HP");

// --- ViewModel ---

@uiViewModel()
class UpgradePlayerStatsViewModel extends UiViewModel {
  @property() public levelDame: string = "Lv 1";
  @property() public valueDame: string = "0";
  @property() public costDame: string = "100";

  @property() public levelCrit: string = "Lv 1";
  @property() public valueCrit: string = "0";
  @property() public costCrit: string = "100";

  @property() public levelAtkspd: string = "Lv 1";
  @property() public valueAtkspd: string = "0";
  @property() public costAtkspd: string = "100";

  @property() public levelHP: string = "Lv 1";
  @property() public valueHP: string = "0";
  @property() public costHP: string = "100";

  override readonly events = {
    onDame,
    onCrit,
    onAtkspd,
    onHP,
  };
}

// --- Upgrade config per stat ---

interface UpgradeConfig {
  stat: Stat;
  valuePerLevel: number;
  baseCost: number;
  costMultiplier: number;
}

const UPGRADE_CONFIGS: Record<string, UpgradeConfig> = {
  Dame: { stat: Stat.Attack, valuePerLevel: 5, baseCost: 100, costMultiplier: 1.5 },
  Crit: { stat: Stat.CriticalChance, valuePerLevel: 2, baseCost: 100, costMultiplier: 1.5 },
  Atkspd: { stat: Stat.AttackSpeed, valuePerLevel: 5, baseCost: 100, costMultiplier: 1.5 },
  HP: { stat: Stat.MaxHealth, valuePerLevel: 10, baseCost: 100, costMultiplier: 1.5 },
};

// --- Component ---

@component()
export class UpgradePlayerStats extends Component {

  public readonly onUpgrade = new Signal<{ stat: Stat; value: number; cost: number }>();

  private _viewModel: UpgradePlayerStatsViewModel = new UpgradePlayerStatsViewModel();
  private _uiComponent: Maybe<CustomUiComponent> = null;

  private currency: number = 0;

  @subscribe(OnEntityStartEvent)
  private onStart(): void {
    this._uiComponent = this.entity.getComponentOrThrow(CustomUiComponent);
    this._uiComponent.dataContext = this._viewModel;
  }

  public setCurrency(amount: number): void {
    this.currency = amount;
  }

  public getCurrency(): number {
    return this.currency;
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

  @subscribe(onDame)
  private onDameHandler(): void {
    this.tryUpgrade("Dame");
  }

  @subscribe(onCrit)
  private onCritHandler(): void {
    this.tryUpgrade("Crit");
  }

  @subscribe(onAtkspd)
  private onAtkspdHandler(): void {
    this.tryUpgrade("Atkspd");
  }

  @subscribe(onHP)
  private onHPHandler(): void {
    this.tryUpgrade("HP");
  }

  private tryUpgrade(key: string): void {

  }


}
