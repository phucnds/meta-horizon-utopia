# Utopia — Project Summary

## Overview

Wave-based survival shooter built in Meta Horizon Studio. The player controls a character who auto-aims / shoots at enemies, survives timed waves of increasingly difficult enemies, levels up between waves to pick roguelike upgrade cards, and clears the stage by completing all configured waves. A meta-progression layer lets the player spend gold (earned per wave) on permanent stat upgrades between runs.

## Core Gameplay

### Flow

1. **Loading** — `GameState.LOADING`; `LoadingPanel` visible while assets / pools warm up.
2. **Menu** — `GameState.MENU`; `MenuPanel` with the battle button.
3. **Game start** — `Game2.ts` wires all managers, registers enemy templates with `WaveManager`, spawns the player, and sets `GameState.GAME`.
4. **Wave active** — `WaveManager` ticks a `waveDuration` (default 60s) timer, spawning `WaveSegmentData` segments at the configured frequency. Enemies come from per-type `ObjectPool<BaseEnemy>` (default `poolSizePerType = 10`) and approach the player.
5. **Combat** — `Player` (Combat) holds one or more `Gun` instances via `PlayerWeapons`; guns fire `Projectile` / `EnemyProjectile` at sensed targets. Enemies (`MeleeEnemy`, `RangeEnemy`, boss via `BossBehaviour`) attack via `MeleeWeapon` / `RangeWeapon`. All damage routes through `HealthComponent` / `IDamageable`.
6. **Wave complete** — `WaveManager.onWaveComplete` fires → `CurrencyManager` awards `goldPerWave` (default 100) → `PlayerLevel` grants `XP_PER_WAVE` (50) → if a level-up is available, `GameState.WAVE_TRANSITION` opens `WaveTransitionPanel` with 3 upgrade options rolled by `UpgradeManager`.
7. **Upgrade pick** — Player taps one of `onTapOption1/2/3`; `Game2.applyUpgradeItem` applies the stat/effect change and returns to `GameState.GAME` for the next wave.
8. **Game over** — Player HP ≤ 0 → `GameState.GAME_OVER` → `GameOverPanel` offers **Retry** (new run) or **Upgrade** (opens `UpgradePlayerStats` meta-shop).
9. **Stage complete** — All waves cleared → `GameState.STAGE_COMPLETE` → `StageCompletePanel`.
10. **Retry** — Resets enemies, pools, player transform, temporary stat addends; keeps permanent addends and currency.

### Scoring & progression

- **Gold** (`CurrencyManager`): earned on wave complete (`goldPerWave`, default 100). Spent on permanent stat upgrades in `UpgradePlayerStats`.
- **XP / Player Level** (`PlayerLevel.ts`): `XP_PER_WAVE = 50` added per cleared wave; level-up costs defined by `XP_TABLE` (rising curve, 50 XP for level 2 upward). `onLevelUp` signal drives the upgrade card flow.
- **Run upgrades**: roguelike cards from `UpgradeManager` rolled against `UpgradeItemDataConfig`; tiers are **Common / Rare / Epic** (see `_Data/Images/Common.png`, `Rare.png`, `Epic.png`).
- **Permanent stats**: `PlayerStatsManager.permanentAddends` survive retry; `addends`, `objectAddends`, `percentAddends` reset. Final = `(base + permanent + addends + objectAddends) * (1 + percent/100)`.

### Player stats (`Stat` enum in `PlayerStatsManager.ts`)

| Id | Name | Base |
|----|------|------|
| 0 | Attack | 10 |
| 1 | AttackSpeed | 1 |
| 2 | CriticalChance | 5 |
| 3 | CriticalPercent | 1.5 |
| 4 | MoveSpeed | 5 |
| 5 | MaxHealth | 100 |
| 6 | Range | 15 |
| 7 | HealthRecoverySpeed | 0 |
| 8 | Armor | 0 |
| 9 | Luck | 0 |
| 10 | Dodge | 0 |
| 11 | LifeSteal | 0 |

### Enemy types (`EnemyType` enum in `_Data/DataConfig/DataEnemies.ts`)

| Id | Name | Role |
|----|------|------|
| 0 | MeleeBasic | Standard melee chaser |
| 1 | RangeBasic | Ranged attacker with projectile |
| 2 | MeleeFast | Faster, lower-HP melee rusher |
| 3 | MeleeTank | Slow, high-HP melee |
| 10 | Boss | Scripted boss via `BossBehaviour` |

Waves are driven by `WaveDataConfig` / `WaveSegmentData` in [_Data/DataConfig/WaveData.ts](_Data/DataConfig/WaveData.ts); enemy templates are registered with `WaveManager.registerEnemyTemplate`.

## Architecture (scripts under [_Data/Scripts/](_Data/Scripts/))

### Manager/ — top-level orchestration

| File | Role |
|------|------|
| [Game2.ts](_Data/Scripts/Manager/Game2.ts) | Main orchestrator: wires managers, registers signals, applies upgrades, runs state transitions |
| [GameStateManager.ts](_Data/Scripts/Manager/GameStateManager.ts) | Singleton; `GameState` enum (LOADING, MENU, GAME, UPGRADE_SELECTION, GAME_OVER, STAGE_COMPLETE, WAVE_TRANSITION); `onStateChanged` signal |
| [WaveManager.ts](_Data/Scripts/Manager/WaveManager.ts) | Wave timer, segment spawning, enemy pools, `onStartWave` / `onWaveComplete` |
| [UpgradeManager.ts](_Data/Scripts/Manager/UpgradeManager.ts) | Rolls 3 upgrade options on wave transition / level up |
| [PlayerStatsManager.ts](_Data/Scripts/Manager/PlayerStatsManager.ts) | Stat model (base/addends/permanent/percent), `onStatsChanged` |
| [PlayerLevel.ts](_Data/Scripts/Manager/PlayerLevel.ts) | XP/level, `onLevelUp` |
| [CurrencyManager.ts](_Data/Scripts/Manager/CurrencyManager.ts) | Gold balance, spend/refund |
| [InputManager.ts](_Data/Scripts/Manager/InputManager.ts) | Focused interaction / axis input |
| [UIManager.ts](_Data/Scripts/Manager/UIManager.ts) | Panel registration and transitions |
| [CameraManager.ts](_Data/Scripts/Manager/CameraManager.ts) | Camera follow / state |
| [SoundManager.ts](_Data/Scripts/Manager/SoundManager.ts) | `SoundAsset` references (shoot, enemy attack/hit/death/wave, win, lose, button click). See [Docs/AUDIO_MANAGER.md](AUDIO_MANAGER.md) |
| [HideAvatar.ts](_Data/Scripts/Manager/HideAvatar.ts) | Hides the default MHS avatar during gameplay |

### Combat/ — gameplay entities & weapons

| File | Role |
|------|------|
| [Player.ts](_Data/Scripts/Combat/Player.ts) | Player entity: movement, health, stats hookup, damage handling |
| [PlayerWeapons.ts](_Data/Scripts/Combat/PlayerWeapons.ts) | Holds and drives active `Gun` instances |
| [Gun.ts](_Data/Scripts/Combat/Gun.ts) | Fires `Projectile` at sensed targets; reads stats (Attack, AttackSpeed, Range, Crit) |
| [Weapon.ts](_Data/Scripts/Combat/Weapon.ts) / [RangeWeapon.ts](_Data/Scripts/Combat/RangeWeapon.ts) / [MeleeWeapon.ts](_Data/Scripts/Combat/MeleeWeapon.ts) | Weapon base + range/melee variants (used by enemies too) |
| [Projectile.ts](_Data/Scripts/Combat/Projectile.ts) / [EnemyProjectile.ts](_Data/Scripts/Combat/EnemyProjectile.ts) | Pooled projectiles, hit/damage routing |
| [BaseEnemy.ts](_Data/Scripts/Combat/BaseEnemy.ts) | Enemy base: pool-friendly lifecycle, targeting, death/defeat signals |
| [MeleeEnemy.ts](_Data/Scripts/Combat/MeleeEnemy.ts) / [RangeEnemy.ts](_Data/Scripts/Combat/RangeEnemy.ts) | Concrete enemy behaviours |
| [BossBehaviour.ts](_Data/Scripts/Combat/BossBehaviour.ts) | Boss script (phase/telegraph logic) |
| [HealthComponent.ts](_Data/Scripts/Combat/HealthComponent.ts) / [IDamageable.ts](_Data/Scripts/Combat/IDamageable.ts) | HP model + damage interface |
| [AnimationDisolve.ts](_Data/Scripts/Combat/AnimationDisolve.ts) / [AnimationDissolve.ts](_Data/Scripts/Combat/AnimationDissolve.ts) / [AnimationMoving.ts](_Data/Scripts/Combat/AnimationMoving.ts) | Visual effect helpers (enemy dissolve on death, movement anim) |
| [MathUtils.ts](_Data/Scripts/Combat/MathUtils.ts) | Combat math helpers |

### Sensor/ — target detection

| File | Role |
|------|------|
| [Sensor.ts](_Data/Scripts/Sensor/Sensor.ts) | Proximity / range sensor base (drives auto-aim) |
| [SensorProjectile.ts](_Data/Scripts/Sensor/SensorProjectile.ts) | Projectile hit-sensor |
| [SensorRangeWeapon.ts](_Data/Scripts/Sensor/SensorRangeWeapon.ts) | Range-weapon target acquisition |

### UI/ — panels

| File | Role |
|------|------|
| [BasePanel.ts](_Data/Scripts/UI/BasePanel.ts) | Shared panel base (show/hide/bindings) |
| [MenuPanel.ts](_Data/Scripts/UI/MenuPanel.ts) | Main menu / battle button |
| [GamePanel.ts](_Data/Scripts/UI/GamePanel.ts) | HUD: current wave, gold |
| [PlayerUI.ts](_Data/Scripts/UI/PlayerUI.ts) / [PlayerXPUI.ts](_Data/Scripts/UI/PlayerXPUI.ts) / [PlayerCurrencyPanel.ts](_Data/Scripts/UI/PlayerCurrencyPanel.ts) | Player HUD elements (HP bar, XP bar, currency) |
| [WaveTransitionPanel.ts](_Data/Scripts/UI/WaveTransitionPanel.ts) | Between-wave upgrade choice (3 options) |
| [LevelUpPanel.ts](_Data/Scripts/UI/LevelUpPanel.ts) | Level-up choice overlay |
| [UpgradeItem.ts](_Data/Scripts/UI/UpgradeItem.ts) | Upgrade card view-model |
| [UpgradePlayerStats.ts](_Data/Scripts/UI/UpgradePlayerStats.ts) | Meta-shop for permanent stat upgrades (spends gold) |
| [GameOverPanel.ts](_Data/Scripts/UI/GameOverPanel.ts) | Defeat screen: Retry / Upgrade |
| [StageCompletePanel.ts](_Data/Scripts/UI/StageCompletePanel.ts) | Victory screen |
| [LoadingPanel.ts](_Data/Scripts/UI/LoadingPanel.ts) | Loading overlay |
| [CustomMenu.ts](_Data/Scripts/UI/CustomMenu.ts) | Misc menu helper |

### Core/ / EventSystem/ / Utility/ / Utils/

| File | Role |
|------|------|
| [Core/ObjectPool.ts](_Data/Scripts/Core/ObjectPool.ts) / [Core/ObjectPoolMeta.ts](_Data/Scripts/Core/ObjectPoolMeta.ts) | Generic object pool for enemies, projectiles, VFX |
| [Core/VisibilityComponent.ts](_Data/Scripts/Core/VisibilityComponent.ts) | Visibility toggles for pooled entities |
| [EventSystem/Signal.ts](_Data/Scripts/EventSystem/Signal.ts) / [ISignal.ts](_Data/Scripts/EventSystem/ISignal.ts) | Lightweight typed signals (used as the main inter-system bus) |
| [Utility/](_Data/Scripts/Utility/) | `Assert`, `CancellationToken`, `Component`, `ComponentPool`, `DeferredPromise`, `Delay`, `DualKeyMap`, `EventPublisher`, `Image`, `Random`, `StateMachine`, `StringConversion`, `TimeConversion`, `Tween` |
| [Utils/AsyncUtils.ts](_Data/Scripts/Utils/AsyncUtils.ts) / [Utils/GameTimer.ts](_Data/Scripts/Utils/GameTimer.ts) | `delay` helpers, game-timer |

### UpgradeItem/ — data

| File | Role |
|------|------|
| [UpgradeItemDataConfig.ts](_Data/Scripts/UpgradeItem/UpgradeItemDataConfig.ts) | Upgrade item pool: tier (Common/Rare/Epic), stat key, value (flat or %), display image |

### Data configs

| File | Role |
|------|------|
| [_Data/DataConfig/WaveData.ts](_Data/DataConfig/WaveData.ts) | `WaveDataConfig[]`, `WaveSegmentData`; enemy types, counts, spawn frequency per wave |
| [_Data/DataConfig/DataEnemies.ts](_Data/DataConfig/DataEnemies.ts) | `EnemyType` enum + `DataEnemies` component mapping types → templates |

## Assets

| Area | Location |
|------|----------|
| Scripts | [_Data/Scripts/](_Data/Scripts/) |
| UI XAML | [_Data/UI-XAML/](_Data/UI-XAML/) (MenuPanel, GamePanel, WaveTransitionPanel, LevelUpPanel, GameOverPanel, StageCompletePanel, Loading, UpgradePanel, UpgradeItem, PlayerUI, PlayerXPUI, PlayerCurrency, UI_Crate_Health_Bar) |
| Images | [_Data/Images/](_Data/Images/) (Battle Button, Loading Screen, Defeat, Common/Rare/Epic tier icons, Currency, Home BG, heart, btnGreen/btnClose, [Upgrades/](_Data/Images/Upgrades/)) |
| Materials | [_Data/Materials/](_Data/Materials/) (mat-bg, mat-body-gun / mat-head-gun, mat-rocket, mat-fishbone, mat-line, mat-rock, mat-enemy-1/2/3, mat-enemy-Boss, mat-e-range, mat-cat) |
| Models | [_Data/Models/](_Data/Models/) |
| Prefabs | [_Data/Prefabs/](_Data/Prefabs/) — notably [Enemies/](_Data/Prefabs/Enemies/) (E_MeleeBasic, E_MeleeFast, E_MeleeTank, E_RangeBasic, E_Boss) |
| VFX | [_Data/MetaVFX_Utopia/](_Data/MetaVFX_Utopia/) — PopcornFX assets (hit / muzzle / death dissolve / smoke) |
| Sound | [_Data/Sound/](_Data/Sound/) — Button_Click, Lose, Shoot, Utopia_BG_Music, Win, Zombie_Attack, Zombie_Attacked, Zombie_Defeat, Zombie_Sound |
| Texture | [_Data/Texture/](_Data/Texture/) |
| Scene | [_Data/Scene/](_Data/Scene/) — `game.hstf` main scene; [player.hstf](player.hstf) at project root |

## Platform

- **Engine**: Meta Horizon Studio
- **Orientation**: Portrait (XAML panels designed tall)
- **Input**: Focused interaction via `InputManager`; virtual stick for movement, tap/release for firing flows
- **Physics**: `PhysicsBodyComponent` on player and enemies
- **TS policy**: `verbatimModuleSyntax` — use `import type { ... }` for type-only imports; API source is `meta/worlds`

## Constants worth tuning

| Concept | Where to look |
|---------|---------------|
| Wave duration, spawn distance, pool size per type, endless mode | [WaveManager](_Data/Scripts/Manager/WaveManager.ts) `@property()`s |
| Per-wave enemy segments, frequency, counts | [WaveData.ts](_Data/DataConfig/WaveData.ts) |
| Gold per wave | [Game2.ts](_Data/Scripts/Manager/Game2.ts) `goldPerWave` |
| XP per wave, XP cost table | [PlayerLevel.ts](_Data/Scripts/Manager/PlayerLevel.ts) `XP_PER_WAVE`, `XP_TABLE` |
| Base stats, per-level value, cost curve | [PlayerStatsManager.ts](_Data/Scripts/Manager/PlayerStatsManager.ts) `DEFAULT_BASE_STATS`, `DEFAULT_UPGRADE_CONFIGS` |
| Upgrade item pool (tier, stat, value) | [UpgradeItemDataConfig.ts](_Data/Scripts/UpgradeItem/UpgradeItemDataConfig.ts) |
| Enemy templates per type | [DataEnemies.ts](_Data/DataConfig/DataEnemies.ts), registered via `WaveManager.registerEnemyTemplate` |

## Documentation to read next

- [Docs/ART_DIRECTION.md](ART_DIRECTION.md) — visual direction
- [Docs/AUDIO_MANAGER.md](AUDIO_MANAGER.md) — audio wiring
- [Docs/PROJECT_RULES.md](PROJECT_RULES.md) — what AI agents may and may not change
- [Assistant/Skills/](../Assistant/Skills/) — agent skills (art, audio, scripting, global)
