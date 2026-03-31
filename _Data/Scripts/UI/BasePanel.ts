import {
  Component,
  CustomUiComponent,
  OnEntityStartEvent,
  subscribe,
  UiViewModel,
} from 'meta/worlds';
import { delay } from '../Utils/AsyncUtils';

export interface IFadableViewModel {
  Opacity: number;
}

export abstract class BasePanel<T extends UiViewModel & IFadableViewModel> extends Component {

  protected abstract createViewModel(): T;

  protected viewModel!: T;
  protected customUI: CustomUiComponent | null = null;
  protected fadeDuration: number = 0.3;

  public setup(): void {
    this.viewModel = this.createViewModel();
    this.customUI = this.entity.getComponent(CustomUiComponent);
    if (this.customUI) {
      this.customUI.dataContext = this.viewModel;
    }
    this.hide();
    this.onPanelStart();

    console.log(`[BasePanel] Setup ${this.constructor.name}`);
    
  }

  protected onPanelStart(): void {}

  public show(): void {
    if (this.customUI && !this.customUI.isVisible) {
      this.customUI.isVisible = true;
    }
  }

  public async hide(): Promise<void> {
    if (this.customUI && this.customUI.isVisible) {
      this.customUI.isVisible = false;
    }
  }

  public getVisible(): boolean {
    return this.customUI?.isVisible ?? false;
  }

  protected getViewModel(): T {
    return this.viewModel;
  }

  private async fadeIn(): Promise<void> {
    const steps = 10;
    const stepTime = (this.fadeDuration * 1000) / steps;
    const stepValue = 1 / steps;
    for (let i = 0; i < steps; i++) {
      this.viewModel.Opacity = Math.min(1, this.viewModel.Opacity + stepValue);
      await delay(stepTime);
    }
    this.viewModel.Opacity = 1;
  }

  private async fadeOut(): Promise<void> {
    const steps = 10;
    const stepTime = (this.fadeDuration * 1000) / steps;
    const stepValue = 1 / steps;
    for (let i = 0; i < steps; i++) {
      this.viewModel.Opacity = Math.max(0, this.viewModel.Opacity - stepValue);
      await delay(stepTime);
    }
    this.viewModel.Opacity = 0;
  }
}
