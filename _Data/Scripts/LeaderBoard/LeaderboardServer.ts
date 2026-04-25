import {
  component,
  Component,
  OnPlayerCreateEvent,
  OnPlayerCreateEventPayload,
  OnPlayerDestroyEvent,
  OnPlayerDestroyEventPayload,
  Service,
  subscribe,
  type Entity,
  type Maybe,
  LeaderboardsService,
  LeaderboardEntry,
  NetworkingService,
  serializable,
  NetworkEvent,
  ExecuteOn,
} from 'meta/worlds';
import { LEADERBOARD_API_NAME } from './LeaderboardConfig';



@serializable()
export class TrySetNewHighScoreEventPayload {
  public readonly player : Maybe<Entity> = null;
  public readonly newScore : number = 0;
  public readonly extraData : string | undefined
}

export const TrySetNewHighScore = new NetworkEvent(`TrySetNewHighScore`, TrySetNewHighScoreEventPayload)

@component()
export class LeaderboardServer extends Component {

  private readonly leaderboardsService = Service.get(LeaderboardsService);
  private readonly networkingService = Service.get(NetworkingService);

  private playerEntries : Map<Entity, LeaderboardEntry> = new Map<Entity, LeaderboardEntry>();

  // Cache player entries to avoid fetching on every update private playerEntries = new Map<Entity, LeaderboardEntry>();
  @subscribe(OnPlayerCreateEvent) async onPlayerCreated(payload: OnPlayerCreateEventPayload) { // Only run on server 
    if (!this.networkingService.isServerContext()) { return; }
    const player: Maybe<Entity> = payload.entity;
    if (player == null) {
      return;
    }

    // Load player's existing entry (if any)
    const entry = await this.leaderboardsService.fetchEntryForPlayer(
      player,
      LEADERBOARD_API_NAME,
    );

    if (entry != null) {
      this.playerEntries.set(player, entry);
      console.log(`Player loaded with score: ${entry.score}`);
    } else {
      console.log(`New player — not yet on leaderboard`);
    }
  }

  @subscribe(OnPlayerDestroyEvent) onPlayerDestroyed(payload: OnPlayerDestroyEventPayload) {
    if (!this.networkingService.isServerContext()) { return; }

    const player = payload.entity;
    if (player != null) {
      this.playerEntries.delete(player);
    }
  }

  // Call this method when a player scores points 
  async addPoints(player: Entity, pointsToAdd: number) {
    const currentEntry = this.playerEntries.get(player); 
    const currentScore = currentEntry?.score ?? 0; 
    const newScore = currentScore + pointsToAdd;
    console.log(`Updating score: ${currentScore} → ${newScore}`);

    const updatedEntry = await this.leaderboardsService.updateEntryForPlayer(
      player,
      LEADERBOARD_API_NAME,
      newScore,
    );

    if (updatedEntry == null) {
      // Player has opted out of leaderboards
      console.log('Player opted out of leaderboards');
      return;
    }

    // Update cache with new entry
    this.playerEntries.set(player, updatedEntry);
    console.log(`New rank: #${updatedEntry.rank}`);
  }

  async trySetNewHighScore(player: Entity, newScore: number, extraData: string | undefined) {
    console.log(`trySetNewHighScore: ${newScore}`);
    const currentEntry = this.playerEntries.get(player); 
    const currentScore = currentEntry?.score ?? 0;

    if(currentScore >= newScore)
      return;

    console.log(`Updating score: ${currentScore} → ${newScore}`);

    const updatedEntry = await this.leaderboardsService.updateEntryForPlayer(
      player,
      LEADERBOARD_API_NAME,
      newScore, {
        extraData: extraData
      }
    );

    if (updatedEntry == null) {
      // Player has opted out of leaderboards
      console.log('Player opted out of leaderboards');
      return;
    }

    // Update cache with new entry
    this.playerEntries.set(player, updatedEntry);
    console.log(`New rank: #${updatedEntry.rank}`);
  }

  @subscribe(TrySetNewHighScore, {execution: ExecuteOn.Everywhere})
  private handleTrySetNewHighScoreEvent(payload: TrySetNewHighScoreEventPayload) {

    if (!this.networkingService.isServerContext()) 
      return;

    if(payload.player === null)
      return;

    this.trySetNewHighScore(payload.player, payload.newScore, payload.extraData);
  }
}