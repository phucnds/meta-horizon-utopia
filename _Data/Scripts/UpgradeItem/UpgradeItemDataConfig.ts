import { component, Component, OnEntityStartEvent, property, serializable, subscribe, TextureAsset, type Maybe } from 'meta/worlds';
import { Stat } from '../Manager/PlayerStatsManager';


export enum TierUpgradeItemType {
  Common = 0,
  Rare = 1,
  Epic = 2,
}

@serializable()
export class TierUpgradeItem {
  @property() private tier: number = TierUpgradeItemType.Common;
  @property() private nameTier: string = "Common";
  @property() private image: Maybe<TextureAsset> = null;
  @property() private rate: number = 0;
  @property() private canBuy: boolean = false;

  public getTier(): number { return this.tier; }
  public getNameTier(): string { return this.nameTier; }
  public getImage(): Maybe<TextureAsset> { return this.image; }
  public getRate(): number { return this.rate; }

}

@serializable()
export class UpgradeItem {
  @property() private id: number = 0;
  @property() private name: string = "Upgrade Item";
  @property() private description: string = "Upgrade Item Description";
  @property() private image: Maybe<TextureAsset> = null;
  @property() private tier: number = TierUpgradeItemType.Common;
  @property() private stat: number = Stat.Attack;
  @property() private value: number = 0;
  @property() private percentValue: number = 0;

  public getId(): number { return this.id; }
  public getName(): string { return this.name; }
  public getDescription(): string { return this.description; }
  public getImage(): Maybe<TextureAsset> { return this.image; }
  public getTier(): number { return this.tier; }
  public getStat(): number { return this.stat; }
  public getValue(): number { return this.value; }
  public getPercentValue(): number { return this.percentValue; }

}

@component()
export class UpgradeItemDataConfig extends Component {
  @property() private tierUpgradeItems: readonly TierUpgradeItem[] = [];
  @property() private upgradeItems: readonly UpgradeItem[] = [];

  public getTierUpgradeItems(): readonly TierUpgradeItem[] {
    return this.tierUpgradeItems;
  }

  public getUpgradeItems(): readonly UpgradeItem[] {
    return this.upgradeItems;
  }
}
