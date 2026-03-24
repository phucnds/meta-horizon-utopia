import { AvatarService, AvatarVisibilityState, component, Component, OnEntityStartEvent, PlayerComponent, PlayerService, subscribe } from 'meta/worlds';


@component()
export class HideAvatar extends Component {

  @subscribe(OnEntityStartEvent)
  onStart() {
    const player = PlayerService.get().getLocalPlayer();
    if (!player) return;

    AvatarService.get().setAvatarVisibility(
      this,
      player,
      AvatarVisibilityState.Hidden,
      false,
    );

    

    const playerComp = player.getComponent(PlayerComponent);
    if (playerComp) {
      playerComp.setIsAlive(false);
    }
  }


}
