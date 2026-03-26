export class GameTimer {
  private currentTime: number = 0;

  constructor(private delay: number) {}

  public tick(dt: number): void {
    this.currentTime += dt;
  }

  public tryFinishPeriod(): boolean {
    if (this.currentTime >= this.delay) {
      this.currentTime = 0;
      return true;
    }
    return false;
  }

  public reset(): void {
    this.currentTime = 0;
  }

  public setDelay(delay: number): void {
    this.delay = delay;
  }

  public getDelay(): number {
    return this.delay;
  }

  public getProgress(): number {
    if (this.delay <= 0) return 1;
    return Math.min(this.currentTime / this.delay, 1);
  }
}
