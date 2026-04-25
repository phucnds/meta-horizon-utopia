import { Signal } from '../EventSystem/Signal';

export class CurrencyManager {

  public readonly onCurrencyChanged = new Signal<number>();

  private currency: number = 0;

  public get(): number {
    return this.currency;
  }

  public add(amount: number): void {
    this.currency += amount;
    this.onCurrencyChanged.trigger(this.currency);
  }

  public spend(amount: number): boolean {
    if (this.currency < amount) return false;
    this.currency -= amount;
    this.onCurrencyChanged.trigger(this.currency);
    return true;
  }

  public canAfford(amount: number): boolean {
    return this.currency >= amount;
  }

  public set(amount: number): void {
    this.currency = amount;
    this.onCurrencyChanged.trigger(this.currency);
  }

  public reset(): void {
    this.currency = 0;
    this.onCurrencyChanged.trigger(this.currency);
  }
}
