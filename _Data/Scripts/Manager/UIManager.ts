import { component, Component, OnEntityStartEvent, property, subscribe, type Entity, type Maybe } from 'meta/worlds';
import { GameState, GameStateManager } from './GameStateManager';
import { BasePanel } from '../UI/BasePanel';

@component()
export class UIManager extends Component {

  @property() private menuPanel: Maybe<Entity> = null;
  @property() private gamePanel: Maybe<Entity> = null;
  @property() private gameOverPanel: Maybe<Entity> = null;
  @property() private stageCompletePanel: Maybe<Entity> = null;
  @property() private waveTransitionPanel: Maybe<Entity> = null;
  @property() private upgradeSelectionPanel: Maybe<Entity> = null;

  private panels: BasePanel<any>[] = [];
  private panelMap = new Map<string, BasePanel<any>>();

  @subscribe(OnEntityStartEvent)
  onStart() {
    this.panels = [
      this.menuPanel,
      this.gamePanel,
      this.gameOverPanel,
      this.stageCompletePanel,
      this.waveTransitionPanel,
      this.upgradeSelectionPanel,
    ]
      .filter((e): e is Entity => e != null)
      .map(e => e.getComponent(BasePanel))
      .filter((p): p is BasePanel<any> => p != null);

    for (const panel of this.panels) {
      panel.setup();
      this.panelMap.set(panel.constructor.name, panel);
    }

    GameStateManager.get().onStateChanged.on(this.onGameStateChanged, this);
  }

  public getPanel<T extends BasePanel<any>>(type: abstract new (...args: any[]) => T): T | null {
    return (this.panelMap.get(type.name) as T) ?? null;
  }

  private async onGameStateChanged(state?: GameState): Promise<void> {
    // console.log(`[UIManager] onGameStateChanged: ${GameState[state!]} (${state})`);
    const panelMap: Record<number, Maybe<Entity>> = {
      [GameState.MENU]: this.menuPanel,
      [GameState.GAME]: this.gamePanel,
      [GameState.GAME_OVER]: this.gameOverPanel,
      [GameState.STAGE_COMPLETE]: this.stageCompletePanel,
      [GameState.WAVE_TRANSITION]: this.waveTransitionPanel,
      [GameState.UPGRADE_SELECTION]: this.upgradeSelectionPanel,
    };

    const activeEntity = state != null ? panelMap[state] : null;

    // console.log(`[UIManager] activeEntity: ${activeEntity != null}`);

    const hidePromises: Promise<void>[] = [];
    for (const panel of this.panels) {
      const isActive = activeEntity != null && panel.entity === activeEntity;
      // console.log(`[UIManager] panel ${panel.entity.name}: ${isActive ? 'SHOW' : 'HIDE'}`);
      if (!isActive) {
        hidePromises.push(panel.hide());
      }
    }
    await Promise.all(hidePromises);

    for (const panel of this.panels) {
      if (activeEntity && panel.entity === activeEntity) {
        panel.show();
      }
    }
  }
}
