import { Signal } from '../EventSystem/Signal';

export class HealthComponent {
  public readonly onDamaged = new Signal<number>();
  public readonly onHealed = new Signal<number>();
  public readonly onMaxChanged = new Signal<number>();
  public readonly onDied = new Signal();

  private current: number;

  constructor(private max: number) {
    this.current = max;
  }

  public takeDamage(damage: number): void {
    if (this.current <= 0) return;
    this.current = Math.max(0, this.current - damage);
    this.onDamaged.trigger(damage);
    if (this.current <= 0) {
      this.onDied.trigger();
    }
  }

  public heal(amount: number): void {
    if (amount <= 0 || this.current <= 0) return;
    const before = this.current;
    this.current = Math.min(this.max, this.current + amount);
    const delta = this.current - before;
    if (delta > 0) this.onHealed.trigger(delta);
  }

  public setMax(newMax: number, keepRatio: boolean = false): void {
    if (newMax <= 0 || newMax === this.max) return;
    if (keepRatio) {
      const ratio = this.max > 0 ? this.current / this.max : 1;
      this.current = newMax * ratio;
    } else {
      this.current = Math.min(this.current, newMax);
    }
    this.max = newMax;
    this.onMaxChanged.trigger(newMax);
  }

  public isDead(): boolean {
    return this.current <= 0;
  }

  public getHp(): number {
    return this.current;
  }

  public getMax(): number {
    return this.max;
  }

  public reset(): void {
    this.current = this.max;
  }
}
