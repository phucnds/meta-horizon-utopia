import {
  component,
  Component,
  property,
  type Entity,
} from 'meta/worlds';
import { Weapon } from './Weapon';

@component()
export class PlayerWeapons extends Component {

  @property() private readonly weaponEntities: readonly Entity[] = [];

  private weapons: Weapon[] = [];

  public setup(playerEntity: Entity): void {
    this.weapons = [];

    for (const weaponEntity of this.weaponEntities) {
      const weapon = weaponEntity.getComponent(Weapon);
      if (weapon) {
        weapon.setup(playerEntity);
        this.weapons.push(weapon);
      }
    }
  }

  public getWeapons(): Weapon[] {
    return this.weapons;
  }

  public getWeaponCount(): number {
    return this.weapons.length;
  }

  public gamestick(dt: number): void {
    for (const weapon of this.weapons) {
      weapon.onWorldUpdate(dt);
    }
  }
}
