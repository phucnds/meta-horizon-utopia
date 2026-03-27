import {
  component,
  property,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { BaseEnemy } from './BaseEnemy';
import { DetectEnemy } from './DetectEnemy';

@component()
export class MeleeWeapon extends Weapon {

  @property() private attackRange: number = 2;
  @property() private attackSpeed: number = 1;
  @property() private damage: number = 10;
  @property() private detectEnemyEntity: Maybe<Entity> = null;

  protected getAttackRange(): number { return this.attackRange; }
  protected getAttackSpeed(): number { return this.attackSpeed; }
  protected getDamage(): number { return this.damage; }

  protected override onSetup(): void {
    this.detectEnemy = this.detectEnemyEntity?.getComponent(DetectEnemy) ?? null;
    this.detectEnemy?.setup(this.entity, this.attackRange);
  }

  protected attack(target: Entity): void {
    const enemy = target.getComponent(BaseEnemy);
    if (enemy) {
      enemy.takeDamage(this.getDamage());
    }
  }
}
