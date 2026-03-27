import {
  component,
  Component,
  property,
  type Entity,
} from 'meta/worlds';
import { Weapon } from './Weapon';
import { Gun } from './Gun';

@component()
export class PlayerWeapons extends Component {


  @property() private readonly gunEntities: readonly Entity[] = [];
  @property() private readonly weaponEntities: readonly Entity[] = [];

  private weapons: Weapon[] = [];
  private guns: Gun[] = [];

  public setup(playerEntity: Entity): void {

    this.guns = [];
    this.weapons = [];

    for (const gunEntity of this.gunEntities) {
      const gun = gunEntity.getComponent(Gun);
      if (gun) {
        this.guns.push(gun);
      }
    }

    for (const weaponEntity of this.weaponEntities) {
      const weapon = weaponEntity.getComponent(Weapon);
      if (weapon) {
        this.weapons.push(weapon);
      }
    }

    for (const weapon of this.weapons) {
      weapon.setup(playerEntity);
    }


  }

  public getGuns(): Gun[] {
    return this.guns;
  }

  public getGunCount(): number {
    return this.guns.length;
  }

  public async activeWeapons(): Promise<void> {
    for (const gun of this.guns) {
      await gun.setup();
    }


  }

  public gamestick(dt: number): void {
    for (const gun of this.guns) {
      gun.onWorldUpdate(dt);
    }
    for (const weapon of this.weapons) {
      weapon.onWorldUpdate(dt);
    }
  }
}
