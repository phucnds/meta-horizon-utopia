---
name: Sound Design
summary: Sound authoring, playback routing, and wiring checklist for Utopia
include: as_needed
imports: []
key_files:
  - _Data/Scripts/Manager/SoundManager.ts
  - _Data/Scripts/Manager/WaveManager.ts
  - _Data/Scripts/Manager/Game2.ts
  - _Data/Sound/
related:
  - ../art/asset_guidelines.md
  - ../scripting/coding_standards.md
---

# Sound design — Utopia

## Status

An audio **manager stub** exists: `_Data/Scripts/Manager/SoundManager.ts`. It declares `@property() Maybe<SoundAsset>` slots for every known gameplay event but does **not** centralize playback today. Playback happens in the systems that trigger the event (e.g. `Gun.ts` for shoot, `WaveManager.ts` for wave ambience / enemy hit / death, `Game2.ts` for win / lose transitions), each holding its own `SoundComponent` reference.

When adding sounds, use the **entity + `SoundComponent`** pattern already present in `WaveManager` / `Game2`. Do not scatter loose `SoundAsset` imports across gameplay code.

## Asset locations

- Clips: `_Data/Sound/*.mp3`
- Background music: `Utopia_BG_Music.mp3`
- Currently registered clips:

| Event | File |
|-------|------|
| UI button tap | `Button_Click.mp3` |
| Player shoot | `Shoot.mp3` |
| Stage complete | `Win.mp3` |
| Game over | `Lose.mp3` |
| Enemy attack | `Zombie_Attack.mp3` |
| Enemy takes damage | `Zombie_Attacked.mp3` |
| Enemy defeated | `Zombie_Defeat.mp3` |
| Wave ambience (looped, 4s) | `Zombie_Sound.mp3` |
| BGM | `Utopia_BG_Music.mp3` |

> "Zombie_*" filenames are legacy flavor; they map to the generic enemy slots in `SoundManager` regardless of future theming.

## `SoundManager` slot reference

Defined as `@property() Maybe<SoundAsset>` on `SoundManager` (`_Data/Scripts/Manager/SoundManager.ts`):

| Slot | Intended trigger |
|------|------------------|
| `buttonClickSound` | Any UI button tap (`BasePanel` subclasses) |
| `shootSound` | `Gun.ts` → projectile spawn |
| `enemyAttackSound` | `MeleeWeapon` / `RangeWeapon` on enemy attack |
| `enemyHitSound` | `HealthComponent` damage callback on enemy |
| `enemyDeathSound` | `BaseEnemy` death / defeat signal |
| `enemyWaveSound` | `WaveManager` looped ambient cue |
| `loseSound` | `GameState.GAME_OVER` transition in `Game2.ts` |
| `winSound` | `GameState.STAGE_COMPLETE` transition in `Game2.ts` |

`WaveManager` also has scene-entity counterparts (`enemyAttackSound`, `enemyDeathSound`, `enemyHitSound`, `enemyWaveSound` as `Maybe<Entity>`) so it can call `entity.getComponent(SoundComponent).play(...)` directly without touching `SoundManager`.

## Playback patterns

### 1. Entity + `SoundComponent` (preferred — used in the codebase)

1. Create a scene entity, attach a `SoundComponent`, and assign the `SoundAsset` on it in the editor.
2. On the calling system (a `Component`), add `@property() private xxxSound: Maybe<Entity> = null;`.
3. Cache the component in the lifecycle event where the entity becomes valid:
   ```ts
   this.xxxSoundComponent = this.xxxSound?.getComponent(SoundComponent) ?? null;
   ```
4. Play from the gameplay event handler:
   ```ts
   this.xxxSoundComponent?.play();
   ```

Examples in-tree: `WaveManager.setPlayer` caches `enemyWaveSoundComponent`; `Game2.ts` plays `soundWinEntity` / `soundLoseEntity` on state changes.

### 2. `SoundAsset` slot on `SoundManager`

Use for one-shot, fire-and-forget SFX where the caller doesn't need a dedicated `SoundComponent`. Resolve the asset from `SoundManager` and play through an available `SoundComponent`.

## Adding a new sound — checklist

1. **Drop the clip** into `_Data/Sound/` (prefer `.mp3` to match existing assets; keep SFX short; BGM must loop seamlessly).
2. **Import** it in Meta Horizon Studio so it has an asset ID.
3. **Pick a routing pattern**:
   - If the event belongs on the stub manager, add a new `@property() public xxxSound: Maybe<SoundAsset> = null;` on `SoundManager` and assign in the scene.
   - If the event is system-local, add a `Maybe<Entity>` property on the calling component and place a scene entity with a `SoundComponent` referencing the clip.
4. **Wire the trigger**:
   - UI: call from the panel's button handler in `_Data/Scripts/UI/*.ts`.
   - Combat: fire in `Gun.ts`, `MeleeWeapon.ts`, `RangeWeapon.ts`, `Projectile.ts`, `HealthComponent.ts`, `BaseEnemy.ts` as appropriate.
   - State: fire in `Game2.ts` on `GameStateManager.onStateChanged`.
5. **Test at wave peak** — play the scene long enough to hit a full wave (10+ enemies × 5 types). If the SFX stacks unpleasantly, either duck / stagger it or cap overlapping `SoundComponent` instances.

## Hook points reference

| Event | Where to call |
|-------|---------------|
| Menu open / battle button | `MenuPanel` tap handler |
| Game start | `Game2.startGame()` or `GameState.GAME` entry |
| Wave start | `WaveManager.onStartWave` |
| Wave complete | `WaveManager.onWaveComplete` |
| Upgrade card pick | `WaveTransitionPanel` `onTapOption1/2/3` → `Game2.applyUpgradeItem` |
| Level up | `PlayerLevel.onLevelUp` |
| Player fires | `Combat/Gun.ts` (already wired) |
| Player takes damage | `Combat/Player.ts` / `HealthComponent` damage callback |
| Enemy attack | `Combat/MeleeWeapon.ts` / `Combat/RangeWeapon.ts` (enemy-side) |
| Enemy hit | `Combat/HealthComponent.ts` → enemy |
| Enemy death | `Combat/BaseEnemy.ts` death / defeat |
| Boss phase / tell | `Combat/BossBehaviour.ts` (add dedicated cue for each telegraph ≥ 0.5s before impact) |
| Game over | `GameStateManager.onStateChanged` → `GAME_OVER` (already wired via `Game2`) |
| Stage complete | `GameStateManager.onStateChanged` → `STAGE_COMPLETE` (already wired via `Game2`) |
| BGM loop | Start on `GAME` state, pause on `GAME_OVER` / `STAGE_COMPLETE` — not wired yet |

## Rules & protected items

- Do **not** rename `@property()` fields on `SoundManager` without updating every scene / template reference — scene bindings are the source of truth.
- Do **not** call `SoundAsset.play`-style operations per-frame from tight loops; gate by event or by a cooldown (see `WaveManager.waveSoundInterval = 4s` as the pattern).
- Keep the BGM at a single instance — never stack multiple BGM `SoundComponent`s during retry.
- Prefer **pooling / caching** the `SoundComponent` reference (as `WaveManager` does) over calling `entity.getComponent(SoundComponent)` every trigger.

## Golden prompts

- Adding a new SFX slot (e.g. "level up" cue): valid agent task — extend `SoundManager` + wire in `PlayerLevel.onLevelUp`.
- Replacing an existing clip (e.g. swap `Shoot.mp3`): valid — follow *Adding a new sound — checklist* but skip property wiring.
- Redesigning the audio architecture (adding buses, spatialization, a message-based service) is **out of scope** for agents — propose as a human-authored change instead.
