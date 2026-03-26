import {
  component,
  Quaternion,
  PhysicsService,
  property,
  Service,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
  TemplateAsset,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Projectile } from './Projectile';
import { BaseEnemy } from './BaseEnemy';
import { distanceXZ, angleXZ } from './MathUtils';
import { ObjectPoolMeta } from '../Core/ObjectPoolMeta';

@component()
export class RangeWeapon extends Weapon {

  @property() private attackRange: number = 15;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 5;

  @property() private headEntity: Maybe<Entity> = null;
  @property() private firePointEntity: Maybe<Entity> = null;
  @property() private projectileTemplate: Maybe<TemplateAsset> = null;
  @property() private poolSize: number = 10;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackSpeed(): number { return this.attackSpeed; }
  protected getDamage(): number { return this.damage; }

  private physicsService = Service.inject(PhysicsService);
  private projectilePool!: ObjectPoolMeta<Projectile>;
  private currentTarget: Entity | null = null;
  private activeProjectiles: Projectile[] = [];
  private isReadyToFire: boolean = false;

  protected async findTarget(): Promise<Entity | null> {
    const myPos = this.player.getPosition();
    const range = this.getAttackRange();

    try {
      const overlaps = await this.physicsService.sphereOverlapQuery({
        center: myPos,
        radius: range,
        collisionLayerMask: 0xFFFFFFFF,
        reportOverlappingEntities: true,
        includeTriggers: true,
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
    } catch (e) {
      return null;
    }
  }

  protected override async onSetup(): Promise<void> {
    if (this.projectileTemplate) {
      this.projectilePool = new ObjectPoolMeta<Projectile>(
        this.projectileTemplate,
        Projectile,
        {
          onCreate: async (projectile) => {
            await projectile.setup();
          },
        },
      );
      await this.projectilePool.init(this.poolSize);
    }
  }

  public override onWorldUpdate(dt: number): void {
    this.handleUpdate(dt);

    if (this.currentTarget) {
      if (!this.isTargetValid(this.currentTarget)) {
        this.currentTarget = null;
        this.isReadyToFire = false;
      } else {
        this.rotateHeadToTarget(this.currentTarget);
      }
    }

    if (this.isReadyToFire && this.currentTarget) {
      this.rotateHeadToTarget(this.currentTarget);
      this.fireProjectile(this.currentTarget);
      this.isReadyToFire = false;
    }

    this.updateProjectiles(dt);
  }

  protected attack(target: Entity): void {
    this.currentTarget = target;
    this.isReadyToFire = true;
  }

  private fireProjectile(target: Entity): void {
    if (!this.projectilePool) return;

    const firePos = this.getFirePosition();
    const dir = this.getDirectionToTarget(target);
    if (!dir) return;

    const borrowed = this.projectilePool.borrow();
    if (!borrowed) return;

    const { component: projectile } = borrowed;
    const headRotation = this.headEntity?.getComponent(TransformComponent)?.worldRotation;

    const returnToPool = () => {
      projectile.onDeactivated.off(returnToPool);
      this.pendingRemoves.push(projectile);
      this.projectilePool.return(projectile);
    };

    projectile.onDeactivated.on(returnToPool, this);
    projectile.shoot(firePos, dir, this.getDamage(), target, headRotation);
    this.activeProjectiles.push(projectile);
  }

  private pendingRemoves: Projectile[] = [];

  private updateProjectiles(dt: number): void {
    if (this.pendingRemoves.length > 0) {
      for (const p of this.pendingRemoves) {
        const idx = this.activeProjectiles.indexOf(p);
        if (idx !== -1) this.activeProjectiles.splice(idx, 1);
      }
      this.pendingRemoves.length = 0;
    }

    for (const projectile of this.activeProjectiles) {
      projectile.updateProjectile(dt);
    }
  }

  private rotateHeadToTarget(target: Entity): void {
    if (!this.headEntity) return;

    const headTf = this.headEntity.getComponent(TransformComponent);
    if (!headTf) return;

    const targetPos = this.getTargetPosition(target);
    if (!targetPos) return;

    const angleRad = angleXZ(headTf.worldPosition, targetPos);
    const angleDeg = angleRad * (180 / Math.PI) + 180;
    headTf.worldRotation = Quaternion.fromEuler(new Vec3(0, angleDeg, 0));
  }

  private getFirePosition(): Vec3 {
    if (this.firePointEntity) {
      const tf = this.firePointEntity.getComponent(TransformComponent);
      if (tf) return tf.worldPosition;
    }
    return this.player.getPosition();
  }
}
