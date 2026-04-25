import { component, Component, OnEntityStartEvent, property, subscribe, VfxComponent, type Entity, type Maybe } from 'meta/worlds';

@component()
export class BossBehaviour extends Component {

  @property() private vfxIdleEntity: Maybe<Entity> = null;
  @property() private vfxWalkEntity: Maybe<Entity> = null;
  @property() private vfxAttackEntity: Maybe<Entity> = null;

  private vfxWalk: Maybe<VfxComponent> = null;
  private vfxAttack: Maybe<VfxComponent> = null;

  @subscribe(OnEntityStartEvent)
  onStart() {
    this.vfxWalk = this.vfxWalkEntity?.getComponent(VfxComponent) ?? null;
    this.vfxAttack = this.vfxAttackEntity?.getComponent(VfxComponent) ?? null;

    this.onIdle();
  }

  public onAttack(): void {
    this.vfxIdleEntity!.enabledSelf = false;
    this.vfxWalkEntity!.enabledSelf = false;
    this.vfxAttackEntity!.enabledSelf = true;
    this.vfxAttack?.play();
  }

  public onIdle(): void {
    this.vfxIdleEntity!.enabledSelf = true;
    this.vfxWalkEntity!.enabledSelf = false;
    this.vfxAttackEntity!.enabledSelf = false;
  }

  public onMove(): void {
    this.vfxIdleEntity!.enabledSelf = false;
    this.vfxWalkEntity!.enabledSelf = true;
    this.vfxAttackEntity!.enabledSelf = false;
  }
}
