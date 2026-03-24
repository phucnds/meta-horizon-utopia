---
name: create-component
description: Creates a new TypeScript component file when the user enters "create component {component_name}" with a file path.
---

# Create Component

Use this skill when the user enters the phrase **"create component {component_name}"** along with a file path.

## Trigger

The user must provide:
- The phrase `create component` followed by a component name
- A file path where the component should be created

Example input:
```
create component PlayerController _Data/Scripts/Gameplay/PlayerController
```

## Workflow

1. Extract `{component_name}` and the target file path from the user's input.
2. Create a new TypeScript file named `{component_name}.ts` at the provided path, using the template below — replacing `{component_name}` with the actual class name provided by the user.
3. Confirm to the user that the file was created successfully.

## Template

```ts
import { component, Component, OnEntityStartEvent, subscribe } from 'meta/worlds';

@component()
export class {component_name} extends Component {

  @subscribe(OnEntityStartEvent)
  onStart() {
    console.log('onStart');
  }

}
```

