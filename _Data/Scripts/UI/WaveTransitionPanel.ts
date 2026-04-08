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

const onTapEvent = new UiEvent('onTapEvent');
const outlineCommmonColor = '#00FF00';
const outlineRareColor = '#00BFFF';
const outlineEpicColor = '#8B00FF';

const onTapOption1 = new UiEvent('onTapOption1');
const onTapOption2 = new UiEvent('onTapOption2');
const onTapOption3 = new UiEvent('onTapOption3');

@uiViewModel()
class WaveTransitionPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;

  @property() public textVisible: string = "Visible";
  @property() public boostVisible: string = "Hidden";

  override readonly events = {
    onTapOption1,
    onTapOption2,
    onTapOption3,
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
  private upgradeItemDataConfig: Maybe<UpgradeItemDataConfig> = null;

  private upgradeItem1: Maybe<UpgradeItem> = null;
  private upgradeItem2: Maybe<UpgradeItem> = null;
  private upgradeItem3: Maybe<UpgradeItem> = null;
  public onTap = new Signal();
  public onTapOption1 = new Signal<UpgradeItem>();
  public onTapOption2 = new Signal<UpgradeItem>();
  public onTapOption3 = new Signal<UpgradeItem>();


  protected createViewModel(): WaveTransitionPanelViewModel {
    return new WaveTransitionPanelViewModel();
  }

  protected override onPanelStart(): void {
    this.upgradeItemDataConfig = this.dataEntity?.getComponent(UpgradeItemDataConfig) ?? null;
    this.viewModel.textVisible = "Visible";
    this.viewModel.boostVisible = "Hidden";
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }

  @subscribe(onTapOption1)
  onTapOption1Handler() {
    console.log('onTapOption1');
    this.onTapOption1.trigger(this.upgradeItem1!);
    this.onTap.trigger();
  }

  @subscribe(onTapOption2)
  onTapOption2Handler() {
    console.log('onTapOption2');
    this.onTapOption2.trigger(this.upgradeItem2!);
    this.onTap.trigger();
  }

  @subscribe(onTapOption3)
  onTapOption3Handler() {
    console.log('onTapOption3');
    this.onTapOption3.trigger(this.upgradeItem3!);
    this.onTap.trigger();
  }
  public showCase(): void {
    this.viewModel.textVisible = "Hidden";
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
    // Build a weight for each upgrade item based on its tier's rate
    const weights: number[] = [];
    for (const item of upgradeItems) {
      const tier = tierItems.find(t => t.getTier() === item.getTier());
      weights.push(tier?.getRate() ?? 0);
    }

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight <= 0) return [];

    const picked: UpgradeItem[] = [];
    const usedIndices = new Set<number>();

    while (picked.length < count && usedIndices.size < upgradeItems.length) {
      // Calculate remaining weight
      let remainingWeight = 0;
      for (let i = 0; i < weights.length; i++) {
        if (!usedIndices.has(i)) remainingWeight += weights[i];
      }

      let roll = Math.random() * remainingWeight;
      for (let i = 0; i < upgradeItems.length; i++) {
        if (usedIndices.has(i)) continue;
        roll -= weights[i];
        if (roll <= 0) {
          picked.push(upgradeItems[i]);
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
    super.show();
    this.viewModel.textVisible = "Visible";
    this.viewModel.boostVisible = "Hidden";
  }

  public override async hide(): Promise<void> {
    super.hide();
    this.viewModel.textVisible = "Visible";
    this.viewModel.boostVisible = "Hidden";
  }
}
