import {
  component,
  property,
  NetworkMode,
  TemplateAsset,
  TransformComponent,
  Vec3,
  WorldService,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { BaseEnemy } from './BaseEnemy';
import { EnemyProjectile } from './EnemyProjectile';
import { directionXZ } from './MathUtils';
import { GameTimer } from '../Utils/GameTimer';
import { delay } from '../Utils/AsyncUtils';

@component()
export class RangeEnemy extends BaseEnemy {

  @property() protected attackRange: number = 8;
  @property() protected attackDelay: number = 2.0;
  @property() protected damage: number = 1;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;

  private attackCooldown!: GameTimer;
  private worldService = WorldService.get();

  protected override onSetup(): void {
    this.attackCooldown = new GameTimer(this.attackDelay);
  }

  protected onUpdate(dt: number): void {
    const dist = this.distanceToTarget();

    if (dist > this.attackRange) {
      this.moveTowardTarget(dt);
      this.lookAtTarget();
    } else {
      this.lookAtTarget();
      this.bossBehaviour?.onIdle();
      this.tryShoot(dt);
    }
  }

  private tryShoot(dt: number): void {
    this.attackCooldown.tick(dt);
    if (this.attackCooldown.tryFinishPeriod()) {
      void this.spawnAndShootProjectile();
    }
  }

  private async spawnAndShootProjectile(): Promise<void> {
    if (!this.targetEntity || !this.projectileTemplate) return;

    const spawned = await this.worldService.spawnTemplate({
      templateAsset: this.projectileTemplate,
      networkMode: NetworkMode.LocalOnly,
    });

    await delay(100);

    if (!this.canUpdate() || !this.targetEntity) {
      spawned.destroy();
      return;
    }

    const pos = this.getPosition();
    const targetPos = this.getTargetPosition();
    const dir = directionXZ(pos, targetPos);
    if (dir.x === 0 && dir.z === 0) {
      spawned.destroy();
      return;
    }

    const tf = spawned.getComponent(TransformComponent);
    if (tf) tf.worldPosition = new Vec3(pos.x, pos.y, pos.z);

    const projectile = spawned.getComponent(EnemyProjectile);
    if (!projectile) {
      spawned.destroy();
      return;
    }

    this.bossBehaviour?.onAttack();
    projectile.shoot(dir, this.damage, this.targetEntity);
    this.bossBehaviour?.onIdle();
  }
}
