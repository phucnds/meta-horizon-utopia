import {
  Component,
  TransformComponent,
  Vec3,
  type Entity,
} from 'meta/worlds';
import { Player } from './Player';
import { BaseEnemy } from './BaseEnemy';
import { directionXZ, distanceXZ } from './MathUtils';
import { GameTimer } from '../Utils/GameTimer';

export abstract class Weapon extends Component {

  protected player!: Player;
  protected transform!: TransformComponent;
  protected attackCooldown!: GameTimer;
  private isProcessing: boolean = false;

  protected abstract getAttackRange(): number;
  protected abstract getAttackDelay(): number;
  protected abstract getDamage(): number;

  public setup(playerEntity: Entity): void {
    const player = playerEntity.getComponent(Player);
    if (!player) {
      console.error('[Weapon] Player component not found on entity');
      return;
    }
    this.player = player;
    this.attackCooldown = new GameTimer(this.getAttackDelay());

    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    this.onSetup();
  }

  protected onSetup(): void {}

  protected canAttack(): boolean {
    return !!this.player && this.player.getIsActive() && !this.player.isDead();
  }

  protected abstract findTarget(): Promise<Entity | null>;

  protected isTargetValid(target: Entity): boolean {
    const enemy = target.getComponent(BaseEnemy);
    if (!enemy || enemy.isDead()) return false;

    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return false;

    const dist = distanceXZ(this.player.getPosition(), targetPos);
    return dist <= this.getAttackRange();
  }

  protected getTargetPosition(target: Entity): Vec3 | null {
    const tf = target.getComponent(TransformComponent);
    return tf ? tf.worldPosition : null;
  }

  protected getDirectionToTarget(target: Entity): Vec3 | null {
    const myPos = this.player.getPosition();
    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return null;
    return directionXZ(myPos, targetPos);
  }

  protected async handleUpdate(dt: number): Promise<void> {
    if (!this.canAttack()) return;
    if (this.isProcessing) return;

    this.attackCooldown.tick(dt);
    if (this.attackCooldown.tryFinishPeriod()) {
      this.isProcessing = true;
      const target = await this.findTarget();
      this.isProcessing = false;

      if (target && this.isTargetValid(target)) {
        this.attack(target);
      } else {
        this.attackCooldown.reset();
      }
    }
  }

  protected abstract attack(target: Entity): void;

  public onWorldUpdate(dt: number): void {
    this.handleUpdate(dt);
  }
}
