import { component, Component, CustomUiComponent, OnEntityStartEvent, property, subscribe, TextureAsset, UiEvent, UiViewModel, uiViewModel, type Maybe } from 'meta/worlds';

const onTapEvent = new UiEvent('onTapEvent');

@uiViewModel()
class UpgradeItemViewModel extends UiViewModel {

  @property()
  waveString: string = "1";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
  };
  iconLink: Maybe<TextureAsset> = null;
  @property() upgradeDamage1: string = "Visible";
}



@component()
export class UpgradeItem extends Component {


  @property()
  iconTexture: Maybe<TextureAsset> = null;

  private viewModel!: UpgradeItemViewModel;
  private customUI!: CustomUiComponent;
  @subscribe(OnEntityStartEvent)
  onStart() {
    this.viewModel = new UpgradeItemViewModel();
    this.customUI = this.entity.getComponent(CustomUiComponent)!;
    if (this.customUI) {
      this.customUI.dataContext = this.viewModel;
      this.viewModel.iconLink = this.iconTexture;
    }
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');

  }
}
