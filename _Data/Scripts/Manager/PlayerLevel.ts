import { Signal } from '../EventSystem/Signal';

const XP_PER_WAVE = 50;

const XP_TABLE: Record<number, number> = {
  2: 50,
  3: 100,
  4: 100,
  5: 100,
  6: 150,
  7: 150,
  8: 150,
  9: 150,
  10: 250,
  11: 250,
};

const XP_DEFAULT = 250;

export class PlayerLevel {

  public readonly onLevelUp = new Signal<number>();

  private level: number = 1;
  private currentXp: number = 0;

  public addWaveXp(): void {
    this.currentXp += XP_PER_WAVE;

    while (this.currentXp >= this.getXpToNextLevel()) {
      this.currentXp -= this.getXpToNextLevel();
      this.level++;
      console.log(`[PlayerLevel] Level up! Level ${this.level}`);
      this.onLevelUp.trigger(this.level);
    }
  }

  public getLevel(): number {
    return this.level;
  }

  public getCurrentXp(): number {
    return this.currentXp;
  }

  public getXpToNextLevel(): number {
    return XP_TABLE[this.level + 1] ?? XP_DEFAULT;
  }

  public reset(): void {
    this.level = 1;
    this.currentXp = 0;
  }
}
