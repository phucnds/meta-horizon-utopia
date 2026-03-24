import {
  component,
  property,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { BaseEnemy } from './BaseEnemy';
import { EnemyProjectile } from './EnemyProjectile';
import { directionXZ } from './MathUtils';

@component()
export class RangeEnemy extends BaseEnemy {

  @property() protected attackRange: number = 8;
  @property() protected attackDelay: number = 2.0;
  @property() protected damage: number = 1;
  @property() private projectileEntity: Maybe<Entity> = null;

  private attackTimer: number = 0;

  protected override onSetup(): void {
    this.attackTimer = 0;
  }

  protected onUpdate(dt: number): void {
    const dist = this.distanceToTarget();

    if (dist > this.attackRange) {
      this.moveTowardTarget(dt);
      this.lookAtTarget();
    } else {
      this.lookAtTarget();
      this.tryShoot(dt);
    }
  }

  private tryShoot(dt: number): void {
    this.attackTimer += dt;
    if (this.attackTimer >= this.attackDelay) {
      this.attackTimer = 0;
      this.shoot();
    }
  }

  private shoot(): void {
    if (!this.targetEntity || !this.projectileEntity) return;

    const pos = this.getPosition();
    const targetPos = this.getTargetPosition();
    const dir = directionXZ(pos, targetPos);

    const projectile = this.projectileEntity.getComponent(EnemyProjectile);
    if (projectile) {
      projectile.shoot(dir, this.damage, this.targetEntity);
    }

    console.log(`[RangeEnemy] shoot: ${this.damage} damage`);
  }
}
