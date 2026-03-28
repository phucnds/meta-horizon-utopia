import { Signal } from '../EventSystem/Signal';

// --- Stat Enum ---

export enum Stat {
  Attack = 0,
  AttackSpeed = 1,
  CriticalChance = 2,
  CriticalPercent = 3,
  MoveSpeed = 4,
  MaxHealth = 5,
  Range = 6,
  HealthRecoverySpeed = 7,
  Armor = 8,
  Luck = 9,
  Dodge = 10,
  LifeSteal = 11,
}

// --- Interface: any object that reads stats implements this ---

export interface IStatsDependent {
  updateStats(statsManager: PlayerStatsManager): void;
}

// --- Stat upgrade config ---

export interface StatUpgradeConfig {
  valuePerLevel: number;   // % tăng mỗi level
  baseCost: number;        // cost level 1 → 2
  costMultiplier: number;  // hệ số nhân cost mỗi level
}

export const DEFAULT_UPGRADE_CONFIGS: Partial<Record<Stat, StatUpgradeConfig>> = {
  [Stat.Attack]:         { valuePerLevel: 5,  baseCost: 50, costMultiplier: 1.5 },
  [Stat.AttackSpeed]:    { valuePerLevel: 0.1,  baseCost: 50, costMultiplier: 1.5 },
  [Stat.CriticalChance]: { valuePerLevel: 1,  baseCost: 50, costMultiplier: 1.5 },
  [Stat.MaxHealth]:      { valuePerLevel: 10, baseCost: 50, costMultiplier: 1.5 },
};

// --- Default base stats ---

export const DEFAULT_BASE_STATS: Record<Stat, number> = {
  [Stat.Attack]: 10,
  [Stat.AttackSpeed]: 1,
  [Stat.CriticalChance]: 5,
  [Stat.CriticalPercent]: 1.5,
  [Stat.MoveSpeed]: 5,
  [Stat.MaxHealth]: 100,
  [Stat.Range]: 15,
  [Stat.HealthRecoverySpeed]: 0,
  [Stat.Armor]: 0,
  [Stat.Luck]: 0,
  [Stat.Dodge]: 0,
  [Stat.LifeSteal]: 0,
};

// --- PlayerStatsManager ---

/**
 * Quản lý chỉ số player theo công thức:
 *   final = (base + permanentAddends + addends + objectAddends) * (1 + percentAddends / 100)
 *
 * - permanentAddends: tăng vĩnh viễn, không reset khi retry
 * - addends: từ level up, reset khi retry
 * - objectAddends: từ items/equipment, reset khi retry
 * - percentAddends: tăng theo %, reset khi retry
 *
 * Cách dùng:
 *   stats.addStat(Stat.Attack, 10);           // +10 flat (reset on retry)
 *   stats.addPermanentStat(Stat.Attack, 5);   // +5 flat (permanent)
 *   stats.addStatPercent(Stat.Attack, 20);    // +20% (reset on retry)
 *   stats.getStat(Stat.Attack);               // (10 + 5 + 10) * 1.2 = 30
 */
export class PlayerStatsManager {

  public readonly onStatsChanged = new Signal<Stat>();

  private baseStats = new Map<Stat, number>();
  private permanentAddends = new Map<Stat, number>(); // permanent, never reset
  private addends = new Map<Stat, number>();           // from wave upgrades, reset on retry
  private objectAddends = new Map<Stat, number>();     // from items/equipment, reset on retry
  private permanentPercentAddends = new Map<Stat, number>(); // percent bonus, never reset
  private percentAddends = new Map<Stat, number>();          // percent bonus, reset on retry

  private dependents: IStatsDependent[] = [];

  private statLevels = new Map<Stat, number>();
  private upgradeConfigs = new Map<Stat, StatUpgradeConfig>();

  constructor(baseOverrides?: Partial<Record<Stat, number>>) {
    const stats = { ...DEFAULT_BASE_STATS, ...baseOverrides };
    for (const key of Object.keys(stats)) {
      const stat = Number(key) as Stat;
      this.baseStats.set(stat, stats[stat]);
      this.permanentAddends.set(stat, 0);
      this.permanentPercentAddends.set(stat, 0);
      this.addends.set(stat, 0);
      this.objectAddends.set(stat, 0);
      this.percentAddends.set(stat, 0);
      this.statLevels.set(stat, 1);
    }

    for (const [stat, config] of Object.entries(DEFAULT_UPGRADE_CONFIGS)) {
      this.upgradeConfigs.set(Number(stat) as Stat, config!);
    }
  }

  // --- Query ---

  public getStat(stat: Stat): number {
    const flat = (this.baseStats.get(stat) ?? 0)
      + (this.permanentAddends.get(stat) ?? 0)
      + (this.addends.get(stat) ?? 0)
      + (this.objectAddends.get(stat) ?? 0);
    const percent = (this.permanentPercentAddends.get(stat) ?? 0)
      + (this.percentAddends.get(stat) ?? 0);
    return flat * (1 + percent / 100);
  }

  public getBaseStat(stat: Stat): number {
    return this.baseStats.get(stat) ?? 0;
  }

  // --- Stat levels & upgrades (permanent) ---

  public getStatLevel(stat: Stat): number {
    return this.statLevels.get(stat) ?? 1;
  }

  public getUpgradeCost(stat: Stat): number {
    const config = this.upgradeConfigs.get(stat);
    if (!config) return 0;
    const level = this.getStatLevel(stat);
    return Math.floor(config.baseCost * Math.pow(config.costMultiplier, level - 1));
  }

  public getUpgradeValue(stat: Stat): number {
    const config = this.upgradeConfigs.get(stat);
    if (!config) return 0;
    return config.valuePerLevel;
  }

  public getTotalUpgradeValue(stat: Stat): number {
    const config = this.upgradeConfigs.get(stat);
    if (!config) return 0;
    const level = this.getStatLevel(stat);
    return (level - 1) * config.valuePerLevel;
  }

  public upgradeStat(stat: Stat): boolean {
    const config = this.upgradeConfigs.get(stat);
    if (!config) return false;

    const level = this.getStatLevel(stat);
    this.statLevels.set(stat, level + 1);
    this.addPermanentStatPercent(stat, config.valuePerLevel);

    console.log(`[PlayerStats] ${Stat[stat]} upgraded to Lv ${level + 1} (+${config.valuePerLevel}%)`);
    return true;
  }

  public hasUpgradeConfig(stat: Stat): boolean {
    return this.upgradeConfigs.has(stat);
  }

  // --- Permanent addends (never reset) ---

  public addPermanentStat(stat: Stat, value: number): void {
    const current = this.permanentAddends.get(stat) ?? 0;
    this.permanentAddends.set(stat, current + value);
    console.log(`[PlayerStats] ${Stat[stat]} (permanent): ${this.getStat(stat)} (+${value})`);
    this.notifyChanged(stat);
  }

  public addPermanentStatPercent(stat: Stat, percent: number): void {
    const current = this.permanentPercentAddends.get(stat) ?? 0;
    this.permanentPercentAddends.set(stat, current + percent);
    console.log(`[PlayerStats] ${Stat[stat]} (permanent): ${this.getStat(stat)} (+${percent}%)`);
    this.notifyChanged(stat);
  }

  // --- Upgrade addends (wave transition bonuses, reset on retry) ---

  public addStat(stat: Stat, value: number): void {
    const current = this.addends.get(stat) ?? 0;
    this.addends.set(stat, current + value);
    console.log(`[PlayerStats] ${Stat[stat]}: ${this.getStat(stat)} (+${value})`);
    this.notifyChanged(stat);
  }

  // --- Percent addends (reset on retry) ---

  public addStatPercent(stat: Stat, percent: number): void {
    const current = this.percentAddends.get(stat) ?? 0;
    this.percentAddends.set(stat, current + percent);
    console.log(`[PlayerStats] ${Stat[stat]}: ${this.getStat(stat)} (+${percent}%)`);
    this.notifyChanged(stat);
  }

  // --- Object/equipment addends ---

  public addObjectStats(stats: Map<Stat, number>): void {
    for (const [stat, value] of stats) {
      const current = this.objectAddends.get(stat) ?? 0;
      this.objectAddends.set(stat, current + value);
    }
    this.notifyAllChanged();
  }

  public removeObjectStats(stats: Map<Stat, number>): void {
    for (const [stat, value] of stats) {
      const current = this.objectAddends.get(stat) ?? 0;
      this.objectAddends.set(stat, current - value);
    }
    this.notifyAllChanged();
  }

  // --- Dependents ---

  public registerDependent(dependent: IStatsDependent): void {
    this.dependents.push(dependent);
    dependent.updateStats(this);
  }

  public unregisterDependent(dependent: IStatsDependent): void {
    const idx = this.dependents.indexOf(dependent);
    if (idx !== -1) this.dependents.splice(idx, 1);
  }

  // --- Notify ---

  private notifyChanged(stat: Stat): void {
    this.onStatsChanged.trigger(stat);
    for (const dep of this.dependents) {
      dep.updateStats(this);
    }
  }

  private notifyAllChanged(): void {
    for (const dep of this.dependents) {
      dep.updateStats(this);
    }
  }

  // --- Reset (new game) ---

  public resetAddends(): void {
    for (const stat of this.addends.keys()) {
      this.addends.set(stat, 0);
      this.objectAddends.set(stat, 0);
      this.percentAddends.set(stat, 0);
    }
    this.notifyAllChanged();
  }

  public resetAll(): void {
    for (const stat of this.addends.keys()) {
      this.permanentAddends.set(stat, 0);
      this.permanentPercentAddends.set(stat, 0);
      this.addends.set(stat, 0);
      this.objectAddends.set(stat, 0);
      this.percentAddends.set(stat, 0);
    }
    this.notifyAllChanged();
  }
}
