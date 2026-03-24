import { Signal } from '../EventSystem/Signal';

export class HealthComponent {
  public readonly onDamaged = new Signal<number>();
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
    this.current = Math.min(this.max, this.current + amount);
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
