import {
  component,
  NetworkMode,
  OnWorldUpdateEvent,
  type OnWorldUpdateEventPayload,
  PhysicsService,
  property,
  Service,
  subscribe,
  TemplateAsset,
  TransformComponent,
  WorldService,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Projectile } from './Projectile';
import { Rocket } from './Rocket';
import { BaseEnemy } from './BaseEnemy';
import { distanceXZ } from './MathUtils';

@component()
export class RangeWeapon extends Weapon {

  @property() private attackRange: number = 15;
  @property() private attackDelay: number = 0.5;
  @property() private damage: number = 5;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackDelay(): number { return this.attackDelay; }
  protected getDamage(): number { return this.damage; }

  @property() private projectileTemplate: Maybe<TemplateAsset> = null;

  private physicsService = Service.inject(PhysicsService);

  protected async findTarget(): Promise<Entity | null> {
    const myPos = this.player.getPosition();
    const range = this.getAttackRange();
    // console.log(`[RangeWeapon] findTarget pos=(${myPos.x.toFixed(1)}, ${myPos.y.toFixed(1)}, ${myPos.z.toFixed(1)}) range=${range}`);
    // console.log(`[RangeWeapon] physicsService exists: ${!!this.physicsService}`);

    try {
      const overlaps = await this.physicsService.sphereOverlapQuery({
        center: myPos,
        radius: range,
        collisionLayerMask: 0xFFFFFFFF,
        reportOverlappingEntities: true,
        includeTriggers: true,
      });

      // console.log(`[RangeWeapon] sphereOverlap found ${overlaps.overlappingShapeEntities.length} shape entities, ${overlaps.overlappingActorEntities.length} actor entities`);

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
    } catch (e) {
      console.error(`[RangeWeapon] sphereOverlapQuery error:`, e);
      return null;
    }
  }

  @subscribe(OnWorldUpdateEvent)
  private onWorldUpdate(payload: OnWorldUpdateEventPayload): void {
    this.handleUpdate(payload.deltaTime);
  }

  protected async attack(target: Entity): Promise<void> {
    if (!this.projectileTemplate) return;

    const dir = this.getDirectionToTarget(target);
    if (!dir) return;

    const entity = await WorldService.get().spawnTemplate({
      templateAsset: this.projectileTemplate,
      networkMode: NetworkMode.Networked,
    });

    const projectile = entity.getComponent(Rocket);
    if (!projectile) return;

    const myPos = this.player.getPosition();
    projectile.shoot(myPos, dir, this.getDamage(), target);
  }
}
