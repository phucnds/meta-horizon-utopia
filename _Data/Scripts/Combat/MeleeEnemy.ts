import { component, property } from 'meta/worlds';
import { BaseEnemy } from './BaseEnemy';
import { Player } from './Player';
import { GameTimer } from '../Utils/GameTimer';

@component()
export class MeleeEnemy extends BaseEnemy {

  @property() protected attackRange: number = 3;
  @property() protected attackDelay: number = 1.0;
  @property() protected damage: number = 1;

  private attackCooldown!: GameTimer;

  protected override onSetup(): void {
    this.attackCooldown = new GameTimer(this.attackDelay);
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
    this.attackCooldown.tick(dt);
    if (this.attackCooldown.tryFinishPeriod()) {
      this.attack();
    }
  }

  private attack(): void {
    if (!this.targetEntity) return;
    const player = this.targetEntity.getComponent(Player);
    if (player) {
      player.takeDamage(this.damage);
    }
    this.enemyAttackSoundComponent?.play();
  }
}
