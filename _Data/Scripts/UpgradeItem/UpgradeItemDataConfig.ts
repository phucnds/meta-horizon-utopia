import { component, Component, OnEntityStartEvent, property, serializable, subscribe, TextureAsset, type Maybe } from 'meta/worlds';
import { Stat } from '../Manager/PlayerStatsManager';


export enum TierUpgradeItemType {
  Common = 0,
  Rare = 1,
  Epic = 2,
}

@serializable()
class TierUpgradeItem {
  @property() private tier: number = TierUpgradeItemType.Common;
  @property() private nameTier: string = "Common";
  @property() private image: Maybe<TextureAsset> = null;
  @property() private rate: number = 0;
}

@serializable()
class UpgradeItem {
  @property() private id: number = 0;
  @property() private name: string = "Upgrade Item";
  @property() private description: string = "Upgrade Item Description";
  @property() private image: Maybe<TextureAsset> = null;
  @property() private tier: number = TierUpgradeItemType.Common;
  @property() private statModifiers: readonly StatModifier[] = [];
}


@serializable()
export class StatModifier {
  @property() private stat: number = Stat.Attack;
  @property() private value: number = 0;
  @property() private percent: number = 0;
}



@component()
export class UpgradeItemDataConfig extends Component {
  @property() private tierUpgradeItems: readonly TierUpgradeItem[] = [];
  @property() private upgradeItems: readonly UpgradeItem[] = [];



  @subscribe(OnEntityStartEvent)
  onStart() {
    console.log('onStart');
  }
}
