/**
 * @generated SignedSource<<1d56651219909c60eff53a97317dc9303f9add4af64d7e953e44252d172d1b90>>
 * @generated This file is generated. Do not modify it manually. Use the UI View Model by importing it into your script.
 */

import {serializable, TextureAsset, UiEvent, UiViewModel, uiViewModel, type Maybe} from 'meta/worlds';

@serializable()
export class OnCommand000EventPayload {
  readonly parameter: number = 0;
}

export const OnCommand000Event = new UiEvent('DataUpgradeViewModel_OnCommand000Event', OnCommand000EventPayload);

@uiViewModel()
export class DataUpgradeViewModel extends UiViewModel {
  icon: Maybe<TextureAsset> = null;

  override readonly events = {
    Command000: OnCommand000Event,
  };
}
