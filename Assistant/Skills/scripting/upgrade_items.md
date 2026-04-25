---
name: Upgrade Items
summary: Mandatory skill for adding a new upgrade item — pick a stat/effect, add entry in UpgradeItemDataConfig.hstf, tune tier rate, wire special-case behaviour via item id if needed
include: as_needed
imports:
  - coding_standards.md
key_files:
  - _Data/Scripts/UpgradeItem/UpgradeItemDataConfig.ts
  - _Data/Scripts/Manager/UpgradeManager.ts
  - _Data/Scripts/Manager/PlayerStatsManager.ts
  - _Data/Scripts/UI/WaveTransitionPanel.ts
  - _Data/Scripts/UI/LevelUpPanel.ts
  - _Data/Prefabs/UpgradeItemDataConfig.hstf
related:
  - coding_standards.md
  - ../art/asset_guidelines.md
---

# Upgrade items

## AI: read this entire file (mandatory)

**Before any work that adds a new upgrade item, changes a tier's roll rate, re-icons an existing item, or wires a special-case effect that isn't a flat stat bonus:**

1. Read **`coding_standards.md`** → sections **`@property()` and `.hstf`** and **Stats & data contracts** (the `Stat` / `EnemyType` warnings are load-bearing for enum-by-value serialization).
2. Read **this file from top to bottom** (data model overview, then the **single checklist** below).
3. **Before closing the task:** complete **Mandatory verification for agents** — confirm (a) the new `UpgradeItem` has a unique `id` and a valid `tier` that matches a `TierUpgradeItem`; (b) `stat` / `percentValue` / `value` (and their `*Negative` counterparts if set) reference valid `Stat` enum integers; (c) icon `TextureAsset` references resolve; (d) if the item needs a non-stat behaviour, the special-case branch is wired in `WaveTransitionPanel.optional()` **by id**.

Do **not** treat "new stat bonus" and "new gameplay effect" (double-shot, heal, etc.) as two different procedures. Both follow the same pipeline — **decide effect kind → add TS data in the hstf → set tier and icon → (special-case) wire id-based hook in WaveTransitionPanel**. The only branch is whether the effect is a plain `Stat` percent bonus (step 4 covers it) or a scripted behaviour that needs a hook (step 5).

## Data model

- **`UpgradeItemDataConfig`** (`_Data/Scripts/UpgradeItem/UpgradeItemDataConfig.ts`): `@component()` that serializes two flat arrays — `tierUpgradeItems: readonly TierUpgradeItem[]` and `upgradeItems: readonly UpgradeItem[]`. Read via `getTierUpgradeItems()` / `getUpgradeItems()`. There is **one instance** of this component in the scene (authored in `_Data/Prefabs/UpgradeItemDataConfig.hstf`) — panels reach it via `dataEntity.getComponent(UpgradeItemDataConfig)`.
- **`TierUpgradeItem`** (`@serializable()`): `{ tier: number, nameTier: string, image: TextureAsset, rate: number }`. `tier` is the **integer value** of `TierUpgradeItemType` (Common=0, Rare=1, Epic=2). `rate` is the raw roll **weight**, not a probability — see "Rate math" below.
- **`UpgradeItem`** (`@serializable()`): positive effect (`stat`, `value`, `percentValue`) + optional negative effect (`statNegative`, `valueNegative`, `percentValueNegative`, `descriptionNegative`). The `stat` field stores a `Stat` enum **as a number** (see `PlayerStatsManager.Stat`: `Attack=0`, `AttackSpeed=1`, `CriticalChance=2`, `CriticalPercent=3`, `MoveSpeed=4`, `MaxHealth=5`, `Range=6`, `HealthRecoverySpeed=7`, `Armor=8`, `Luck=9`, `Dodge=10`, `LifeSteal=11`). `canBuy: boolean` gates whether an item appears in the random pool in `WaveTransitionPanel.pickRandomItems` (note: `LevelUpPanel.pickRandomItems` does **not** filter by `canBuy` — items locked behind prereqs are only filtered on the wave-transition panel).
- **`UpgradeManager`** (`_Data/Scripts/Manager/UpgradeManager.ts`): owns `WaveTransitionPanel` and emits `onTapOption1/2/3` with the chosen `UpgradeItem`. It does **not** apply the stat itself for most items — the wiring to `PlayerStatsManager.addStatPercent` happens in the listeners hooked up by `Game2`. For scripted effects (double-shot, heal, etc.), `WaveTransitionPanel.optional(item)` dispatches **by `item.getId()`**.

## Rate math (tier roll weights)

`WaveTransitionPanel.pickRandomItems` and `LevelUpPanel.pickRandomItems` build a **per-item weight** equal to the item's tier `rate`. Total weight = sum over all eligible items of `tier.rate`. **This means rarer tiers can still dominate if you add many Epic items**, because the weight is summed per-item, not per-tier. Current defaults are `Common rate=50`, `Rare rate=35`, `Epic rate=15`. If you add a new Epic item, expect the Epic bucket to effectively grow by 15 weight against the existing Common total.

- If you want a new item to be **strictly the same rarity as its siblings**, just set its `tier` and don't touch `TierUpgradeItem.rate`.
- If you want to **rebalance tiers globally**, edit the three `TierUpgradeItem.rate` values; do not add per-item rates.

## Item id — load-bearing for special cases

`UpgradeItem.id` is **not a cosmetic counter**. It's the dispatch key in `WaveTransitionPanel.optional()`:

- `id === 0` → `gun.doubleShoot()` (Twin Shot), and there's dead code that would unlock `id === 1`.
- `id === 1` → `gun.tripleShoot()` **and sets `canBuy=false`** on itself (one-shot effect).
- `id === 14` / `id === 15` → `playerHP.heal(max * 0.2 / 0.4)` (Heal I / II).

**Consequences:**

- Do **not** renumber existing ids. A renumber silently breaks the switch in `WaveTransitionPanel.optional()` — the item will still appear on the panel but its behaviour won't fire.
- New stat-bonus items do **not** need a case in `optional()`; the stat pipeline applies them. Only add a case when the effect cannot be expressed as a `Stat` percent/flat bonus (e.g. gun modifications, heals, one-shot unlocks, buffs with cooldown).
- New ids should use **the next free integer after the max current id** in `_Data/Prefabs/UpgradeItemDataConfig.hstf` (currently the highest shipped id is `15`).

## New upgrade item — single checklist (code + editor)

Follow **in order**. Icon authoring / texture rules live in **`../art/asset_guidelines.md`**; they are not duplicated here.

### 1. Decide the effect kind

- **Plain stat buff** (e.g. `+X% Attack`): reuse the existing pipeline. Set `stat` + `percentValue` (or `value` for flat) in the hstf entry. No code changes.
- **Plain stat buff with trade-off** (e.g. `+X% damage, -Y% move speed`): same as above, plus fill `statNegative`, `percentValueNegative` (or `valueNegative`), and `descriptionNegative`. The negative is displayed on `WaveTransitionPanel` via `itemDesNeg{1,2,3}`.
- **Scripted effect** (new double-shot variant, AoE heal, shield, one-shot unlock, etc.): pick a new `id` and plan to add a `case` in `WaveTransitionPanel.optional()` — step 5.

### 2. Pick a tier

- Set `tier` on the new entry to `0` (Common), `1` (Rare), or `2` (Epic). These are the **integer values** of `TierUpgradeItemType`, **not strings** — `.hstf` serializes the numeric value.
- If you need a brand-new tier (e.g. Legendary):
  - Add the enum member in `TierUpgradeItemType` (next free integer — no reserved gaps today).
  - Append a new `TierUpgradeItem` block in `UpgradeItemDataConfig.hstf` under `tierUpgradeItems` with matching `tier`, a `nameTier` string, an `image` asset, and a `rate`.
  - Add a matching outline color branch in `WaveTransitionPanel.getOutlineColor` **and** `LevelUpPanel.getOutlineColor` — missing this leaves the new tier rendering the default Common green outline.

### 3. Add the `UpgradeItem` entry in `UpgradeItemDataConfig.hstf`

- Open `_Data/Prefabs/UpgradeItemDataConfig.hstf`.
- Under the `UpgradeItemDataConfig` component's `data.upgradeItems` array, append a new block shaped like the existing entries:
  ```json
  {
    "class": "UpgradeItem",
    "definitionAsset": { "packageOrRemoteId": "...", "ingestionId": "...", "targetId": "..." },
    "data": {
      "id": <next-free-int>,
      "name": "<display name>",
      "description": "<+X% ...>",
      "image": { "packageOrRemoteId": "...", "ingestionId": "...", "targetId": "..." },
      "tier": <0|1|2>,
      "stat": <Stat-enum-int>,
      "percentValue": <number>
    }
  }
  ```
- **Keep `definitionAsset` identical to existing entries** — it points at the compiled `UpgradeItem` serializable class. Do not invent new IDs; duplicate the block from a shipped entry of the same kind.
- **Default omissions** serialized entries rely on:
  - `stat` omitted → defaults to `Stat.Attack = 0` (see class default). Only omit if the item really targets Attack.
  - `canBuy` omitted → defaults to `true`. Set `"canBuy": false` only if the item should be locked behind a prereq (e.g. Twin Shot unlocks Triple Shot).
  - `value` / `percentValue` omitted → defaults to `0`. Pure-script items (heal, shot-shape) can leave them at zero and rely entirely on the `optional()` hook.
  - Negative block (`descriptionNegative`, `statNegative`, `valueNegative`, `percentValueNegative`) can be omitted when the item has no trade-off.

### 4. Set the icon `TextureAsset`

- Author or reuse an icon following **`../art/asset_guidelines.md`**.
- Plug the asset reference into `data.image` (three-part `packageOrRemoteId` / `ingestionId` / `targetId` object). Missing or dangling refs render a blank slot — visually obvious only on the `WaveTransitionPanel`, not at bundle time, so **smoke test in-game**.

### 5. (Only for scripted effects) Wire the hook in `WaveTransitionPanel.optional()`

- Pick the **next free `id`** (max current id + 1).
- Open `_Data/Scripts/UI/WaveTransitionPanel.ts` and add a `case <id>:` branch in `optional(item)`. You have access to `this.gun` and `this.playerHP` already; if you need a new dependency, add a new `@property()` `Entity` field to the panel and wire it in the scene (follow the pattern of `gunEntity` / `playerEntity`).
- For **one-shot** items that should not repeat, call `item.setCanBuy(false)` after triggering — see the Triple Shot (`id === 1`) case. For **unlocks** that flip a different item's gate, look up by id via `this.upgradeItemDataConfig?.getUpgradeItems().find(i => i.getId() === <target>)` and call `setCanBuy(true)`.
- **Do not** re-apply the positive stat inside `optional()` — if the item also has a `stat` / `percentValue`, the normal pipeline already handled it. Use `optional()` **only** for the non-stat behaviour on top.

### 6. Smoke test

- Build scripts; run the game and trigger a `WAVE_TRANSITION` with a pending level-up (so the showcase panel appears).
- Verify:
  - The new item appears in the pool over several rolls (toggle tier rates temporarily if you need to force-roll it).
  - Tier outline color, tier icon, item name, description, and icon all render correctly.
  - For stat items: `[PlayerStats] <Stat>: <value> (+<pct>%)` log line fires after tap.
  - For scripted items: the `WaveTransitionPanel.optional` branch executes (add a temporary `console.log` if needed to confirm).
  - If the item has a negative, the negative description appears (`itemDesNeg{1,2,3}` slot).

## Mandatory verification for agents

**Before marking any "new upgrade item" task complete**, confirm the following in the serialized hstf and/or code. The common failure mode is an item that renders fine but silently does nothing because one of these fields is wrong.

1. **`id` is unique and correctly numbered** — scan `UpgradeItemDataConfig.hstf` for `"id":` and confirm no collision. Renumbering existing ids breaks the `optional()` dispatch.
2. **`tier` value matches an existing `TierUpgradeItem.tier`** — if the item's `tier` is `3` but no tier-3 entry exists in `tierUpgradeItems`, the weight lookup returns `0` and the item **never rolls**. The UI outline also falls back to Common green.
3. **`stat` / `statNegative` are valid `Stat` enum integers** (0–11). `Stat.Attack = 0` is the default when `stat` is omitted — confirm this is intentional. A typo like `"stat": 99` silently applies nothing.
4. **`image` asset reference resolves** — duplicate from a shipped entry and edit in the editor; do not hand-type asset IDs.
5. **For scripted effects**: there is a `case <id>:` branch in `WaveTransitionPanel.optional()` and it's reachable (not shadowed by `break` in a prior case).
6. **`canBuy` default matches intent** — items that should be locked behind a prereq **must** set `"canBuy": false` explicitly; the default is `true`.

If any check fails, fix it before considering the task done (then re-run the smoke test in step 6).

## Safe extensions

- Add new `UpgradeItem` entries freely — as many stat variants as desired, as long as ids stay unique and tiers reference existing `TierUpgradeItem`s.
- Add new tiers by extending `TierUpgradeItemType` (next free integer) + appending a `TierUpgradeItem` block + adding outline color branches in **both** `WaveTransitionPanel.getOutlineColor` and `LevelUpPanel.getOutlineColor`.
- Add new scripted effects by taking the next free `id` and adding a `case` in `WaveTransitionPanel.optional()`.

## Protected

- **Do not renumber or rename** existing `UpgradeItem.id` values — they are dispatch keys in `WaveTransitionPanel.optional()`. A single renumber silently disables the scripted effect.
- **Do not renumber or rename** `Stat` enum members — they are serialized as integers in `stat` / `statNegative` across every hstf entry. Any renumber silently rewires every upgrade item.
- **Do not rename** `TierUpgradeItemType` members without also updating `WaveTransitionPanel.getOutlineColor` / `LevelUpPanel.getOutlineColor` — the outline color lookup is tier-enum-value keyed.
- **Do not remove `canBuy`** from `UpgradeItem` or its filter in `WaveTransitionPanel.pickRandomItems` — the Triple Shot unlock flow and any future one-shot unlocks rely on it.
- **Do not apply positive stat bonuses inside `WaveTransitionPanel.optional()`** — the normal pipeline already handles them, and double-applying will be hard to diagnose because each application is a valid operation on `PlayerStatsManager`.
- **Do not bypass `UpgradeItemDataConfig`** by instantiating `UpgradeItem` at runtime. All items are authored in the hstf and read-only at runtime (only `setCanBuy` is writable and only through the `UpgradeItem` accessor).
