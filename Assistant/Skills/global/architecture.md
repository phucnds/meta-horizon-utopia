---
name: Architecture
summary: High-level architecture, orchestration, signals, pooling, and platform constraints for Utopia
include: as_needed
imports: []
key_files:
  - _Data/Scripts/Manager/Game2.ts
  - _Data/Scripts/Manager/GameStateManager.ts
  - _Data/Scripts/Manager/WaveManager.ts
  - _Data/Scripts/Manager/PlayerStatsManager.ts
  - _Data/Scripts/EventSystem/Signal.ts
  - _Data/Scripts/Core/ObjectPool.ts
related:
  - ../art/asset_guidelines.md
  - ../audio/sound_design.md
---

# Architecture — Utopia

## Script layout (`_Data/Scripts/`)

```
_Data/Scripts/
├── Manager/         # Game2, GameStateManager, WaveManager, UpgradeManager,
│                    # PlayerStatsManager, PlayerLevel, CurrencyManager,
│                    # InputManager, UIManager, CameraManager, SoundManager,
│                    # HideAvatar
├── Combat/          # Player, PlayerWeapons, Gun, Weapon/RangeWeapon/MeleeWeapon,
│                    # Projectile, EnemyProjectile, BaseEnemy, MeleeEnemy,
│                    # RangeEnemy, BossBehaviour, HealthComponent, IDamageable,
│                    # AnimationDisolve / AnimationDissolve / AnimationMoving,
│                    # MathUtils
├── Sensor/          # Sensor, SensorProjectile, SensorRangeWeapon (auto-aim)
├── UI/              # BasePanel + panels (Menu, Game, Loading, GameOver,
│                    # LevelUp, WaveTransition, StageComplete, PlayerUI,
│                    # PlayerXPUI, PlayerCurrencyPanel, UpgradeItem,
│                    # UpgradePlayerStats, CustomMenu)
├── UpgradeItem/     # UpgradeItemDataConfig (roguelike upgrade pool)
├── Core/            # ObjectPool, ObjectPoolMeta, VisibilityComponent
├── EventSystem/     # Signal / ISignal
├── Utility/         # Assert, CancellationToken, Component, ComponentPool,
│                    # DeferredPromise, Delay, DualKeyMap, EventPublisher,
│                    # Image, Random, StateMachine, StringConversion,
│                    # TimeConversion, Tween
└── Utils/           # AsyncUtils (delay), GameTimer
```

Companion data configs live at `_Data/DataConfig/` (`DataEnemies.ts`, `WaveData.ts`).

## Patterns

### Orchestration

- **`Game2`** (`_Data/Scripts/Manager/Game2.ts`) is the top-level orchestrator. Its `init()` runs a fixed setup sequence: camera → player → weapons → wave manager → input → UI → upgrade manager → upgrade-shop → player HUD → XP UI → currency panel → sounds. It owns references to every other manager by `@property() Maybe<Entity>`, subscribes to every cross-system signal, applies upgrade picks via `applyUpgradeItem`, and runs state transitions through `GameStateManager`.
- **`GameStateManager`** is a singleton (`GameStateManager.get()`) that publishes `onStateChanged: Signal<GameState>`. States: `LOADING → MENU → GAME ↔ WAVE_TRANSITION / UPGRADE_SELECTION → GAME_OVER / STAGE_COMPLETE`. Use this signal as the integration point for state-gated behaviour (BGM, pause, UI toggles) — do **not** add a parallel state machine.
- Avoid parallel "god" duplicates. If you need a new subsystem, add a focused `Component`, register its entity as a `@property()` on `Game2`, and wire its signals from `Game2.init()`.

### Signals (event bus)

- `Signal<T>` in `_Data/Scripts/EventSystem/Signal.ts` (+ `ISignal.ts`) is the project's lightweight event bus. Concrete examples: `GameStateManager.onStateChanged`, `WaveManager.onStartWave` / `onWaveComplete`, `PlayerStatsManager.onStatsChanged`, `PlayerLevel.onLevelUp`, `WaveTransitionPanel.onTapOption1/2/3`.
- **Unsubscribe on teardown** — retry / scene reset will re-run `Game2.init` and re-wire handlers; leaked subscriptions double-fire.
- Prefer `Signal<T>` over ad-hoc callbacks or direct inter-component references for cross-system communication.

### State & stats

- **`PlayerStatsManager`** is the source of truth for player stats. Final value = `(base + permanentAddends + addends + objectAddends) * (1 + percentAddends / 100)`.
  - `permanentAddends` — persisted across retries (meta-shop).
  - `addends` / `objectAddends` / `percentAddends` — reset on retry (run-scoped).
- All stat consumers implement `IStatsDependent.updateStats(statsManager)` and subscribe to `onStatsChanged` — do not cache stat values without refreshing on that signal.
- **`Stat`** and **`EnemyType`** enums are identity-critical. Don't rename or renumber without migrating every `@property()`, `DEFAULT_*` map, `WaveSegmentData`, and `UpgradeItemDataConfig` entry in the same change.

### Wave loop

- **`WaveManager`** owns the wave timer (`waveDuration`, default 60s), enemy pools (one `ObjectPool<BaseEnemy>` per `EnemyType`, default `poolSizePerType = 10`), and segment spawning driven by `WAVE_DATA` (`WaveDataConfig[]` in `_Data/DataConfig/WaveData.ts`).
- Enemy templates are registered via `WaveManager.registerEnemyTemplate(type, template)` during setup — templates come from `DataEnemies.enemyEntries` (scene-authored list).
- Between-wave flow: `onWaveComplete` → `CurrencyManager.add(goldPerWave)` → `PlayerLevel.grantXp(XP_PER_WAVE)` → if level-up: `GameState.WAVE_TRANSITION` → `UpgradeManager` rolls 3 options → player taps → `Game2.applyUpgradeItem` → back to `GAME`.

### Combat & auto-targeting

- **Player** (`Combat/Player.ts`) holds a `HealthComponent` and one or more `Gun` instances via `PlayerWeapons`.
- **`Gun`** reads stats (`Attack`, `AttackSpeed`, `Range`, `CriticalChance`, `CriticalPercent`) from `PlayerStatsManager`, uses a `Sensor` / `SensorRangeWeapon` to acquire targets, and fires pooled `Projectile`s.
- Enemies (`BaseEnemy` → `MeleeEnemy` / `RangeEnemy` / boss via `BossBehaviour`) attack through `MeleeWeapon` / `RangeWeapon` / `EnemyProjectile` with damage routed through `HealthComponent` / `IDamageable`.
- Sensors decouple target acquisition from weapon firing — reuse `Sensor` rather than rolling bespoke range checks in gameplay code.

### Input

- **`InputManager`** exposes focused-interaction axes / discrete events. Don't route unrelated gameplay through input without documenting new contracts — the existing player/weapon systems rely on its current signal shape.

### Physics

- **`PhysicsBodyComponent`** on the player and on enemies. Movement runs through these bodies — don't transform-set position per frame on physics-bound entities.

### Pooling (critical at wave peaks)

- **`Core/ObjectPool.ts`** is the generic pool. Enemies, projectiles, and most transient gameplay entities go through it.
- At peak, ~5 types × 10 per pool + projectiles are alive simultaneously. **Never** call `spawnTemplate(...)` in a hot loop. New enemy / projectile / VFX types must plug into the existing pool or a new `ObjectPool<T>` owned by a manager.
- Pool reuses instances — templates must not hold per-spawn state that leaks between uses. Reset in `onSpawn` / `onDespawn` lifecycle hooks.

### UI

- **`BasePanel`** is the shared panel base (show / hide / bindings). All panels extend it.
- Panels are entity-hosted; `Game2` discovers them by `@property() Maybe<Entity>` and calls their `setup()` / binding methods.
- XAML under `_Data/UI-XAML/` is the source of truth for layout + binding names — when renaming a TS view-model field, update the XAML `Binding` in the same change (and vice versa) or bindings silently fail.
- Portrait-first — avoid landscape-only layouts.

### Async / timing

- `Utils/AsyncUtils.delay(ms)` for short waits (e.g. `Game2` setup uses `START_DELAY_MS = 500`, `POST_SOUND_INIT_DELAY_MS = 100`).
- `Utility/Delay.ts`, `Utility/CancellationToken.ts`, `Utility/DeferredPromise.ts`, `Utility/Tween.ts`, `Utils/GameTimer.ts` for more structured timing / animation.
- Subscribe to Meta Worlds events with `@subscribe(OnEntityStartEvent)` / `OnWorldUpdateEvent` — existing code uses this pattern consistently.

### Audio

- Entity + `SoundComponent` is the preferred routing pattern (see `Assistant/Skills/audio/sound_design.md`). `SoundManager` currently only declares asset slots.

## Constraints

- **Imports**: `meta/worlds` only. Do **not** import from `meta/platform_api` — matches current project policy and `tsconfig`.
- **`verbatimModuleSyntax`** is enabled: use `import type { ... }` for type-only imports (e.g. `import type { Entity, Maybe } from 'meta/worlds';`).
- **Portrait UI** only.
- **Pooling over instantiation** — enemies, projectiles, VFX must go through `ObjectPool` / manager-owned pools.
- **`.hstf` = source of truth** for instance values. Renaming `@property()` fields requires migrating every serialized scene / template reference.
- **Don't add parallel orchestrators** — extend `Game2` or add a focused component registered from `Game2.init()`.

## Adding a new subsystem — minimal recipe

1. Create a `Component` class under the appropriate folder (`Manager/`, `Combat/`, `UI/`, etc.).
2. Declare its public API as `Signal<T>` fields and `@property()` scene entities — don't reach across the codebase with static singletons unless you're extending `GameStateManager`.
3. Register an entity in the scene, attach the component, assign `@property()` references in the editor.
4. Add a `@property() Maybe<Entity>` slot on `Game2`, resolve / cache the component in its `setup*()` sequence, and subscribe to relevant existing signals (`onStateChanged`, `onWaveComplete`, `onStatsChanged`, `onLevelUp`).
5. Reset / unsubscribe on retry paths so re-running `Game2.init` doesn't stack duplicate listeners.
6. If the subsystem spawns entities at runtime, wire them through `Core/ObjectPool.ts`.
