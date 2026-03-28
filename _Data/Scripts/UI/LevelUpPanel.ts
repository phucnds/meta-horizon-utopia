import {
  component,
  property,
  subscribe,
  UiEvent,
  UiViewModel,
  uiViewModel,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BasePanel } from './BasePanel';

const onTapEvent = new UiEvent('onTapEvent');

const onTapRate1 = new UiEvent('onTapRate1');
const onTapRate2 = new UiEvent('onTapRate2');
const onTapRate3 = new UiEvent('onTapRate3');

const onTapDamage1 = new UiEvent('onTapDamage1');
const onTapDamage2 = new UiEvent('onTapDamage2');
const onTapDamage3 = new UiEvent('onTapDamage3');

const onTapHealth1 = new UiEvent('onTapHealth1');
const onTapHealth2 = new UiEvent('onTapHealth2');
const onTapHealth3 = new UiEvent('onTapHealth3');


@uiViewModel()
class LevelUpPanelViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  @property()
  Opacity: number = 1;
  override readonly events = {
    onTapEvent,
    onTapRate1,
    onTapRate2,
    onTapRate3,
    onTapDamage1,
    onTapDamage2,
    onTapDamage3,
    onTapHealth1,
    onTapHealth2,
    onTapHealth3,
  };


  @property() public upgradeRate1: string = "Collapsed";
  @property() public upgradeRate2: string = "Collapsed";
  @property() public upgradeRate3: string = "Collapsed";

  @property() public upgradeDamage1: string = "Collapsed";
  @property() public upgradeDamage2: string = "Collapsed";
  @property() public upgradeDamage3: string = "Collapsed";

  @property() public upgradeHealth1: string = "Collapsed";
  @property() public upgradeHealth2: string = "Collapsed";
  @property() public upgradeHealth3: string = "Collapsed";
}

@component()
export class LevelUpPanel extends BasePanel<LevelUpPanelViewModel> {

  public onTap = new Signal();
  public onTap1 = new Signal();
  public onTap2 = new Signal();
  public onTap3 = new Signal();
  public onTapRate1 = new Signal();
  public onTapRate2 = new Signal();
  public onTapRate3 = new Signal();
  public onTapDamage1 = new Signal();
  public onTapDamage2 = new Signal();
  public onTapDamage3 = new Signal();
  public onTapHealth1 = new Signal();
  public onTapHealth2 = new Signal();
  public onTapHealth3 = new Signal();

  protected createViewModel(): LevelUpPanelViewModel {
    return new LevelUpPanelViewModel();
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('[LevelUpPanel] Tap - next wave');
    this.onTap.trigger();
  }

  @subscribe(onTapRate1)
  onTapRate1Handler() {
    console.log('[LevelUpPanel] Tap - rate 1');
    this.onTapRate1.trigger();
  }

  @subscribe(onTapRate2)
  onTapRate2Handler() {
    console.log('[LevelUpPanel] Tap - rate 2');
    this.onTapRate2.trigger();
  }

  @subscribe(onTapRate3)
  onTapRate3Handler() {
    console.log('[LevelUpPanel] Tap - rate 3');
    this.onTapRate3.trigger();
  }

  @subscribe(onTapDamage1)
  onTapDamage1Handler() {
    console.log('[LevelUpPanel] Tap - damage 1');
    this.onTapDamage1.trigger();
  }

  @subscribe(onTapDamage2)
  onTapDamage2Handler() {
    console.log('[LevelUpPanel] Tap - damage 2');
    this.onTapDamage2.trigger();
  }

  @subscribe(onTapDamage3)
  onTapDamage3Handler() {
    console.log('[LevelUpPanel] Tap - damage 3');
    this.onTapDamage3.trigger();
  }

  @subscribe(onTapHealth1)
  onTapHealth1Handler() {
    console.log('[LevelUpPanel] Tap - health 1');
    this.onTapHealth1.trigger();
  }

  @subscribe(onTapHealth2)
  onTapHealth2Handler() {
    console.log('[LevelUpPanel] Tap - health 2');
    this.onTapHealth2.trigger();
  }

  @subscribe(onTapHealth3)
  onTapHealth3Handler() {
    console.log('[LevelUpPanel] Tap - health 3');
    this.onTapHealth3.trigger();
  }


  private hideAll(): void {
    this.viewModel.upgradeRate1 = "Collapsed";
    this.viewModel.upgradeRate2 = "Collapsed";
    this.viewModel.upgradeRate3 = "Collapsed";
    this.viewModel.upgradeDamage1 = "Collapsed";
    this.viewModel.upgradeDamage2 = "Collapsed";
    this.viewModel.upgradeDamage3 = "Collapsed";
    this.viewModel.upgradeHealth1 = "Collapsed";
    this.viewModel.upgradeHealth2 = "Collapsed";
    this.viewModel.upgradeHealth3 = "Collapsed";
  }

  public case0(): void {
    this.hideAll();
    this.viewModel.upgradeRate1 = "Visible";
    this.viewModel.upgradeDamage1 = "Visible";
    this.viewModel.upgradeHealth1 = "Visible";
  }

  public case1(): void {
    this.hideAll();
    this.viewModel.upgradeRate1 = "Visible";
    this.viewModel.upgradeDamage2 = "Visible";
    this.viewModel.upgradeHealth2 = "Visible";
  }

  public case2(): void {
    this.hideAll();
    this.viewModel.upgradeRate2 = "Visible";
    this.viewModel.upgradeDamage1 = "Visible";
    this.viewModel.upgradeHealth3 = "Visible";
  }

  public case3(): void {
    this.hideAll();
    this.viewModel.upgradeRate2 = "Visible";
    this.viewModel.upgradeDamage3 = "Visible";
    this.viewModel.upgradeHealth1 = "Visible";
  }

  public case4(): void {
    this.hideAll();
    this.viewModel.upgradeRate3 = "Visible";
    this.viewModel.upgradeDamage2 = "Visible";
    this.viewModel.upgradeHealth3 = "Visible";
  }

  public case5(): void {
    this.hideAll();
    this.viewModel.upgradeRate3 = "Visible";
    this.viewModel.upgradeDamage3 = "Visible";
    this.viewModel.upgradeHealth2 = "Visible";
  }

  public case6(): void {
    this.hideAll();
    this.viewModel.upgradeRate1 = "Visible";
    this.viewModel.upgradeDamage3 = "Visible";
    this.viewModel.upgradeHealth3 = "Visible";
  }

  public case7(): void {
    this.hideAll();
    this.viewModel.upgradeRate3 = "Visible";
    this.viewModel.upgradeDamage1 = "Visible";
    this.viewModel.upgradeHealth2 = "Visible";
  }

  public case8(): void {
    this.hideAll();
    this.viewModel.upgradeRate2 = "Visible";
    this.viewModel.upgradeDamage2 = "Visible";
    this.viewModel.upgradeHealth1 = "Visible";
  }

  public case9(): void {
    this.hideAll();
    this.viewModel.upgradeRate1 = "Visible";
    this.viewModel.upgradeDamage1 = "Visible";
    this.viewModel.upgradeHealth3 = "Visible";
  }

  public showCase(): void {
    const cases = [
      () => this.case0(),
      () => this.case1(),
      () => this.case2(),
      () => this.case3(),
      () => this.case4(),
      () => this.case5(),
      () => this.case6(),
      () => this.case7(),
      () => this.case8(),
      () => this.case9(),
    ];
    const index = Math.floor(Math.random() * cases.length);
    cases[index]();
  }
}
