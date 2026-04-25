import { component, property, VfxComponent, type Entity, type Maybe } from 'meta/worlds';
import { BaseEnemy } from './BaseEnemy';
import { Player } from './Player';
import { GameTimer } from '../Utils/GameTimer';

@component()
export class MeleeEnemy extends BaseEnemy {

  @property() protected attackRange: number = 3;
  @property() protected attackDelay: number = 1.0;
  @property() protected damage: number = 1;
  @property() private attackVfxEntity: Maybe<Entity> = null;

  private attackVfx: Maybe<VfxComponent> = null;
  private attackCooldown!: GameTimer;

  protected override onSetup(): void {
    this.attackCooldown = new GameTimer(this.attackDelay);
    this.attackVfx = this.attackVfxEntity?.getComponent(VfxComponent) ?? null;
  }

  protected onUpdate(dt: number): void {
    const dist = this.distanceToTarget();

    if (dist <= this.attackRange) {
      this.lookAtTarget();
      this.bossBehaviour?.onIdle();
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
    this.bossBehaviour?.onAttack();
    const player = this.targetEntity.getComponent(Player);
    if (player) {
      player.takeDamage(this.damage);
    }
    this.attackVfx?.setCustomParam("Flip UV", this.isFacingRight ? 1 : -1);
    this.attackVfx?.play();
    this.enemyAttackSoundComponent?.play();
    this.bossBehaviour?.onIdle();
  }
}
