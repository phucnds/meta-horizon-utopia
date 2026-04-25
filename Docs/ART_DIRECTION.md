# Art Direction — Utopia

## Style

Top-down / over-the-shoulder **wave-survival shooter** with a light sci-fi / modern-combat read. The player is a lone combatant defending a position against escalating waves of enemies. Mood is grounded and readable — not over-stylized, not grimdark — so that combat reads clearly on a phone-sized screen.

**Locked art direction:**

- **Low poly / clean shading:** simple volumes, limited material complexity, readable at phone viewing distance.
- **Strong silhouette:** player, enemies (Melee / Range / Tank / Boss), projectiles and pickups must read **from silhouette alone** so combat is legible at small sizes.
- **Coherent world:** everything on screen should feel like it belongs in the same modern/light-sci-fi universe — avoid mixing genres (no fantasy armor, no cartoon mascots) unless explicitly framed as a themed enemy variant.

## Color & UI

- HUD text: light-on-dark so score, wave number, HP, and gold stay readable over any background.
- Tier color language for upgrades: **Common / Rare / Epic** — use the existing tier icons at [_Data/Images/Common.png](_Data/Images/Common.png), [_Data/Images/Rare.png](_Data/Images/Rare.png), [_Data/Images/Epic.png](_Data/Images/Epic.png). Do not invent a parallel tier palette.
- Core UI assets:
  - Battle button: [_Data/Images/Battle Button.png](_Data/Images/Battle Button.png) (+ variants)
  - Loading screen: [_Data/Images/260226_Loading Screen 1.png](_Data/Images/260226_Loading%20Screen%201.png)
  - Defeat screen: [_Data/Images/Defeat.png](_Data/Images/Defeat.png), [_Data/Images/lose.png](_Data/Images/lose.png)
  - Home background: [_Data/Images/Home BG.png](_Data/Images/Home%20BG.png), [_Data/Images/bg.png](_Data/Images/bg.png)
  - HP/heart icon: [_Data/Images/heart.png](_Data/Images/heart.png)
  - Upgrade cards: [_Data/Images/Upgrades/](_Data/Images/Upgrades/) and [_Data/Images/bgContainUpgrade.png](_Data/Images/bgContainUpgrade.png)
  - Currency icon: [_Data/Images/Currency.png](_Data/Images/Currency.png)
  - Button chrome: [_Data/Images/btnGreen.png](_Data/Images/btnGreen.png), [_Data/Images/btnClose.png](_Data/Images/btnClose.png)

**Palette & feel:**

- Prefer **controlled, slightly desaturated** colors so combat VFX (muzzle flash, hit flashes, dissolve, boss telegraphs) pop against the world.
- Reserve **high-saturation / emissive** for meaningful gameplay signal: projectile trails, crit hits, pickups, boss tells, upgrade rarity.
- Keep primary / secondary aligned with the existing UI palette when adding new screens or panels.

## Characters & gameplay reads

### Player

- **Fixed role:** the hero is a **single-player combatant** (auto-aiming shooter archetype). Do not switch to a radically different character class (no mount, no vehicle as the primary control unit).
- **Weapons:** driven by [Combat/Gun.ts](_Data/Scripts/Combat/Gun.ts) / [Combat/PlayerWeapons.ts](_Data/Scripts/Combat/PlayerWeapons.ts). Current weapon materials live in [_Data/Materials/](_Data/Materials/): `mat-body-gun`, `mat-head-gun`, projectile `mat-rocket`, `mat-fishbone`, and aim/laser `mat-line`.
- **Customizable:** weapon skins, projectile color, character outfit swaps are fine **as long as** the silhouette of the firing pose stays intact and tier color language on VFX is not accidentally reused.

### Enemies

Five archetypes are wired in [DataConfig/DataEnemies.ts](_Data/DataConfig/DataEnemies.ts):

| Type | Silhouette target | Material |
|------|-------------------|----------|
| MeleeBasic (0) | Average humanoid, neutral mass | [mat-enemy-1](_Data/Materials/mat-enemy-1.material) |
| RangeBasic (1) | Visibly armed at range; readable from afar | [mat-e-range](_Data/Materials/mat-e-range.material) |
| MeleeFast (2) | Lean, light, clearly fast | [mat-enemy-2](_Data/Materials/mat-enemy-2.material) |
| MeleeTank (3) | Bulky, wide, low threat of speed but high durability read | [mat-enemy-3](_Data/Materials/mat-enemy-3.material) |
| Boss (10) | Unique, larger-scale silhouette; telegraphs must be obvious | [mat-enemy-Boss](_Data/Materials/mat-enemy-Boss.material) |

- Each archetype's **silhouette must remain distinct** at playable camera distance. Do not recolor a Tank so it reads like a Basic — players rely on silhouette to pick targets.
- When **recoloring** an enemy (e.g. a wave variant), keep the same mesh / scale and change only material tints so pooling (`ObjectPool<BaseEnemy>` in `WaveManager`) and spawn logic remain unchanged.
- Enemy prefabs: [_Data/Prefabs/Enemies/](_Data/Prefabs/Enemies/) (`E_MeleeBasic`, `E_MeleeFast`, `E_MeleeTank`, `E_RangeBasic`, `E_Boss`).

## Environment & scene

- Main scene: [_Data/Scene/game.hstf](_Data/Scene/game.hstf). Keep the combat arena uncluttered — decorations are fine but must **not block sightlines** between player and spawn perimeter.
- Background / ground material: [mat-bg](_Data/Materials/mat-bg.material). Environmental detail material examples: [mat-rock](_Data/Materials/mat-rock.material), [mat-cat](_Data/Materials/mat-cat.material).
- Lighting should keep enemies readable against the ground at all times — avoid dark zones where a MeleeFast could disappear into shadow.

## VFX

- Project uses PopcornFX assets under [_Data/MetaVFX_Utopia/](_Data/MetaVFX_Utopia/) (muzzle, hit, projectile trails, death dissolve / smoke).
- **Restraint:** favor short, punchy VFX that communicate one event (hit, crit, death, pickup). Avoid long-lived emissive effects that crowd the screen during wave peaks — during a full wave there can be **10+ enemies per pool × 5 types** active at once.
- Death VFX: combine the dissolve materials with particles — see [Combat/AnimationDisolve.ts](_Data/Scripts/Combat/AnimationDisolve.ts) / [Combat/AnimationDissolve.ts](_Data/Scripts/Combat/AnimationDissolve.ts).
- Boss tells: must be **readable ≥ 0.5 s before impact** — use color + shape + audio, not color alone.

## UI layout

- Portrait orientation. Top bar: wave number + gold. Bottom-center / sides: joystick / focused interaction. HP bar follows the player ([UI/PlayerUI.ts](_Data/Scripts/UI/PlayerUI.ts), XAML in [_Data/UI-XAML/PlayerUI.xaml](_Data/UI-XAML/PlayerUI.xaml)).
- XP bar: [_Data/UI-XAML/PlayerXPUI.xaml](_Data/UI-XAML/PlayerXPUI.xaml).
- Wave-transition / level-up panels are modal overlays — they must **dim the gameplay scene** so the card art reads on top.
- Upgrade cards follow the existing tier frames ([_Data/UI-XAML/UpgradeItem.xaml](_Data/UI-XAML/UpgradeItem.xaml), [_Data/UI-XAML/UpgradePanel.xaml](_Data/UI-XAML/UpgradePanel.xaml), [_Data/UI-XAML/WaveTransitionPanel.xaml](_Data/UI-XAML/WaveTransitionPanel.xaml)).

## Constraints for AI-assisted reskins

- Keep **readability**: player vs enemies vs projectiles at phone distance.
- Keep **archetype silhouettes** distinct (see enemy table above).
- Replacing textures/materials: follow the asset pipeline in [Assistant/Skills/art/asset_guidelines.md](../Assistant/Skills/art/asset_guidelines.md) and project rules for `assetId`, material references, and scale — do not break pool templates or spawner `EnemyType` → template mapping in [DataEnemies.ts](_Data/DataConfig/DataEnemies.ts).
- New VFX must be pooled / short-lived to survive wave-peak entity counts.
