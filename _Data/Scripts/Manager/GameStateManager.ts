import { Signal } from '../EventSystem/Signal';

export enum GameState {
  MENU,
  GAME,
  UPGRADE_SELECTION,
  GAME_OVER,
  STAGE_COMPLETE,
  WAVE_TRANSITION,
}

export class GameStateManager {
  private static instance: GameStateManager;

  public readonly onStateChanged = new Signal<GameState>();
  private currentState: GameState = GameState.MENU;

  public static get(): GameStateManager {
    if (!this.instance) {
      this.instance = new GameStateManager();
    }
    return this.instance;
  }

  public getState(): GameState {
    return this.currentState;
  }

  public setState(state: GameState): void {
    if (this.currentState === state) return;
    this.currentState = state;
    this.onStateChanged.trigger(state);
  }
}