import {component, Component, CustomUiComponent, OnEntityStartEvent, subscribe} from 'meta/worlds';
import { LeaderboardEntryViewModel } from '../../../assets/leaderboard/viewmodel/LeaderboardEntryViewModel';
import { LeaderboardViewModel } from '../../../assets/leaderboard/viewmodel/LeaderboardViewModel';

@component()
export class LeaderboardPanel extends Component {
  @subscribe(OnEntityStartEvent)
  onStart() {
    const customUi = this.entity.getComponent(CustomUiComponent);
    if (customUi) {
      const leaderboard = new LeaderboardViewModel();
      leaderboard.CurrentPageNumber = 1;
      leaderboard.MaximumPageNumber = 10;
      leaderboard.CanViewNextPage = false;
      leaderboard.CanViewPreviousPage = true;

      const sampleEntries = [
        { name: 'ShadowPuncher', score: 9420 },
        { name: 'NovaStrike', score: 8735 },
        { name: 'IronGale', score: 8110 },
        { name: 'KnuckleDuster', score: 7504 },
        { name: 'You', score: 6988, isCurrentPlayer: true },
        { name: 'WrathOfDawn', score: 6412 },
        { name: 'CrimsonOrbit', score: 5870 },
        { name: 'QuietStorm', score: 5233 },
        { name: 'ByteCrusher', score: 4719 },
        { name: 'SilentEmber', score: 4082 },
      ];

      const leaderboardEntries: LeaderboardEntryViewModel[] = sampleEntries.map((data, index) => {
        const entry = new LeaderboardEntryViewModel();
        entry.Ranking = index + 1;
        entry.Name = data.name;
        entry.Score = data.score;
        entry.IsCurrentPlayer = data.isCurrentPlayer ?? false;
        entry.EntryOpacity = 1;
        return entry;
      });
      leaderboard.LeaderboardEntries = leaderboardEntries;

      customUi.dataContext = leaderboard;

      // console.error('Set up');
    }
  }

  public show(): void {
    const customUi = this.entity.getComponent(CustomUiComponent);
    if (customUi) {
      customUi.isVisible = true;
    }
  }

  public hide(): void {
    const customUi = this.entity.getComponent(CustomUiComponent);
    if (customUi) {
      customUi.isVisible = false;
    }
  }
}
