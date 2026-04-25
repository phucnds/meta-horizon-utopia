// Server-side PVAR handler. Owns OnPlayerCreateEvent + setVariable calls.
// Broadcasts loaded data to clients via ReturnPVarEvent.
// Receives SavePVarEvent from clients and persists via setVariable.

import {
  Component,
  component,
  EventService,
  NetworkingService,
  OnPlayerCreateEvent,
  type OnPlayerCreateEventPayload,
  PlayerVariablesService,
  subscribe,
} from 'meta/worlds';
import {
  createDefaultSaveData,
  isValidSaveData,
  type PlayerStatsSaveData,
} from './PlayerStatsManager';
import {
  ReturnPVarEvent,
  ReturnPVarPayload,
  SavePVarEvent,
  type SavePVarPayload,
  toSaveData,
  toStatsPayload,
} from './FetchDataEvents';

const PLAYER_DATA_KEY = 'PlayerData';

@component()
export class FetchData extends Component {

  private networkService = NetworkingService.get();
  private playerVariables = PlayerVariablesService.get();

  private get isServer(): boolean {
    return this.networkService.isServerContext();
  }

  @subscribe(OnPlayerCreateEvent)
  private async onPlayerCreated(payload: OnPlayerCreateEventPayload): Promise<void> {
    if (!this.isServer || !payload.entity) return;
    const player = payload.entity;

    const raw = await this.playerVariables.fetchVariable<{ [key: string]: any }>(
      player,
      PLAYER_DATA_KEY,
    );
    const parsed = raw ? (raw as { stats?: unknown }).stats : null;

    let stats: PlayerStatsSaveData;
    if (isValidSaveData(parsed)) {
      stats = parsed;
      console.warn(`[FetchData] loaded=${JSON.stringify(stats)}`);
    } else {
      stats = createDefaultSaveData();
      await this.playerVariables.setVariable(
        player,
        PLAYER_DATA_KEY,
        { stats } as unknown as { [key: string]: any },
      );
      console.warn(`[FetchData] invalid/missing data, wrote defaults=${JSON.stringify(stats)}`);
    }

    EventService.sendGlobally(
      ReturnPVarEvent,
      new ReturnPVarPayload(player, toStatsPayload(stats)),
    );
    console.warn(`[FetchData] broadcast ReturnPVarEvent`);
  }

  @subscribe(SavePVarEvent)
  private async onSaveRequest(payload: SavePVarPayload): Promise<void> {
    if (!this.isServer || !payload.player) return;
    const stats = toSaveData(payload.stats);
    try {
      await this.playerVariables.setVariable(
        payload.player,
        PLAYER_DATA_KEY,
        { stats } as unknown as { [key: string]: any },
      );
      console.warn(`[FetchData] saved=${JSON.stringify(stats)}`);
    } catch (e) {
      console.error(`[FetchData] save failed: ${e}`);
    }
  }

}
