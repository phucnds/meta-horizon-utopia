import { component, property } from 'meta/worlds';
import { BaseEnemy } from './BaseEnemy';
import { PlayerCombat } from './PlayerCombat';

@component()
export class MeleeEnemy extends BaseEnemy {

  @property() protected attackRange: number = 1.5;
  @property() protected attackDelay: number = 1.0;
  @property() protected damage: number = 1;

  private attackTimer: number = 0;

  protected override onSetup(): void {
    this.attackTimer = 0;
  }

  protected onUpdate(dt: number): void {
    const dist = this.distanceToTarget();

    if (dist <= this.attackRange) {
      this.lookAtTarget();
      this.tryAttack(dt);
    } else {
      this.moveTowardTarget(dt);
      this.lookAtTarget();
    }
  }

  private tryAttack(dt: number): void {
    this.attackTimer += dt;
    if (this.attackTimer >= this.attackDelay) {
      this.attackTimer = 0;
      this.attack();
    }
  }

  private attack(): void {
    if (!this.targetEntity) return;
    const player = this.targetEntity.getComponent(PlayerCombat);
    if (player) {
      player.takeDamage(this.damage);
    }
  }
}
