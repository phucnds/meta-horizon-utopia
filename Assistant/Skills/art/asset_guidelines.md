---
name: Asset Guidelines
summary: Materials, textures, UI images, enemy variant / reskin rules, and replacement workflow for Utopia
include: as_needed
imports: []
key_files:
  - _Data/Materials/
  - _Data/Texture/
  - _Data/Models/
  - _Data/Prefabs/
  - _Data/UI-XAML/
  - _Data/Images/
  - _Data/MetaVFX_Utopia/
related:
  - ../scripting/coding_standards.md
  - ../scripting/player.md
---

# Asset guidelines

## Where things live

| Kind | Typical location |
|------|------------------|
| Gameplay materials (enemies, guns, projectiles, bg, rocks) | `_Data/Materials/` — `mat-enemy-1/2/3.material`, `mat-enemy-Boss.material`, `mat-e-range.material`, `mat-body-gun.material`, `mat-head-gun.material`, `mat-rocket.material`, `mat-fishbone.material`, `mat-line.material`, `mat-rock.material`, `mat-bg.material`, `mat-cat.material` |
| Models | `_Data/Models/` |
| Enemy templates (prefabs) | `_Data/Prefabs/Enemies/` — `E_MeleeBasic.hstf`, `E_MeleeFast.hstf`, `E_MeleeTank.hstf`, `E_RangeBasic.hstf`, `E_Boss.hstf` |
| Textures | `_Data/Texture/` |
| VFX (PopcornFX) | `_Data/MetaVFX_Utopia/` |
| UI XAML | `_Data/UI-XAML/` |
| UI images | `_Data/Images/` (with `Upgrades/` subfolder for upgrade card art) |
| Sounds | `_Data/Sound/` (see `../audio/sound_design.md`) |
| Main scene | `_Data/Scene/game.hstf` |
| Player template | `player.hstf` at project root |

## Serialized references

- Materials and textures in Meta Horizon use **asset IDs** (`packageOrRemoteId`, `ingestionId`, `targetId`) — not raw filesystem paths in shipped data.
- After importing a new texture in the editor, update the relevant `.material` (or component reference) with the new IDs everywhere that asset appeared.

## Replacing a texture (high level)

1. Import the texture in Meta Horizon Studio.
2. Open the target `.material` JSON under `_Data/Materials/`.
3. Point the color / sprite / emissive slot attributes to the new asset ID as required by that shader (inspect existing attributes on the material for the pattern your project uses).
4. If the asset is shared, search for the old `ingestionId` across materials and templates before saving.

## UI images

- XAML `ImageSource` paths are package-relative; keep paths valid relative to how the project mounts `Root`.
- Tier frames for upgrade cards (Common / Rare / Epic) live in `_Data/Images/Common.png`, `Rare.png`, `Epic.png`. **Reuse** these — do not invent a parallel tier palette.
- When swapping art, preserve **binding names** (e.g. `waveString`, `goldString`, `xpString`, `hpString`, `upgradeName`, `upgradeDescription`, visibility flags) — if you rename a binding, update the corresponding ViewModel field in the TS panel under `_Data/Scripts/UI/` in the same change.

## Arena / environment

- The arena is a single scene (`_Data/Scene/game.hstf`). Keep decorations **outside the combat ring** where enemies path and player auto-aims — props must not block sightlines or collide with pathing.
- Background material `mat-bg.material` drives the floor tone; if you change its dominant color, re-check that **enemies still read** against it (especially the faster, smaller `MeleeFast` silhouette).

## Scene decorations (props)

- Decoration meshes: keep bounding boxes reasonable (~**3×3×3 up to 4×4×4**) so they don't dwarf player/enemies or disappear at phone distance.
- **Pivot at the base** of the decoration so placing at ground height looks correct.
- Place decorations **outside the spawn ring** and **outside the player movement area** — never between the player and any enemy spawn lane.
- Y position: high enough to avoid sinking into the ground material; low enough to not float visibly.
- Do not add decorations that collide with `PhysicsBodyComponent` on enemies / projectiles unless the collision is the intent.

## VFX (PopcornFX)

- All PopcornFX assets live under `_Data/MetaVFX_Utopia/`.
- Wave peaks can have 10+ enemies × 5 types alive simultaneously — VFX must be **short-lived** and **pooled**. Never spawn a persistent particle per enemy per frame.
- Reuse existing hit / muzzle / dissolve / smoke stacks when adding new enemy variants rather than authoring new VFX per variant.
- Death dissolve is driven jointly by particles and the dissolve material animation — see `_Data/Scripts/Combat/AnimationDisolve.ts` / `AnimationDissolve.ts`.

## Enemy variants (meshes, materials, spawner)

**AI: read this entire section before any work that adds, swaps, or recolors an enemy.** Then confirm the `EnemyType` / pool / template wiring per `../scripting/player.md` and `_Data/DataConfig/DataEnemies.ts`. The same checklist applies whether the variant is a pure recolor or a new archetype slot.

### Meshes

- Do **not** add a new enemy that requires **a mesh different from** meshes already used by existing enemies (no new archetype-specific rigs or bespoke geometry for a "new" variant).
- **Allowed:** a new enemy that **reuses an existing enemy mesh** and only changes **materials / textures** (cosmetic variation on the same geometry). Follow **Replacing a texture** above for the material pipeline.
- Archetype silhouettes must stay **readable and distinct** — a Tank recolor must still look like a tank, a Fast recolor must still look light. Never make a recolor read as a different archetype.
- **Agent — mandatory checks** when adding materials for a new / recolored enemy:
  1. New materials have **tint / color or texture params changed** from the duplicated source where a distinct look is required.
  2. The **enemy template's mesh slots reference the new materials**, not just the files on disk (open the `.hstf` under `_Data/Prefabs/Enemies/` and verify material asset IDs).
  3. The template is **pool-safe**: no per-instance state that leaks between spawns (`ObjectPool<BaseEnemy>` in `_Data/Scripts/Manager/WaveManager.ts` reuses instances).
  4. `HealthComponent` / `IDamageable` / collider settings are preserved so the damage pipeline still works.

### Replacing one enemy with another (workflow)

- Do **not** replace an existing enemy template or asset **in place** with a completely different enemy (different identity / archetype), which would confuse history and risk breaking references.
- If the goal is "this spawn slot should show a different enemy," do this instead:
  1. Create a **new** enemy (following the mesh rules above) and add a new `EnemyType` entry if the archetype differs.
  2. Register its template in `_Data/DataConfig/DataEnemies.ts` (`DataEnemies.enemyEntries` → `EnemyEntry { enemyType, template }`).
  3. Ensure `WaveManager.registerEnemyTemplate(type, template)` is called during setup (driven from `Game2.ts`) so the pool exists before any wave spawns it.
  4. Update `_Data/DataConfig/WaveData.ts` (`WaveDataConfig` / `WaveSegmentData`) to reference the new type in whichever wave should spawn it. **Preserve** sibling segments' tuning — spawn frequency, counts, pool size — so gameplay balance stays intact.

### Boss variants

- The `Boss` slot (`EnemyType.Boss = 10`) is driven by `_Data/Scripts/Combat/BossBehaviour.ts`. When reskinning the boss, keep:
  - The existing collider + hit-box sizes (projectiles rely on them).
  - Telegraph VFX / windup timings untouched unless you also retune the boss fight in `BossBehaviour.ts`.
  - The `SoundComponent` hook points used by the boss death / attack sounds.

## Protected

- Do not bulk-delete materials still referenced from scene / template data.
- Avoid renaming `@property()` material fields on components without updating all serialized instances.
- Do not rename the `EnemyType` enum values in `_Data/DataConfig/DataEnemies.ts` — every `WaveSegmentData`, pool, and spawner reference depends on the numeric identity.
- Do not rename the `Stat` enum values in `_Data/Scripts/Manager/PlayerStatsManager.ts` — `DEFAULT_BASE_STATS`, `DEFAULT_UPGRADE_CONFIGS`, and every `UpgradeItemDataConfig` entry are keyed off it.
