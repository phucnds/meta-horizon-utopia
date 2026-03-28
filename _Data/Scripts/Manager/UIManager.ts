import { component, Component, OnEntityStartEvent, property, subscribe, type Entity, type Maybe } from 'meta/worlds';
import { GameState, GameStateManager } from './GameStateManager';
import { BasePanel } from '../UI/BasePanel';
import { PlayerUI } from '../UI/PlayerUI';
import { PlayerXPUI } from '../UI/PlayerXPUI';
import { LevelUpPanel } from '../UI/LevelUpPanel';
import { UpgradePlayerStats } from '../UI/UpgradePlayerStats';
import { PlayerCurrencyPanel } from '../UI/PlayerCurrencyPanel';
import { MenuPanel } from '../UI/MenuPanel';

@component()
export class UIManager extends Component {

  @property() private menuPanel: Maybe<Entity> = null;
  @property() private gamePanel: Maybe<Entity> = null;
  @property() private gameOverPanel: Maybe<Entity> = null;
  @property() private stageCompletePanel: Maybe<Entity> = null;
  @property() private waveTransitionPanel: Maybe<Entity> = null;
  @property() private upgradeSelectionPanel: Maybe<Entity> = null;
  @property() private playerUIEntity: Maybe<Entity> = null;
  @property() private playerXPUIEntity: Maybe<Entity> = null;
  @property() private upgradePlayerStatsEntity: Maybe<Entity> = null;
  @property() private playerCurrencyPanelEntity: Maybe<Entity> = null;

  private panels: BasePanel<any>[] = [];
  private panelMap = new Map<string, BasePanel<any>>();
  private playerUI: Maybe<PlayerUI> = null;
  private playerXPUI: Maybe<PlayerXPUI> = null;
  private upgradePlayerStats: Maybe<UpgradePlayerStats> = null;
  private playerCurrencyPanel: Maybe<PlayerCurrencyPanel> = null;
  
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

    // Setup PlayerUI
    if (this.playerUIEntity) {
      this.playerUI = this.playerUIEntity.getComponent(PlayerUI) ?? null;
    }

    // Setup PlayerXPUI
    if (this.playerXPUIEntity) {
      this.playerXPUI = this.playerXPUIEntity.getComponent(PlayerXPUI) ?? null;
    }

    // Setup UpgradePlayerStats
    if (this.upgradePlayerStatsEntity) {
      this.upgradePlayerStats = this.upgradePlayerStatsEntity.getComponent(UpgradePlayerStats) ?? null;
    }

    // Setup PlayerCurrencyPanel
    if (this.playerCurrencyPanelEntity) {
      this.playerCurrencyPanel = this.playerCurrencyPanelEntity.getComponent(PlayerCurrencyPanel) ?? null;
    }

    GameStateManager.get().onStateChanged.on(this.onGameStateChanged, this);
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

  public getPanel<T extends BasePanel<any>>(type: abstract new (...args: any[]) => T): T | null {
    return (this.panelMap.get(type.name) as T) ?? null;
  }

  private async onGameStateChanged(state?: GameState): Promise<void> {
    // console.log(`[UIManager] onGameStateChanged: ${GameState[state!]} (${state})`);

    if (state === GameState.UPGRADE_SELECTION) {
      this.upgradeSelectionPanel?.getComponent(LevelUpPanel)?.showCase();
    }

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

    const isGamePanelActive = activeEntity != null && activeEntity === this.gamePanel;
    const isMenuPanelActive = activeEntity != null && activeEntity === this.menuPanel;

    const hidePromises: Promise<void>[] = [];
    for (const panel of this.panels) {
      const isActive = activeEntity != null && panel.entity === activeEntity;
      // console.log(`[UIManager] panel ${panel.entity.name}: ${isActive ? 'SHOW' : 'HIDE'}`);
      if (!isActive) {
        hidePromises.push(panel.hide());
      }
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
      if (activeEntity && panel.entity === activeEntity) {
        panel.show();
      }
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
    this.menuPanel?.getComponent(MenuPanel)?.show();
  }

  public hideMenuPanel(): void {
    this.menuPanel?.getComponent(MenuPanel)?.hide();
  }

  public showUpgradePanel(): void {
    this.upgradePlayerStatsEntity?.getComponent(UpgradePlayerStats)?.show();
  }
}
