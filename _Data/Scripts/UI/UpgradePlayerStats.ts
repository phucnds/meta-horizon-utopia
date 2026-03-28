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

const onDame = new UiEvent("Dame");
const onCrit = new UiEvent("Crit");
const onAtkspd = new UiEvent("Atkspd");
const onHP = new UiEvent("HP");

const onHide = new UiEvent("Hide");

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
		onHide,
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

	private _viewModel: UpgradePlayerStatsViewModel = new UpgradePlayerStatsViewModel();
	private _uiComponent: Maybe<CustomUiComponent> = null;
	private _statsManager: Maybe<PlayerStatsManager> = null;
	private _currencyManager: Maybe<CurrencyManager> = null;

	@subscribe(OnEntityStartEvent)
	private onStart(): void {
		this._uiComponent = this.entity.getComponentOrThrow(CustomUiComponent);
		this._uiComponent.dataContext = this._viewModel;
	}

	public setup(statsManager: PlayerStatsManager, currencyManager: CurrencyManager): void {
		this._statsManager = statsManager;
		this._currencyManager = currencyManager;
		this.refreshAll();
	}

	public show(): void {
		if (this._uiComponent) {
			this._uiComponent.isVisible = true;
		}
		this.refreshAll();
	}

	public hide(): void {
		if (this._uiComponent) {
			this._uiComponent.isVisible = false;
		}
	}

	@subscribe(onDame)
	private onDameHandler(): void {
		this.tryUpgrade(Stat.Attack);
	}

	@subscribe(onCrit)
	private onCritHandler(): void {
		this.tryUpgrade(Stat.CriticalChance);
	}

	@subscribe(onAtkspd)
	private onAtkspdHandler(): void {
		this.tryUpgrade(Stat.AttackSpeed);
	}

	@subscribe(onHP)
	private onHPHandler(): void {
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

		for (const { key, stat } of STAT_KEYS) {
			const level = this._statsManager.getStatLevel(stat);
			const totalValue = this._statsManager.getTotalUpgradeValue(stat);
			const cost = this._statsManager.getUpgradeCost(stat);

			(this._viewModel as any)[`level${key}`] = `Lv ${level}`;
			(this._viewModel as any)[`value${key}`] = `+${totalValue}%`;
			(this._viewModel as any)[`cost${key}`] = cost.toString();
		}
	}

	@subscribe(onHide)
	private onHideHandler(): void {
		this.hide();

		console.log(`[UpgradePlayerStats] Hide`);
	}
}
