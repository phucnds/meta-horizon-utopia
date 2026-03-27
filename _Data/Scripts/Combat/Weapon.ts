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
import { DetectEnemy } from './DetectEnemy';

export abstract class Weapon extends Component {

  protected player!: Player;
  protected transform!: TransformComponent;
  protected attackCooldown!: GameTimer;
  protected detectEnemy: DetectEnemy | null = null;

  protected abstract getAttackRange(): number;
  protected abstract getAttackSpeed(): number;
  protected abstract getDamage(): number;

  public setup(playerEntity: Entity): void {
    const player = playerEntity.getComponent(Player);
    if (!player) {
      console.error('[Weapon] Player component not found on entity');
      return;
    }
    this.player = player;
    this.attackCooldown = new GameTimer(1 / this.getAttackSpeed());

    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    this.onSetup();
  }

  protected onSetup(): void {}

  protected canAttack(): boolean {
    return !!this.player && this.player.getIsActive() && !this.player.isDead();
  }

  protected findClosestEnemy(): Entity | null {
    if (!this.detectEnemy) return null;

    const myPos = this.player.getPosition();
    let closest: Entity | null = null;
    let minDist = this.getAttackRange();

    for (const entity of this.detectEnemy.getEnemies()) {
      const tf = entity.getComponent(TransformComponent);
      if (!tf) continue;

      const dist = distanceXZ(myPos, tf.worldPosition);
      if (dist < minDist) {
        minDist = dist;
        closest = entity;
      }
    }

    return closest;
  }

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

  protected handleUpdate(dt: number): void {
    if (!this.canAttack()) return;

    this.attackCooldown.tick(dt);
    if (this.attackCooldown.tryFinishPeriod()) {
      const target = this.findClosestEnemy();

      if (target && this.isTargetValid(target)) {
        this.attack(target);
      } else {
        this.attackCooldown.reset();
      }
    }
  }

  protected abstract attack(target: Entity): void;

  public gameTick(dt: number): void {
    this.handleUpdate(dt);
  }
}
