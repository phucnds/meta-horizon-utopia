---
name: Enemies & Waves
summary: Mandatory skill for adding a new enemy — pick a BaseEnemy behaviour, duplicate a template, register in EnemyType + DataEnemies, tune WAVE_DATA
include: as_needed
imports:
  - coding_standards.md
key_files:
  - _Data/Scripts/Combat/BaseEnemy.ts
  - _Data/Scripts/Combat/MeleeEnemy.ts
  - _Data/Scripts/Combat/RangeEnemy.ts
  - _Data/Scripts/Combat/BossBehaviour.ts
  - _Data/Scripts/Combat/HealthComponent.ts
  - _Data/Scripts/Manager/WaveManager.ts
  - _Data/Scripts/Core/ObjectPool.ts
  - _Data/DataConfig/DataEnemies.ts
  - _Data/DataConfig/WaveData.ts
  - _Data/Prefabs/Enemies/EnemyBasic.hstf
  - _Data/Prefabs/Enemies/E_MeleeBasic.hstf
  - _Data/Prefabs/Enemies/E_MeleeFast.hstf
  - _Data/Prefabs/Enemies/E_MeleeTank.hstf
  - _Data/Prefabs/Enemies/E_RangeBasic.hstf
  - _Data/Prefabs/Enemies/E_Boss.hstf
  - _Data/Scene/game.hstf
related:
  - coding_standards.md
  - ../art/asset_guidelines.md
---

# Enemies & waves

## AI: read this entire file (mandatory)

**Before any work that adds a new enemy type, recolors / reskins an existing one, or tunes its wave appearance:**

1. Read **`coding_standards.md`** → sections **`@property()` and `.hstf`**, **Pooling**, and **Stats & data contracts** (the `EnemyType` warning is load-bearing).
2. Read **this file from top to bottom** (behaviour overview, then the **single checklist** below).
3. **Before closing the task:** complete **Mandatory verification for agents** — confirm (a) the new `EnemyType` enum value matches the `EnemyEntry` in `game.hstf` **and** the `enemyType` used in `WAVE_DATA`; (b) the new `EnemyEntry` is listed inside `DataEnemies.enemyEntries`; (c) `WaveManager` has a pool for the type when the wave that references it starts.

Do **not** treat "recolor of an existing enemy" and "a brand-new behaviour" as two different procedures. Both follow the same pipeline — **pick a behaviour class → duplicate a template → register enum + EnemyEntry → add wave segments**. The only branch is whether you need a **new behaviour class** (step 1) or can reuse `MeleeEnemy` / `RangeEnemy` (step 2 onwards).

## Behaviour

- **`BaseEnemy`** (`_Data/Scripts/Combat/BaseEnemy.ts`): abstract, extends `Component`, implements `IDamageable`. Owns HP (`HealthComponent`), hit-flash, dissolve-on-death, target tracking, `moveTowardTarget` / `lookAtTarget` helpers, and the `onDied` signal that `WaveManager` uses to return the instance to the pool. Subclasses must implement `onUpdate(dt)`.
- **`MeleeEnemy`** extends `BaseEnemy`: `attackRange`, `attackDelay`, `damage`, optional `attackVfxEntity`. If target is within `attackRange`, idle + tick `attackCooldown`; else `moveTowardTarget`.
- **`RangeEnemy`** extends `BaseEnemy`: same fields plus `projectileTemplate` (spawned via `WorldService.spawnTemplate`, then `EnemyProjectile.shoot(dir, damage, target)`).
- **`BossBehaviour`** (optional on the root) hooks `onIdle` / `onMove` / `onAttack` for boss animation/state. Any `BaseEnemy` subclass calls it defensively via `this.bossBehaviour?.*`.
- **Hit flash / dissolve** are driven from `BaseEnemy`: the first `ColorComponent` found on any child is picked up; if absent, flash is silently skipped. `AnimationMoving` + `AnimationDissolve` are optional but expected on all shipped templates.

## Spawning

- **`WaveManager`** (`_Data/Scripts/Manager/WaveManager.ts`) owns `enemyPools: Map<EnemyType, ObjectPool<BaseEnemy>>` keyed by the enum numeric value. `registerEnemyTemplate(type, template)` creates one pool per type with `poolSizePerType` (default **10**; serialized on the scene entity).
- **`DataEnemies`** (`_Data/DataConfig/DataEnemies.ts`) reads `EnemyEntry[]` from `game.hstf` at setup time and builds `Map<EnemyType, TemplateAsset>`. `Game2` iterates that map and calls `WaveManager.registerEnemyTemplate` for each entry — so **an enemy without an `EnemyEntry` in `game.hstf` is never pooled, and wave segments referencing it log `[WaveManager] No pool for enemyType: N`**.
- **`WAVE_DATA`** (`_Data/DataConfig/WaveData.ts`) is a flat array of `WaveDataConfig`. Each wave has `segments: WaveSegmentData[]`; a segment defines `{ startPercent, endPercent, spawnFrequency, enemyType, enemyHp }`. `waveDuration` (default **60s**) is serialized on the scene's `WaveManager`; segments are gated against `timer / waveDuration` (percent of wave elapsed).
- **Endless mode**: if `endlessMode` is on and wave index wraps past the array, HP is multiplied by `1.5` per loop and the display number keeps climbing. New enemies must survive HP scaling — do not hard-code HP bounds inside behaviours.

## Enemy types (code enum)

`EnemyType` in `_Data/DataConfig/DataEnemies.ts`: each value is a **unique integer** used as the pool key in `WaveManager`. Current values: `MeleeBasic = 0`, `RangeBasic = 1`, `MeleeFast = 2`, `MeleeTank = 3`, `Boss = 10`.

- **Do not renumber or rename existing members.** They are referenced from `WAVE_DATA`, from `EnemyEntry.enemyType` in `game.hstf` (serialized by name, e.g. `"MeleeFast"`), and any renumber desynchronizes pools.
- New values: pick the **next free integer** (e.g. `4`, `5`, …). Leave the `Boss = 10` gap as-is — it exists on purpose so boss IDs stay clustered.

## New enemy — single checklist (code + editor)

Follow **in order**. Material / mesh rules are defined in **`../art/asset_guidelines.md`**; they are not duplicated here.

### 1. Decide the behaviour class

- **Reuse `MeleeEnemy`** if the enemy walks toward the target and swings in range. Tune via serialized `moveSpeed`, `attackRange`, `attackDelay`, `damage`, optional `attackVfxEntity`.
- **Reuse `RangeEnemy`** if the enemy walks to a stand-off distance and fires a projectile. Tune the same fields plus `projectileTemplate` (must expose an `EnemyProjectile` component).
- **Write a new subclass** only if neither pattern fits (e.g. dash + area, stationary turret, self-destruct). The new class **must**:
  - Live under `_Data/Scripts/Combat/`, be `@component()`, extend `BaseEnemy`, and implement `protected onUpdate(dt: number): void`.
  - Only rely on `BaseEnemy` protected members (`this.targetEntity`, `this.transform`, `this.moveTowardTarget`, `this.lookAtTarget`, `this.distanceToTarget`, `this.bossBehaviour`, `this.canUpdate`, `this.enemyAttackSoundComponent`). Do **not** duplicate `HealthComponent` — inherited.
  - Expose editor fields via `@property()` with sensible primitive defaults (see `MeleeEnemy.ts` for the idiom).
  - Not touch `onDied` directly — `BaseEnemy.handleDeath` + `onDissolveComplete` already emit it; re-subscribing will double-release into the pool.

### 2. Duplicate the source template and set up materials

- In the editor, **duplicate** a working enemy template whose behaviour matches your choice in step 1 (`E_MeleeBasic.hstf` / `E_RangeBasic.hstf` / …) into `_Data/Prefabs/Enemies/` with a clear name (e.g. `E_MeleeShielder.hstf`).
- **Keep the same child hierarchy** (`Enemy` root → `visual` → `Plane` + `FX_attack` + `FX_Utopia_enemy_explode`) and **same component set** as the source. Missing children break `AnimationMoving` / `AnimationDissolve` / `attackVfxEntity` wiring and gameplay silently degrades (dead enemies stay visible, no hit flash, etc.).
- **Point the behaviour component at the new class**: in the root entity's `DataDefinitionAsset` block, `class` should be `"MeleeEnemy"`, `"RangeEnemy"`, or your new class name. `definitionAsset` must reference the **compiled script's asset** for that class; duplicate from a template that already has it rather than guessing IDs.
- **If the visible look differs from the source** (recolor or new skin):
  - For **each** material slot the source uses, create a **new** `.material` (duplicate from the source material in the project) with a clear prefix.
  - In each new material, **mirror the source material's fields** (same shader, same texture slot pattern, same non-color parameters). Horizon materials use serialized asset IDs — keep the attribute layout identical to the file you duplicated from.
  - **Assign only the new materials** on the duplicated template's mesh slots (`Plane` child).
- **Changing look** on those new materials — pick by final visual quality, not speed:
  - **Tint / base color / multiply** on the new material if the shader exposes it (fast, often enough for subtle shifts).
  - **New texture** if tinting kills detail, banding, or contrast. Author a new albedo (or the map the shader uses) and wire it in the duplicated material with the same slots as the source.

### Mandatory verification for agents (materials + template binding)

**Before marking any "new enemy" or recolor task complete**, confirm the following in the editor or in serialized template / material data. Skipping this is a common failure mode: a new `.material` file exists but **tint / colour was never changed**, or materials were created but the enemy template still references the source enemy's materials.

1. **Tint / colour on new materials** — For each duplicated `.material` that must look different from its source: open the asset and verify **tint, base colour, multiply, or whatever colour fields the shader exposes** (or the wired albedo / texture) **actually differs** from the source material when the design calls for a distinct look. Filename changes without serialized colour/texture changes still render like the original.
2. **Materials assigned on the new template** — On the duplicated enemy template (`.hstf`), every mesh material slot that should use the new look **must reference the new `.material` instances**. Do not leave slots pointing at the template you duplicated **from** unless you intentionally share one material across enemies.
3. **Behaviour class wired** — The root entity's `DataDefinitionAsset` block has `class` set to the correct behaviour (`MeleeEnemy` / `RangeEnemy` / new subclass), and (for `RangeEnemy`) `projectileTemplate` is not null.

If any check fails, fix it before considering the task done (then run the smoke test in step 6).

### 3. Add `EnemyType` in TypeScript

- Open `_Data/DataConfig/DataEnemies.ts`.
- Add a new entry to `enum EnemyType` with the **next free integer** (e.g. after `MeleeTank = 3`, use `4`; do **not** reuse `10` — reserved for bosses).
- The member name is what `game.hstf` serializes in `EnemyEntry.enemyType` (e.g. `"MeleeShielder"`), so pick a readable PascalCase name.

### 4. Register an `EnemyEntry` in `game.hstf`

- In the scene, the **DataConfig** parent entity hosts both `DataEnemies` and one child entity **per enemy type**, each with an `EnemyEntry` component.
- Append a new child entity under the same parent (copy an existing entry block — `MeleeBasic` / `MeleeFast` / …). Set:
  - A new `"id"` (fresh UUID).
  - `"name"` matching the enum member (e.g. `"MeleeShielder"`).
  - An `EnemyEntry` component block with:
    - `"enemyType": "<EnumMember>"` — **must** match the name you added in step 3. Note: the default `MeleeBasic = 0` entry omits `enemyType` because it's the enum default; every other entry serializes it explicitly.
    - `"template"`: the new enemy template's asset reference (`packageOrRemoteId` / `ingestionId` / `targetId`).
- Append the new entity's `"id"` to **`DataEnemies.enemyEntries`** on the parent entity. Missing this step is the most common failure — the template file exists, the enum value exists, but `DataEnemies.setup()` never registers it, `WaveManager` has no pool, and the wave logs `No pool for enemyType`.

### 5. Add wave segments in `WAVE_DATA`

- Open `_Data/DataConfig/WaveData.ts`.
- Add at least one `WaveSegmentData` entry to each wave you want the new enemy to appear in:
  - `startPercent` / `endPercent` (0–100, percent of `waveDuration`).
  - `spawnFrequency` (enemies per second during that window).
  - `enemyType: EnemyType.<NewMember>`.
  - `enemyHp` (scales with endless multiplier at runtime).
- **Pool-size sanity check**: `WaveManager.poolSizePerType` is **10** by default. If a segment `spawnFrequency * (endPercent - startPercent)/100 * waveDuration` exceeds 10 simultaneously alive, `pool.borrow()` will return null and spawns silently drop. Either lower frequency or raise `poolSizePerType` on the scene's `WaveManager` entity.

**Wave tuning defaults (new enemies)**

| Field | Suggested default | Constraint |
| --- | --- | --- |
| `spawnFrequency` | **0.3–1.0** per wave at introduction | > 0. Zero never spawns. |
| `startPercent` / `endPercent` | **0 / 100** for steady, **30 / 70** for mid-wave spike | `end > start`, both 0–100. |
| `enemyHp` | Match the HP curve for the same wave's `MeleeBasic` entry (scale up for tanks, down for fast variants) | Keep within `moveSpeed × attackDamage` playtest envelope. |

### 6. Smoke test

- Build scripts; run the game from Wave 1 (or the wave where the new enemy is gated).
- Verify in logs:
  - `[DataEnemies] Registered N enemy templates` — N increased by 1.
  - **No** `[WaveManager] No pool for enemyType: X` errors during the wave.
- In play: enemy spawns according to frequency, takes damage, flashes red on hit, dissolves on death, and the wave ends (`[WaveManager] tryEndWave: ending wave index K`) once all active instances are cleared.

## Safe extensions

- Add new enemy subclasses under `_Data/Scripts/Combat/` as long as they extend `BaseEnemy` and don't bypass `HealthComponent` / pooling.
- Tune per-instance stats via `@property()` + scene overrides on the template (code defaults are fine fallbacks).
- Scale `poolSizePerType` on the scene's `WaveManager` entity if a new enemy is designed to swarm.

## Protected

- **Do not renumber or rename** `EnemyType` members — they are referenced by name in `game.hstf` (`EnemyEntry.enemyType`) and by value in `WAVE_DATA`. A single renumber desynchronizes every wave.
- **Do not bypass `WaveManager.enemyPools`** for combat-time spawning (no `WorldService.spawnTemplate` per enemy in hot loops). Pooling is load-bearing for wave peaks.
- **Do not remove** `AnimationMoving` / `AnimationDissolve` / `VisibilityComponent` from the root — `BaseEnemy` and the pool release path rely on them.
- **Do not subscribe to `onDied` from inside a subclass** to trigger pool release; `WaveManager.spawnEnemy` already owns that handler and double-releasing corrupts the pool.
