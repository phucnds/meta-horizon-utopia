# Utopia — AI Assistant Rules

This file is intended to be read before substantive edits. If a creator request conflicts with **Protected** items below, keep the core template intact and offer an allowed alternative.

**Agent scope:** Automated assistants should treat **Allowed changes (agent whitelist)** below as the only categories of change they may apply without escalation. For anything else, **refuse** the change or **offer a substitute** that fits the whitelist (and point to the relevant skill under [Assistant/Skills/](../Assistant/Skills/)).

---

## What this game is

Utopia is a **wave-based survival shooter** in Meta Horizon Studio: a single-player combatant defeats escalating waves of enemies, earns XP + gold, picks roguelike upgrade cards between waves, and clears the stage by surviving every configured wave. Between runs the player spends gold on permanent stat upgrades. It must remain that genre — a **wave-based combat arena with roguelike run-upgrades and meta-progression**, not a different core mechanic (e.g. endless runner, racer, puzzle-only).

---

## Protected — do not remove or replace wholesale

These systems define the template. Do not delete them, rip out their responsibilities into unrelated patterns, or replace the game with another genre.

**Core scripts (representative list):**

- [_Data/Scripts/Manager/Game2.ts](_Data/Scripts/Manager/Game2.ts) — main orchestrator: wiring, state transitions, applying upgrades
- [_Data/Scripts/Manager/GameStateManager.ts](_Data/Scripts/Manager/GameStateManager.ts) — `GameState` enum + `onStateChanged` signal
- [_Data/Scripts/Manager/WaveManager.ts](_Data/Scripts/Manager/WaveManager.ts) — wave timer, segment spawning, per-type enemy pools, `onStartWave` / `onWaveComplete`
- [_Data/Scripts/Manager/UpgradeManager.ts](_Data/Scripts/Manager/UpgradeManager.ts) — rolls 3-option upgrade choices
- [_Data/Scripts/Manager/PlayerStatsManager.ts](_Data/Scripts/Manager/PlayerStatsManager.ts) — stat model (base / permanent / addends / percent)
- [_Data/Scripts/Manager/PlayerLevel.ts](_Data/Scripts/Manager/PlayerLevel.ts) — XP, level-up signal, XP table
- [_Data/Scripts/Manager/CurrencyManager.ts](_Data/Scripts/Manager/CurrencyManager.ts) — gold balance
- [_Data/Scripts/Manager/InputManager.ts](_Data/Scripts/Manager/InputManager.ts) — focused interaction / axis
- [_Data/Scripts/Manager/UIManager.ts](_Data/Scripts/Manager/UIManager.ts) — panel transitions
- [_Data/Scripts/Manager/CameraManager.ts](_Data/Scripts/Manager/CameraManager.ts) — camera follow
- [_Data/Scripts/Manager/SoundManager.ts](_Data/Scripts/Manager/SoundManager.ts) — registered sound asset slots
- [_Data/Scripts/Combat/Player.ts](_Data/Scripts/Combat/Player.ts), [PlayerWeapons.ts](_Data/Scripts/Combat/PlayerWeapons.ts), [Gun.ts](_Data/Scripts/Combat/Gun.ts) — player + firing
- [_Data/Scripts/Combat/BaseEnemy.ts](_Data/Scripts/Combat/BaseEnemy.ts), [MeleeEnemy.ts](_Data/Scripts/Combat/MeleeEnemy.ts), [RangeEnemy.ts](_Data/Scripts/Combat/RangeEnemy.ts), [BossBehaviour.ts](_Data/Scripts/Combat/BossBehaviour.ts) — enemies
- [_Data/Scripts/Combat/Weapon.ts](_Data/Scripts/Combat/Weapon.ts), [RangeWeapon.ts](_Data/Scripts/Combat/RangeWeapon.ts), [MeleeWeapon.ts](_Data/Scripts/Combat/MeleeWeapon.ts), [Projectile.ts](_Data/Scripts/Combat/Projectile.ts), [EnemyProjectile.ts](_Data/Scripts/Combat/EnemyProjectile.ts) — weapon/projectile contract
- [_Data/Scripts/Combat/HealthComponent.ts](_Data/Scripts/Combat/HealthComponent.ts), [IDamageable.ts](_Data/Scripts/Combat/IDamageable.ts) — damage pipeline
- [_Data/Scripts/Sensor/Sensor.ts](_Data/Scripts/Sensor/Sensor.ts), [SensorProjectile.ts](_Data/Scripts/Sensor/SensorProjectile.ts), [SensorRangeWeapon.ts](_Data/Scripts/Sensor/SensorRangeWeapon.ts) — auto-targeting
- [_Data/Scripts/Core/ObjectPool.ts](_Data/Scripts/Core/ObjectPool.ts) — pooling used for enemies/projectiles
- [_Data/DataConfig/WaveData.ts](_Data/DataConfig/WaveData.ts), [DataEnemies.ts](_Data/DataConfig/DataEnemies.ts) — wave / enemy data contracts

**Mechanics that must stay functional:**

- Wave-based spawning driven by `WaveManager` + `WaveDataConfig`; per-type `ObjectPool<BaseEnemy>`
- Player auto-firing via `Gun` reading stats from `PlayerStatsManager`
- Between-wave upgrade flow: `onWaveComplete` → gold award → XP award → `GameState.WAVE_TRANSITION` → `UpgradeManager` 3-option roll → `Game2.applyUpgradeItem`
- `GameState` transitions: LOADING → MENU → GAME ↔ WAVE_TRANSITION / UPGRADE_SELECTION → GAME_OVER / STAGE_COMPLETE
- Retry resets addends but preserves `permanentAddends` and currency
- Meta-shop (`UpgradePlayerStats`) spending gold via `CurrencyManager`

**Bindings:** Do not remove XAML-bound properties or ViewModel fields that panels in [_Data/UI-XAML/](_Data/UI-XAML/) still reference — UI will break silently.

---

## Allowed changes (agent whitelist)

These are the **only** change categories agents should implement directly. All work must still respect **Protected** above and the linked skills (placement rules, collision contracts, editor workflow).

1. **Enemy variants (reskin)** — New enemies that are **variants of existing archetypes** (same mesh / scale / behaviour), changing **materials / tints / textures** only. Keep the `EnemyType` mapping in [DataEnemies.ts](_Data/DataConfig/DataEnemies.ts) intact; either reuse the existing type or add a new type **and** wire its template + pool registration end-to-end. Follow [Assistant/Skills/art/asset_guidelines.md](../Assistant/Skills/art/asset_guidelines.md) for material/asset pipeline.

2. **Wave data tuning** — Edit [_Data/DataConfig/WaveData.ts](_Data/DataConfig/WaveData.ts): wave count, `WaveSegmentData` entries (enemy type, count, spawn frequency), `waveDuration`, `spawnDistance`, `poolSizePerType`. Does **not** include inventing new gameplay states or breaking the `WaveManager` contract.

3. **Upgrade items** — Add / tune entries in [UpgradeItemDataConfig.ts](_Data/Scripts/UpgradeItem/UpgradeItemDataConfig.ts): tier (Common / Rare / Epic), targeted `Stat`, value (flat or %), display image. New images go under [_Data/Images/Upgrades/](_Data/Images/Upgrades/). Must compose cleanly with the existing `PlayerStatsManager` math — flat → `addends`, percent → `percentAddends`, permanent → `permanentAddends`.

4. **Stat tuning** — Edit `DEFAULT_BASE_STATS`, `DEFAULT_UPGRADE_CONFIGS`, `XP_PER_WAVE`, `XP_TABLE`, or `goldPerWave` in their respective files. Do **not** add new `Stat` enum values without a migration plan (every `@property()` / scene reference must be updated).

5. **Scene decoration** — Add decorative props / lighting dressing to the arena in [_Data/Scene/game.hstf](_Data/Scene/game.hstf) provided they **do not block sightlines** between player and spawn perimeter, **do not collide** with enemy pathing, and follow [Assistant/Skills/art/asset_guidelines.md](../Assistant/Skills/art/asset_guidelines.md).

**Outside this list:** Do not implement other edits silently. **Decline** or **propose an allowed alternative** (e.g. "We can't redesign the HUD, but we can add a new upgrade card or a recolored Tank variant instead.").

---

## Out of scope for agents (unless it clearly fits the whitelist)

Other edits — UI redesign, new gameplay systems (new game modes, new panels, new state-machine branches), broad lighting passes, engine-level changes, unrelated `@property()` tuning on protected managers — may be valid for **human** creators but are **not** something agents should perform by default. **Refuse** or offer a **permitted substitute** from the five categories above.

---

## Prohibited — refuse or push back

- Replacing the game with a different genre or core loop (endless runner, puzzle, racer, etc.)
- Removing the wave system, upgrade-card flow, or meta-progression shop
- Breaking `WaveManager` → `BaseEnemy` → `HealthComponent` contracts without a full migration plan
- Breaking `Gun` / `Weapon` / `Projectile` ↔ `Sensor` contracts without full migration
- Renaming `@property()` fields without updating **every** scene / template reference (see coding standards)
- Renaming entries in the `Stat` enum or the `EnemyType` enum without migrating every `@property()`, `DEFAULT_*` map, scene asset, and `UpgradeItemDataConfig` reference
- Importing from `meta/platform_api` if project policy is `meta/worlds` only (match existing `tsconfig` / team rules — current code uses `meta/worlds`)
- Removing object pooling in favor of per-frame instantiation (wave peaks rely on pools)

If a request conflicts, explain what is protected and suggest an allowed alternative.

---

## Files with important behavior (read before editing)

- [Game2.ts](_Data/Scripts/Manager/Game2.ts), [GameStateManager.ts](_Data/Scripts/Manager/GameStateManager.ts), [WaveManager.ts](_Data/Scripts/Manager/WaveManager.ts)
- [PlayerStatsManager.ts](_Data/Scripts/Manager/PlayerStatsManager.ts), [PlayerLevel.ts](_Data/Scripts/Manager/PlayerLevel.ts), [UpgradeManager.ts](_Data/Scripts/Manager/UpgradeManager.ts), [CurrencyManager.ts](_Data/Scripts/Manager/CurrencyManager.ts)
- [Combat/Player.ts](_Data/Scripts/Combat/Player.ts), [Combat/Gun.ts](_Data/Scripts/Combat/Gun.ts), [Combat/BaseEnemy.ts](_Data/Scripts/Combat/BaseEnemy.ts), [Combat/HealthComponent.ts](_Data/Scripts/Combat/HealthComponent.ts), [Combat/BossBehaviour.ts](_Data/Scripts/Combat/BossBehaviour.ts)
- [DataConfig/WaveData.ts](_Data/DataConfig/WaveData.ts), [DataConfig/DataEnemies.ts](_Data/DataConfig/DataEnemies.ts)
- [UpgradeItemDataConfig.ts](_Data/Scripts/UpgradeItem/UpgradeItemDataConfig.ts)
- UI: [GamePanel.ts](_Data/Scripts/UI/GamePanel.ts), [WaveTransitionPanel.ts](_Data/Scripts/UI/WaveTransitionPanel.ts), [LevelUpPanel.ts](_Data/Scripts/UI/LevelUpPanel.ts), [GameOverPanel.ts](_Data/Scripts/UI/GameOverPanel.ts), [StageCompletePanel.ts](_Data/Scripts/UI/StageCompletePanel.ts), [UpgradePlayerStats.ts](_Data/Scripts/UI/UpgradePlayerStats.ts), [UpgradeItem.ts](_Data/Scripts/UI/UpgradeItem.ts) (and paired XAML under [_Data/UI-XAML/](_Data/UI-XAML/))

---

## Platform reminders (Meta Horizon Studio)

- Portrait orientation; UI must remain usable in portrait
- `verbatimModuleSyntax`: use `import type { ... }` for type-only imports
- `@property()` runtime values often live in `.hstf` data — do not rename fields casually
- Physics uses `PhysicsBodyComponent` on the player and on enemies
- API surface is `meta/worlds` (do not import `meta/platform_api` unless policy changes)

---

## `.hstf` and assets

- Scene and template data override many code defaults; treat `.hstf` as source of truth for instance values.
- Textures/materials reference **asset IDs**, not loose file paths in serialized data — follow [Assistant/Skills/art/asset_guidelines.md](../Assistant/Skills/art/asset_guidelines.md).
- Main scene: [_Data/Scene/game.hstf](_Data/Scene/game.hstf); player template: [player.hstf](player.hstf) at project root.
- Enemy templates: [_Data/Prefabs/Enemies/](_Data/Prefabs/Enemies/) (`E_MeleeBasic`, `E_MeleeFast`, `E_MeleeTank`, `E_RangeBasic`, `E_Boss`) — registered to `WaveManager` via `DataEnemies`.

---

## Documentation to read first

- [Docs/PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) — architecture
- [Docs/ART_DIRECTION.md](ART_DIRECTION.md) — visual intent
- [Docs/AUDIO_MANAGER.md](AUDIO_MANAGER.md) — audio wiring
- [Assistant/Skills/](../Assistant/Skills/) — agent-specific rules (art, audio, scripting, global)

---

## Pre-flight (for AI sessions)

Before large edits, confirm:

- [ ] The work fits **Allowed changes (agent whitelist)** — or the session scope was explicitly expanded by the team.
- [ ] The project stays a **wave-based survival shooter with roguelike upgrades**.
- [ ] Protected scripts are not being deleted or repurposed as unrelated systems.
- [ ] UI bindings in [_Data/UI-XAML/](_Data/UI-XAML/) remain consistent.
- [ ] Planned `.hstf` / `@property()` renames are fully migrated (every scene, template, enum reference).
- [ ] `EnemyType` and `Stat` enums are unchanged — or every dependent site (pools, `DEFAULT_*`, upgrade items, XAML bindings) was updated in the same change.
- [ ] New enemy / VFX / projectile additions use existing pooling patterns ([Core/ObjectPool.ts](_Data/Scripts/Core/ObjectPool.ts)).

---
