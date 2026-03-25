import {
  component,
  OnWorldUpdateEvent,
  type OnWorldUpdateEventPayload,
  PhysicsService,
  property,
  Service,
  subscribe,
  TransformComponent,
  type Entity,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { BaseEnemy } from './BaseEnemy';
import { distanceXZ } from './MathUtils';

@component()
export class MeleeWeapon extends Weapon {

  @property() private attackRange: number = 2;
  @property() private attackDelay: number = 0.8;
  @property() private damage: number = 10;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackDelay(): number { return this.attackDelay; }
  protected getDamage(): number { return this.damage; }

  private physicsService = Service.inject(PhysicsService);

  protected async findTarget(): Promise<Entity | null> {
    const myPos = this.player.getPosition();
    const range = this.getAttackRange();

    const overlaps = await this.physicsService.sphereOverlapQuery({
      center: myPos,
      radius: range,
      collisionLayerMask: 1 << 5,
      reportOverlappingEntities: true,
      includeTriggers: false,
    });

    let closest: Entity | null = null;
    let minDist = range;

    for (const entity of overlaps.overlappingShapeEntities) {
      if (!entity) continue;

      const enemy = entity.getComponent(BaseEnemy);
      if (!enemy || enemy.isDead()) continue;

      const enemyTf = entity.getComponent(TransformComponent);
      if (!enemyTf) continue;

      const dist = distanceXZ(myPos, enemyTf.worldPosition);
      if (dist < minDist) {
        minDist = dist;
        closest = entity;
      }
    }

    return closest;
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    this.handleUpdate(payload.deltaTime);
  }

  protected attack(target: Entity): void {
    const enemy = target.getComponent(BaseEnemy);
    if (enemy) {
      enemy.takeDamage(this.getDamage());
    }
  }
}
