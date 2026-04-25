import {
  component,
  Component,
  CustomUiComponent,
  OnEntityStartEvent,
  subscribe,
  uiViewModel,
  UiViewModel,
  type Maybe,
} from 'meta/worlds';

import { LeaderboardEntryViewModel } from '../../../assets/leaderboard/viewmodel/LeaderboardEntryViewModel';
import {
  LeaderboardViewModel,
  OnCloseLeaderboardEvent,
  OnShowPreviousPageEvent,
  OnShowNextPageEvent,
} from '../../../assets/leaderboard/viewmodel/LeaderboardViewModel';
import { Signal } from '../EventSystem/Signal';
import { LeaderboardClient } from '../LeaderBoard/LeaderboardClient';




@component()
export class LeaderboardPanel extends Component {

  private leaderboard = new LeaderboardViewModel();
  private leaderBoardClient: Maybe<LeaderboardClient> = null;

  public onHideLeaderboard = new Signal();
  @subscribe(OnEntityStartEvent)
  onStart() {

    this.leaderBoardClient = this.entity.getComponent(LeaderboardClient);

    const customUi = this.entity.getComponent(CustomUiComponent);
    if (customUi) {
      this.leaderboard.CurrentPageNumber = 1;
      this.leaderboard.MaximumPageNumber = 10;
      this.leaderboard.CanViewNextPage = false;
      this.leaderboard.CanViewPreviousPage = false;
      this.leaderboard.rootView = "Collapsed";
      this.leaderboard.LeaderboardEntries = [];

      customUi.dataContext = this.leaderboard;
    }
  }

  public async show(): Promise<void> {
    this.leaderboard.rootView = "Visible";
    await this.refreshLeaderboardData();
    // void this.loadTop100ForTest();
  }

  private async refreshLeaderboardData(): Promise<void> {
    if (!this.leaderBoardClient) return;

    const [entries, localEntry] = await Promise.all([
      this.leaderBoardClient.getLeaderboardEntriesByPage(1),
      this.leaderBoardClient.getLocalPlayerEntry(),
    ]);

    const localRank = localEntry?.rank ?? -1;

    this.leaderboard.LeaderboardEntries = entries.map((entry) => {
      const vm = new LeaderboardEntryViewModel();
      vm.Ranking = entry.rank;
      vm.Name = entry.playerAlias;
      vm.Score = entry.score;
      vm.IsCurrentPlayer = entry.rank === localRank;
      vm.EntryOpacity = 1;
      return vm;
    });

    console.log(`[LeaderboardPanel] refreshLeaderboardData loaded ${entries.length} entries`);
  }

  public loadTop100ForTest(): void {
    const NAMES = [
      'ShadowPuncher', 'NovaStrike', 'IronGale', 'KnuckleDuster', 'WrathOfDawn',
      'CrimsonOrbit', 'QuietStorm', 'ByteCrusher', 'SilentEmber', 'NightHowler',
    ];
    const LOCAL_PLAYER_RANK = 25;

    const entries: LeaderboardEntryViewModel[] = [];
    for (let i = 0; i < 100; i++) {
      const vm = new LeaderboardEntryViewModel();
      vm.Ranking = i + 1;
      vm.Name = i + 1 === LOCAL_PLAYER_RANK ? 'You' : `${NAMES[i % NAMES.length]}_${i + 1}`;
      vm.Score = 10000 - i * 80;
      vm.IsCurrentPlayer = i + 1 === LOCAL_PLAYER_RANK;
      vm.EntryOpacity = 1;
      entries.push(vm);
    }

    this.leaderboard.LeaderboardEntries = entries;
    console.log(`[LeaderboardPanel] loadTop100ForTest filled ${entries.length} sample entries`);
  }

  public hide(): void {
    const customUi = this.entity.getComponent(CustomUiComponent);
    if (customUi) {

      this.leaderboard.rootView = "Collapsed";
    }
  }

  @subscribe(OnShowPreviousPageEvent)
  onShowPreviousPageHandler() {
    console.log('Show Previous Page');
  }

  @subscribe(OnShowNextPageEvent)
  onShowNextPageHandler() {
    console.log('Show Next Page');
  }

  @subscribe(OnCloseLeaderboardEvent)
  onCloseLeaderboardHandler() {
    console.log('Close Leaderboard');
    this.onHideLeaderboard.trigger();
  }
}
