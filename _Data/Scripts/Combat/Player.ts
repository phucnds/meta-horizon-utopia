import {
  component,
  Component,
  property,
  TransformComponent,
  Vec3,
  type Entity,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { HealthComponent } from './HealthComponent';
import type { IDamageable } from './IDamageable';

@component()
export class Player extends Component implements IDamageable {

  public readonly onDamaged = new Signal<number>();
  public readonly onDied = new Signal();

  @property() private maxHp: number = 100;

  private health!: HealthComponent;
  private transform!: TransformComponent;
  private isActive: boolean = false;

  private enemyEntities: Entity[] = [];

  public setup(): void {
    this.health = new HealthComponent(this.maxHp);
    this.health.onDamaged.on(this.handleDamaged, this);
    this.health.onDied.on(this.handleDied, this);

    const tf = this.entity.getComponent(TransformComponent);
    if (tf) this.transform = tf;

    this.isActive = true;
  }

  public registerEnemy(enemy: Entity): void {
    this.enemyEntities.push(enemy);
  }

  public unregisterEnemy(enemy: Entity): void {
    const idx = this.enemyEntities.indexOf(enemy);
    if (idx !== -1) this.enemyEntities.splice(idx, 1);
  }

  public getEnemyEntities(): Entity[] {
    return this.enemyEntities;
  }

  public getPosition(): Vec3 {
    return this.transform.worldPosition;
  }

  public takeDamage(damage: number): void {
    this.health.takeDamage(damage);
  }

  public isDead(): boolean {
    return this.health.isDead();
  }

  public getHealth(): HealthComponent {
    return this.health;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setActive(active: boolean): void {
    this.isActive = active;
  }

  private handleDamaged(damage?: number): void {
    this.onDamaged.trigger(damage ?? 0);
  }

  private handleDied(): void {
    this.isActive = false;
    this.onDied.trigger();
  }
}
