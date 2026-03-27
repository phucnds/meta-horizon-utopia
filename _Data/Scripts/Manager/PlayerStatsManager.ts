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
 * Quản lý chỉ số player theo 3 nguồn cộng dồn:
 *   final = base + addends (upgrades) + objectAddends (items)
 *
 * Khi bất kỳ stat thay đổi → notify tất cả IStatsDependent để tự cập nhật.
 *
 * Cách dùng:
 *   const stats = new PlayerStatsManager({ [Stat.MaxHealth]: 150 });
 *   stats.registerDependent(gun);   // gun.updateStats(stats) gọi ngay
 *   stats.addStat(Stat.Attack, 10); // +10 attack → notify all dependents
 *   stats.getStat(Stat.Attack);     // base(10) + addend(10) + object(0) = 20
 */
export class PlayerStatsManager {

  public readonly onStatsChanged = new Signal<Stat>();

  private baseStats = new Map<Stat, number>();
  private addends = new Map<Stat, number>();         // from wave upgrades
  private objectAddends = new Map<Stat, number>();   // from items/equipment

  private dependents: IStatsDependent[] = [];

  constructor(baseOverrides?: Partial<Record<Stat, number>>) {
    const stats = { ...DEFAULT_BASE_STATS, ...baseOverrides };
    for (const key of Object.keys(stats)) {
      const stat = Number(key) as Stat;
      this.baseStats.set(stat, stats[stat]);
      this.addends.set(stat, 0);
      this.objectAddends.set(stat, 0);
    }
  }

  // --- Query ---

  public getStat(stat: Stat): number {
    return (this.baseStats.get(stat) ?? 0)
      + (this.addends.get(stat) ?? 0)
      + (this.objectAddends.get(stat) ?? 0);
  }

  public getBaseStat(stat: Stat): number {
    return this.baseStats.get(stat) ?? 0;
  }

  // --- Upgrade addends (wave transition bonuses) ---

  public addStat(stat: Stat, value: number): void {
    const current = this.addends.get(stat) ?? 0;
    this.addends.set(stat, current + value);
    console.log(`[PlayerStats] ${Stat[stat]}: ${this.getStat(stat)} (+${value})`);
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
    }
    this.notifyAllChanged();
  }

  public resetAll(): void {
    for (const stat of this.addends.keys()) {
      this.addends.set(stat, 0);
      this.objectAddends.set(stat, 0);
    }
    this.notifyAllChanged();
  }
}
