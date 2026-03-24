export interface IDamageable {
  takeDamage(damage: number): void;
  isDead(): boolean;
}
