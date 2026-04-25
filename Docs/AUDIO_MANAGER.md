# Audio — Utopia

## Current state (codebase)

A dedicated manager exists: [_Data/Scripts/Manager/SoundManager.ts](_Data/Scripts/Manager/SoundManager.ts). It's a `Component` that holds `SoundAsset` `@property()` references assigned in the scene / template. At the time of writing, it exposes the asset slots but the playback routing (from gameplay events → `SoundComponent.play`) happens **in the systems that trigger them** (e.g. [Gun.ts](_Data/Scripts/Combat/Gun.ts) plays the shoot sound on fire; `Game2.ts` plays win/lose on state transitions; `WaveManager` plays the periodic wave ambient sound).

There is **no** centralized key-map / event-bus audio service yet — each caller holds its own `SoundComponent` reference or reads one from `SoundManager`.

## Registered sound asset slots

Defined on [`SoundManager`](_Data/Scripts/Manager/SoundManager.ts) as `@property() Maybe<SoundAsset>`:

| Slot | Trigger (intended) |
|------|--------------------|
| `buttonClickSound` | Any UI button tap |
| `loseSound` | `GameState.GAME_OVER` |
| `winSound` | `GameState.STAGE_COMPLETE` |
| `shootSound` | Player `Gun` fires a projectile |
| `enemyAttackSound` | Enemy weapon triggers an attack |
| `enemyHitSound` | Enemy takes damage |
| `enemyDeathSound` | Enemy HP ≤ 0 / defeated |
| `enemyWaveSound` | Looped / periodic wave ambience (every `waveSoundInterval = 4s` in [WaveManager.ts](_Data/Scripts/Manager/WaveManager.ts)) |

The `WaveManager` also exposes `enemyAttackSound` / `enemyDeathSound` / `enemyHitSound` / `enemyWaveSound` as **scene entities** (not assets) so the manager can call `entity.getComponent(SoundComponent).play(...)` directly on them.

## Sound files on disk

Audio clips live in [_Data/Sound/](_Data/Sound/):

| File | Mapped to |
|------|-----------|
| `Button_Click.mp3` | `buttonClickSound` |
| `Shoot.mp3` | `shootSound` |
| `Win.mp3` | `winSound` |
| `Lose.mp3` | `loseSound` |
| `Utopia_BG_Music.mp3` | Background music (gameplay loop) |
| `Zombie_Attack.mp3` | `enemyAttackSound` |
| `Zombie_Attacked.mp3` | `enemyHitSound` |
| `Zombie_Defeat.mp3` | `enemyDeathSound` |
| `Zombie_Sound.mp3` | `enemyWaveSound` |

> The "Zombie_*" filenames are a legacy of the current enemy flavor; they map to the generic enemy event slots in `SoundManager` regardless of future theming.

## Playback pattern

Two patterns co-exist today. When adding new audio, prefer the **entity + `SoundComponent`** pattern — it's what the rest of the codebase uses.

### 1. Entity + `SoundComponent` (preferred)

1. Add a scene entity with a `SoundComponent` and assign the `SoundAsset`.
2. Expose it on the calling system as `@property() private xxxSound: Maybe<Entity>`.
3. Cache `entity.getComponent(SoundComponent)` in `start()`.
4. Call `soundComp.play({...SoundPlayInfo})` from the gameplay event handler.

Examples in-tree: [WaveManager.ts](_Data/Scripts/Manager/WaveManager.ts) (wave ambience, enemy attack/hit/death), [Game2.ts](_Data/Scripts/Manager/Game2.ts) (win/lose entities).

### 2. `SoundAsset` slot on `SoundManager`

Useful for one-shot, fire-and-forget SFX where the caller doesn't need a persistent `SoundComponent`. Resolve the asset from `SoundManager`, then play via any available `SoundComponent` (e.g. the caller's own or a pooled one).

## Hook points (current & recommended)

| Event | Slot / entity | Where it fires |
|-------|---------------|----------------|
| UI button tap | `buttonClickSound` | [UI/BasePanel.ts](_Data/Scripts/UI/BasePanel.ts) and panel subclasses |
| Battle start | — (consider reusing `buttonClickSound`) | [MenuPanel.ts](_Data/Scripts/UI/MenuPanel.ts) → `Game2.startGame` |
| Player fires | `shootSound` | [Combat/Gun.ts](_Data/Scripts/Combat/Gun.ts) |
| Enemy attack | `enemyAttackSound` | [Combat/MeleeWeapon.ts](_Data/Scripts/Combat/MeleeWeapon.ts) / [Combat/RangeWeapon.ts](_Data/Scripts/Combat/RangeWeapon.ts) on enemies |
| Enemy takes damage | `enemyHitSound` | [Combat/HealthComponent.ts](_Data/Scripts/Combat/HealthComponent.ts) damage callback |
| Enemy defeated | `enemyDeathSound` | [Combat/BaseEnemy.ts](_Data/Scripts/Combat/BaseEnemy.ts) death / defeat signal |
| Wave ambience | `enemyWaveSound` | [WaveManager.ts](_Data/Scripts/Manager/WaveManager.ts) loop, every `waveSoundInterval` (4s) |
| Wave complete | — (consider a dedicated cue) | `WaveManager.onWaveComplete` |
| Level-up / upgrade pick | — (recommended) | `WaveTransitionPanel` `onTapOption1/2/3`, `PlayerLevel.onLevelUp` |
| Game over | `loseSound` | `GameStateManager` → `GameState.GAME_OVER` |
| Stage complete | `winSound` | `GameStateManager` → `GameState.STAGE_COMPLETE` |
| BGM | `Utopia_BG_Music.mp3` | Loop while `GameState.GAME` (no code wiring yet — add to `Game2` state handler) |

## Guidelines when adding audio

1. **Route new SFX through `SoundManager`** (add a new `@property()` slot) or through a dedicated scene entity with `SoundComponent` — don't scatter loose `SoundAsset` references across gameplay code.
2. **Use `.mp3`** (matches existing assets in [_Data/Sound/](_Data/Sound/)); keep SFX short; loop BGM seamlessly.
3. **Respect wave peak volumes**: 10+ enemies × 5 types can be alive simultaneously; stagger / duck repeat SFX (hit, attack) or cap overlapping `SoundComponent` instances so audio doesn't pile up.
4. **Never rename `@property()` fields** on `SoundManager` without updating every scene/template reference — the scene binding is the source of truth (see [PROJECT_RULES.md](PROJECT_RULES.md) → Platform reminders).
5. For the full authoring workflow (bus assignment, spatialization, file format), read [Assistant/Skills/audio/sound_design.md](../Assistant/Skills/audio/sound_design.md).
