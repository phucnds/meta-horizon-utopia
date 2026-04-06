import { component, Component, OnEntityStartEvent, property, SoundAsset, SoundComponent, SoundPlayInfo, subscribe, type Maybe } from 'meta/worlds';

@component()
export class SoundManager extends Component {
  @property() public buttonClickSound: Maybe<SoundAsset> = null;
  @property() public loseSound: Maybe<SoundAsset> = null;
  @property() public winSound: Maybe<SoundAsset> = null;
  @property() public shootSound: Maybe<SoundAsset> = null;
  @property() public enemyAttackSound: Maybe<SoundAsset> = null;
  @property() public enemyHitSound: Maybe<SoundAsset> = null;
  @property() public enemyDeathSound: Maybe<SoundAsset> = null;
  @property() public enemyWaveSound: Maybe<SoundAsset> = null;

  
  private audioSFX: Maybe<SoundComponent> = null;

  

  
} 
