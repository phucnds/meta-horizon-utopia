---
name: Coding Standards
summary: TypeScript conventions and Meta Horizon Studio constraints for Utopia
include: always
imports: []
key_files:
  - _Data/Scripts/Manager/Game2.ts
  - _Data/Scripts/Manager/GameStateManager.ts
  - _Data/Scripts/Manager/WaveManager.ts
  - _Data/Scripts/Manager/PlayerStatsManager.ts
  - _Data/Scripts/EventSystem/Signal.ts
  - _Data/Scripts/Core/ObjectPool.ts
  - tsconfig.json
  - tsconfig.custom.json
related:
  - player.md
  - ../global/architecture.md
---

# Coding Standards — Utopia

## Components

- Scripts extend `Component` from `meta/worlds` with the `@component()` decorator.
- Expose editor fields with `@property()`:
  - Prefer `Maybe<T>` for optional references (`Maybe<Entity>`, `Maybe<SoundAsset>`, `Maybe<TemplateAsset>`).
  - Use `readonly Entity[]` for lists the editor populates (see `DataEnemies.enemyEntries`).
  - Primitive defaults go on the property declaration: `@property() private waveDuration: number = 60;`.
- Lifecycle: use `@subscribe(OnEntityStartEvent)` for init and `@subscribe(OnWorldUpdateEvent)` for per-frame logic — as in `Game2.onStart` / `WaveManager`. Don't hand-register duplicate listeners for the same events without reason.
- For async init, have `onStart()` call `void this.init()` where `init(): Promise<void>` does the real setup (existing pattern in `Game2.ts`).

## Imports

- **`meta/worlds` only** — do not import from `meta/platform_api`. `tsconfig.custom.json` maps `meta/worlds` to the SDK path.
- **`verbatimModuleSyntax` is on** — use `import type { ... }` for type-only imports:
  ```ts
  import { component, Component, property, subscribe } from 'meta/worlds';
  import type { Entity, Maybe, TemplateAsset } from 'meta/worlds';
  ```
- Group imports: engine (`meta/worlds`) first, then project modules relative to the current folder.

## Async

- `async` / `await` plus `delay()` from `_Data/Scripts/Utils/AsyncUtils.ts` handle sequencing in UI and init (`Game2.init` uses `START_DELAY_MS = 500`, `POST_SOUND_INIT_DELAY_MS = 100`).
- Structured timing helpers live under `_Data/Scripts/Utility/`: `Delay`, `CancellationToken`, `DeferredPromise`, `Tween`, and `Utils/GameTimer.ts`. Use these over ad-hoc `setTimeout`.
- **Do not `await` inside `OnWorldUpdateEvent` handlers** — keep the update path synchronous. Schedule deferred work via signals / timers.

## Naming

- **Files & classes:** PascalCase (`Game2.ts`, `WaveManager`, `BaseEnemy`, `PlayerStatsManager`).
- **Members & locals:** camelCase; private fields use a plain name (no `_` prefix) — match existing code (`this.currentWaveIndex`, `this.enemyPools`).
- **Constants:** `SCREAMING_SNAKE_CASE` for module-level constants (`START_DELAY_MS`, `XP_PER_WAVE`, `XP_TABLE`, `WAVE_DATA`, `DEFAULT_BASE_STATS`).
- **Enums:** PascalCase type, PascalCase members (`GameState.WAVE_TRANSITION`, `EnemyType.MeleeBasic`, `Stat.CriticalChance`).
- **Signals:** prefixed `on` (`onStateChanged`, `onStartWave`, `onWaveComplete`, `onStatsChanged`, `onLevelUp`, `onTapOption1`).
- **Managers:** name ends in `Manager` (`UIManager`, `WaveManager`, `CurrencyManager`). Subsystems or data-only classes don't need the suffix.

## Signals (event bus)

- Use `Signal<T>` from `_Data/Scripts/EventSystem/Signal.ts` for cross-system communication — not bespoke callback arrays or direct method references.
- Declare signals as `public readonly`: `public readonly onWaveComplete = new Signal<number>();`.
- Subscribe from the owning system (`Game2.init`) so lifetime matches the orchestrator.
- **Unsubscribe on teardown** — retry / scene reset re-runs `Game2.init` and will stack handlers otherwise.

## Stats & data contracts

- **`Stat` enum** (`PlayerStatsManager.ts`): renaming or renumbering breaks `DEFAULT_BASE_STATS`, `DEFAULT_UPGRADE_CONFIGS`, every `UpgradeItemDataConfig` entry, and all `IStatsDependent` consumers. Don't.
- **`EnemyType` enum** (`_Data/DataConfig/DataEnemies.ts`): values are wired to pools in `WaveManager` and referenced from `WAVE_DATA` segments. Don't rename or renumber without migrating every site.
- Stat formula: `(base + permanentAddends + addends + objectAddends) * (1 + percentAddends / 100)`. Additive bonuses go through `addStat` / `addPermanentStat` / `addObjectStat`; multiplicative through `addStatPercent`. Consumers must implement `IStatsDependent.updateStats` and subscribe to `onStatsChanged` — never cache stat values without refreshing on that signal.

## Pooling

- Transient gameplay entities (enemies, projectiles, VFX) must go through `_Data/Scripts/Core/ObjectPool.ts` or a manager-owned pool (`WaveManager.enemyPools`).
- **No `spawnTemplate(...)` in hot loops.** Wave peaks are ~5 types × 10 per pool + projectiles alive at once — new additions must plug into existing pools.
- Pooled components must **reset per-instance state** on `onSpawn` / `onDespawn` — the pool reuses instances.

## `@property()` and `.hstf`

- **Do not rename** `@property()` fields casually — serialized scenes / templates (`.hstf`) reference them by name. If you must rename, update every scene / template in the same change.
- Code defaults may be overridden by `.hstf` instance data; changing a default in `.ts` won't affect existing scene instances until those are re-serialized.
- Main scene: `_Data/Scene/game.hstf`. Player template: `player.hstf` (project root). Enemy templates: `_Data/Prefabs/Enemies/*.hstf`.

## UI bindings (XAML)

- XAML under `_Data/UI-XAML/` is authoritative for binding names. If you rename a TS view-model field (e.g. `waveString`, `goldString`, `xpString`, `upgradeName`) **update the paired `.xaml` in the same change**, otherwise bindings silently fail.
- Panels extend `BasePanel` (`_Data/Scripts/UI/BasePanel.ts`); reuse its show/hide/binding helpers instead of rolling per-panel code.

## Error handling

- Null-check `Maybe<Entity>` / `Maybe<Component>` before use; early-return on missing setup during init rather than throwing:
  ```ts
  if (!this.playerEntity) return;
  const player = this.playerEntity.getComponent(Player);
  if (!player) return;
  ```
- Prefer `?.` and `?? null` over non-null assertions (`!`). Project code uses optional chaining (`this.enemyWaveSound?.getComponent(SoundComponent) ?? null`).
- Use `console.log('[System] ...')` with a system tag for debug output (existing pattern: `console.log('[GameStateManager] Setting state to ...')`). Remove or gate verbose logs before shipping.
- For development-time invariants use `_Data/Scripts/Utility/Assert.ts`.

## Comments & docs

- Default to **no comments**. Write one only when the *why* is non-obvious (hidden constraint, invariant, workaround). Identifiers should self-describe.
- Don't add "added for X", "used by Y" trailers — that belongs in PR descriptions.
- Existing inline comments are mostly Vietnamese team notes; match that convention if you're documenting Vietnamese-facing intent, otherwise English is fine.

## Protected / sensitive

- **Do not modify `tsconfig.json`** — Meta Horizon Studio manages it and will overwrite manual changes. Edit `tsconfig.custom.json` instead.
- **Do not import `meta/platform_api`** — project policy is `meta/worlds` only.
- **Do not delete or repurpose** `Game2`, `GameStateManager`, `WaveManager`, `UpgradeManager`, `PlayerStatsManager`, `PlayerLevel`, `CurrencyManager`, or the `Combat/` weapon/enemy pipeline — these are protected by `Docs/PROJECT_RULES.md`.
- **Do not rename** the `Stat` or `EnemyType` enum members without a full migration plan covering every scene / template / data config reference.
