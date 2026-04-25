/**
 * @generated SignedSource<<405b4d0d8b16c4db85636cbac22e432aadf59c3865422acd91197d7e2c4db23f>>
 * @generated This file is generated. Do not modify it manually. Use the UI View Model by importing it into your script.
 */

import { UiEvent, UiViewModel, uiViewModel } from "meta/worlds";
import { LeaderboardEntryViewModel } from "./LeaderboardEntryViewModel";

export const OnShowPreviousPageEvent = new UiEvent(
  "LeaderboardViewModel_OnShowPreviousPageEvent"
);
export const OnShowNextPageEvent = new UiEvent(
  "LeaderboardViewModel_OnShowNextPageEvent"
);
export const OnCloseLeaderboardEvent = new UiEvent(
  "LeaderboardViewModel_OnCloseLeaderboardEvent"
);

@uiViewModel()
export class LeaderboardViewModel extends UiViewModel {
  CanViewPreviousPage: boolean = false;
  CanViewNextPage: boolean = false;
  LeaderboardEntries: readonly LeaderboardEntryViewModel[] = [];
  /** @min 0 @max 100 @decimals 0 */
  CurrentPageNumber: number = 0;
  /** @min 0 @max 100 @decimals 0 */
  MaximumPageNumber: number = 0;

  override readonly events = {
    ShowPreviousPage: OnShowPreviousPageEvent,
    ShowNextPage: OnShowNextPageEvent,
    CloseLeaderboard: OnCloseLeaderboardEvent,
  };
}
