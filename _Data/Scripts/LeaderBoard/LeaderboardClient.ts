import {
  component,
  Component,
  OnEntityStartEvent,
  OnLeaderboardUpdatedEvent,
  OnLeaderboardUpdatedEventPayload,
  Service,
  subscribe,
  LeaderboardsService,
  NetworkingService,
  PlayerService,
  EventService,
  type Maybe,
  LeaderboardEntry
} from 'meta/worlds'
import { LEADERBOARD_API_NAME } from './LeaderboardConfig';
import { TrySetNewHighScore } from './LeaderboardServer';

@component()
export class LeaderboardClient extends Component {
  private readonly leaderboardsService = Service.get(LeaderboardsService);
  private readonly networkingService = Service.get(NetworkingService);

  private static readonly PAGE_SIZE = 10;

  private entriesCache: Map<number, LeaderboardEntry[]> = new Map();
  private entriesInFlight: Map<number, Promise<LeaderboardEntry[]>> = new Map();

  private localEntryCache: Maybe<LeaderboardEntry> | undefined = undefined;
  private localEntryInFlight: Promise<Maybe<LeaderboardEntry>> | null = null;

  @subscribe(OnEntityStartEvent) 
  async onStart() {
    if (this.networkingService.isServerContext())
      return;
  }

  @subscribe(OnLeaderboardUpdatedEvent)
  async onLeaderboardUpdated(payload: OnLeaderboardUpdatedEventPayload) {
    if (this.networkingService.isServerContext())
      return;

    // Any leaderboard write/update invalidates local cache.
    this.clearCache();
  }

  private clearCache(): void {
    this.entriesCache.clear();
    this.entriesInFlight.clear();
    this.localEntryCache = undefined;
    this.localEntryInFlight = null;
  }

  public async getLocalPlayerEntry(): Promise<Maybe<LeaderboardEntry>> {
    if (this.networkingService.isServerContext()) return null;

    if (this.localEntryCache !== undefined) return this.localEntryCache;
    if (this.localEntryInFlight) return await this.localEntryInFlight;

    this.localEntryInFlight = (async () => {
      const entry = await this.fetchLocalPlayerEntry();
      this.localEntryCache = entry;
      return entry;
    })().finally(() => {
      this.localEntryInFlight = null;
    });

    return await this.localEntryInFlight;
  }

  // page number: 1-based index
  public async getLeaderboardEntriesByPage(pageNumber: number): Promise<LeaderboardEntry[]> {
    if (this.networkingService.isServerContext()) return [];

    if (pageNumber < 1) return [];

    const cached = this.entriesCache.get(pageNumber);
    if (cached) return cached;

    const inFlight = this.entriesInFlight.get(pageNumber);
    if (inFlight) return await inFlight;

    const request = (async () => {
      const entries = await this.fetchLeaderboardEntries(pageNumber);
      this.entriesCache.set(pageNumber, entries);
      return entries;
    })().finally(() => {
      this.entriesInFlight.delete(pageNumber);
    });

    this.entriesInFlight.set(pageNumber, request);
    return await request;
  }

  private async fetchLocalPlayerEntry(): Promise<Maybe<LeaderboardEntry>> {
    // Load player's existing entry (if any)
    const localPlayer = PlayerService.get().getLocalPlayer();

    if(localPlayer === null)
      return null;

    const entry = this.leaderboardsService.fetchEntryForPlayer(localPlayer, LEADERBOARD_API_NAME);

    return entry;
  }

  // page number: 1-based index
  private async fetchLeaderboardEntries(pageNumber: number):  Promise<LeaderboardEntry[]> { 
    if(pageNumber < 1)
      return [];

    const startingRank = (pageNumber - 1) * LeaderboardClient.PAGE_SIZE;
    const entries = await this.leaderboardsService.fetchEntries(LEADERBOARD_API_NAME, {
      startingRank,
      numEntries: LeaderboardClient.PAGE_SIZE
    })

    return entries;
  }

  public tryUpdateNewHighScore(newScore : number, extraData: string | undefined) {
    let localPlayer = PlayerService.get().getLocalPlayer();

    EventService.sendGlobally(TrySetNewHighScore, {
      player: localPlayer,
      newScore: newScore,
      extraData: extraData
    });
  }
}