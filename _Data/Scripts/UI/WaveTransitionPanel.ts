import {
  component,
  property,
  SoundComponent,
  subscribe,
  TextureAsset,
  UiEvent,
  UiViewModel,
  uiViewModel,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BasePanel } from './BasePanel';
import { TierUpgradeItemType, UpgradeItemDataConfig, UpgradeItem, TierUpgradeItem } from '../UpgradeItem/UpgradeItemDataConfig';
import { Gun } from '../Combat/Gun';
import type { HealthComponent } from '../Combat/HealthComponent';

const outlineCommmonColor = '#00FF00';
const outlineRareColor = '#00BFFF';
const outlineEpicColor = '#8B00FF';

const onWaveTransitionTapOption1 = new UiEvent('onWaveTransitionTapOption1');
const onWaveTransitionTapOption2 = new UiEvent('onWaveTransitionTapOption2');
const onWaveTransitionTapOption3 = new UiEvent('onWaveTransitionTapOption3');

@uiViewModel()
class WaveTransitionPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;

  @property() public textVisible: string = "Visible";
  @property() public boostVisible: string = "Collapsed";

  override readonly events = {
    onWaveTransitionTapOption1,
    onWaveTransitionTapOption2,
    onWaveTransitionTapOption3,
  };

  @property() public outline1: string = '#FFFFFF';
  @property() public tierTitle1: string = "Common";
  @property() public itemName1: string = "Upgrade Item";
  @property() public itemDes1: string = "Upgrade Item Description";
  @property() public tierIcon1: Maybe<TextureAsset> = null;
  @property() public iconLink1: Maybe<TextureAsset> = null;

  @property() public outline2: string = '#FFFFFF';
  @property() public tierTitle2: string = "Common";
  @property() public itemName2: string = "Upgrade Item";
  @property() public itemDes2: string = "Upgrade Item Description";
  @property() public tierIcon2: Maybe<TextureAsset> = null;
  @property() public iconLink2: Maybe<TextureAsset> = null;

  @property() public outline3: string = '#FFFFFF';
  @property() public tierTitle3: string = "Common";
  @property() public itemName3: string = "Upgrade Item";
  @property() public itemDes3: string = "Upgrade Item Description";
  @property() public tierIcon3: Maybe<TextureAsset> = null;
  @property() public iconLink3: Maybe<TextureAsset> = null;
}

@component()
export class WaveTransitionPanel extends BasePanel<WaveTransitionPanelViewModel> {

  @property() public readonly dataEntity: Maybe<Entity> = null;
  @property() private gunEntity: Maybe<Entity> = null;
  @property() private playerEntity: Maybe<Entity> = null;
  private upgradeItemDataConfig: Maybe<UpgradeItemDataConfig> = null;

  private upgradeItem1: Maybe<UpgradeItem> = null;
  private upgradeItem2: Maybe<UpgradeItem> = null;
  private upgradeItem3: Maybe<UpgradeItem> = null;

  public onTapOption1 = new Signal<UpgradeItem>();
  public onTapOption2 = new Signal<UpgradeItem>();
  public onTapOption3 = new Signal<UpgradeItem>();


  private gun: Maybe<Gun> = null;
  private playerHP: Maybe<HealthComponent> = null;


  protected createViewModel(): WaveTransitionPanelViewModel {
    return new WaveTransitionPanelViewModel();
  }

  protected override onPanelStart(): void {
    this.upgradeItemDataConfig = this.dataEntity?.getComponent(UpgradeItemDataConfig) ?? null;
    this.viewModel.textVisible = "Visible";
    this.viewModel.boostVisible = "Collapsed";
    this.gun = this.gunEntity?.getComponent(Gun) ?? null;
  }

  @subscribe(onWaveTransitionTapOption1)
  onTapOption1Handler() {
    console.log('[WaveTransitionPanel] onWaveTransitionTapOption1');
    this.onTapOption1.trigger(this.upgradeItem1!);
    this.optional(this.upgradeItem1!);
  }

  @subscribe(onWaveTransitionTapOption2)
  onTapOption2Handler() {
    console.log('[WaveTransitionPanel] onWaveTransitionTapOption2');
    this.onTapOption2.trigger(this.upgradeItem2!);
    this.optional(this.upgradeItem2!);
  }

  @subscribe(onWaveTransitionTapOption3)
  onTapOption3Handler() {
    console.log('[WaveTransitionPanel] onWaveTransitionTapOption3');
    this.onTapOption3.trigger(this.upgradeItem3!);
    this.optional(this.upgradeItem3!);
  }
  public showCase(): void {
    this.viewModel.textVisible = "Collapsed";
    this.viewModel.boostVisible = "Visible";
    if (!this.upgradeItemDataConfig) return;

    const tierItems = this.upgradeItemDataConfig.getTierUpgradeItems();
    const upgradeItems = this.upgradeItemDataConfig.getUpgradeItems();
    if (tierItems.length === 0 || upgradeItems.length === 0) return;

    // Pick 3 random upgrade items based on tier rate
    const picked = this.pickRandomItems(upgradeItems, tierItems, 3);

    // Assign to UI slots
    for (let i = 0; i < picked.length; i++) {
      const item = picked[i];
      const tier = tierItems.find(t => t.getTier() === item.getTier());

      const tierTitle = tier?.getNameTier() ?? "Common";
      const tierIcon = tier?.getImage() ?? null;
      const itemName = item.getName();
      const itemDes = item.getDescription();
      const iconLink = item.getImage();
      const outlineColor = this.getOutlineColor(item.getTier());

      if (i === 0) {
        this.viewModel.outline1 = outlineColor;
        this.viewModel.tierTitle1 = tierTitle;
        this.viewModel.itemName1 = itemName;
        this.viewModel.itemDes1 = itemDes;
        this.viewModel.tierIcon1 = tierIcon;
        this.viewModel.iconLink1 = iconLink;
        this.upgradeItem1 = item;
      } else if (i === 1) {
        this.viewModel.outline2 = outlineColor;
        this.viewModel.tierTitle2 = tierTitle;
        this.viewModel.itemName2 = itemName;
        this.viewModel.itemDes2 = itemDes;
        this.viewModel.tierIcon2 = tierIcon;
        this.viewModel.iconLink2 = iconLink;
        this.upgradeItem2 = item;
      } else if (i === 2) {
        this.viewModel.outline3 = outlineColor;
        this.viewModel.tierTitle3 = tierTitle;
        this.viewModel.itemName3 = itemName;
        this.viewModel.itemDes3 = itemDes;
        this.viewModel.tierIcon3 = tierIcon;
        this.viewModel.iconLink3 = iconLink;
        this.upgradeItem3 = item;
      }
    }
  }

  private pickRandomItems(
    upgradeItems: readonly UpgradeItem[],
    tierItems: readonly TierUpgradeItem[],
    count: number,
  ): UpgradeItem[] {
    // Only consider items that can be bought
    const buyableItems = upgradeItems.filter(item => item.getCanBuy());

    // Build a weight for each upgrade item based on its tier's rate
    const weights: number[] = [];
    for (const item of buyableItems) {
      const tier = tierItems.find(t => t.getTier() === item.getTier());
      weights.push(tier?.getRate() ?? 0);
    }

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight <= 0) return [];

    const picked: UpgradeItem[] = [];
    const usedIndices = new Set<number>();

    while (picked.length < count && usedIndices.size < buyableItems.length) {
      // Calculate remaining weight
      let remainingWeight = 0;
      for (let i = 0; i < weights.length; i++) {
        if (!usedIndices.has(i)) remainingWeight += weights[i];
      }

      let roll = Math.random() * remainingWeight;
      for (let i = 0; i < buyableItems.length; i++) {
        if (usedIndices.has(i)) continue;
        roll -= weights[i];
        if (roll <= 0) {
          picked.push(buyableItems[i]);
          usedIndices.add(i);
          break;
        }
      }
    }

    return picked;
  }

  private getOutlineColor(tier: number): string {
    switch (tier) {
      case TierUpgradeItemType.Rare:
        return outlineRareColor;
      case TierUpgradeItemType.Epic:
        return outlineEpicColor;
      default:
        return outlineCommmonColor;
    }
  }


  public override show(): void {
    //super.show();
    this.viewModel.textVisible = "Visible";
    this.viewModel.boostVisible = "Collapsed";
  }

  public override async hide(): Promise<void> {
    this.viewModel.textVisible = "Collapsed";
    this.viewModel.boostVisible = "Collapsed";
    //super.hide();
  }

  private optional(item: UpgradeItem): void {
    if (!item) return;

    switch (item.getId()) {
      case 0: {
        this.gun!.doubleShoot();
        const tripleItem = this.upgradeItemDataConfig?.getUpgradeItems().find(i => i.getId() === 1);
        tripleItem?.setCanBuy(true);
        item.setCanBuy(false);
        break;
      }
      case 1:
        this.gun!.tripleShoot();
        item.setCanBuy(false);
        break;
      case 14:
        this.playerHP!.heal(this.playerHP!.getMax() * 0.2);
        break;
      case 15:
        this.playerHP!.heal(this.playerHP!.getMax() * 0.4);
        break;
    }
  }
}
