// Shared event definitions for client-server PVAR communication.
// Import this file in both game manager and PVAR handler scripts.

import {
  serializable,
  property,
  NetworkEvent,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import {
  PLAYER_STATS_SAVE_VERSION,
  type PlayerStatsSaveData,
} from './PlayerStatsManager';

// --- Payload primitives ---

@serializable()
export class StatLevelPayload {
  @property() readonly stat: number = 0;
  @property() readonly level: number = 1;
  constructor(stat?: number, level?: number) {
    if (stat !== undefined) this.stat = stat;
    if (level !== undefined) this.level = level;
  }
}

@serializable()
export class PlayerStatsPayload {
  @property() readonly version: number = PLAYER_STATS_SAVE_VERSION;
  @property() readonly levels: readonly StatLevelPayload[] = [];
  constructor(version?: number, levels?: readonly StatLevelPayload[]) {
    if (version !== undefined) this.version = version;
    if (levels !== undefined) this.levels = levels;
  }
}

// --- Return: FetchData (server) → Game2 (client) ---

@serializable()
export class ReturnPVarPayload {
  @property() readonly player: Maybe<Entity> = null;
  @property() readonly stats: PlayerStatsPayload = new PlayerStatsPayload();
  constructor(player: Maybe<Entity> = null, stats?: PlayerStatsPayload) {
    this.player = player;
    if (stats !== undefined) this.stats = stats;
  }
}

export const ReturnPVarEvent = new NetworkEvent(
  'ReturnPVarEvent',
  ReturnPVarPayload,
);

// --- Save: Game2 (client) → FetchData (server) ---

@serializable()
export class SavePVarPayload {
  @property() readonly player: Maybe<Entity> = null;
  @property() readonly stats: PlayerStatsPayload = new PlayerStatsPayload();
  constructor(player: Maybe<Entity> = null, stats?: PlayerStatsPayload) {
    this.player = player;
    if (stats !== undefined) this.stats = stats;
  }
}

export const SavePVarEvent = new NetworkEvent(
  'SavePVarEvent',
  SavePVarPayload,
);

// --- Converters ---

export function toStatsPayload(data: PlayerStatsSaveData): PlayerStatsPayload {
  return new PlayerStatsPayload(
    data.version,
    data.levels.map((e) => new StatLevelPayload(e.stat, e.level)),
  );
}

export function toSaveData(payload: PlayerStatsPayload): PlayerStatsSaveData {
  return {
    version: payload.version,
    levels: payload.levels.map((e) => ({ stat: e.stat, level: e.level })),
  };
}
