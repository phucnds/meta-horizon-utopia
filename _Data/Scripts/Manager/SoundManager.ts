import {
  component,
  Component,
  OnEntityStartEvent,
  property,
  SoundAsset,
  SoundComponent,
  SoundPlayInfo,
  subscribe,
  type Entity,
  type Maybe
} from 'meta/worlds';

@component()
export class SoundManager extends Component {

  @property() private uiClickSoundEntity: Maybe<Entity> = null;
  private uiClickSoundComponent: Maybe<SoundComponent> = null;

  public static Instance: Maybe<SoundManager> = null;


  @subscribe(OnEntityStartEvent)
  onStart(): void {
    this.uiClickSoundComponent = this.uiClickSoundEntity?.getComponent(SoundComponent) ?? null;
    SoundManager.Instance = this;
  }

  public playUiClickSound(): void {
    if (this.uiClickSoundComponent) {
      this.uiClickSoundComponent.play();
    }
  }




} 
