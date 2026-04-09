import {
  component,
  Component,
  OnEntityStartEvent,
  property,
  subscribe,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { GameState, GameStateManager } from './GameStateManager';
import { BasePanel } from '../UI/BasePanel';
import { PlayerUI } from '../UI/PlayerUI';
import { PlayerXPUI } from '../UI/PlayerXPUI';
import { UpgradePlayerStats } from '../UI/UpgradePlayerStats';
import { PlayerCurrencyPanel } from '../UI/PlayerCurrencyPanel';
import { MenuPanel } from '../UI/MenuPanel';
import { GameOverPanel } from '../UI/GameOverPanel';

@component()
export class UIManager extends Component {
  @property() private loadingPanel: Maybe<Entity> = null;
  @property() private menuPanel: Maybe<Entity> = null;
  @property() private gamePanel: Maybe<Entity> = null;
  @property() private gameOverPanel: Maybe<Entity> = null;
  @property() private stageCompletePanel: Maybe<Entity> = null;
  @property() private waveTransitionPanel: Maybe<Entity> = null;

  @property() private playerUIEntity: Maybe<Entity> = null;
  @property() private playerXPUIEntity: Maybe<Entity> = null;
  @property() private upgradePlayerStatsEntity: Maybe<Entity> = null;
  @property() private playerCurrencyPanelEntity: Maybe<Entity> = null;

  private panels: BasePanel<any>[] = [];
  private panelMap = new Map<string, BasePanel<any>>();
  private stateToPanelEntity!: Map<GameState, Maybe<Entity>>;
  private playerUI: Maybe<PlayerUI> = null;
  private playerXPUI: Maybe<PlayerXPUI> = null;
  private upgradePlayerStats: Maybe<UpgradePlayerStats> = null;
  private playerCurrencyPanel: Maybe<PlayerCurrencyPanel> = null;

  @subscribe(OnEntityStartEvent)
  onStart() {
    this.stateToPanelEntity = new Map([
      [GameState.LOADING, this.loadingPanel],
      [GameState.MENU, this.menuPanel],
      [GameState.GAME, this.gamePanel],
      [GameState.GAME_OVER, this.gameOverPanel],
      [GameState.STAGE_COMPLETE, this.stageCompletePanel],
      [GameState.WAVE_TRANSITION, this.waveTransitionPanel],
    ]);

    this.panels = [
      this.loadingPanel,
      this.menuPanel,
      this.gamePanel,
      this.gameOverPanel,
      this.stageCompletePanel,
      this.waveTransitionPanel,
    ]
      .filter((e): e is Entity => e != null)
      .map(e => e.getComponent(BasePanel))
      .filter((p): p is BasePanel<any> => p != null);

    for (const panel of this.panels) {
      panel.setup();
      this.panelMap.set(panel.constructor.name, panel);
      panel.hide();
    }

    this.playerUI = this.getCmp(this.playerUIEntity, PlayerUI);
    this.playerXPUI = this.getCmp(this.playerXPUIEntity, PlayerXPUI);
    this.upgradePlayerStats = this.getCmp(this.upgradePlayerStatsEntity, UpgradePlayerStats);
    this.playerCurrencyPanel = this.getCmp(this.playerCurrencyPanelEntity, PlayerCurrencyPanel);

    const gsm = GameStateManager.get();
    gsm.onStateChanged.on(this.onGameStateChanged, this);
    void this.onGameStateChanged(gsm.getState());
  }

  private getCmp<T extends Component>(
    entity: Maybe<Entity>,
    ctor: new (...args: any[]) => T
  ): Maybe<T> {
    return entity?.getComponent(ctor) ?? null;
  }

  onDestroy(): void {
    GameStateManager.get().onStateChanged.off(this.onGameStateChanged);
  }

  public getPlayerUI(): PlayerUI | null {
    return this.playerUI;
  }

  public getPlayerXPUI(): PlayerXPUI | null {
    return this.playerXPUI;
  }

  public getUpgradePlayerStats(): UpgradePlayerStats | null {
    return this.upgradePlayerStats;
  }

  public getPlayerCurrencyPanel(): PlayerCurrencyPanel | null {
    return this.playerCurrencyPanel;
  }

  public getPanel<T extends BasePanel<any>>(
    type: abstract new (...args: any[]) => T
  ): T | null {
    return (this.panelMap.get(type.name) as T) ?? null;
  }

  private async onGameStateChanged(state?: GameState): Promise<void> {
    const activeEntity =
      state != null ? (this.stateToPanelEntity.get(state) ?? null) : null;
    const isGamePanelActive = activeEntity != null && activeEntity === this.gamePanel;
    const isMenuPanelActive = activeEntity != null && activeEntity === this.menuPanel;

    const hidePromises: Promise<void>[] = [];
    for (const panel of this.panels) {
      const isActive = activeEntity != null && panel.entity === activeEntity;
      if (!isActive) hidePromises.push(panel.hide());
    }

    if (!isGamePanelActive) {
      this.playerUI?.hideImmediate();
      this.playerXPUI?.hide();
    }
    if (!isMenuPanelActive) {
      this.upgradePlayerStats?.hide();
    }

    await Promise.all(hidePromises);

    for (const panel of this.panels) {
      if (activeEntity && panel.entity === activeEntity) panel.show();
    }

    if (isGamePanelActive) {
      this.playerUI?.showImmediate();
      this.playerXPUI?.show();
    }
    if (isMenuPanelActive) {
      this.upgradePlayerStats?.show();
    }
  }

  public showMenuPanel(): void {
    this.getPanel(MenuPanel)?.show();
  }

  public hideMenuPanel(): void {
    this.getPanel(MenuPanel)?.hide();
  }

  public showUpgradePanel(): void {
    this.upgradePlayerStats?.show();
  }

  public hideUpgradePanel(): void {
    this.upgradePlayerStats?.hide();
  }

  public showGameOverPanel(): void {
    this.getPanel(GameOverPanel)?.show();
  }

  public hideGameOverPanel(): void {
    this.getPanel(GameOverPanel)?.hide();
  }
}
