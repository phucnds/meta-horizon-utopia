import {
  component,
  Component,
  property,
  type Entity,
} from 'meta/worlds';
import { Gun } from './Gun';
import type { IStatsDependent, PlayerStatsManager } from '../Manager/PlayerStatsManager';

@component()
export class PlayerWeapons extends Component implements IStatsDependent {

 
  @property() private readonly gunEntities: readonly Entity[] = [];

  
  private guns: Gun[] = [];

  public setup(playerEntity: Entity): void {
   
    this.guns = [];

    for (const gunEntity of this.gunEntities) {
      const gun = gunEntity.getComponent(Gun);
      if (gun) {
        this.guns.push(gun);
      }
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

  public updateStats(statsManager: PlayerStatsManager): void {
    for (const gun of this.guns) {
      gun.updateWeaponStats(statsManager);
    }
  }

  public gamestick(dt: number): void {
    for (const gun of this.guns) {
      gun.onWorldUpdate(dt);
    }
  }
}
