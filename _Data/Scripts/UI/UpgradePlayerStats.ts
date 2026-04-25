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
import { PlayerStatsManager, Stat } from "../Manager/PlayerStatsManager";
import { CurrencyManager } from "../Manager/CurrencyManager";

// --- Events ---

const onDameUpgrade = new UiEvent("DameUpgrade");
const onCritUpgrade = new UiEvent("CritUpgrade");
const onAtkspdUpgrade = new UiEvent("AtkspdUpgrade");
const onHPUpgrade = new UiEvent("HPUpgrade");

const onHideUpgrade = new UiEvent("onHideUpgrade");

// --- ViewModel ---

@uiViewModel()
class UpgradePlayerStatsViewModel extends UiViewModel {
	public panelVisible: string = "Collapsed";
	public currencyString: string = "0";

	public levelDame: string = "Lv 1";
	public valueDame: string = "0";
	public costDame: string = "100";
	public fgCostDame: string = "#FFFFFFFF";

	public levelCrit: string = "Lv 1";
	public valueCrit: string = "0";
	public costCrit: string = "100";
	public fgCostCrit: string = "#FFFFFFFF";

	public levelAtkspd: string = "Lv 1";
	public valueAtkspd: string = "0";
	public costAtkspd: string = "100";
	public fgCostAtkspd: string = "#FFFFFFFF";

	public levelHP: string = "Lv 1";
	public valueHP: string = "0";
	public costHP: string = "100";
	public fgCostHP: string = "#FFFFFFFF";

	override readonly events = {
		onDameUpgrade,
		onCritUpgrade,
		onAtkspdUpgrade,
		onHPUpgrade,
		onHideUpgrade,
	};
}

// --- Stat key mapping ---

const STAT_KEYS: { key: string; stat: Stat }[] = [
	{ key: "Dame", stat: Stat.Attack },
	{ key: "Crit", stat: Stat.CriticalChance },
	{ key: "Atkspd", stat: Stat.AttackSpeed },
	{ key: "HP", stat: Stat.MaxHealth },
];

// --- Component ---

@component()
export class UpgradePlayerStats extends Component {

	public readonly onUpgrade = new Signal<{ stat: Stat; cost: number }>();
	public readonly onHide = new Signal();

	private _viewModel: UpgradePlayerStatsViewModel = new UpgradePlayerStatsViewModel();
	private _uiComponent: Maybe<CustomUiComponent> = null;
	private _statsManager: Maybe<PlayerStatsManager> = null;
	private _currencyManager: Maybe<CurrencyManager> = null;

	public setup(statsManager: PlayerStatsManager, currencyManager: CurrencyManager): void {
		this._uiComponent = this.entity.getComponent(CustomUiComponent);
		this._uiComponent!.dataContext = this._viewModel;
		this._statsManager = statsManager;
		this._currencyManager = currencyManager;
		this.refreshAll();
		this.hide();
	}

	public show(): void {
		this._viewModel.panelVisible = "Visible";
		this.refreshAll();
	}

	public hide(): void {
		this._viewModel.panelVisible = "Collapsed";
	}

	@subscribe(onDameUpgrade)
	private onDameHandler(): void {
		console.log(`[UpgradePlayerStats] On Dame`);
		this.tryUpgrade(Stat.Attack);
	}

	@subscribe(onCritUpgrade)
	private onCritHandler(): void {
		console.log(`[UpgradePlayerStats] On Crit`);
		this.tryUpgrade(Stat.CriticalChance);
	}

	@subscribe(onAtkspdUpgrade)
	private onAtkspdHandler(): void {
		console.log(`[UpgradePlayerStats] On Atkspd`);
		this.tryUpgrade(Stat.AttackSpeed);
	}

	@subscribe(onHPUpgrade)
	private onHPHandler(): void {
		console.log(`[UpgradePlayerStats] On HP`);
		this.tryUpgrade(Stat.MaxHealth);
	}

	private tryUpgrade(stat: Stat): void {
		if (!this._statsManager || !this._currencyManager) return;

		const cost = this._statsManager.getUpgradeCost(stat);
		if (!this._currencyManager.canAfford(cost)) {
			console.log(`[UpgradePlayerStats] Not enough currency for ${Stat[stat]}. Need ${cost}, have ${this._currencyManager.get()}`);
			return;
		}

		this._currencyManager.spend(cost);
		this._statsManager.upgradeStat(stat);

		this.onUpgrade.trigger({ stat, cost });
		this.refreshAll();
	}

	private refreshAll(): void {
		if (!this._statsManager) return;

		this._viewModel.currencyString = this._currencyManager?.get().toString() ?? "0";

		for (const { key, stat } of STAT_KEYS) {
			const level = this._statsManager.getStatLevel(stat);
			const currentValue = this._statsManager.getStat(stat);
			const nextValue = currentValue + this._statsManager.getUpgradeValue(stat);
			const nextCost = this._statsManager.getUpgradeCost(stat);

			(this._viewModel as any)[`level${key}`] = `Lv ${level}`;
			const isPercent = stat === Stat.CriticalChance;
			const isDecimal = stat === Stat.AttackSpeed;
			const fmt = (v: number) => isDecimal ? v.toFixed(1) : Math.round(v).toString();
			const suffix = isPercent ? '%' : '';
			(this._viewModel as any)[`value${key}`] = `${fmt(currentValue)}${suffix} -> ${fmt(nextValue)}${suffix}`;
			(this._viewModel as any)[`cost${key}`] = nextCost.toString();
			(this._viewModel as any)[`fgCost${key}`] = this._currencyManager?.canAfford(nextCost) ? "#FFFFFFFF" : "#FFFF0000";
		}
	}

	@subscribe(onHideUpgrade)
	private onHideHandler(): void {
		//this._uiComponent!.isVisible = false;

		this.onHide.trigger();
	}
}
