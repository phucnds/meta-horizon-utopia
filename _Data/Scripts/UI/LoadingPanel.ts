import { component, property, UiViewModel, uiViewModel } from 'meta/worlds';
import { BasePanel } from './BasePanel';
import { delay } from '../Utils/AsyncUtils';

const LABEL = 'Loading';
const DOT_STEP_MS = 400;
const DOT_SUFFIXES = ['', '.', '..', '...'] as const;

@uiViewModel()
class LoadingPanelViewModel extends UiViewModel {
  @property() dataString: string = LABEL;
  @property() Opacity: number = 1;
}

@component()
export class LoadingPanel extends BasePanel<LoadingPanelViewModel> {
  private dotAnimStop = true;
  private dotAnimRunning = false;

  protected createViewModel(): LoadingPanelViewModel {
    return new LoadingPanelViewModel();
  }

  protected override onPanelStart(): void {
    this.viewModel.dataString = LABEL;
  }

  public override show(): void {
    super.show();
    this.dotAnimStop = false;
    void this.runDotAnimation();
  }

  public override async hide(): Promise<void> {
    this.dotAnimStop = true;
    await super.hide();
  }

  private async runDotAnimation(): Promise<void> {
    if (this.dotAnimRunning) return;
    this.dotAnimRunning = true;
    let i = 0;
    try {
      while (!this.dotAnimStop) {
        const dots = DOT_SUFFIXES[i % DOT_SUFFIXES.length]!;
        this.viewModel.dataString = LABEL + dots;
        i++;
        await delay(DOT_STEP_MS);
      }
    } finally {
      this.dotAnimRunning = false;
    }
  }
}
