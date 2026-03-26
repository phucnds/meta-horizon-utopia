import { component, property, subscribe, OnWorldUpdateEvent, type OnWorldUpdateEventPayload, type Maybe, type Entity, OnEntityStartEvent } from 'meta/worlds';
import { BaseEnemy } from './BaseEnemy';
import { Player } from './Player';
import { GameTimer } from '../Utils/GameTimer';

@component()
export class MeleeEnemy extends BaseEnemy {

  @property() private testEntity: Maybe<Entity> = null;
  @property() protected attackRange: number = 1.5;
  @property() protected attackDelay: number = 1.0;
  @property() protected damage: number = 1;

  private attackCooldown!: GameTimer;

  @subscribe(OnEntityStartEvent)
  private onEntityStart(): void {
    this.setup(this.testEntity!, 100);
  }

  protected override onSetup(): void {
    this.attackCooldown = new GameTimer(this.attackDelay);
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    if (!this.canUpdate()) return;
    this.onUpdate(payload.deltaTime);
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
  }
}
