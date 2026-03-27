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



  @property() private readonly weaponEntities: readonly Entity[] = [];

  private weapons: Weapon[] = [];
 

  public setup(playerEntity: Entity): void {

    
    this.weapons = [];

   

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




  public gamestick(dt: number): void {
    
    for (const weapon of this.weapons) {
      weapon.gameTick(dt);
    }
  }
}
