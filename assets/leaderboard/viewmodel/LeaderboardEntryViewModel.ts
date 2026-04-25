/**
 * @generated SignedSource<<9c0f934316b2ee3fee8137af92eae0d58b18165153bd4116f3cc36b703268ca2>>
 * @generated This file is generated. Do not modify it manually. Use the UI View Model by importing it into your script.
 */

import {UiViewModel, uiViewModel} from 'meta/worlds';

@uiViewModel()
export class LeaderboardEntryViewModel extends UiViewModel {
  /** @min 1 @max 99 @decimals 0 */
  Ranking: number = 1;
  Name: string = "";
  /** @min 0 @max 10000 @decimals 0 */
  Score: number = 0;
  IsCurrentPlayer: boolean = false;
  /** @min 0 @max 1 @decimals 0 */
  EntryOpacity: number = 0;
}
