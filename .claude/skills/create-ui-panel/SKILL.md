---
name: Create UI Panel
description: Creates a new TypeScript UI Panel file when the user enters "giup toi tao {panel_name}" (e.g. "giup toi tao MenuPanel").
---

# Create UI Panel

Use this skill when the user enters the phrase **"giup toi tao {panel_name}"** or **"giúp tôi tạo {panel_name}"**.

## Trigger

The user must provide:
- The phrase `giúp tôi tạo` (or `giup toi tao`) followed by a panel name

Example input:
```
giúp tôi tạo MenuPanel
```

## Workflow

1. Extract `{panel_name}` from the user's input.
2. Create a new TypeScript file named `{panel_name}.ts` at the directory `_Data/Scripts/UI/`, using the template below — replacing all occurrences of `{panel_name}` with the actual class name provided by the user.
3. Confirm to the user that the file was created successfully.

## Template

```ts
import {
  component,
  Component,
  CustomUiComponent,
  OnEntityStartEvent,
  property,
  subscribe,
  UiEvent,
  UiViewModel,
  uiViewModel,
} from 'meta/worlds';
import { Signal } from '../Core/EventSystem/Signal';

const onTapEvent = new UiEvent('onTapEvent');

@uiViewModel()
class {panel_name}ViewModel extends UiViewModel {

  @property()
  dataString: string = "data";
  override readonly events = {
    onTapEvent,
  };
}

@component()
export class {panel_name} extends Component {

  public onTap = new Signal();

  private viewModel = new {panel_name}ViewModel();

  @subscribe(OnEntityStartEvent)
  onStart() {
    const customUI = this.entity.getComponent(CustomUiComponent);
    if (customUI) {
      customUI.dataContext = this.viewModel;
    }
  }

  @subscribe(onTapEvent)
  onTapHandler() {
    console.log('Tap');
    this.onTap.trigger();
  }
}
```
