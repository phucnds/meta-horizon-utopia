This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: **/*.ts
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
AppRoot/
  Analytics.ts/
    Analytics.ts
  AppRoot.ts/
    AppRoot.ts
  AppRootUtils.ts/
    AppRootUtils.ts
  SaveSystem.ts/
    SaveSystem.ts
Game/
  Audio/
    GameAudioAdapter.ts/
      GameAudioAdapter.ts
  Background/
    Background.ts/
      Background.ts
  Collision/
    MagnetCollisionSystem.ts/
      MagnetCollisionSystem.ts
    PlayerCollisionSystem.ts/
      PlayerCollisionSystem.ts
    PlayerProjectileCollisionSystem.ts/
      PlayerProjectileCollisionSystem.ts
    WeaponCollisionSystem.ts/
      WeaponCollisionSystem.ts
  Data/
    Assets/
      AudioAssets.ts/
        AudioAssets.ts
      GameAssets.ts/
        GameAssets.ts
      MetaUpgradeIcons.ts/
        MetaUpgradeIcons.ts
      UpgradeIcons.ts/
        UpgradeIcons.ts
    GameConstants.ts/
      GameConstants.ts
    GameSettings.ts/
      GameSettings.ts
    TranslationData.ts/
      TranslationData.ts
    UserData.ts/
      UserData.ts
  Game.ts/
    Game.ts
  GroupType.ts/
    GroupType.ts
  Input/
    IInput.ts/
      IInput.ts
    KeyboardInput.ts/
      KeyboardInput.ts
    MultiInput.ts/
      MultiInput.ts
    VirtualJoystic.ts/
      VirtualJoystic.ts
  Items/
    Item.ts/
      Item.ts
    ItemAttractor.ts/
      ItemAttractor.ts
    ItemManager.ts/
      ItemManager.ts
    ItemSpawner.ts/
      ItemSpawner.ts
    ItemType.ts/
      ItemType.ts
    PickupEffect/
      PickupEffect.ts/
        PickupEffect.ts
      PickupEffectManager.ts/
        PickupEffectManager.ts
    XP.ts/
      XP.ts
  ModalWIndows/
    ChestModalWindow.ts/
      ChestModalWindow.ts
    GameModalLauncher.ts/
      GameModalLauncher.ts
    GameModalWindowTypes.ts/
      GameModalWindowTypes.ts
    PauseModalWindow.ts/
      PauseModalWindow.ts
  Pauser.ts/
    Pauser.ts
  Projectile/
    IProjectileLauncherSignaler.ts/
      IProjectileLauncherSignaler.ts
    Projectile.ts/
      Projectile.ts
    ProjectileCollision.ts/
      ProjectileCollision.ts
    ProjectileLauncher/
      HaloProjectileLauncher.ts/
        HaloProjectileLauncher.ts
      ProjectileData.ts/
        ProjectileData.ts
      ProjectileLauncher.ts/
        ProjectileLauncher.ts
      WaveProjectileLauncher.ts/
        WaveProjectileLauncher.ts
  TestGameRunner.ts/
    TestGameRunner.ts
  UI/
    GameUI.ts/
      GameUI.ts
    LevelUpWindow/
      LevelUpModalWindow.ts/
        LevelUpModalWindow.ts
      LevelUpSkill.ts/
        LevelUpSkill.ts
  Unit/
    Enemy/
      AnimatedEnemy.ts/
        AnimatedEnemy.ts
      BossEnemy.ts/
        BossEnemy.ts
      Enemy.ts/
        Enemy.ts
      EnemyDeathEffectSpawner/
        EnemyDeathEffect.ts/
          EnemyDeathEffect.ts
        EnemyDeathEffectSpawner.ts/
          EnemyDeathEffectSpawner.ts
      EnemyGraphicsType.ts/
        EnemyGraphicsType.ts
      EnemyManager.ts/
        EnemyManager.ts
      EnemyMovementType.ts/
        EnemyMovementType.ts
      EnemyMover/
        EnemyMover.ts/
          EnemyMover.ts
        FollowTargetEnemyMover.ts/
          FollowTargetEnemyMover.ts
        PeriodicFollow/
          PeriodicFollowMovers.ts/
            PeriodicFollowMovers.ts
          PeriodicFollowTargetEnemyMover.ts/
            PeriodicFollowTargetEnemyMover.ts
        WaveEnemyMover.ts/
          WaveEnemyMover.ts
      EnemySpawner/
        CircularEnemySpawner.ts/
          CircularEnemySpawner.ts
        DelayedEnemySpawner.ts/
          DelayedEnemySpawner.ts
        EnemySpawner.ts/
          EnemySpawner.ts
        IndividualEnemySpawner.ts/
          IndividualEnemySpawner.ts
        WaveEnemySpawner.ts/
          WaveEnemySpawner.ts
      ProjectileLauncher.cs/
        EnemyProjectileLauncher.ts/
          EnemyProjectileLauncher.ts
    MetaUpgrades/
      MetaUpgrades.ts/
        MetaUpgrades.ts
    Player/
      Magnet.ts/
        Magnet.ts
      Player.ts/
        Player.ts
      PlayerRegeneration.ts/
        PlayerRegeneration.ts
      PlayerUI/
        PlayerHealthUI.ts/
          PlayerHealthUI.ts
        PlayerUI.ts/
          PlayerUI.ts
      Weapon/
        UpgradableCollider.ts/
          UpgradableCollider.ts
        Weapon.ts/
          Weapon.ts
    UnitHealth.ts/
      UnitHealth.ts
    UnitLevel.ts/
      UnitLevel.ts
  Upgrades/
    Upgrader.ts/
      Upgrader.ts
    UpgradeType.ts/
      UpgradeType.ts
Menu/
  GameRunner.ts/
    GameRunner.ts
  Menu.ts/
    Menu.ts
  ModalWindows/
    AudioSettings/
      AudioSettingsModalWindow.ts/
        AudioSettingsModalWindow.ts
    MenuModalLauncher.ts/
      MenuModalLauncher.ts
    MenuModalWindowTypes.ts/
      MenuModalWindowTypes.ts
    Upgrades/
      UpgradeLevelPointUI.ts/
        UpgradeLevelPointUI.ts
      UpgradesModalWindow.ts/
        UpgradesModalWindow.ts
      UpgradeUI.ts/
        UpgradeUI.ts
Services/
  AudioPlayer/
    AudioPlayer.ts/
      AudioPlayer.ts
  EventSystem/
    ISignal.ts/
      ISignal.ts
    Signal.ts/
      Signal.ts
  GameTimer.ts/
    GameTimer.ts
  ModalWindowSystem/
    ModalWindow.ts/
      ModalWindow.ts
    ModalWindowManager.ts/
      ModalWindowManager.ts
  ObjectPool.ts/
    ObjectPool.ts
  UI/
    Button/
      UIButton.ts/
        UIButton.ts
  Utils/
    ArrayUtils.ts/
      ArrayUtils.ts
    AsyncUtils.ts/
      AsyncUtils.ts
    MathUtils.ts/
      MathUtils.ts
    StringUtils.ts/
      StringUtils.ts
    VecUtils.ts/
      VecUtils.ts
Utils/
  OpenCloseAnimator.ts/
    OpenCloseAnimator.ts
  UIButtonAudioPlayer.ts/
    UIButtonAudioPlayer.ts
```

# Files

## File: AppRoot/Analytics.ts/Analytics.ts
```typescript
import { Y8 } from "../../Plugins/Y8/Scripts/Y8";

export class Analytics {
    private totalTime = 0;
    private minutesInGame = -1; // Track the 0 minute as well
    private gamesPerSession = 0;

    public constructor(private y8: Y8) {}

    public update(deltaTime: number): void {
        this.totalTime += deltaTime;
        this.trySendTotalTime();
    }

    public gameStart(): void {
        this.y8.sendCustomEvent(EventName.GAMES_PER_SESSION, ++this.gamesPerSession);
    }

    public gameEnd(time: number): void {
        this.y8.sendCustomEvent(EventName.GAME_TIME, Math.floor(time));
    }

    public gameExit(time: number): void {
        this.y8.sendCustomEvent(EventName.GAME_EXIT, Math.floor(time));
    }

    public goldPerRun(goldEarned: number): void {
        this.y8.sendCustomEvent(EventName.GOLD_PER_RUN, Math.floor(goldEarned));
    }

    private trySendTotalTime(): void {
        if (this.minutesInGame < Math.floor(this.totalTime / 60)) {
            this.y8.sendCustomEvent(EventName.TOTAL_TIME, ++this.minutesInGame);
        }
    }
}

enum EventName {
    TOTAL_TIME = "Minutes_total_v0.2",
    GOLD_PER_RUN = "Gold_per_run_v0.2",
    GAMES_PER_SESSION = "Games_per_session_v0.2",
    GAME_TIME = "Game_time_seconds_v0.2",
    GAME_EXIT = "Game_exit_v0.2"
}
```

## File: AppRoot/AppRoot.ts/AppRoot.ts
```typescript
import { Camera, Component, director, instantiate, JsonAsset, Prefab, _decorator } from "cc";
import { GameSettings } from "../Game/Data/GameSettings";
import { GameAssets } from "../Game/Data/Assets/GameAssets";
import { TranslationData } from "../Game/Data/TranslationData";
import { UserData } from "../Game/Data/UserData";
import { AudioPlayer } from "../Services/AudioPlayer/AudioPlayer";
import { SaveSystem } from "./SaveSystem";
import { ModalWindowManager } from "../Services/ModalWindowSystem/ModalWindowManager";
import { OpenCloseAnimator } from "../Utils/OpenCloseAnimator";
import { Y8 } from "../../Plugins/Y8/Scripts/Y8";
import { Analytics } from "./Analytics";
const { ccclass, property } = _decorator;

@ccclass("AppRoot")
export class AppRoot extends Component {
    @property(AudioPlayer) private audio: AudioPlayer;
    @property(JsonAsset) private settingsAsset: JsonAsset;
    @property(JsonAsset) private engTranslationAsset: JsonAsset;
    @property(Prefab) private gameAssetsPrefab: Prefab;
    @property(Camera) private mainCamera: Camera;
    @property(ModalWindowManager) private modalWindowManager: ModalWindowManager;
    @property(OpenCloseAnimator) private screenFader: OpenCloseAnimator;
    @property(Y8) private y8: Y8;

    private static instance: AppRoot;
    private saveSystem: SaveSystem;

    private liveUserData: UserData;
    private gameAssets: GameAssets;
    private analytics: Analytics;

    public static get Instance(): AppRoot {
        return this.instance;
    }

    public get AudioPlayer(): AudioPlayer {
        return this.audio;
    }

    public get GameAssets(): GameAssets {
        return this.gameAssets;
    }

    public get LiveUserData(): UserData {
        return this.liveUserData;
    }

    public get Settings(): GameSettings {
        return <GameSettings>this.settingsAsset.json;
    }

    public get TranslationData(): TranslationData {
        return <TranslationData>this.engTranslationAsset.json;
    }

    public get ModalWindowManager(): ModalWindowManager {
        return this.modalWindowManager;
    }

    public get MainCamera(): Camera {
        return this.mainCamera;
    }

    public get ScreenFader(): OpenCloseAnimator {
        return this.screenFader;
    }

    public get Y8(): Y8 {
        return this.y8;
    }

    public get Analytics(): Analytics {
        return this.analytics;
    }

    public saveUserData(): void {
        this.saveSystem.save(this.liveUserData);
    }

    public start(): void {
        if (AppRoot.Instance == null) {
            AppRoot.instance = this;
            director.addPersistRootNode(this.node);
            this.init();
        } else {
            this.node.destroy();
        }
    }

    public update(deltaTime: number): void {
        if (this.analytics) this.analytics.update(deltaTime);
    }

    private async init(): Promise<void> {
        this.saveSystem = new SaveSystem();
        this.liveUserData = this.saveSystem.load();

        const gameAssetsNode = instantiate(this.gameAssetsPrefab);
        gameAssetsNode.setParent(this.node);
        this.gameAssets = gameAssetsNode.getComponent(GameAssets);
        this.gameAssets.init();

        this.audio.init(this.LiveUserData.soundVolume, this.LiveUserData.musicVolume);

        this.screenFader.init();
        this.screenFader.node.active = false;

        await this.y8.init();

        this.analytics = new Analytics(this.y8);
    }
}
```

## File: AppRoot/AppRootUtils.ts/AppRootUtils.ts
```typescript
import { delay } from "../Services/Utils/AsyncUtils";
import { AppRoot } from "./AppRoot";

export async function requireAppRootAsync(): Promise<void> {
    console.log("Waiting for app root");
    while (AppRoot.Instance == null) await delay(10);

    AppRoot.Instance.node.setSiblingIndex(1000); // render on top
    AppRoot.Instance.node.active = false; // forces engine to reorder by hierarchy
    AppRoot.Instance.node.active = true;

    console.log("App root ready");
}
```

## File: AppRoot/SaveSystem.ts/SaveSystem.ts
```typescript
import { sys } from "cc";
import { UserData } from "../Game/Data/UserData";

export class SaveSystem {
    private userDataIdentifier = "user-dse";
    public save(userData: UserData): void {
        sys.localStorage.setItem(this.userDataIdentifier, JSON.stringify(userData));
    }

    public load(): UserData {
        const data: string = sys.localStorage.getItem(this.userDataIdentifier);

        if (!data) return new UserData();

        try {
            // TODO: the data can be corrupted if we introduce a new field in UserData
            return <UserData>JSON.parse(data);
        } catch (error) {
            return new UserData();
        }
    }
}
```

## File: Game/Audio/GameAudioAdapter.ts/GameAudioAdapter.ts
```typescript
import { _decorator, Component, Node, AudioClip } from "cc";
import { AppRoot } from "../../AppRoot/AppRoot";
import { AudioPlayer } from "../../Services/AudioPlayer/AudioPlayer";
import { ItemManager } from "../Items/ItemManager";
import { ItemType } from "../Items/ItemType";
import { Enemy } from "../Unit/Enemy/Enemy";
import { EnemyManager } from "../Unit/Enemy/EnemyManager";
import { Player } from "../Unit/Player/Player";
import { HaloProjectileLauncher } from "../Projectile/ProjectileLauncher/HaloProjectileLauncher";
import { WaveProjectileLauncher } from "../Projectile/ProjectileLauncher/WaveProjectileLauncher";
const { ccclass, property } = _decorator;

@ccclass("GameAudioAdapter")
export class GameAudioAdapter extends Component {
    @property(AudioClip) private music: AudioClip;
    @property(AudioClip) private enemyHit: AudioClip;
    @property(AudioClip) private playerHit: AudioClip;
    @property(AudioClip) private playerDeath: AudioClip;
    @property(AudioClip) private weaponSwing: AudioClip;
    @property(AudioClip) private xpPickup: AudioClip;
    @property(AudioClip) private goldPickup: AudioClip;
    @property(AudioClip) private healthPotionPickup: AudioClip;
    @property(AudioClip) private magnetPickup: AudioClip;
    @property(AudioClip) private chestPickup: AudioClip;
    @property(AudioClip) private levelUp: AudioClip;
    @property(AudioClip) private horizontalProjectileLaunch: AudioClip;
    @property(AudioClip) private diagonalProjectileLaunch: AudioClip;
    @property(AudioClip) private haloProjectileLaunch: AudioClip;

    private audioPlayer: AudioPlayer;
    private player: Player;

    public init(
        player: Player,
        enemyManager: EnemyManager,
        itemManager: ItemManager,
        horizontalLauncher: WaveProjectileLauncher,
        diagonalLauncher: WaveProjectileLauncher,
        haloLauncher: HaloProjectileLauncher
    ): void {
        AppRoot.Instance.AudioPlayer.playMusic(this.music);

        this.audioPlayer = AppRoot.Instance.AudioPlayer;
        this.player = player;

        player.Weapon.WeaponStrikeEvent.on(() => this.audioPlayer.playSound(this.weaponSwing), this);
        player.Level.LevelUpEvent.on(() => this.audioPlayer.playSound(this.levelUp), this);
        player.Health.HealthPointsChangeEvent.on(this.tryPlayPlayerHitSound, this);

        enemyManager.EnemyAddedEvent.on(this.addEnemyListeners, this);
        enemyManager.EnemyRemovedEvent.on(this.removeEnemyListeners, this);

        itemManager.PickupEvent.on(this.playPickupItemSound, this);

        horizontalLauncher.ProjectileLaunchedEvent.on(() => this.audioPlayer.playSound(this.horizontalProjectileLaunch), this);
        diagonalLauncher.ProjectileLaunchedEvent.on(() => this.audioPlayer.playSound(this.diagonalProjectileLaunch), this);
        haloLauncher.ProjectilesLaunchedEvent.on(() => this.audioPlayer.playSound(this.haloProjectileLaunch), this);
    }

    private addEnemyListeners(enemy: Enemy): void {
        enemy.Health.HealthPointsChangeEvent.on(this.playEnemyHitSound, this);
    }

    private removeEnemyListeners(enemy: Enemy): void {
        enemy.Health.HealthPointsChangeEvent.off(this.playEnemyHitSound);
    }

    private tryPlayPlayerHitSound(healthChange: number): void {
        if (healthChange < 0) {
            this.audioPlayer.playSound(this.playerHit);
        }

        if (!this.player.Health.IsAlive) {
            this.audioPlayer.playSound(this.playerDeath);
        }
    }

    private playEnemyHitSound(): void {
        this.audioPlayer.playSound(this.enemyHit);
    }

    private playPickupItemSound(itemType: ItemType): void {
        let clipToPlay: AudioClip;
        switch (itemType) {
            case ItemType.XP:
                clipToPlay = this.xpPickup;
                break;
            case ItemType.Gold:
                clipToPlay = this.goldPickup;
                break;
            case ItemType.HealthPotion:
                clipToPlay = this.healthPotionPickup;
                break;
            case ItemType.Magnet:
                clipToPlay = this.magnetPickup;
                break;
            case ItemType.Chest:
                clipToPlay = this.chestPickup;
                break;
            default:
                break;
        }

        this.audioPlayer.playSound(clipToPlay);
    }
}
```

## File: Game/Background/Background.ts/Background.ts
```typescript
import { _decorator, Component, Node, Prefab, instantiate, randomRangeInt, Vec3 } from "cc";
import { SCREEN_HALF_HEIGHT, SCREEN_HALF_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from "../Data/GameConstants";
const { ccclass, property } = _decorator;

@ccclass("Background")
export class Background extends Component {
    @property(Prefab) private backgroundPrefabs: Prefab[] = [];

    private targetNode: Node;
    private instancedBackgrounds: Node[][] = [];

    private rows = 3;
    private columns = 3;
    private nodeSize = 512;

    private playerGridPosX = 0;
    private playerGridPosY = 0;

    public init(targetNode: Node): void {
        this.targetNode = targetNode;

        for (let i = 0; i < this.rows; i++) {
            const rowNodes: Node[] = [];
            for (let u = 0; u < this.columns; u++) {
                const randomIndex = randomRangeInt(0, this.backgroundPrefabs.length);
                const backgroundNode = instantiate(this.backgroundPrefabs[randomIndex]);
                backgroundNode.setParent(this.node);

                const x = u * this.nodeSize - this.nodeSize + SCREEN_HALF_WIDTH;
                const y = i * this.nodeSize - this.nodeSize + SCREEN_HALF_HEIGHT;
                backgroundNode.setWorldPosition(new Vec3(x, y, 0));

                rowNodes.push(backgroundNode);
            }

            this.instancedBackgrounds.push(rowNodes);
        }
    }

    public gameTick(): void {
        this.tryTileX();
        this.tryTileY();
    }

    private tryTileX(): void {
        const playerGridPosX = Math.round((this.targetNode.worldPosition.x - SCREEN_HALF_WIDTH) / this.nodeSize);

        if (playerGridPosX < this.playerGridPosX) {
            // move the last column to the left
            const columnIndex = this.columns - 1;
            for (let i = 0; i < this.rows; i++) {
                const instancedNode = this.instancedBackgrounds[i][columnIndex];
                const newPosition: Vec3 = instancedNode.worldPosition;
                newPosition.x -= this.columns * this.nodeSize;

                instancedNode.setWorldPosition(newPosition);

                this.instancedBackgrounds[i].splice(columnIndex, 1);
                this.instancedBackgrounds[i].unshift(instancedNode);
            }
        } else if (this.playerGridPosX < playerGridPosX) {
            // move the first column to the right
            const columnIndex = 0;
            for (let i = 0; i < this.rows; i++) {
                const instancedNode = this.instancedBackgrounds[i][columnIndex];
                const newPosition: Vec3 = instancedNode.worldPosition;
                newPosition.x += this.columns * this.nodeSize;

                instancedNode.setWorldPosition(newPosition);

                this.instancedBackgrounds[i].splice(columnIndex, 1);
                this.instancedBackgrounds[i].push(instancedNode);
            }
        }

        this.playerGridPosX = playerGridPosX;
    }

    private tryTileY(): void {
        const playerGridPosY = Math.round((this.targetNode.worldPosition.y - SCREEN_HALF_HEIGHT) / this.nodeSize);

        if (playerGridPosY < this.playerGridPosY) {
            // move the last row down
            const rowIndex = this.rows - 1;
            const nodesInRow: Node[] = [];
            for (let i = 0; i < this.columns; i++) {
                const instancedNode = this.instancedBackgrounds[rowIndex][i];
                const newPosition: Vec3 = instancedNode.worldPosition;
                newPosition.y -= this.rows * this.nodeSize;

                instancedNode.setWorldPosition(newPosition);
                nodesInRow.push(instancedNode);
            }

            this.instancedBackgrounds.splice(rowIndex, 1);
            this.instancedBackgrounds.unshift(nodesInRow);
        } else if (this.playerGridPosY < playerGridPosY) {
            // move the first row up
            const rowIndex = 0;
            const nodesInRow: Node[] = [];
            for (let i = 0; i < this.columns; i++) {
                const instancedNode = this.instancedBackgrounds[rowIndex][i];
                const newPosition: Vec3 = instancedNode.worldPosition;
                newPosition.y += this.rows * this.nodeSize;

                instancedNode.setWorldPosition(newPosition);
                nodesInRow.push(instancedNode);
            }

            this.instancedBackgrounds.splice(rowIndex, 1);
            this.instancedBackgrounds.push(nodesInRow);
        }

        this.playerGridPosY = playerGridPosY;
    }
}
```

## File: Game/Collision/MagnetCollisionSystem.ts/MagnetCollisionSystem.ts
```typescript
import { Collider2D, Contact2DType } from "cc";
import { Item } from "../Items/Item";
import { ItemAttractor } from "../Items/ItemAttractor";
import { Magnet } from "../Unit/Player/Magnet";

export class MagnetCollisionSystem {
    public constructor(magnet: Magnet, private itemAttractor: ItemAttractor) {
        magnet.Collider.on(Contact2DType.BEGIN_CONTACT, this.onMagnetContactBegin, this);
    }

    private onMagnetContactBegin(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        this.itemAttractor.addItem(otherCollider.getComponent(Item));
    }
}
```

## File: Game/Collision/PlayerCollisionSystem.ts/PlayerCollisionSystem.ts
```typescript
import { Collider2D, Contact2DType, Node } from "cc";
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";
import { GameTimer } from "../../Services/GameTimer";
import { GroupType } from "../GroupType";
import { Item } from "../Items/Item";
import { ItemManager } from "../Items/ItemManager";
import { Projectile } from "../Projectile/Projectile";
import { Enemy } from "../Unit/Enemy/Enemy";
import { Player } from "../Unit/Player/Player";

export class PlayerCollisionSystem {
    private playerContacts: Collider2D[] = [];
    private collisionTimer: GameTimer;

    private groupToResolver: Map<number, (collider: Collider2D) => void> = new Map<number, (collider: Collider2D) => void>();

    private itemPickedUpEvent = new Signal<Node>();

    public constructor(private player: Player, collisionDelay: number, private itemManager: ItemManager) {
        this.player = player;

        player.Collider.on(Contact2DType.BEGIN_CONTACT, this.onPlayerContactBegin, this);
        player.Collider.on(Contact2DType.END_CONTACT, this.onPlayerContactEnd, this);

        this.collisionTimer = new GameTimer(collisionDelay);

        this.groupToResolver.set(GroupType.ENEMY, this.resolveEnemyContact.bind(this));
        this.groupToResolver.set(GroupType.ENEMY_PROJECTILE, this.resolveEnemyProjectileContact.bind(this));
        this.groupToResolver.set(GroupType.ITEM, this.resolveItemContact.bind(this));
    }

    public gameTick(deltaTime: number): void {
        this.collisionTimer.gameTick(deltaTime);
        if (this.collisionTimer.tryFinishPeriod()) {
            this.resolveAllContacts();
        }
    }

    public get ItemPickedUpEvent(): ISignal<Node> {
        return this.itemPickedUpEvent;
    }

    private onPlayerContactBegin(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        this.playerContacts.push(otherCollider);
        this.resolveContact(otherCollider);
    }

    private onPlayerContactEnd(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        const index: number = this.playerContacts.indexOf(otherCollider);
        if (index != -1) {
            this.playerContacts.splice(index, 1);
        }
    }

    private resolveAllContacts(): void {
        for (let i = 0; i < this.playerContacts.length; i++) {
            this.resolveContact(this.playerContacts[i]);
        }
    }

    private resolveContact(otherCollider: Collider2D): void {
        if (!this.player.Health.IsAlive) return;

        if (this.groupToResolver.has(otherCollider.group)) {
            this.groupToResolver.get(otherCollider.group)(otherCollider);
        } else {
            console.log("Collided with undefined group: " + otherCollider.group);
        }
    }

    private resolveEnemyContact(enemyCollider: Collider2D): void {
        const damage: number = enemyCollider.node.getComponent(Enemy).Damage;
        console.log("Collided with enemy: Damage: " + damage);
        this.player.Health.damage(damage);
    }

    private resolveEnemyProjectileContact(enemyCollider: Collider2D): void {
        const projectile = enemyCollider.node.getComponent(Projectile);
        const damage: number = projectile.Damage;
        projectile.pierce();
        console.log("Collided with enemy projectile: Damage: " + damage);

        this.player.Health.damage(damage);
    }

    private resolveItemContact(xpCollider: Collider2D): void {
        console.log("Collided with item");
        this.itemManager.pickupItem(xpCollider.node.getComponent(Item));
    }
}
```

## File: Game/Collision/PlayerProjectileCollisionSystem.ts/PlayerProjectileCollisionSystem.ts
```typescript
import { IProjectileLauncherSignaler } from "../Projectile/IProjectileLauncherSignaler";
import { ProjectileCollision } from "../Projectile/ProjectileCollision";
import { Enemy } from "../Unit/Enemy/Enemy";

export class PlayerProjectileCollisionSystem {
    public constructor(collisionSignalers: IProjectileLauncherSignaler[]) {
        for (const collisionSignaler of collisionSignalers) {
            collisionSignaler.ProjectileCollisionEvent.on(this.onProjectileCollision, this);
        }
    }

    private onProjectileCollision(projectileCollision: ProjectileCollision): void {
        projectileCollision.otherCollider.getComponent(Enemy).dealDamage(projectileCollision.projectile.Damage);
        projectileCollision.projectile.pierce();
    }
}
```

## File: Game/Collision/WeaponCollisionSystem.ts/WeaponCollisionSystem.ts
```typescript
import { Collider2D } from "cc";
import { Enemy } from "../Unit/Enemy/Enemy";
import { Weapon } from "../Unit/Player/Weapon/Weapon";

export class WeaponCollisionSystem {
    private weapon: Weapon;
    public constructor(weapon: Weapon) {
        this.weapon = weapon;
        weapon.Collider.ContactBeginEvent.on(this.onWeaponContactBegin, this);
    }

    private onWeaponContactBegin(otherCollider: Collider2D): void {
        otherCollider.getComponent(Enemy).dealDamage(this.weapon.Damage);
    }
}
```

## File: Game/Data/Assets/AudioAssets.ts/AudioAssets.ts
```typescript
import { AudioClip, Component, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass("AudioAssets")
export class AudioAssets extends Component {
    @property(AudioClip) public buttonClick: AudioClip;
}
```

## File: Game/Data/Assets/GameAssets.ts/GameAssets.ts
```typescript
import { _decorator, Component, Node } from "cc";
import { AudioAssets } from "./AudioAssets";
import { MetaUpgradeIcons } from "./MetaUpgradeIcons";
import { UpgradeIcons } from "./UpgradeIcons";
const { ccclass, property } = _decorator;

@ccclass("GameAssets")
export class GameAssets extends Component {
    @property(UpgradeIcons) private upgradeIcons: UpgradeIcons;
    @property(MetaUpgradeIcons) private metaUpgradeIcons: MetaUpgradeIcons;
    @property(AudioAssets) private audioAssets: AudioAssets;

    public init(): void {
        this.upgradeIcons.init();
        this.metaUpgradeIcons.init();
    }

    public get UpgradeIcons(): UpgradeIcons {
        return this.upgradeIcons;
    }

    public get MetaUpgradeIcons(): MetaUpgradeIcons {
        return this.metaUpgradeIcons;
    }

    public get AudioAssets(): AudioAssets {
        return this.audioAssets;
    }
}
```

## File: Game/Data/Assets/MetaUpgradeIcons.ts/MetaUpgradeIcons.ts
```typescript
import { Component, SpriteFrame, _decorator } from "cc";
import { MetaUpgradeType, UpgradeType } from "../../Upgrades/UpgradeType";

const { ccclass, property } = _decorator;

@ccclass("MetaUpgradeIcons")
export class MetaUpgradeIcons extends Component {
    @property(SpriteFrame) private healthSprite: SpriteFrame;
    @property(SpriteFrame) private overallDamageSprite: SpriteFrame;
    @property(SpriteFrame) private projectilePiercingSprite: SpriteFrame;
    @property(SpriteFrame) private movementSpeedSprite: SpriteFrame;
    @property(SpriteFrame) private xpGathererSprite: SpriteFrame;
    @property(SpriteFrame) private goldGathererSprite: SpriteFrame;

    private typeToIcon = new Map<MetaUpgradeType, SpriteFrame>();

    public init(): void {
        this.typeToIcon.set(MetaUpgradeType.Health, this.healthSprite);
        this.typeToIcon.set(MetaUpgradeType.OverallDamage, this.overallDamageSprite);
        this.typeToIcon.set(MetaUpgradeType.ProjectilePiercing, this.projectilePiercingSprite);
        this.typeToIcon.set(MetaUpgradeType.MovementSpeed, this.movementSpeedSprite);
        this.typeToIcon.set(MetaUpgradeType.XPGatherer, this.xpGathererSprite);
        this.typeToIcon.set(MetaUpgradeType.GoldGatherer, this.goldGathererSprite);
    }

    public getIcon(upgradeType: MetaUpgradeType): SpriteFrame {
        if (!this.typeToIcon.has(upgradeType)) throw new Error("Does not have upgrade type asset " + upgradeType);
        return this.typeToIcon.get(upgradeType);
    }
}
```

## File: Game/Data/Assets/UpgradeIcons.ts/UpgradeIcons.ts
```typescript
import { Component, SpriteFrame, _decorator } from "cc";
import { UpgradeType } from "../../Upgrades/UpgradeType";

const { ccclass, property } = _decorator;

@ccclass("UpgradeIcons")
export class UpgradeIcons extends Component {
    @property(SpriteFrame) private weaponLengthSprite: SpriteFrame;
    @property(SpriteFrame) private weaponDamageSprite: SpriteFrame;
    @property(SpriteFrame) private horizontalProjectileSprite: SpriteFrame;
    @property(SpriteFrame) private diagonalProjectileSprite: SpriteFrame;
    @property(SpriteFrame) private haloProjectileSprite: SpriteFrame;
    @property(SpriteFrame) private regenerationSprite: SpriteFrame;

    private typeToIcon = new Map<UpgradeType, SpriteFrame>();

    public init(): void {
        this.typeToIcon.set(UpgradeType.WeaponLength, this.weaponLengthSprite);
        this.typeToIcon.set(UpgradeType.WeaponDamage, this.weaponDamageSprite);
        this.typeToIcon.set(UpgradeType.HorizontalProjectile, this.horizontalProjectileSprite);
        this.typeToIcon.set(UpgradeType.DiagonalProjectile, this.diagonalProjectileSprite);
        this.typeToIcon.set(UpgradeType.HaloProjectlie, this.haloProjectileSprite);
        this.typeToIcon.set(UpgradeType.Regeneration, this.regenerationSprite);
    }

    public getIcon(upgradeType: UpgradeType): SpriteFrame {
        if (!this.typeToIcon.has(upgradeType)) throw new Error("Does not have upgrade type asset " + upgradeType);
        return this.typeToIcon.get(upgradeType);
    }
}
```

## File: Game/Data/GameConstants.ts/GameConstants.ts
```typescript
export const SCREEN_WIDTH = 510;
export const SCREEN_HEIGHT = 680;

export const SCREEN_HALF_WIDTH = SCREEN_WIDTH / 2;
export const SCREEN_HALF_HEIGHT = SCREEN_HEIGHT / 2;
```

## File: Game/Data/GameSettings.ts/GameSettings.ts
```typescript
import { EnemyProjectileLauncher } from "../Unit/Enemy/ProjectileLauncher.cs/EnemyProjectileLauncher";

export class GameSettings {
    public player: PlayerSettings = new PlayerSettings();
    public upgrades: UpgradeSettings = new UpgradeSettings();
    public metaUpgrades: MetaUpgradesSettings = new MetaUpgradesSettings();
    public enemyManager: EnemyManagerSettings = new EnemyManagerSettings();
    public items: ItemSettings = new ItemSettings();
}

export class PlayerSettings {
    public defaultHP = 0;
    public requiredXP: number[] = [];
    public speed = 0;
    public regenerationDelay = 0;
    public collisionDelay = 0;
    public magnetDuration = 0;
    public weapon: WeaponSettings = new WeaponSettings();
    public haloLauncher: HaloLauncherSettings = new HaloLauncherSettings();
    public horizontalLauncher: WaveLauncherSettings = new WaveLauncherSettings();
    public diagonalLauncher: WaveLauncherSettings = new WaveLauncherSettings();
}

export class WeaponSettings {
    public strikeDelay = 0;
    public damage = 0;
}

export class WaveLauncherSettings {
    public wavesToShootPerUpgrade = 0;
    public launcher = new ProjectileLauncherSettings();
}

export class HaloLauncherSettings {
    public projectilesToSpawn = 0;
    public cooldownDivisorPerUpgrade = 0;
    public launcher = new ProjectileLauncherSettings();
}

export class EnemyLauncherSettings {
    public enemyIds: string[] = [];
    public projectileLifetime = 0;
    public projectileSpeed = 0;
    public projectileDamage = 0;
    public cooldown = 0;
}

export class ProjectileLauncherSettings {
    public projectileLifetime = 0;
    public projectileSpeed = 0;
    public wavesToShoot = 0;
    public wavesDelayMs = 0;
    public cooldown = 0;
}

export class UpgradeSettings {
    public maxWeaponLengthUpgrades = 0;
    public maxWeaponDamageUpgrades = 0;
    public maxHorizontalProjectileUpgrades = 0;
    public maxDiagonalProjectileUpgrades = 0;
    public maxHaloProjectileUpgrades = 0;
    public maxRegenerationUpgrades = 0;
}

export class MetaUpgradesSettings {
    public health = new MetaUpgradeSettings();
    public overallDamage = new MetaUpgradeSettings();
    public projectilePiercing = new MetaUpgradeSettings();
    public movementSpeed = new MetaUpgradeSettings();
    public xpGatherer = new MetaUpgradeSettings();
    public goldGatherer = new MetaUpgradeSettings();
}

export class MetaUpgradeSettings {
    public costs: number[] = [];
    public bonuses: number[] = [];
}

export class EnemyManagerSettings {
    public axeLauncher = new EnemyLauncherSettings();
    public magicOrbLauncher = new EnemyLauncherSettings();
    public enemies: EnemySettings[] = [new EnemySettings()];
    public periodicFollowMovers: PeriodicFollowMoverSettings[] = [new PeriodicFollowMoverSettings()];
    public individualEnemySpawners: IndividualEnemySpawnerSettings[] = [new IndividualEnemySpawnerSettings()];
    public circularEnemySpawners: CircularEnemySpawnerSettings[] = [new CircularEnemySpawnerSettings()];
    public waveEnemySpawners: WaveEnemySpawnerSettings[] = [new WaveEnemySpawnerSettings()];
}

export class PeriodicFollowMoverSettings {
    public enemyIdToAffect = "";
    public followTime = 0;
    public waitTime = 0;
}

export class GeneralEnemySpawnerSettings {
    public enemyId = "";
    public startDelay = 0;
    public stopDelay = 0;
    public cooldown = 0;
}

export class WaveEnemySpawnerSettings implements ISpawner {
    public common = new GeneralEnemySpawnerSettings();
    public enemiesToSpawn = 0;
}

export class CircularEnemySpawnerSettings implements ISpawner {
    public common = new GeneralEnemySpawnerSettings();
    public enemiesToSpawn = 0;
}

export class IndividualEnemySpawnerSettings implements ISpawner {
    public common = new GeneralEnemySpawnerSettings();
}

export interface ISpawner {
    common: GeneralEnemySpawnerSettings;
}

export class EnemySettings {
    public id = "";
    public moveType = "";
    public graphicsType = "";
    public health = 0;
    public damage = 0;
    public speed = 0;
    public lifetime = 0;

    public xpReward = 0;
    public goldReward = 0;
    public healthPotionRewardChance = 0;
    public magnetRewardChance = 0;
    public chestRewardChance = 0;
}

export class ItemSettings {
    public healthPerPotion = 0;
}
```

## File: Game/Data/TranslationData.ts/TranslationData.ts
```typescript
export class TranslationData {
    [key: string]: string;
}
```

## File: Game/Data/UserData.ts/UserData.ts
```typescript
export class UserData {
    public soundVolume = 1;
    public musicVolume = 1;
    public game = new GameData();
}

export class GameData {
    public goldCoins = 0;
    public metaUpgrades = new MetaUpgradesData();
    public highscore = 0;
}

export class MetaUpgradesData {
    public healthLevel = 0;
    public overallDamageLevel = 0;
    public projectilePiercingLevel = 0;
    public movementSpeedLevel = 0;
    public xpGathererLevel = 0;
    public goldGathererLevel = 0;
}
```

## File: Game/Game.ts/Game.ts
```typescript
import { Canvas, Component, KeyCode, Vec2, _decorator, Node, approx } from "cc";
import { AppRoot } from "../AppRoot/AppRoot";
import { requireAppRootAsync } from "../AppRoot/AppRootUtils";
import { delay } from "../Services/Utils/AsyncUtils";
import { GameAudioAdapter } from "./Audio/GameAudioAdapter";
import { Background } from "./Background/Background";
import { MagnetCollisionSystem } from "./Collision/MagnetCollisionSystem";
import { PlayerCollisionSystem } from "./Collision/PlayerCollisionSystem";
import { PlayerProjectileCollisionSystem } from "./Collision/PlayerProjectileCollisionSystem";
import { WeaponCollisionSystem } from "./Collision/WeaponCollisionSystem";
import { GameSettings, PlayerSettings } from "./Data/GameSettings";
import { TranslationData } from "./Data/TranslationData";
import { UserData } from "./Data/UserData";
import { KeyboardInput } from "./Input/KeyboardInput";
import { MultiInput } from "./Input/MultiInput";
import { VirtualJoystic } from "./Input/VirtualJoystic";
import { ItemAttractor } from "./Items/ItemAttractor";
import { ItemManager } from "./Items/ItemManager";
import { GameModalLauncher } from "./ModalWIndows/GameModalLauncher";
import { Pauser } from "./Pauser";
import { TestValues } from "./TestGameRunner";
import { GameUI } from "./UI/GameUI";
import { EnemyDeathEffectSpawner } from "./Unit/Enemy/EnemyDeathEffectSpawner/EnemyDeathEffectSpawner";
import { EnemyManager } from "./Unit/Enemy/EnemyManager";
import { EnemyProjectileLauncher } from "./Unit/Enemy/ProjectileLauncher.cs/EnemyProjectileLauncher";
import { MetaUpgrades } from "./Unit/MetaUpgrades/MetaUpgrades";
import { Player, PlayerData } from "./Unit/Player/Player";
import { HaloProjectileLauncher } from "./Projectile/ProjectileLauncher/HaloProjectileLauncher";
import { ProjectileData } from "./Projectile/ProjectileLauncher/ProjectileData";
import { ProjectileLauncher } from "./Projectile/ProjectileLauncher/ProjectileLauncher";
import { WaveProjectileLauncher } from "./Projectile/ProjectileLauncher/WaveProjectileLauncher";
import { Upgrader } from "./Upgrades/Upgrader";
import { MetaUpgradeType } from "./Upgrades/UpgradeType";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
    private static instance: Game;

    @property(VirtualJoystic) private virtualJoystic: VirtualJoystic;
    @property(Player) private player: Player;
    @property(ProjectileLauncher) private haloProjectileLauncherComponent: ProjectileLauncher;
    @property(ProjectileLauncher) private horizontalProjectileLauncherComponent: ProjectileLauncher;
    @property(ProjectileLauncher) private diagonalProjectileLauncherComponent: ProjectileLauncher;
    @property(ProjectileLauncher) private enemyAxeProjectileLauncherComponent: ProjectileLauncher;
    @property(ProjectileLauncher) private enemyMagicOrbProjectileLauncherComponent: ProjectileLauncher;
    @property(EnemyManager) private enemyManager: EnemyManager;
    @property(EnemyDeathEffectSpawner) private deathEffectSpawner: EnemyDeathEffectSpawner;
    @property(ItemManager) private itemManager: ItemManager;
    @property(GameUI) private gameUI: GameUI;
    @property(Canvas) private gameCanvas: Canvas;
    @property(Background) private background: Background;
    @property(GameAudioAdapter) private gameAudioAdapter: GameAudioAdapter;
    @property(Node) private blackScreen: Node;

    private playerCollisionSystem: PlayerCollisionSystem;
    private haloProjectileLauncher: HaloProjectileLauncher;
    private horizontalProjectileLauncher: WaveProjectileLauncher;
    private diagonalProjectileLauncher: WaveProjectileLauncher;

    private enemyAxeProjectileLauncher: EnemyProjectileLauncher;
    private enemyMagicOrbProjectileLauncher: EnemyProjectileLauncher;

    private itemAttractor: ItemAttractor;

    private gamePauser: Pauser = new Pauser();
    private gameResult: GameResult;

    private timeAlive = 0;

    public static get Instance(): Game {
        return this.instance;
    }

    public start(): void {
        this.gamePauser.pause();
        Game.instance = this;
        this.blackScreen.active = true;
    }

    public async play(userData: UserData, settings: GameSettings, translationData: TranslationData, testValues?: TestValues): Promise<GameResult> {
        await this.setup(userData, settings, translationData, testValues);

        AppRoot.Instance.Analytics.gameStart();

        this.gamePauser.resume();
        this.blackScreen.active = false;
        AppRoot.Instance.ScreenFader.playClose();

        while (!this.gameResult.hasExitManually && this.player.Health.IsAlive) await delay(100);

        this.gamePauser.pause();
        Game.instance = null;
        this.gameResult.score = this.timeAlive;

        if (!this.gameResult.hasExitManually) {
            AppRoot.Instance.Analytics.goldPerRun(this.gameResult.goldCoins);
            AppRoot.Instance.Analytics.gameEnd(this.gameResult.score);

            await delay(2000);
        } else {
            AppRoot.Instance.Analytics.gameExit(this.timeAlive);
        }

        return this.gameResult;
    }

    public exitGame(): void {
        this.gameResult.hasExitManually = true;
    }

    public update(deltaTime: number): void {
        if (this.gamePauser.IsPaused) return;

        this.player.gameTick(deltaTime);
        this.playerCollisionSystem.gameTick(deltaTime);
        this.enemyManager.gameTick(deltaTime);
        this.haloProjectileLauncher.gameTick(deltaTime);
        this.horizontalProjectileLauncher.gameTick(deltaTime);
        this.diagonalProjectileLauncher.gameTick(deltaTime);
        this.enemyAxeProjectileLauncher.gameTick(deltaTime);
        this.enemyMagicOrbProjectileLauncher.gameTick(deltaTime);
        this.itemAttractor.gameTick(deltaTime);
        this.background.gameTick();

        this.timeAlive += deltaTime;
        this.gameUI.updateTimeAlive(this.timeAlive);

        AppRoot.Instance.MainCamera.node.setWorldPosition(this.player.node.worldPosition);
        this.gameUI.node.setWorldPosition(this.player.node.worldPosition);
    }

    private async setup(userData: UserData, settings: GameSettings, translationData: TranslationData, testValues: TestValues): Promise<void> {
        await requireAppRootAsync();
        this.gameCanvas.cameraComponent = AppRoot.Instance.MainCamera;

        this.gameResult = new GameResult();
        const metaUpgrades = new MetaUpgrades(userData.game.metaUpgrades, settings.metaUpgrades);

        this.virtualJoystic.init();

        const wasd = new KeyboardInput(KeyCode.KEY_W, KeyCode.KEY_S, KeyCode.KEY_A, KeyCode.KEY_D);
        const arrowKeys = new KeyboardInput(KeyCode.ARROW_UP, KeyCode.ARROW_DOWN, KeyCode.ARROW_LEFT, KeyCode.ARROW_RIGHT);
        const multiInput: MultiInput = new MultiInput([this.virtualJoystic, wasd, arrowKeys]);

        this.player.init(multiInput, this.createPlayerData(settings.player, metaUpgrades));
        this.enemyManager.init(this.player.node, settings.enemyManager);
        this.deathEffectSpawner.init(this.enemyManager);

        this.playerCollisionSystem = new PlayerCollisionSystem(this.player, settings.player.collisionDelay, this.itemManager);
        new WeaponCollisionSystem(this.player.Weapon);

        const projectileData = new ProjectileData();
        projectileData.damage = 1 + metaUpgrades.getUpgradeValue(MetaUpgradeType.OverallDamage);
        projectileData.pierces = 1 + metaUpgrades.getUpgradeValue(MetaUpgradeType.ProjectilePiercing);

        this.haloProjectileLauncher = new HaloProjectileLauncher(
            this.haloProjectileLauncherComponent,
            this.player.node,
            settings.player.haloLauncher,
            projectileData
        );

        this.horizontalProjectileLauncher = new WaveProjectileLauncher(
            this.horizontalProjectileLauncherComponent,
            this.player.node,
            [new Vec2(0, 1), new Vec2(-0.1, 0.8), new Vec2(0.1, 0.8)],
            settings.player.horizontalLauncher,
            projectileData
        );

        this.diagonalProjectileLauncher = new WaveProjectileLauncher(
            this.diagonalProjectileLauncherComponent,
            this.player.node,
            [new Vec2(-0.5, -0.5), new Vec2(0.5, -0.5)],
            settings.player.diagonalLauncher,
            projectileData
        );

        this.enemyAxeProjectileLauncher = new EnemyProjectileLauncher(
            this.enemyAxeProjectileLauncherComponent,
            this.player.node,
            this.enemyManager,
            settings.enemyManager.axeLauncher
        );

        this.enemyMagicOrbProjectileLauncher = new EnemyProjectileLauncher(
            this.enemyMagicOrbProjectileLauncherComponent,
            this.player.node,
            this.enemyManager,
            settings.enemyManager.magicOrbLauncher
        );

        new PlayerProjectileCollisionSystem([this.haloProjectileLauncher, this.horizontalProjectileLauncher, this.diagonalProjectileLauncher]);

        this.itemAttractor = new ItemAttractor(this.player.node, 100);
        new MagnetCollisionSystem(this.player.Magnet, this.itemAttractor);

        const upgrader = new Upgrader(
            this.player,
            this.horizontalProjectileLauncher,
            this.haloProjectileLauncher,
            this.diagonalProjectileLauncher,
            settings.upgrades
        );
        const modalLauncher = new GameModalLauncher(AppRoot.Instance.ModalWindowManager, this.player, this.gamePauser, upgrader, translationData);

        this.itemManager.init(this.enemyManager, this.player, this.gameResult, modalLauncher, settings.items);
        this.gameUI.init(this.player, modalLauncher, this.itemManager, this.gameResult);
        this.background.init(this.player.node);

        if (testValues) {
            this.timeAlive += testValues.startTime;
            this.player.Level.addXp(testValues.startXP);
        }

        this.gameAudioAdapter.init(
            this.player,
            this.enemyManager,
            this.itemManager,
            this.horizontalProjectileLauncher,
            this.diagonalProjectileLauncher,
            this.haloProjectileLauncher
        );
    }

    private createPlayerData(settings: PlayerSettings, metaUpgrades: MetaUpgrades): PlayerData {
        const playerData: PlayerData = Object.assign(new PlayerData(), settings);

        playerData.maxHp = metaUpgrades.getUpgradeValue(MetaUpgradeType.Health) + settings.defaultHP;
        playerData.requiredXP = settings.requiredXP;
        playerData.speed = metaUpgrades.getUpgradeValue(MetaUpgradeType.MovementSpeed) + settings.speed;
        playerData.regenerationDelay = settings.regenerationDelay;
        playerData.xpMultiplier = metaUpgrades.getUpgradeValue(MetaUpgradeType.XPGatherer) + 1;
        playerData.goldMultiplier = metaUpgrades.getUpgradeValue(MetaUpgradeType.GoldGatherer) + 1;

        playerData.damage = metaUpgrades.getUpgradeValue(MetaUpgradeType.OverallDamage) + settings.weapon.damage;
        playerData.strikeDelay = settings.weapon.strikeDelay;

        playerData.magnetDuration = settings.magnetDuration;

        return playerData;
    }
}

export class GameResult {
    public hasExitManually = false;
    public goldCoins = 0;
    public score = 0;
}
```

## File: Game/GroupType.ts/GroupType.ts
```typescript
// Flags, shift must match index in ProjectSettings > Physics

export enum GroupType {
    DEFAULT = 1 << 0,
    PLAYER = 1 << 1,
    ENEMY = 1 << 2,
    WEAPON = 1 << 3,
    ITEM = 1 << 4,
    PLAYER_PROJECTILE = 1 << 5,
    ENEMY_PROJECTILE = 1 << 6,
    MAGNET_RANGE = 1 << 7
}
```

## File: Game/Input/IInput.ts/IInput.ts
```typescript
import { Vec2 } from "cc";

export interface IInput {
    getAxis: () => Vec2;
}
```

## File: Game/Input/KeyboardInput.ts/KeyboardInput.ts
```typescript
import { EventKeyboard, Input, input, KeyCode, Vec2 } from "cc";
import { IInput } from "./IInput";

export class KeyboardInput implements IInput {
    private xAxis = 0;
    private yAxis = 0;

    private up: KeyCode;
    private down: KeyCode;
    private left: KeyCode;
    private right: KeyCode;

    public constructor(up: KeyCode, down: KeyCode, left: KeyCode, right: KeyCode) {
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    public getAxis(): Vec2 {
        return new Vec2(this.xAxis, this.yAxis).normalize();
    }

    private onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case this.up:
                this.yAxis = 1;
                break;
            case this.down:
                this.yAxis = -1;
                break;
            case this.left:
                this.xAxis = -1;
                break;
            case this.right:
                this.xAxis = 1;
                break;
        }
    }

    private onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case this.up:
                this.yAxis = this.yAxis === 1 ? 0 : this.yAxis;
                break;
            case this.down:
                this.yAxis = this.yAxis === -1 ? 0 : this.yAxis;
                break;
            case this.left:
                this.xAxis = this.xAxis === -1 ? 0 : this.xAxis;
                break;
            case this.right:
                this.xAxis = this.xAxis === 1 ? 0 : this.xAxis;
                break;
        }
    }
}
```

## File: Game/Input/MultiInput.ts/MultiInput.ts
```typescript
import { Vec2 } from "cc";
import { IInput } from "./IInput";

export class MultiInput implements IInput {
    private inputs: IInput[];

    public constructor(inputs: IInput[]) {
        this.inputs = inputs;
    }

    public getAxis(): Vec2 {
        for (let i = 0; i < this.inputs.length; i++) {
            if (!this.inputs[i].getAxis().equals(Vec2.ZERO)) {
                return this.inputs[i].getAxis();
            }
        }

        return new Vec2();
    }
}
```

## File: Game/Input/VirtualJoystic.ts/VirtualJoystic.ts
```typescript
import { _decorator, Component, Node, Vec3, input, Input, EventMouse, Vec2, EventTouch, CCFloat } from "cc";
import { IInput } from "./IInput";
const { ccclass, property } = _decorator;

@ccclass("VirtualJoystic")
export class VirtualJoystic extends Component implements IInput {
    @property(CCFloat) private maxDistance = 10;
    @property(Node) private knob: Node;

    #isUsingJoystic = false;
    #defaultPosition: Vec2 = new Vec2();

    public init(): void {
        input.on(Input.EventType.MOUSE_DOWN, this.activateMouseJoystic, this);
        input.on(Input.EventType.MOUSE_UP, this.deactivateJoystic, this);
        input.on(Input.EventType.MOUSE_MOVE, this.moveKnobMouse, this);

        input.on(Input.EventType.TOUCH_START, this.activateTouchJoystic, this);
        input.on(Input.EventType.TOUCH_END, this.deactivateJoystic, this);
        input.on(Input.EventType.TOUCH_MOVE, this.moveKnobTouch, this);

        this.deactivateJoystic();
    }

    public getAxis(): Vec2 {
        if (this.#isUsingJoystic) {
            return new Vec2(this.knob.position.x / this.maxDistance, this.knob.position.y / this.maxDistance);
        } else {
            return new Vec2();
        }
    }

    private activateTouchJoystic(e: EventTouch): void {
        this.activateJoystic(e.getUILocation());
    }

    private activateMouseJoystic(e: EventMouse): void {
        console.log(e.getUILocation());
        this.activateJoystic(e.getUILocation());
    }

    private activateJoystic(location: Vec2): void {
        this.#isUsingJoystic = true;
        this.node.active = true;
        this.#defaultPosition = location;

        this.node.setPosition(new Vec3(this.#defaultPosition.x, this.#defaultPosition.y, 0));
        this.knob.position = new Vec3();
    }

    private deactivateJoystic(): void {
        this.#isUsingJoystic = false;
        this.node.active = false;
    }

    private moveKnobTouch(e: EventTouch): void {
        this.moveKnob(e.getUILocation());
    }

    private moveKnobMouse(e: EventMouse): void {
        this.moveKnob(e.getUILocation());
    }

    private moveKnob(location: Vec2): void {
        if (!this.#isUsingJoystic) return;

        const posDelta: Vec2 = location.subtract(this.#defaultPosition);
        let x: number = posDelta.x;
        let y: number = posDelta.y;

        const length: number = Math.sqrt(posDelta.x ** 2 + posDelta.y ** 2);
        if (this.maxDistance < length) {
            const multiplier: number = this.maxDistance / length;

            x *= multiplier;
            y *= multiplier;
        }

        this.knob.position = new Vec3(x, y, 0);
    }
}
```

## File: Game/Items/Item.ts/Item.ts
```typescript
import { _decorator, Component, Node, Vec3, ccenum, Enum } from "cc";
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";
import { ItemType } from "./ItemType";
const { ccclass, property } = _decorator;

@ccclass("Item")
export class Item extends Component {
    @property({ type: Enum(ItemType) }) private itemType: ItemType;

    private pickUpEvent = new Signal<Item>();

    public get ItemType(): ItemType {
        return <ItemType>this.itemType;
    }

    public setup(position: Vec3): void {
        this.node.setWorldPosition(position);
        this.node.active = true;
    }

    public get PickupEvent(): ISignal<Item> {
        return this.pickUpEvent;
    }

    public pickup(): void {
        this.pickUpEvent.trigger(this);
        this.node.active = false;
    }
}
```

## File: Game/Items/ItemAttractor.ts/ItemAttractor.ts
```typescript
import { Node, Vec3 } from "cc";
import { getDirection } from "../../Services/Utils/VecUtils";
import { Item } from "./Item";

export class ItemAttractor {
    private items: Item[] = [];
    private speedValues: number[] = [];

    public constructor(private playerNode: Node, private speedIncreasePerSecond: number) {}

    public gameTick(deltaTime: number): void {
        for (let i = 0; i < this.items.length; i++) {
            const direction: Vec3 = getDirection(this.playerNode.worldPosition, this.items[i].node.worldPosition);
            const position = this.items[i].node.worldPosition.clone();
            position.x += direction.x * this.speedValues[i] * deltaTime;
            position.y += direction.y * this.speedValues[i] * deltaTime;

            this.items[i].node.setWorldPosition(position);
            this.speedValues[i] += this.speedIncreasePerSecond * deltaTime;
        }
    }

    public addItem(item: Item): void {
        if (this.items.includes(item)) return;

        item.PickupEvent.on(this.removeItem, this);

        this.items.push(item);
        this.speedValues.push(0);
    }

    private removeItem(item: Item): void {
        item.PickupEvent.off(this.removeItem);

        const index = this.items.indexOf(item);

        this.items.splice(index, 1);
        this.speedValues.splice(index, 1);
    }
}
```

## File: Game/Items/ItemManager.ts/ItemManager.ts
```typescript
import { Component, random, randomRange, Vec3, _decorator } from "cc";
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";
import { ItemSettings } from "../Data/GameSettings";
import { GameResult } from "../Game";
import { GameModalLauncher } from "../ModalWIndows/GameModalLauncher";
import { Enemy } from "../Unit/Enemy/Enemy";
import { EnemyManager } from "../Unit/Enemy/EnemyManager";
import { Player } from "../Unit/Player/Player";
import { Item } from "./Item";
import { ItemSpawner } from "./ItemSpawner";
import { ItemType } from "./ItemType";
import { PickupEffectManager } from "./PickupEffect/PickupEffectManager";

const { ccclass, property } = _decorator;

@ccclass("ItemManager")
export class ItemManager extends Component {
    @property(ItemSpawner) private xpSpawner: ItemSpawner;
    @property(ItemSpawner) private goldSpawner: ItemSpawner;
    @property(ItemSpawner) private healthPotionSpawner: ItemSpawner;
    @property(ItemSpawner) private magnetSpawner: ItemSpawner;
    @property(ItemSpawner) private chestSpawner: ItemSpawner;
    @property(PickupEffectManager) private pickupEffectManager: PickupEffectManager;

    private player: Player;
    private gameResult: GameResult;
    private modalLauncher: GameModalLauncher;
    private healthPerPotion: number;

    private pickupEvent = new Signal<ItemType>();

    private itemTypeToAction = new Map<ItemType, () => void>();

    public init(enemyManager: EnemyManager, player: Player, gameResult: GameResult, modalLauncher: GameModalLauncher, settings: ItemSettings): void {
        this.player = player;
        this.gameResult = gameResult;
        this.modalLauncher = modalLauncher;
        this.healthPerPotion = settings.healthPerPotion;

        enemyManager.EnemyAddedEvent.on(this.addEnemyListeners, this);
        enemyManager.EnemyRemovedEvent.on(this.removeEnemyListeners, this);

        this.xpSpawner.init();
        this.goldSpawner.init();
        this.healthPotionSpawner.init();
        this.magnetSpawner.init();
        this.chestSpawner.init();

        this.pickupEffectManager.init();

        this.itemTypeToAction.set(ItemType.XP, this.addXP.bind(this));
        this.itemTypeToAction.set(ItemType.Gold, this.addGold.bind(this));
        this.itemTypeToAction.set(ItemType.HealthPotion, this.useHealthPotion.bind(this));
        this.itemTypeToAction.set(ItemType.Magnet, this.activateMagnet.bind(this));
        this.itemTypeToAction.set(ItemType.Chest, this.openChest.bind(this));
    }

    public get PickupEvent(): ISignal<ItemType> {
        return this.pickupEvent;
    }

    public pickupItem(item: Item): void {
        if (!this.itemTypeToAction.has(item.ItemType)) throw new Error("Does not have behaviour set for " + item.ItemType);

        this.pickupEffectManager.showEffect(item.node.worldPosition);
        this.itemTypeToAction.get(item.ItemType)();
        this.pickupEvent.trigger(item.ItemType);

        item.pickup();
    }

    private addXP(): void {
        this.player.Level.addXp(1);
    }

    private addGold(): void {
        this.gameResult.goldCoins++;
    }

    private useHealthPotion(): void {
        this.player.Health.heal(this.healthPerPotion);
    }

    private activateMagnet(): void {
        this.player.Magnet.activate();
    }

    private openChest(): void {
        this.modalLauncher.showChestModal();
    }

    private addEnemyListeners(enemy: Enemy): void {
        enemy.DeathEvent.on(this.trySpawnItems, this);
    }

    private removeEnemyListeners(enemy: Enemy): void {
        enemy.DeathEvent.off(this.trySpawnItems);
    }

    private trySpawnItems(enemy: Enemy): void {
        this.trySpawnXP(enemy);
        this.trySpawnGold(enemy);
        ItemManager.trySpawnOnce(enemy.HealthPotionRewardChance, this.healthPotionSpawner, this.getRandomPosition(enemy));
        ItemManager.trySpawnOnce(enemy.MagnetRewardChance, this.magnetSpawner, this.getRandomPosition(enemy));
        ItemManager.trySpawnOnce(enemy.ChestRewardChance, this.chestSpawner, this.getRandomPosition(enemy));
    }

    private trySpawnXP(enemy: Enemy): void {
        for (let index = 0; index < enemy.XPReward; index++) {
            this.xpSpawner.spawn(this.getRandomPosition(enemy));
        }
    }

    private trySpawnGold(enemy: Enemy): void {
        if (enemy.GoldReward <= 0) return;

        if (enemy.GoldReward < 1) {
            if (random() < enemy.GoldReward) {
                this.goldSpawner.spawn(enemy.node.worldPosition);
            }
        } else {
            for (let i = 0; i < enemy.GoldReward; i++) {
                this.goldSpawner.spawn(this.getRandomPosition(enemy));
            }
        }
    }

    private static trySpawnOnce(chance: number, itemSpawner: ItemSpawner, worldPosition: Vec3): void {
        if (random() < chance) {
            itemSpawner.spawn(worldPosition);
        }
    }

    private getRandomPosition(enemy: Enemy): Vec3 {
        const position: Vec3 = enemy.node.worldPosition;
        position.x += randomRange(-15, 15);
        position.y += randomRange(-15, 15);

        return position;
    }
}
```

## File: Game/Items/ItemSpawner.ts/ItemSpawner.ts
```typescript
import { Component, Prefab, Vec3, _decorator } from "cc";
import { ObjectPool } from "../../Services/ObjectPool";
import { Item } from "./Item";

const { ccclass, property } = _decorator;

@ccclass("ItemSpawner")
export class ItemSpawner extends Component {
    @property(Prefab) public itemPrefab: Prefab;

    private itemPool: ObjectPool<Item>;
    public init(): void {
        this.itemPool = new ObjectPool<Item>(this.itemPrefab, this.node, 5, "Item");
    }

    public spawn(position: Vec3): void {
        const item: Item = this.itemPool.borrow();
        item.setup(position);
        item.PickupEvent.on(this.return, this);
    }

    private return(item: Item): void {
        item.PickupEvent.off(this.return);
        this.itemPool.return(item);
    }
}
```

## File: Game/Items/ItemType.ts/ItemType.ts
```typescript
export enum ItemType {
    XP,
    Gold,
    HealthPotion,
    Magnet,
    Chest
}
```

## File: Game/Items/PickupEffect/PickupEffect.ts/PickupEffect.ts
```typescript
import { Animation, Component, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PickupEffect")
export class PickupEffect extends Component {
    @property(Animation) private animation: Animation;
    public init(): void {
        this.animation.play("PickBonus");
    }
}
```

## File: Game/Items/PickupEffect/PickupEffectManager.ts/PickupEffectManager.ts
```typescript
import { _decorator, Component, Node, Prefab, Vec3 } from "cc";
import { ObjectPool } from "../../../Services/ObjectPool";
import { delay } from "../../../Services/Utils/AsyncUtils";
import { PickupEffect } from "./PickupEffect";
const { ccclass, property } = _decorator;

@ccclass("PickupEffectManager")
export class PickupEffectManager extends Component {
    @property(Prefab) private pickupEffect: Prefab;

    private effectPool: ObjectPool<PickupEffect>;

    public init(): void {
        this.effectPool = new ObjectPool(this.pickupEffect, this.node, 5, "PickupEffect");
    }

    public async showEffect(position: Vec3): Promise<void> {
        const effect = this.effectPool.borrow();
        effect.node.setWorldPosition(position);
        effect.node.active = true;

        await delay(450);

        this.effectPool?.return(effect);
    }
}
```

## File: Game/Items/XP.ts/XP.ts
```typescript
import { Animation, Vec3, _decorator } from "cc";
import { Item } from "./Item";

const { ccclass, property } = _decorator;

@ccclass("XP")
export class XP extends Item {
    @property(Animation) private animation: Animation;

    public setup(position: Vec3): void {
        super.setup(position);
        this.animation.play("DropStart");
    }
}
```

## File: Game/ModalWIndows/ChestModalWindow.ts/ChestModalWindow.ts
```typescript
import { randomRangeInt, _decorator } from "cc";
import { ModalWindow } from "../../Services/ModalWindowSystem/ModalWindow";
import { UIButton } from "../../Services/UI/Button/UIButton";
import { LevelUpModalWindowParams } from "../UI/LevelUpWindow/LevelUpModalWindow";
import { LevelUpSkill } from "../UI/LevelUpWindow/LevelUpSkill";
import { UpgradeType } from "../Upgrades/UpgradeType";
const { ccclass, property } = _decorator;

@ccclass("ChestModalWindow")
export class ChestModalWindow extends ModalWindow<LevelUpModalWindowParams, UpgradeType> {
    @property(LevelUpSkill) private levelUpSkill: LevelUpSkill;
    @property(UIButton) private okButton: UIButton;

    protected setup(params: LevelUpModalWindowParams): void {
        const randomIndex = randomRangeInt(0, params.availableUpgrades.length - 1);
        const skillToUpgrade = params.availableUpgrades[randomIndex];
        this.levelUpSkill.init(skillToUpgrade, params.translationData);

        this.okButton.InteractedEvent.on(() => this.dismiss(skillToUpgrade), this);
    }
}
```

## File: Game/ModalWIndows/GameModalLauncher.ts/GameModalLauncher.ts
```typescript
import { MenuModalWindowTypes } from "../../Menu/ModalWindows/MenuModalWindowTypes";
import { Empty } from "../../Menu/ModalWindows/Upgrades/UpgradesModalWindow";
import { ModalWindowManager } from "../../Services/ModalWindowSystem/ModalWindowManager";
import { TranslationData } from "../Data/TranslationData";
import { Game } from "../Game";
import { Pauser } from "../Pauser";
import { LevelUpModalWindowParams } from "../UI/LevelUpWindow/LevelUpModalWindow";
import { Player } from "../Unit/Player/Player";
import { Upgrader } from "../Upgrades/Upgrader";
import { UpgradeType } from "../Upgrades/UpgradeType";
import { GameModalWindowTypes } from "./GameModalWindowTypes";

export class GameModalLauncher {
    public constructor(
        private modalWindowManager: ModalWindowManager,
        private player: Player,
        private gamePauser: Pauser,
        private upgrader: Upgrader,
        private translationData: TranslationData
    ) {
        this.player.Level.LevelUpEvent.on(this.showLevelUpModal, this);
    }

    private async showLevelUpModal(): Promise<void> {
        this.gamePauser.pause();
        const skillToUpgrade: UpgradeType = await this.modalWindowManager.showModal<LevelUpModalWindowParams, UpgradeType>(
            GameModalWindowTypes.LevelUp,
            { availableUpgrades: Array.from(this.upgrader.getAvailableUpgrades()), translationData: this.translationData }
        );
        this.upgrader.upgradeSkill(skillToUpgrade);
        this.gamePauser.resume();
    }

    public async showChestModal(): Promise<void> {
        this.gamePauser.pause();
        const skillToUpgrade: UpgradeType = await this.modalWindowManager.showModal<LevelUpModalWindowParams, UpgradeType>(
            GameModalWindowTypes.Chest,
            { availableUpgrades: Array.from(this.upgrader.getAvailableUpgrades()), translationData: this.translationData }
        );
        this.upgrader.upgradeSkill(skillToUpgrade);
        this.gamePauser.resume();
    }

    public async showPauseModal(): Promise<void> {
        this.gamePauser.pause();
        const shouldExit = await this.modalWindowManager.showModal<ModalWindowManager, boolean>(GameModalWindowTypes.Pause, this.modalWindowManager);

        if (shouldExit) {
            Game.Instance.exitGame();
        } else {
            this.gamePauser.resume();
        }
    }
}
```

## File: Game/ModalWIndows/GameModalWindowTypes.ts/GameModalWindowTypes.ts
```typescript
export enum GameModalWindowTypes {
    LevelUp = "LevelUpModalWindow",
    Chest = "ChestModalWindow",
    Pause = "PauseModalWindow"
}
```

## File: Game/ModalWIndows/PauseModalWindow.ts/PauseModalWindow.ts
```typescript
import { _decorator } from "cc";
import { MenuModalWindowTypes } from "../../Menu/ModalWindows/MenuModalWindowTypes";
import { ModalWindow } from "../../Services/ModalWindowSystem/ModalWindow";
import { ModalWindowManager } from "../../Services/ModalWindowSystem/ModalWindowManager";
import { UIButton } from "../../Services/UI/Button/UIButton";

const { ccclass, property } = _decorator;

@ccclass("PauseModalWindow")
export class PauseModalWindow extends ModalWindow<ModalWindowManager, boolean> {
    @property(UIButton) private continueBtn: UIButton;
    @property(UIButton) private audioSettingsButton: UIButton;
    @property(UIButton) private exitBtn: UIButton;

    private modalWindowManager: ModalWindowManager;

    protected setup(modalWindowManager: ModalWindowManager): void {
        this.modalWindowManager = modalWindowManager;

        this.continueBtn.InteractedEvent.on(this.continueGame, this);
        this.audioSettingsButton.InteractedEvent.on(this.openSettingsWindow, this);
        this.exitBtn.InteractedEvent.on(this.exitGame, this);
    }

    private openSettingsWindow(): void {
        this.modalWindowManager.showModal(MenuModalWindowTypes.AudioSettings, {});
    }

    private continueGame(): void {
        this.dismiss(false);
    }

    private exitGame(): void {
        this.dismiss(true);
    }
}
```

## File: Game/Pauser.ts/Pauser.ts
```typescript
export class Pauser {
    private isPaused = false;

    public get IsPaused(): boolean {
        return this.isPaused;
    }

    public pause(): void {
        this.isPaused = true;
    }

    public resume(): void {
        this.isPaused = false;
    }
}
```

## File: Game/Projectile/IProjectileLauncherSignaler.ts/IProjectileLauncherSignaler.ts
```typescript
import { ISignal } from "../../Services/EventSystem/ISignal";
import { ProjectileCollision } from "./ProjectileCollision";

export interface IProjectileLauncherSignaler {
    get ProjectileCollisionEvent(): ISignal<ProjectileCollision>;
    get ProjectileLaunchedEvent(): ISignal;
}
```

## File: Game/Projectile/Projectile.ts/Projectile.ts
```typescript
import { Collider2D, Component, Contact2DType, Vec3, _decorator } from "cc";
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";
import { ProjectileCollision } from "./ProjectileCollision";
const { ccclass, property } = _decorator;

@ccclass("Projectile")
export class Projectile extends Component {
    @property(Collider2D) private collider: Collider2D;
    private contactBeginEvent = new Signal<ProjectileCollision>();
    private piercesDepletedEvent = new Signal<Projectile>();

    private isContactListenerSet = false;

    private piercesLeft = 0;
    private damage = 0;

    public setup(damage: number, pierces: number, angle: number): void {
        this.piercesLeft = pierces;
        this.damage = damage;

        if (!this.isContactListenerSet) {
            this.isContactListenerSet = true;
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this);
        }

        this.node.setRotationFromEuler(new Vec3(0, 0, angle));
    }

    public pierce(): void {
        this.piercesLeft--;
        if (this.piercesLeft <= 0) {
            this.piercesDepletedEvent.trigger(this);
        }
    }

    public get Damage(): number {
        return this.damage;
    }

    public get ContactBeginEvent(): ISignal<ProjectileCollision> {
        return this.contactBeginEvent;
    }

    public get PiercesDepletedEvent(): ISignal<Projectile> {
        return this.piercesDepletedEvent;
    }

    private onColliderContactBegin(thisCollider: Collider2D, otherCollider: Collider2D): void {
        this.contactBeginEvent.trigger({ otherCollider, projectile: this });
    }
}
```

## File: Game/Projectile/ProjectileCollision.ts/ProjectileCollision.ts
```typescript
import { Collider2D } from "cc";
import { Projectile } from "./Projectile";

export class ProjectileCollision {
    public otherCollider: Collider2D;
    public projectile: Projectile;
}
```

## File: Game/Projectile/ProjectileLauncher/HaloProjectileLauncher.ts/HaloProjectileLauncher.ts
```typescript
import { Node, Vec2 } from "cc";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { GameTimer } from "../../../Services/GameTimer";
import { roundToOneDecimal } from "../../../Services/Utils/MathUtils";
import { HaloLauncherSettings } from "../../Data/GameSettings";
import { IProjectileLauncherSignaler } from "../IProjectileLauncherSignaler";
import { ProjectileCollision } from "../ProjectileCollision";
import { ProjectileData } from "./ProjectileData";
import { ProjectileLauncher } from "./ProjectileLauncher";

export class HaloProjectileLauncher implements IProjectileLauncherSignaler {
    private currentUpgrade = 0;
    private defaultCooldown = 0;
    private cooldownDivisorPerUpgrade = 0;
    private directions: Vec2[] = [];
    private fireTimer = new GameTimer(0);

    private projectilesLaunchedEvent = new Signal();

    public constructor(
        private launcher: ProjectileLauncher,
        private playerNode: Node,
        settings: HaloLauncherSettings,
        projectileData: ProjectileData
    ) {
        this.defaultCooldown = settings.launcher.cooldown;
        this.cooldownDivisorPerUpgrade = settings.cooldownDivisorPerUpgrade;

        const angle: number = (2 * Math.PI) / settings.projectilesToSpawn;

        for (let i = 0; i < settings.projectilesToSpawn; i++) {
            const x: number = roundToOneDecimal(Math.sin(angle * i));
            const y: number = roundToOneDecimal(Math.cos(angle * i));
            this.directions.push(new Vec2(x, y).normalize());
        }

        launcher.init(settings.launcher.projectileLifetime, settings.launcher.projectileSpeed, projectileData.damage, projectileData.pierces);
    }

    public get ProjectileCollisionEvent(): ISignal<ProjectileCollision> {
        return this.launcher.ProjectileCollisionEvent;
    }

    public get ProjectileLaunchedEvent(): ISignal {
        return this.launcher.ProjectileLaunchedEvent;
    }

    public get ProjectilesLaunchedEvent(): ISignal {
        return this.projectilesLaunchedEvent;
    }

    public gameTick(deltaTime: number): void {
        if (this.currentUpgrade == 0) return;

        this.launcher.gameTick(deltaTime);
        this.fireTimer.gameTick(deltaTime);

        if (this.fireTimer.tryFinishPeriod()) {
            this.launcher.fireProjectiles(this.playerNode.worldPosition, this.directions);
            this.projectilesLaunchedEvent.trigger();
        }
    }

    public upgrade(): void {
        this.currentUpgrade++;
        this.fireTimer = new GameTimer(this.defaultCooldown / (this.cooldownDivisorPerUpgrade * this.currentUpgrade));
    }
}
```

## File: Game/Projectile/ProjectileLauncher/ProjectileData.ts/ProjectileData.ts
```typescript
export class ProjectileData {
    public pierces = 0;
    public damage = 0;
}
```

## File: Game/Projectile/ProjectileLauncher/ProjectileLauncher.ts/ProjectileLauncher.ts
```typescript
import { _decorator, Component, Prefab, Vec2, Vec3 } from "cc";
import { Empty } from "../../../Menu/ModalWindows/Upgrades/UpgradesModalWindow";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { ObjectPool } from "../../../Services/ObjectPool";
import { getDegreeAngleFromDirection } from "../../../Services/Utils/MathUtils";
import { IProjectileLauncherSignaler } from "../IProjectileLauncherSignaler";
import { Projectile } from "../Projectile";
import { ProjectileCollision } from "../ProjectileCollision";
const { ccclass, property } = _decorator;

@ccclass("ProjectileLauncher")
export class ProjectileLauncher extends Component implements IProjectileLauncherSignaler {
    @property(Prefab) private projectilePrefab: Prefab;
    private projectileCollisionEvent = new Signal<ProjectileCollision>();
    private projectileLaunchedEvent = new Signal();

    private projectileDamage: number;
    private projectilePierces: number;
    private projectileLifetime: number;
    private projectileSpeed: number;

    private projectilePool: ObjectPool<Projectile>;

    private projectiles: Projectile[] = [];
    private directions: Vec2[] = [];
    private expireTimes: number[] = [];
    private currentTime = 0;

    public get ProjectileCollisionEvent(): ISignal<ProjectileCollision> {
        return this.projectileCollisionEvent;
    }

    public get ProjectileLaunchedEvent(): ISignal {
        return this.projectileLaunchedEvent;
    }

    public init(projectileLifetime: number, projectileSpeed: number, projectileDamage: number, projectilePierces: number): void {
        this.projectileLifetime = projectileLifetime;
        this.projectileSpeed = projectileSpeed;
        this.projectileDamage = projectileDamage;
        this.projectilePierces = projectilePierces;

        this.projectilePool = new ObjectPool<Projectile>(this.projectilePrefab, this.node, 6, "Projectile");
    }

    public gameTick(deltaTime: number): void {
        this.currentTime += deltaTime;
        this.tryRemoveExpiredProjectiles();
        this.moveAllProjectiles(deltaTime);
    }

    public fireProjectiles(startPosition: Vec3, fireDirections: Vec2[]): void {
        for (const direction of fireDirections) {
            this.fireProjectile(startPosition, direction);
        }
    }

    private fireProjectile(startPosition: Vec3, direction: Vec2): void {
        direction = direction.normalize();
        const projectile: Projectile = this.projectilePool.borrow();
        projectile.setup(this.projectileDamage, this.projectilePierces, getDegreeAngleFromDirection(direction.x, direction.y));
        projectile.node.setWorldPosition(startPosition);
        projectile.node.active = true;
        projectile.ContactBeginEvent.on(this.onProjectileCollision, this);
        projectile.PiercesDepletedEvent.on(this.onPiercesDepleted, this);

        this.projectiles.push(projectile);
        this.directions.push(direction);
        this.expireTimes.push(this.currentTime + this.projectileLifetime);

        this.projectileLaunchedEvent.trigger();
    }

    private tryRemoveExpiredProjectiles(): void {
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.currentTime < this.expireTimes[i]) break; // the oldest particles are at the start of the array

            const projectile: Projectile = this.projectiles[i];
            this.removeProjectile(projectile, i);
            i--; // Check the same index
        }
    }

    private onPiercesDepleted(projectile: Projectile): void {
        const index = this.projectiles.indexOf(projectile);
        if (index === -1) {
            throw new Error("Projectile not found!");
        }

        this.removeProjectile(projectile, index);
    }

    private removeProjectile(projectile: Projectile, index: number): void {
        projectile.ContactBeginEvent.off(this.onProjectileCollision);
        projectile.PiercesDepletedEvent.off(this.onPiercesDepleted);

        this.projectilePool.return(projectile);

        this.projectiles.splice(index, 1);
        this.directions.splice(index, 1);
        this.expireTimes.splice(index, 1);
    }

    private moveAllProjectiles(deltaTime: number): void {
        for (let i = 0; i < this.projectiles.length; i++) {
            const newPosition: Vec3 = this.projectiles[i].node.worldPosition;
            newPosition.x += this.directions[i].x * deltaTime * this.projectileSpeed;
            newPosition.y += this.directions[i].y * deltaTime * this.projectileSpeed;

            this.projectiles[i].node.setWorldPosition(newPosition);
        }
    }

    private onProjectileCollision(projectlieCollision: ProjectileCollision): void {
        this.projectileCollisionEvent.trigger(projectlieCollision);
    }
}
```

## File: Game/Projectile/ProjectileLauncher/WaveProjectileLauncher.ts/WaveProjectileLauncher.ts
```typescript
import { Node, Vec2 } from "cc";
import { Empty } from "../../../Menu/ModalWindows/Upgrades/UpgradesModalWindow";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { GameTimer } from "../../../Services/GameTimer";
import { delay } from "../../../Services/Utils/AsyncUtils";
import { WaveLauncherSettings } from "../../Data/GameSettings";
import { IProjectileLauncherSignaler } from "../IProjectileLauncherSignaler";
import { ProjectileCollision } from "../ProjectileCollision";
import { ProjectileData } from "./ProjectileData";
import { ProjectileLauncher } from "./ProjectileLauncher";

export class WaveProjectileLauncher implements IProjectileLauncherSignaler {
    private currentUpgrade = 0;
    private wavesToShootPerUpgrade = 0;
    private fireTimer: GameTimer;
    private wavesToShoot: number;
    private wavesDelayMs: number;

    public constructor(
        private launcher: ProjectileLauncher,
        private playerNode: Node,
        private directions: Vec2[],
        settings: WaveLauncherSettings,
        projectileData: ProjectileData
    ) {
        this.wavesToShootPerUpgrade = settings.wavesToShootPerUpgrade;

        this.fireTimer = new GameTimer(settings.launcher.cooldown);
        this.wavesToShoot = settings.launcher.wavesToShoot;
        this.wavesDelayMs = settings.launcher.wavesDelayMs;

        launcher.init(settings.launcher.projectileLifetime, settings.launcher.projectileSpeed, projectileData.damage, projectileData.pierces);
    }

    public get ProjectileCollisionEvent(): ISignal<ProjectileCollision> {
        return this.launcher.ProjectileCollisionEvent;
    }

    public get ProjectileLaunchedEvent(): ISignal {
        return this.launcher.ProjectileLaunchedEvent;
    }

    public gameTick(deltaTime: number): void {
        if (this.currentUpgrade == 0) return;

        this.launcher.gameTick(deltaTime);
        this.fireTimer.gameTick(deltaTime);

        if (this.fireTimer.tryFinishPeriod()) {
            this.fireProjectiles();
        }
    }

    public upgrade(): void {
        this.currentUpgrade++;
        this.wavesToShoot += this.wavesToShootPerUpgrade;
    }

    private async fireProjectiles(): Promise<void> {
        for (let i = 0; i < this.wavesToShoot; i++) {
            this.launcher.fireProjectiles(this.playerNode.worldPosition, this.directions);

            await delay(this.wavesDelayMs);
        }
    }
}
```

## File: Game/TestGameRunner.ts/TestGameRunner.ts
```typescript
import { CCInteger, Component, _decorator } from "cc";
import { AppRoot } from "../AppRoot/AppRoot";
import { GameRunner } from "../Menu/GameRunner";
import { delay } from "../Services/Utils/AsyncUtils";
import { GameSettings, ISpawner } from "./Data/GameSettings";
import { UserData } from "./Data/UserData";
import { Game } from "./Game";
const { ccclass, property } = _decorator;

@ccclass("TestGameRunner")
export class TestGameRunner extends Component {
    @property(CCInteger) private startTime = 0;
    @property(CCInteger) private startXP = 0;

    @property(CCInteger) private maxHpLevel = 0;
    @property(CCInteger) private bonusDamageLevel = 0;
    @property(CCInteger) private projectilePiercingLevel = 0;
    @property(CCInteger) private movementSpeedLevel = 0;
    @property(CCInteger) private xpGathererLevel = 0;
    @property(CCInteger) private goldGathererLevel = 0;

    public start(): void {
        if (GameRunner.Instance.IsRunning) return;
        this.playTestGameAsync();
    }

    public async playTestGameAsync(): Promise<void> {
        while (Game.Instance == null || AppRoot.Instance == null) await delay(100);

        const testUserData = new UserData();
        testUserData.game.metaUpgrades.healthLevel = this.maxHpLevel;
        testUserData.game.metaUpgrades.overallDamageLevel = this.bonusDamageLevel;
        testUserData.game.metaUpgrades.projectilePiercingLevel = this.projectilePiercingLevel;
        testUserData.game.metaUpgrades.movementSpeedLevel = this.movementSpeedLevel;
        testUserData.game.metaUpgrades.xpGathererLevel = this.xpGathererLevel;
        testUserData.game.metaUpgrades.goldGathererLevel = this.goldGathererLevel;

        const settings = this.getTimeModifiedSettings(AppRoot.Instance.Settings);
        Game.Instance.play(testUserData, settings, AppRoot.Instance.TranslationData, { startTime: this.startTime, startXP: this.startXP });
    }

    private getTimeModifiedSettings(settings: GameSettings): GameSettings {
        const spawners: ISpawner[] = [
            ...settings.enemyManager.circularEnemySpawners,
            ...settings.enemyManager.individualEnemySpawners,
            ...settings.enemyManager.waveEnemySpawners
        ];

        for (const spawner of spawners) {
            spawner.common.startDelay -= this.startTime;
            spawner.common.stopDelay -= this.startTime;
        }

        return settings;
    }
}

export class TestValues {
    public startTime = 0;
    public startXP = 0;
}
```

## File: Game/UI/GameUI.ts/GameUI.ts
```typescript
import { Component, Label, ProgressBar, _decorator } from "cc";
import { UIButton } from "../../Services/UI/Button/UIButton";
import { GameResult } from "../Game";
import { ItemManager } from "../Items/ItemManager";
import { ItemType } from "../Items/ItemType";
import { GameModalLauncher } from "../ModalWIndows/GameModalLauncher";
import { Player } from "../Unit/Player/Player";
import { UnitLevel } from "../Unit/UnitLevel";

const { ccclass, property } = _decorator;

@ccclass("GameUI")
export class GameUI extends Component {
    @property(ProgressBar) private xpBar: ProgressBar;
    @property(Label) private timeAliveText: Label;
    @property(Label) private goldLabel: Label;
    @property(UIButton) private pauseBtn: UIButton;

    private playerLevel: UnitLevel;
    private modalLauncher: GameModalLauncher;
    private gameResult: GameResult;

    public init(player: Player, modalLauncher: GameModalLauncher, itemManager: ItemManager, gameResult: GameResult): void {
        this.playerLevel = player.Level;
        this.modalLauncher = modalLauncher;
        this.gameResult = gameResult;

        this.playerLevel.XpAddedEvent.on(this.updateProgressBar, this);
        this.playerLevel.LevelUpEvent.on(this.updateProgressBar, this);

        itemManager.PickupEvent.on(this.tryUpdateGoldLabel, this);

        this.xpBar.progress = 0;

        this.pauseBtn.InteractedEvent.on(this.showPauseWindow, this);
    }

    private updateProgressBar(): void {
        this.xpBar.progress = this.playerLevel.XP / this.playerLevel.RequiredXP;
    }

    private tryUpdateGoldLabel(itemType: ItemType): void {
        if (itemType !== ItemType.Gold) return;

        this.goldLabel.string = this.gameResult.goldCoins.toString();
    }

    private showPauseWindow(): void {
        console.log("Show pause window");
        this.modalLauncher.showPauseModal();
    }

    public updateTimeAlive(timeAlive: number): void {
        this.timeAliveText.string = `${Math.floor(timeAlive)}`;
    }
}
```

## File: Game/UI/LevelUpWindow/LevelUpModalWindow.ts/LevelUpModalWindow.ts
```typescript
import { instantiate, Node, Prefab, Vec3, _decorator } from "cc";
import { ModalWindow } from "../../../Services/ModalWindowSystem/ModalWindow";
import { shuffle } from "../../../Services/Utils/ArrayUtils";
import { delay } from "../../../Services/Utils/AsyncUtils";
import { TranslationData } from "../../Data/TranslationData";
import { UpgradeType } from "../../Upgrades/UpgradeType";
import { LevelUpSkill } from "./LevelUpSkill";

const { ccclass, property } = _decorator;

@ccclass("LevelUpModalWindow")
export class LevelUpModalWindow extends ModalWindow<LevelUpModalWindowParams, UpgradeType> {
    @property(Prefab) private skillPrefab: Prefab;
    @property(Node) private skillParent: Node;

    private maxUpgradesToPick = 3;

    protected async setup(params: LevelUpModalWindowParams): Promise<void> {
        const shuffledAvailableUpgrades = shuffle(params.availableUpgrades);
        if (this.maxUpgradesToPick < shuffledAvailableUpgrades.length) {
            shuffledAvailableUpgrades.length = this.maxUpgradesToPick;
        }
        const xPositions: number[] = [-172, 0, 172];
        await delay(300);
        for (let i = 0; i < shuffledAvailableUpgrades.length; i++) {
            await delay(500);
            const skill: LevelUpSkill = instantiate(this.skillPrefab).getComponent(LevelUpSkill);
            skill.node.setParent(this.skillParent);
            skill.node.setPosition(new Vec3(xPositions[i]));
            skill.init(shuffledAvailableUpgrades[i], params.translationData);
            skill.ChooseSkillEvent.on(this.chooseSkill, this);
        }
    }

    private chooseSkill(upgradeType: UpgradeType): void {
        this.dismiss(upgradeType);
    }
}

export class LevelUpModalWindowParams {
    public availableUpgrades: UpgradeType[];
    public translationData: TranslationData;
}
```

## File: Game/UI/LevelUpWindow/LevelUpSkill.ts/LevelUpSkill.ts
```typescript
import { approx, Component, Label, NodeEventType, Sprite, _decorator } from "cc";
import { AppRoot } from "../../../AppRoot/AppRoot";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { TranslationData } from "../../Data/TranslationData";
import { UpgradeType } from "../../Upgrades/UpgradeType";
const { ccclass, property } = _decorator;

@ccclass("LevelUpSkill")
export class LevelUpSkill extends Component {
    @property(Label) private skillTitle: Label;
    @property(Label) private skillDescription: Label;
    @property(Sprite) private skillIcon: Sprite;
    private chooseSkillEvent: Signal<UpgradeType> = new Signal<UpgradeType>();
    private skillType: UpgradeType;

    public init(skillType: UpgradeType, translationData: TranslationData): void {
        this.skillType = skillType;
        this.skillTitle.string = `${translationData[`${skillType}_TITLE`]}`;
        this.skillDescription.string = `${translationData[`${skillType}_DESC`]}`;
        this.skillIcon.spriteFrame = AppRoot.Instance.GameAssets.UpgradeIcons.getIcon(skillType);
        this.node.on(NodeEventType.TOUCH_START, this.chooseSkill, this);
    }

    public get ChooseSkillEvent(): ISignal<UpgradeType> {
        return this.chooseSkillEvent;
    }

    private chooseSkill(): void {
        this.chooseSkillEvent.trigger(this.skillType);
    }
}
```

## File: Game/Unit/Enemy/AnimatedEnemy.ts/AnimatedEnemy.ts
```typescript
import { Animation, Vec3, _decorator } from "cc";
import { Enemy } from "./Enemy";
const { ccclass, property } = _decorator;

@ccclass("AnimatedEnemy")
export class AnimatedEnemy extends Enemy {
    @property(Animation) private animation: Animation;

    private isAnimatingIdle = false;

    public gameTick(move: Vec3, deltaTime: number): void {
        super.gameTick(move, deltaTime);

        console.log("Move x:  " + move.x + " Move y:  " + move.y);

        if (move.x === 0 && move.y === 0) {
            this.animateIdle();
        } else {
            this.animateRun();
        }
    }

    private animateIdle(): void {
        if (this.isAnimatingIdle) return;
        this.isAnimatingIdle = true;

        this.animation.play("Idle");
    }

    private animateRun(): void {
        if (!this.isAnimatingIdle) return;
        this.isAnimatingIdle = false;

        this.animation.play("Run");
    }
}
```

## File: Game/Unit/Enemy/BossEnemy.ts/BossEnemy.ts
```typescript
import { Animation, Collider2D, Contact2DType, _decorator } from "cc";
import { GroupType } from "../../GroupType";
import { Enemy } from "./Enemy";
const { ccclass, property } = _decorator;

@ccclass("BossEnemy")
export class BossEnemy extends Enemy {
    @property(Collider2D) private bossCollider: Collider2D;
    @property(Animation) private animation: Animation;

    private isAnimatingAttack = false;

    public start(): void {
        this.bossCollider.on(Contact2DType.BEGIN_CONTACT, this.collisionBegin, this);
        this.bossCollider.on(Contact2DType.END_CONTACT, this.collisionEnd, this);
    }

    private collisionBegin(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        if (otherCollider.group === GroupType.PLAYER) {
            this.animateAttack();
        }
    }

    private collisionEnd(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        if (otherCollider.group === GroupType.PLAYER) {
            this.animateMove();
        }
    }

    private animateAttack(): void {
        if (this.isAnimatingAttack) return;
        this.isAnimatingAttack = true;
        this.animation.play("Attack");
    }

    private animateMove(): void {
        if (!this.isAnimatingAttack) return;
        this.isAnimatingAttack = false;
        this.animation.play("Run");
    }
}
```

## File: Game/Unit/Enemy/Enemy.ts/Enemy.ts
```typescript
import { BoxCollider2D, Component, Material, randomRange, Sprite, Vec3, _decorator } from "cc";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { delay } from "../../../Services/Utils/AsyncUtils";
import { EnemySettings } from "../../Data/GameSettings";
import { UnitHealth } from "../UnitHealth";
import { EnemyMovementType } from "./EnemyMovementType";

const { ccclass, property } = _decorator;

@ccclass("Enemy")
export class Enemy extends Component {
    @property(BoxCollider2D) private collider: BoxCollider2D;
    @property(Sprite) private sprite: Sprite;
    @property(Material) private defaultMaterial: Material;
    @property(Material) private whiteMaterial: Material;

    private deathEvent: Signal<Enemy> = new Signal<Enemy>();
    private lifetimeEndedEvent: Signal<Enemy> = new Signal<Enemy>();

    private id: string;
    private movementType: EnemyMovementType;
    private health: UnitHealth;
    private damage: number;
    private speedX: number;
    private speedY: number;
    private lifetimeLeft: number;

    private xpReward: number;
    private goldReward: number;
    private healthPotionRewardChance: number;
    private magnetRewardChance: number;
    private chestRewardChance: number;

    private endOfLifetimeTriggered = false;

    public setup(position: Vec3, settings: EnemySettings): void {
        this.id = settings.id;
        this.movementType = <EnemyMovementType>settings.moveType;
        this.health = new UnitHealth(settings.health);
        this.damage = settings.damage;
        this.speedX = randomRange(settings.speed / 2, settings.speed);
        this.speedY = randomRange(settings.speed / 2, settings.speed);
        this.lifetimeLeft = settings.lifetime;

        this.xpReward = settings.xpReward;
        this.goldReward = settings.goldReward;
        this.healthPotionRewardChance = settings.healthPotionRewardChance;
        this.magnetRewardChance = settings.magnetRewardChance;
        this.chestRewardChance = settings.chestRewardChance;

        this.node.setWorldPosition(position);
        this.node.active = true;

        this.health.HealthPointsChangeEvent.on(this.animateHurt, this);
        this.endOfLifetimeTriggered = false;
    }

    public get Id(): string {
        return this.id;
    }

    public get MovementType(): EnemyMovementType {
        return this.movementType;
    }

    public get Collider(): BoxCollider2D {
        return this.collider;
    }

    public get Damage(): number {
        return this.damage;
    }

    public get Health(): UnitHealth {
        return this.health;
    }

    public get DeathEvent(): ISignal<Enemy> {
        return this.deathEvent;
    }

    public get XPReward(): number {
        return this.xpReward;
    }

    public get GoldReward(): number {
        return this.goldReward;
    }

    public get HealthPotionRewardChance(): number {
        return this.healthPotionRewardChance;
    }

    public get MagnetRewardChance(): number {
        return this.magnetRewardChance;
    }

    public get ChestRewardChance(): number {
        return this.chestRewardChance;
    }

    public get LifetimeEndedEvent(): ISignal<Enemy> {
        return this.lifetimeEndedEvent;
    }

    public dealDamage(points: number): void {
        this.health.damage(points);
        if (!this.health.IsAlive) {
            this.deathEvent.trigger(this);
        }
    }

    public gameTick(move: Vec3, deltaTime: number): void {
        const newPosition: Vec3 = this.node.worldPosition;
        newPosition.x += move.x * this.speedX * deltaTime;
        newPosition.y += move.y * this.speedY * deltaTime;

        if (move.x < 0) {
            this.sprite.node.setScale(-1, 1, 1);
        } else if (0 < move.x) {
            this.sprite.node.setScale(1, 1, 1);
        }

        this.node.setWorldPosition(newPosition);

        if (0 < this.lifetimeLeft) {
            this.lifetimeLeft -= deltaTime;
            if (this.lifetimeLeft <= 0) {
                this.lifetimeEndedEvent.trigger(this);
            } else if (this.lifetimeLeft <= 2) {
                this.animateEndOfLifetime();
            }
        }
    }

    private async animateEndOfLifetime(): Promise<void> {
        if (this.endOfLifetimeTriggered) return;

        this.endOfLifetimeTriggered = true;

        while (this.node?.active) {
            this.sprite.node.active = false;
            await delay(200);

            if (this.sprite == null) break; // exit scene

            this.sprite.node.active = true;
            await delay(200);
        }
    }

    private async animateHurt(): Promise<void> {
        this.sprite.material = this.whiteMaterial;
        await delay(100);
        this.sprite.material = this.defaultMaterial;
    }
}
```

## File: Game/Unit/Enemy/EnemyDeathEffectSpawner/EnemyDeathEffect.ts/EnemyDeathEffect.ts
```typescript
import { _decorator, Component, Animation, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemyDeathEffect")
export class EnemyDeathEffect extends Component {
    @property(Animation) private animation: Animation;

    public setup(worldPosition: Vec3): void {
        this.node.setWorldPosition(worldPosition);
        this.node.active = true;

        this.animation.play("DeathEffect");
    }
}
```

## File: Game/Unit/Enemy/EnemyDeathEffectSpawner/EnemyDeathEffectSpawner.ts/EnemyDeathEffectSpawner.ts
```typescript
import { _decorator, Component, Node, Prefab } from "cc";

import { ObjectPool } from "../../../../Services/ObjectPool";
import { delay } from "../../../../Services/Utils/AsyncUtils";
import { Enemy } from "../Enemy";
import { EnemyManager } from "../EnemyManager";
import { EnemyDeathEffect } from "./EnemyDeathEffect";
const { ccclass, property } = _decorator;

@ccclass("EnemyDeathEffectSpawner")
export class EnemyDeathEffectSpawner extends Component {
    @property(Prefab) private deathEffectPrefab: Prefab;

    private effectPool: ObjectPool<EnemyDeathEffect>;

    public init(enemyManager: EnemyManager): void {
        enemyManager.EnemyAddedEvent.on(this.onEnemyAdded, this);
        enemyManager.EnemyRemovedEvent.on(this.onEnemyRemoved, this);

        this.effectPool = new ObjectPool(this.deathEffectPrefab, this.node, 5, "EnemyDeathEffect");
    }

    private onEnemyAdded(enemy: Enemy): void {
        enemy.DeathEvent.on(this.animateDeathEffect, this);
    }

    private onEnemyRemoved(enemy: Enemy): void {
        enemy.DeathEvent.off(this.animateDeathEffect);
    }

    private async animateDeathEffect(enemy: Enemy): Promise<void> {
        const deathEffect = this.effectPool.borrow();
        deathEffect.setup(enemy.node.worldPosition);

        await delay(360);

        this.effectPool.return(deathEffect);
    }
}
```

## File: Game/Unit/Enemy/EnemyGraphicsType.ts/EnemyGraphicsType.ts
```typescript
export enum EnemyGraphicsType {
    Bat = "Bat",
    Goblin = "Goblin",
    Shark = "Shark",
    Skeleton = "Skeleton",
    BossOrcKing = "BossOrcKing",
    BossStoneGolem = "BossStoneGolem"

}
```

## File: Game/Unit/Enemy/EnemyManager.ts/EnemyManager.ts
```typescript
import { Component, Node, _decorator } from "cc";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { EnemyManagerSettings } from "../../Data/GameSettings";
import { Enemy } from "./Enemy";
import { EnemyMovementType } from "./EnemyMovementType";
import { IEnemyMover } from "./EnemyMover/EnemyMover";
import { FollowTargetEnemyMover } from "./EnemyMover/FollowTargetEnemyMover";
import { PeriodicFollowMovers } from "./EnemyMover/PeriodicFollow/PeriodicFollowMovers";
import { WaveEnemyMover } from "./EnemyMover/WaveEnemyMover";
import { CircularEnemySpawner } from "./EnemySpawner/CircularEnemySpawner";
import { DelayedEnemySpawner } from "./EnemySpawner/DelayedEnemySpawner";
import { EnemySpawner } from "./EnemySpawner/EnemySpawner";
import { IndividualEnemySpawner } from "./EnemySpawner/IndividualEnemySpawner";
import { WaveEnemySpawner } from "./EnemySpawner/WaveEnemySpawner";

const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {
    @property(EnemySpawner) private enemySpawner: EnemySpawner;

    private movementTypeToMover: Map<EnemyMovementType, IEnemyMover> = new Map<EnemyMovementType, IEnemyMover>();

    private spawners: DelayedEnemySpawner[] = [];

    public init(targetNode: Node, settings: EnemyManagerSettings): void {
        this.enemySpawner.init(targetNode, settings.enemies);
        this.enemySpawner.EnemyAddedEvent.on(this.onEnemyAdded, this);
        this.enemySpawner.EnemyRemovedEvent.on(this.onEnemyRemoved, this);

        for (const individualSpawnerSettings of settings.individualEnemySpawners) {
            const individualSpawner = new IndividualEnemySpawner(this.enemySpawner, individualSpawnerSettings);
            this.spawners.push(individualSpawner);
        }

        for (const circularSpawnerSettings of settings.circularEnemySpawners) {
            const circularSpawner = new CircularEnemySpawner(this.enemySpawner, circularSpawnerSettings);
            this.spawners.push(circularSpawner);
        }

        for (const waveSpawnerSettings of settings.waveEnemySpawners) {
            const waveSpawner = new WaveEnemySpawner(this.enemySpawner, waveSpawnerSettings);
            this.spawners.push(waveSpawner);
        }

        this.movementTypeToMover.set(EnemyMovementType.Follow, new FollowTargetEnemyMover(targetNode));
        this.movementTypeToMover.set(EnemyMovementType.Launch, new WaveEnemyMover(targetNode));
        this.movementTypeToMover.set(EnemyMovementType.PeriodicFollow, new PeriodicFollowMovers(targetNode, settings.periodicFollowMovers));
    }

    public gameTick(deltaTime: number): void {
        for (const spawner of this.spawners) {
            spawner.gameTick(deltaTime);
        }

        for (const kvp of this.movementTypeToMover) {
            kvp[1].gameTick(deltaTime);
        }
    }

    public get EnemyAddedEvent(): ISignal<Enemy> {
        return this.enemySpawner.EnemyAddedEvent;
    }

    public get EnemyRemovedEvent(): ISignal<Enemy> {
        return this.enemySpawner.EnemyRemovedEvent;
    }

    private onEnemyAdded(enemy: Enemy): void {
        this.getEnemyMover(enemy).addEnemy(enemy);
    }

    private onEnemyRemoved(enemy: Enemy): void {
        this.getEnemyMover(enemy).removeEnemy(enemy);
    }

    private getEnemyMover(enemy: Enemy): IEnemyMover {
        if (this.movementTypeToMover.has(enemy.MovementType)) {
            return this.movementTypeToMover.get(enemy.MovementType);
        }

        throw new Error("Does not have mover of type " + enemy.MovementType);
    }
}
```

## File: Game/Unit/Enemy/EnemyMovementType.ts/EnemyMovementType.ts
```typescript
export enum EnemyMovementType {
    Follow = "Follow",
    PeriodicFollow = "PeriodicFollow",
    Launch = "Launch"
}
```

## File: Game/Unit/Enemy/EnemyMover/EnemyMover.ts/EnemyMover.ts
```typescript
import { Node } from "cc";
import { Enemy } from "../Enemy";

export abstract class EnemyMover implements IEnemyMover {
    protected targetNode: Node;
    protected enemies: Enemy[] = [];

    public constructor(targetNode: Node) {
        this.targetNode = targetNode;
    }
    public addEnemy(enemy: Enemy): void {
        this.enemies.push(enemy);
    }

    public removeEnemy(enemy: Enemy): void {
        const index: number = this.enemies.indexOf(enemy);
        if (index != -1) {
            this.enemies.splice(index, 1);
        }
    }

    public abstract gameTick(deltaTime: number): void;
}

export interface IEnemyMover {
    addEnemy(enemy: Enemy): void;
    removeEnemy(enemy: Enemy): void;
    gameTick(deltaTime: number): void;
}
```

## File: Game/Unit/Enemy/EnemyMover/FollowTargetEnemyMover.ts/FollowTargetEnemyMover.ts
```typescript
import { Vec3 } from "cc";
import { EnemyMover } from "./EnemyMover";

export class FollowTargetEnemyMover extends EnemyMover {
    public gameTick(deltaTime: number): void {
        this.enemies.forEach((enemy) => {
            let direction: Vec3 = new Vec3();
            direction = Vec3.subtract(direction, this.targetNode.worldPosition, enemy.node.worldPosition);
            enemy.gameTick(direction.normalize(), deltaTime);
        });
    }
}
```

## File: Game/Unit/Enemy/EnemyMover/PeriodicFollow/PeriodicFollowMovers.ts/PeriodicFollowMovers.ts
```typescript
import { Node } from "cc";
import { PeriodicFollowMoverSettings } from "../../../../Data/GameSettings";
import { Enemy } from "../../Enemy";
import { IEnemyMover } from "../EnemyMover";
import { PeriodicFollowTargetEnemyMover } from "./PeriodicFollowTargetEnemyMover";

export class PeriodicFollowMovers implements IEnemyMover {
    private enemyIdToMover = new Map<string, PeriodicFollowTargetEnemyMover>();
    public constructor(targetNode: Node, settings: PeriodicFollowMoverSettings[]) {
        for (const moverSettings of settings) {
            this.enemyIdToMover.set(
                moverSettings.enemyIdToAffect,
                new PeriodicFollowTargetEnemyMover(targetNode, moverSettings.followTime, moverSettings.waitTime)
            );
        }
    }

    public addEnemy(enemy: Enemy): void {
        this.requireEnemyMover(enemy);
        this.enemyIdToMover.get(enemy.Id).addEnemy(enemy);
    }

    public removeEnemy(enemy: Enemy): void {
        this.requireEnemyMover(enemy);
        this.enemyIdToMover.get(enemy.Id).removeEnemy(enemy);
    }

    public gameTick(deltaTime: number): void {
        for (const enemyMover of this.enemyIdToMover.values()) {
            enemyMover.gameTick(deltaTime);
        }
    }

    private requireEnemyMover(enemy: Enemy): void {
        if (!this.enemyIdToMover.has(enemy.Id)) {
            throw new Error("There is no periodic follow mover for enemy with id " + enemy.Id);
        }
    }
}
```

## File: Game/Unit/Enemy/EnemyMover/PeriodicFollow/PeriodicFollowTargetEnemyMover.ts/PeriodicFollowTargetEnemyMover.ts
```typescript
import { Node, Vec3 } from "cc";
import { Enemy } from "../../Enemy";
import { EnemyMover } from "../EnemyMover";

export class PeriodicFollowTargetEnemyMover extends EnemyMover {
    private enemyToFollowState: Map<Enemy, EnemyFollowState> = new Map<Enemy, EnemyFollowState>();
    private enemyToStateTimeLeft: Map<Enemy, number> = new Map<Enemy, number>();

    public constructor(targetNode: Node, private followTime: number, private waitTime: number) {
        super(targetNode);
    }

    public addEnemy(enemy: Enemy): void {
        this.setEnemyFollowState(enemy, EnemyFollowState.Follow, this.followTime);
        super.addEnemy(enemy);
    }

    public removeEnemy(enemy: Enemy): void {
        super.removeEnemy(enemy);
    }

    public gameTick(deltaTime: number): void {
        for (const enemy of this.enemies) {
            const stateTimeLeft: number = this.enemyToStateTimeLeft.get(enemy) - deltaTime;
            if (stateTimeLeft <= 0) {
                this.switchEnemyFollowState(enemy);
            } else {
                this.enemyToStateTimeLeft.set(enemy, stateTimeLeft);
            }
            if (this.enemyToFollowState.get(enemy) === EnemyFollowState.Follow) {
                let direction: Vec3 = new Vec3();
                direction = Vec3.subtract(direction, this.targetNode.worldPosition, enemy.node.worldPosition);
                enemy.gameTick(direction.normalize(), deltaTime);
            } else if (this.enemyToFollowState.get(enemy) === EnemyFollowState.Wait) {
                enemy.gameTick(new Vec3(), deltaTime);
            }
        }
    }

    private switchEnemyFollowState(enemy: Enemy): void {
        const followState: EnemyFollowState = this.enemyToFollowState.get(enemy);
        if (followState === EnemyFollowState.Follow) {
            this.setEnemyFollowState(enemy, EnemyFollowState.Wait, this.waitTime);
        } else if (followState === EnemyFollowState.Wait) {
            this.setEnemyFollowState(enemy, EnemyFollowState.Follow, this.followTime);
        }
    }

    private setEnemyFollowState(enemy: Enemy, followState: EnemyFollowState, stateTimeLeft: number): void {
        this.enemyToFollowState.set(enemy, followState);
        this.enemyToStateTimeLeft.set(enemy, stateTimeLeft);
    }
}

export enum EnemyFollowState {
    Follow,
    Wait
}
```

## File: Game/Unit/Enemy/EnemyMover/WaveEnemyMover.ts/WaveEnemyMover.ts
```typescript
import { Vec3 } from "cc";
import { Enemy } from "../Enemy";
import { EnemyMover } from "./EnemyMover";

export class WaveEnemyMover extends EnemyMover {
    private enemyToDirection: Map<Enemy, Vec3> = new Map<Enemy, Vec3>();
    private lastTargetPosition: Vec3 = new Vec3();
    private lastDirection: Vec3 = new Vec3();

    public addEnemy(enemy: Enemy): void {
        let direction: Vec3 = new Vec3();

        // if the enemy is added soon enough, move as a single group towards one direction
        if (Vec3.equals(this.lastTargetPosition, this.targetNode.worldPosition)) {
            direction = this.lastDirection;
        } else {
            direction = Vec3.subtract(direction, this.targetNode.worldPosition, enemy.node.worldPosition);
            this.lastDirection = direction;
            this.lastTargetPosition = this.targetNode.worldPosition.clone();
        }

        this.enemyToDirection.set(enemy, direction.normalize());
        super.addEnemy(enemy);
    }

    public removeEnemy(enemy: Enemy): void {
        this.enemyToDirection.delete(enemy);
        super.removeEnemy(enemy);
    }

    public gameTick(deltaTime: number): void {
        for (const enemyAndDirection of this.enemyToDirection) {
            enemyAndDirection[0].gameTick(enemyAndDirection[1], deltaTime);
        }
    }
}
```

## File: Game/Unit/Enemy/EnemySpawner/CircularEnemySpawner.ts/CircularEnemySpawner.ts
```typescript
import { GameTimer } from "../../../../Services/GameTimer";
import { roundToOneDecimal } from "../../../../Services/Utils/MathUtils";
import { CircularEnemySpawnerSettings } from "../../../Data/GameSettings";

import { DelayedEnemySpawner } from "./DelayedEnemySpawner";
import { EnemySpawner } from "./EnemySpawner";

export class CircularEnemySpawner extends DelayedEnemySpawner {
    private spawnTimer: GameTimer;
    private enemyId: string;
    private enemiesToSpawn: number;

    public constructor(private enemySpawner: EnemySpawner, settings: CircularEnemySpawnerSettings) {
        super(settings.common.startDelay, settings.common.stopDelay);

        this.spawnTimer = new GameTimer(settings.common.cooldown);
        this.enemyId = settings.common.enemyId;
        this.enemiesToSpawn = settings.enemiesToSpawn;
    }

    public delayedGameTick(deltaTime: number): void {
        this.spawnTimer.gameTick(deltaTime);

        if (this.spawnTimer.tryFinishPeriod()) {
            const angle: number = (2 * Math.PI) / this.enemiesToSpawn;

            for (let i = 0; i < this.enemiesToSpawn; i++) {
                const posX: number = roundToOneDecimal(Math.sin(angle * i)) * 600;
                const posY: number = roundToOneDecimal(Math.cos(angle * i)) * 600;
                this.enemySpawner.spawnNewEnemy(posX, posY, this.enemyId);
            }
        }
    }
}
```

## File: Game/Unit/Enemy/EnemySpawner/DelayedEnemySpawner.ts/DelayedEnemySpawner.ts
```typescript
export abstract class DelayedEnemySpawner {
    private currentTime = 0;
    public constructor(private startDelay: number, private stopDelay: number) {
        if (stopDelay === -1) {
            this.stopDelay = Number.MAX_SAFE_INTEGER;
        }
    }

    public gameTick(deltaTime: number): void {
        this.currentTime += deltaTime;
        if (this.startDelay <= this.currentTime && this.currentTime <= this.stopDelay) {
            this.delayedGameTick(deltaTime);
        }
    }

    public abstract delayedGameTick(deltaTime: number): void;
}
```

## File: Game/Unit/Enemy/EnemySpawner/EnemySpawner.ts/EnemySpawner.ts
```typescript
import { _decorator, Component, Prefab, Vec3, Node } from "cc";
import { ISignal } from "../../../../Services/EventSystem/ISignal";
import { Signal } from "../../../../Services/EventSystem/Signal";
import { ObjectPool } from "../../../../Services/ObjectPool";
import { EnemySettings } from "../../../Data/GameSettings";
import { Enemy } from "../Enemy";
import { EnemyGraphicsType } from "../EnemyGraphicsType";

const { ccclass, property } = _decorator;

@ccclass("EnemySpawner")
export class EnemySpawner extends Component {
    @property(Prefab) private enemies: Prefab[] = [];

    private enemyAddedEvent: Signal<Enemy> = new Signal<Enemy>();
    private enemyRemovedEvent: Signal<Enemy> = new Signal<Enemy>();

    private enemyGraphicsTypeToPool = new Map<EnemyGraphicsType, ObjectPool<Enemy>>();
    private targetNode: Node;

    private idToSettings = new Map<string, EnemySettings>();

    public init(targetNode: Node, enemiesSettings: EnemySettings[]): void {
        this.targetNode = targetNode;

        for (const enemy of this.enemies) {
            const enemyPool: ObjectPool<Enemy> = new ObjectPool(enemy, this.node, 50, "Enemy");
            this.enemyGraphicsTypeToPool.set(<EnemyGraphicsType>enemy.name, enemyPool);
        }

        for (const enemySettings of enemiesSettings) {
            this.idToSettings.set(enemySettings.id, enemySettings);
        }
    }

    public get EnemyAddedEvent(): ISignal<Enemy> {
        return this.enemyAddedEvent;
    }

    public get EnemyRemovedEvent(): ISignal<Enemy> {
        return this.enemyRemovedEvent;
    }

    public spawnNewEnemy(positionX: number, positionY: number, id: string): Enemy {
        if (!this.idToSettings.has(id)) {
            throw new Error("Does not have setting for enemy " + id);
        }

        const enemySettings = this.idToSettings.get(id);

        const enemy = this.enemyGraphicsTypeToPool.get(<EnemyGraphicsType>enemySettings.graphicsType).borrow();
        const spawnPosition = new Vec3();
        spawnPosition.x = this.targetNode.worldPosition.x + positionX;
        spawnPosition.y = this.targetNode.worldPosition.y + positionY;
        enemy.setup(spawnPosition, enemySettings);

        enemy.DeathEvent.on(this.returnEnemy, this);
        enemy.LifetimeEndedEvent.on(this.returnEnemy, this);

        this.enemyAddedEvent.trigger(enemy);

        return enemy;
    }

    public returnEnemy(enemy: Enemy): void {
        enemy.DeathEvent.off(this.returnEnemy);
        enemy.LifetimeEndedEvent.off(this.returnEnemy);

        console.log(enemy.name);
        this.enemyGraphicsTypeToPool.get(<EnemyGraphicsType>enemy.node.name).return(enemy);

        this.enemyRemovedEvent.trigger(enemy);
    }
}
```

## File: Game/Unit/Enemy/EnemySpawner/IndividualEnemySpawner.ts/IndividualEnemySpawner.ts
```typescript
import { randomRange } from "cc";
import { GameTimer } from "../../../../Services/GameTimer";
import { randomPositiveOrNegative } from "../../../../Services/Utils/MathUtils";
import { IndividualEnemySpawnerSettings } from "../../../Data/GameSettings";
import { DelayedEnemySpawner } from "./DelayedEnemySpawner";
import { EnemySpawner } from "./EnemySpawner";

export class IndividualEnemySpawner extends DelayedEnemySpawner {
    private spawnTimer: GameTimer;
    private enemyId: string;

    public constructor(private enemySpawner: EnemySpawner, settings: IndividualEnemySpawnerSettings) {
        super(settings.common.startDelay, settings.common.stopDelay);

        this.spawnTimer = new GameTimer(settings.common.cooldown);
        this.enemyId = settings.common.enemyId;
    }

    public delayedGameTick(deltaTime: number): void {
        this.spawnTimer.gameTick(deltaTime);
        if (this.spawnTimer.tryFinishPeriod()) {
            const posX: number = randomRange(300, 600) * randomPositiveOrNegative();
            const posY: number = randomRange(300, 600) * randomPositiveOrNegative();
            this.enemySpawner.spawnNewEnemy(posX, posY, this.enemyId);
        }
    }
}
```

## File: Game/Unit/Enemy/EnemySpawner/WaveEnemySpawner.ts/WaveEnemySpawner.ts
```typescript
import { randomRange } from "cc";
import { GameTimer } from "../../../../Services/GameTimer";
import { randomPositiveOrNegative } from "../../../../Services/Utils/MathUtils";
import { WaveEnemySpawnerSettings } from "../../../Data/GameSettings";
import { Enemy } from "../Enemy";
import { DelayedEnemySpawner } from "./DelayedEnemySpawner";
import { EnemySpawner } from "./EnemySpawner";

export class WaveEnemySpawner extends DelayedEnemySpawner {
    private enemiesPerWave: number;
    private enemyId: string;

    private spawnTimer: GameTimer;

    public constructor(private enemySpawner: EnemySpawner, settings: WaveEnemySpawnerSettings) {
        super(settings.common.startDelay, settings.common.stopDelay);

        this.spawnTimer = new GameTimer(settings.common.cooldown);
        this.enemiesPerWave = settings.enemiesToSpawn;
        this.enemyId = settings.common.enemyId;
    }

    public delayedGameTick(deltaTime: number): void {
        this.spawnTimer.gameTick(deltaTime);
        if (this.spawnTimer.tryFinishPeriod()) {
            const defaultPosX: number = (500 + randomRange(0, 100)) * randomPositiveOrNegative();
            const defaultPosY: number = randomRange(0, 500) * randomPositiveOrNegative();

            const enemies: Enemy[] = [];
            const side: number = Math.ceil(Math.sqrt(this.enemiesPerWave));
            for (let i = 0; i < this.enemiesPerWave; i++) {
                const randomOffsetX: number = randomRange(-20, 20);
                const randomOffsetY: number = randomRange(-20, 20);
                const posX: number = defaultPosX + randomOffsetX + 50 * (i % side);
                const posY: number = defaultPosY + randomOffsetY + 50 * Math.floor(i / side);
                const enemy = this.enemySpawner.spawnNewEnemy(posX, posY, this.enemyId);
                enemies.push(enemy);
            }
        }
    }
}
```

## File: Game/Unit/Enemy/ProjectileLauncher.cs/EnemyProjectileLauncher.ts/EnemyProjectileLauncher.ts
```typescript
import { Vec3, Node, Vec2 } from "cc";
import { GameTimer } from "../../../../Services/GameTimer";
import { EnemyLauncherSettings } from "../../../Data/GameSettings";
import { ProjectileLauncher } from "../../../Projectile/ProjectileLauncher/ProjectileLauncher";
import { Enemy } from "../Enemy";
import { EnemyManager } from "../EnemyManager";

export class EnemyProjectileLauncher {
    private enemyToTimer = new Map<Enemy, GameTimer>();
    private cooldown: number;
    private enemyIds: string[];

    public constructor(
        private projectileLauncher: ProjectileLauncher,
        private playerNode: Node,
        enemyManager: EnemyManager,
        settings: EnemyLauncherSettings
    ) {
        enemyManager.EnemyAddedEvent.on(this.tryAddEnemy, this);
        enemyManager.EnemyRemovedEvent.on(this.tryRemoveEnemy, this);

        this.cooldown = settings.cooldown;
        this.enemyIds = settings.enemyIds;
        projectileLauncher.init(settings.projectileLifetime, settings.projectileSpeed, settings.projectileDamage, 1);
    }

    private tryAddEnemy(enemy: Enemy): void {
        if (this.enemyIds.includes(enemy.Id)) {
            this.enemyToTimer.set(enemy, new GameTimer(this.cooldown));
        }
    }

    private tryRemoveEnemy(enemy: Enemy): void {
        if (!this.enemyToTimer.has(enemy)) return;

        this.enemyToTimer.delete(enemy);
    }

    public gameTick(deltaTime: number): void {
        this.projectileLauncher.gameTick(deltaTime);

        for (const enemyAndTimerPair of this.enemyToTimer) {
            const enemyWorldPosition: Vec3 = enemyAndTimerPair[0].node.worldPosition;
            const shootTimer: GameTimer = enemyAndTimerPair[1];

            shootTimer.gameTick(deltaTime);
            if (shootTimer.tryFinishPeriod()) {
                let direction: Vec3 = new Vec3();
                direction = Vec3.subtract(direction, this.playerNode.worldPosition, enemyWorldPosition);
                this.projectileLauncher.fireProjectiles(enemyWorldPosition, [new Vec2(direction.x, direction.y)]);
            }
        }
    }
}
```

## File: Game/Unit/MetaUpgrades/MetaUpgrades.ts/MetaUpgrades.ts
```typescript
import { MetaUpgradesSettings } from "../../Data/GameSettings";
import { MetaUpgradesData } from "../../Data/UserData";
import { MetaUpgradeType } from "../../Upgrades/UpgradeType";

export class MetaUpgrades {
    private upgradeTypeToValue = new Map<MetaUpgradeType, number>();
    public constructor(data: MetaUpgradesData, settings: MetaUpgradesSettings) {
        this.upgradeTypeToValue.set(MetaUpgradeType.Health, this.getBonusValue(data.healthLevel, settings.health.bonuses));
        this.upgradeTypeToValue.set(MetaUpgradeType.OverallDamage, this.getBonusValue(data.overallDamageLevel, settings.overallDamage.bonuses));
        this.upgradeTypeToValue.set(
            MetaUpgradeType.ProjectilePiercing,
            this.getBonusValue(data.projectilePiercingLevel, settings.projectilePiercing.bonuses)
        );
        this.upgradeTypeToValue.set(MetaUpgradeType.MovementSpeed, this.getBonusValue(data.movementSpeedLevel, settings.movementSpeed.bonuses));
        this.upgradeTypeToValue.set(MetaUpgradeType.XPGatherer, this.getBonusValue(data.xpGathererLevel, settings.xpGatherer.bonuses));
        this.upgradeTypeToValue.set(MetaUpgradeType.GoldGatherer, this.getBonusValue(data.goldGathererLevel, settings.goldGatherer.bonuses));
    }

    private getBonusValue(level: number, bonuses: number[]): number {
        if (level <= 0) return 0;
        if (bonuses.length < level) throw new Error(`Meta upgrade does not have settings for level ${level}`);

        return bonuses[level - 1];
    }

    public getUpgradeValue(type: MetaUpgradeType): number {
        if (!this.upgradeTypeToValue.has(type)) {
            throw new Error("Does not have meta upgrade set up " + type);
        }

        return this.upgradeTypeToValue.get(type);
    }
}
```

## File: Game/Unit/Player/Magnet.ts/Magnet.ts
```typescript
import { _decorator, Component, Node, Collider2D, CircleCollider2D } from "cc";
import { GameTimer } from "../../../Services/GameTimer";
const { ccclass, property } = _decorator;

@ccclass("Magnet")
export class Magnet extends Component {
    @property(CircleCollider2D) private collider: CircleCollider2D;

    private timer: GameTimer;
    private duration: number;

    public get Collider(): Collider2D {
        return this.collider;
    }
    public init(duration: number): void {
        this.duration = duration;
        this.node.active = false;
    }

    public activate(): void {
        this.timer = new GameTimer(this.duration);
        this.node.active = true;
    }

    public gameTick(deltaTime: number): void {
        if (!this.node.active) return;

        this.timer.gameTick(deltaTime);
        if (this.timer.tryFinishPeriod()) {
            this.node.active = false;
        }
    }
}
```

## File: Game/Unit/Player/Player.ts/Player.ts
```typescript
import { Animation, Node, BoxCollider2D, Collider2D, Component, Vec2, Vec3, _decorator, Details, Sprite, Color } from "cc";
import { delay } from "../../../Services/Utils/AsyncUtils";
import { IInput } from "../../Input/IInput";
import { UnitHealth } from "../UnitHealth";
import { UnitLevel } from "../UnitLevel";
import { Magnet } from "./Magnet";
import { PlayerRegeneration } from "./PlayerRegeneration";
import { PlayerUI } from "./PlayerUI/PlayerUI";
import { Weapon } from "./Weapon/Weapon";

const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
    @property(BoxCollider2D) private collider: BoxCollider2D;
    @property(PlayerUI) private playerUI: PlayerUI;
    @property(Weapon) private weapon: Weapon;
    @property(Magnet) private magnet: Magnet;
    @property(Node) private playerGraphics: Node;
    @property(Animation) private animation: Animation;
    @property(Sprite) private sprite: Sprite;

    private input: IInput;
    private health: UnitHealth;
    private level: UnitLevel;
    private regeneration: PlayerRegeneration;
    private speed: number;

    private isMoveAnimationPlaying = false;

    public init(input: IInput, data: PlayerData): void {
        this.input = input;
        this.health = new UnitHealth(data.maxHp);
        this.level = new UnitLevel(data.requiredXP, data.xpMultiplier);
        this.regeneration = new PlayerRegeneration(this.health, data.regenerationDelay);
        this.speed = data.speed;

        this.weapon.init(data.strikeDelay, data.damage);
        this.magnet.init(data.magnetDuration);
        this.health.HealthPointsChangeEvent.on(this.animateHpChange, this);
        this.playerUI.init(this.health);
    }

    public get Health(): UnitHealth {
        return this.health;
    }

    public get Level(): UnitLevel {
        return this.level;
    }

    public get Weapon(): Weapon {
        return this.weapon;
    }

    public get Magnet(): Magnet {
        return this.magnet;
    }

    public get Regeneration(): PlayerRegeneration {
        return this.regeneration;
    }

    public get Collider(): Collider2D {
        return this.collider;
    }

    public gameTick(deltaTime: number): void {
        this.move(deltaTime);
        this.weapon.gameTick(deltaTime);
        this.magnet.gameTick(deltaTime);
        this.regeneration.gameTick(deltaTime);
    }

    private move(deltaTime: number): void {
        if (!this.health.IsAlive) return;

        const movement: Vec2 = this.input.getAxis();
        if (!movement.equals(Vec2.ZERO)) {
            movement.x *= deltaTime * this.speed;
            movement.y *= deltaTime * this.speed;

            const newPosition: Vec3 = this.node.worldPosition;
            newPosition.x += movement.x;
            newPosition.y += movement.y;

            this.node.setWorldPosition(newPosition);

            if (!this.isMoveAnimationPlaying) {
                this.isMoveAnimationPlaying = true;
                this.animation.play("Move");
            }

            if (movement.x < 0) {
                this.playerGraphics.setScale(new Vec3(1, 1, 1));
            } else if (0 < movement.x) {
                this.playerGraphics.setScale(new Vec3(-1, 1, 1));
            }
        } else {
            if (this.isMoveAnimationPlaying) {
                this.isMoveAnimationPlaying = false;
                this.animation.play("Idle");
            }
        }
    }

    private async animateHpChange(hpChange: number): Promise<void> {
        if (hpChange < 0) {
            this.sprite.color = Color.RED;
        } else {
            this.sprite.color = Color.GREEN;
        }

        await delay(100);
        this.sprite.color = Color.WHITE;

        if (!this.health.IsAlive) {
            this.animation.play("Die");
        }
    }
}

export class PlayerData {
    public requiredXP: number[] = [];
    public speed = 0;
    public maxHp = 0;
    public regenerationDelay = 0;
    public xpMultiplier = 0;
    public goldMultiplier = 0;

    // Weapon
    public strikeDelay = 0;
    public damage = 0;

    // Magnet
    public magnetDuration = 0;
}
```

## File: Game/Unit/Player/PlayerRegeneration.ts/PlayerRegeneration.ts
```typescript
import { GameTimer } from "../../../Services/GameTimer";
import { UnitHealth } from "../UnitHealth";

export class PlayerRegeneration {
    private currentRegenerationAmount = 0;
    private regenerationDelay: number;
    private regenerationTimer: GameTimer = new GameTimer(0);
    private health: UnitHealth;

    public constructor(health: UnitHealth, regenerationDelay: number) {
        this.health = health;
        this.regenerationDelay = regenerationDelay;
    }

    public upgrade(): void {
        this.currentRegenerationAmount++;
        this.regenerationTimer = new GameTimer(this.regenerationDelay / this.currentRegenerationAmount);
    }

    public gameTick(deltaTime: number): void {
        if (this.currentRegenerationAmount <= 0) return;

        this.regenerationTimer.gameTick(deltaTime);
        if (this.regenerationTimer.tryFinishPeriod()) {
            this.health.heal(1);
        }
    }
}
```

## File: Game/Unit/Player/PlayerUI/PlayerHealthUI.ts/PlayerHealthUI.ts
```typescript
import { Component, ProgressBar, _decorator } from "cc";
import { UnitHealth } from "../../UnitHealth";
const { ccclass, property } = _decorator;

@ccclass("PlayerHealthUI")
export class PlayerHealthUI extends Component {
    @property(ProgressBar) public healthBar: ProgressBar;
    private health: UnitHealth;

    public init(health: UnitHealth): void {
        this.healthBar.progress = 1;
        this.health = health;
        this.health.HealthPointsChangeEvent.on(this.updateHealthBar, this);
    }

    private updateHealthBar(): void {
        this.healthBar.progress = this.health.HealthPoints / this.health.MaxHealthPoints;
    }
}
```

## File: Game/Unit/Player/PlayerUI/PlayerUI.ts/PlayerUI.ts
```typescript
import { Component, _decorator } from "cc";
import { UnitHealth } from "../../UnitHealth";
import { PlayerHealthUI } from "./PlayerHealthUI";
const { ccclass, property } = _decorator;

@ccclass("PlayerUI")
export class PlayerUI extends Component {
    @property(PlayerHealthUI) private healthUI: PlayerHealthUI;

    public init(playerHealth: UnitHealth): void {
        this.healthUI.init(playerHealth);
    }
}
```

## File: Game/Unit/Player/Weapon/UpgradableCollider.ts/UpgradableCollider.ts
```typescript
import { BoxCollider2D, Collider2D, Component, Contact2DType, _decorator } from "cc";
import { ISignal } from "../../../../Services/EventSystem/ISignal";
import { Signal } from "../../../../Services/EventSystem/Signal";

const { ccclass, property } = _decorator;

@ccclass("UpgradableCollider")
export class UpgradableCollider extends Component {
    @property(BoxCollider2D) private colliders: BoxCollider2D[] = [];
    private contactBeginEvent: Signal<Collider2D> = new Signal<Collider2D>();
    private currentUpgradeLevel = 0;

    public init(): void {
        this.setUpgradeLevel();

        for (const collider of this.colliders) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this);
        }
    }

    public get ContactBeginEvent(): ISignal<Collider2D> {
        return this.contactBeginEvent;
    }

    public upgrade(): void {
        if (this.currentUpgradeLevel == this.colliders.length - 1) throw new Error("Already at max upgrade! " + this.currentUpgradeLevel);

        this.currentUpgradeLevel++;
        this.setUpgradeLevel();
    }

    private setUpgradeLevel(): void {
        for (const collider of this.colliders) {
            collider.node.active = false;
        }

        this.colliders[this.currentUpgradeLevel].node.active = true;
    }

    private onColliderContactBegin(thisCollider: Collider2D, otherCollider: Collider2D): void {
        this.contactBeginEvent.trigger(otherCollider);
    }
}
```

## File: Game/Unit/Player/Weapon/Weapon.ts/Weapon.ts
```typescript
import { Animation, AnimationState, Component, _decorator } from "cc";
import { ISignal } from "../../../../Services/EventSystem/ISignal";
import { Signal } from "../../../../Services/EventSystem/Signal";
import { GameTimer } from "../../../../Services/GameTimer";

import { UpgradableCollider } from "./UpgradableCollider";
const { ccclass, property } = _decorator;

@ccclass("Weapon")
export class Weapon extends Component {
    @property(Animation) private weaponAnimation: Animation;
    @property(UpgradableCollider) private upgradableCollider: UpgradableCollider;

    private weaponStrikeEvent = new Signal<Weapon>();

    private strikeTimer: GameTimer;
    private strikeState: AnimationState;
    private damage: number;

    public init(strikeDelay: number, damage: number): void {
        this.strikeTimer = new GameTimer(strikeDelay);
        this.damage = damage;
        this.node.active = false;

        this.weaponAnimation.on(Animation.EventType.FINISHED, this.endStrike, this);
        this.strikeState = this.weaponAnimation.getState(this.weaponAnimation.clips[0].name);
        this.strikeState.speed = 1;

        this.upgradableCollider.init();
    }

    public gameTick(deltaTime: number): void {
        this.strikeTimer.gameTick(deltaTime);
        if (this.strikeTimer.tryFinishPeriod()) {
            this.strike();
        }
    }

    public get WeaponStrikeEvent(): ISignal<Weapon> {
        return this.weaponStrikeEvent;
    }

    public get Collider(): UpgradableCollider {
        return this.upgradableCollider;
    }

    public get Damage(): number {
        return this.damage;
    }

    public upgradeWeaponDamage(): void {
        this.damage++;
    }
    public upgradeWeaponLength(): void {
        this.upgradableCollider.upgrade();
    }

    private strike(): void {
        this.node.active = true;
        this.weaponAnimation.play(this.strikeState.name);
        this.weaponStrikeEvent.trigger(this);
    }

    private endStrike(): void {
        this.node.active = false;
    }
}
```

## File: Game/Unit/UnitHealth.ts/UnitHealth.ts
```typescript
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";

export class UnitHealth {
    private healthPoints: number;
    private maxHealthPoints: number;
    private healthPointsChangeEvent: Signal<number> = new Signal<number>();

    public constructor(maxHealth: number) {
        this.maxHealthPoints = maxHealth;
        this.healthPoints = maxHealth;
    }

    public get IsAlive(): boolean {
        return 0 < this.healthPoints;
    }

    public get HealthPoints(): number {
        return this.healthPoints;
    }
    public get MaxHealthPoints(): number {
        return this.maxHealthPoints;
    }

    public get HealthPointsChangeEvent(): ISignal<number> {
        return this.healthPointsChangeEvent;
    }

    public heal(points: number): void {
        this.healthPoints = Math.min(this.maxHealthPoints, this.healthPoints + points);
        this.healthPointsChangeEvent.trigger(points);
    }

    public damage(points: number): void {
        this.healthPoints -= points;
        this.healthPointsChangeEvent.trigger(-points);
    }

    public setMaxHealth(maxHealth: number): void {
        this.maxHealthPoints = maxHealth;
    }
}
```

## File: Game/Unit/UnitLevel.ts/UnitLevel.ts
```typescript
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";

export class UnitLevel {
    private xp = 0;

    private currentLevel = 0;
    private levelUpEvent: Signal<number> = new Signal<number>();
    private xpAddedEvent: Signal<number> = new Signal<number>();

    public constructor(private requiredXPs: number[], private xpMultiplier: number) {}

    public addXp(points: number): void {
        this.xp += points * this.xpMultiplier;
        this.xpAddedEvent.trigger(this.xp);
        this.tryLevelUp();
    }

    public get XP(): number {
        return this.xp;
    }

    public get RequiredXP(): number {
        return this.requiredXPs[this.currentLevel];
    }

    public get LevelUpEvent(): ISignal<number> {
        return this.levelUpEvent;
    }

    public get XpAddedEvent(): ISignal<number> {
        return this.xpAddedEvent;
    }

    private tryLevelUp(): void {
        if (this.requiredXPs.length <= this.currentLevel) return;
        if (this.xp < this.requiredXPs[this.currentLevel]) return;

        this.xp -= this.requiredXPs[this.currentLevel];
        this.currentLevel++;

        this.levelUpEvent.trigger(this.currentLevel);

        this.tryLevelUp();
    }
}
```

## File: Game/Upgrades/Upgrader.ts/Upgrader.ts
```typescript
import { UpgradeSettings } from "../Data/GameSettings";
import { Player } from "../Unit/Player/Player";
import { HaloProjectileLauncher } from "../Projectile/ProjectileLauncher/HaloProjectileLauncher";
import { WaveProjectileLauncher } from "../Projectile/ProjectileLauncher/WaveProjectileLauncher";
import { UpgradeType } from "./UpgradeType";

export class Upgrader {
    private typeToAction: Map<UpgradeType, () => void> = new Map<UpgradeType, () => void>();
    private typeToLevel: Map<UpgradeType, number> = new Map<UpgradeType, number>();
    private typeToMaxLevel: Map<UpgradeType, number> = new Map<UpgradeType, number>();

    public constructor(
        private player: Player,
        private horizontalProjectileLauncher: WaveProjectileLauncher,
        private haloProjectileLauncher: HaloProjectileLauncher,
        private diagonalProjectileLauncher: WaveProjectileLauncher,
        settings: UpgradeSettings
    ) {
        this.setTypeMaps(UpgradeType.WeaponLength, this.upgradeWeaponLength.bind(this), settings.maxWeaponLengthUpgrades);
        this.setTypeMaps(UpgradeType.WeaponDamage, this.upgradeWeaponDamage.bind(this), settings.maxWeaponDamageUpgrades);
        this.setTypeMaps(
            UpgradeType.HorizontalProjectile,
            this.upgradeHorizontalProjectileLauncher.bind(this),
            settings.maxHorizontalProjectileUpgrades
        );
        this.setTypeMaps(UpgradeType.DiagonalProjectile, this.upgradeDiagonalProjectileLauncher.bind(this), settings.maxDiagonalProjectileUpgrades);
        this.setTypeMaps(UpgradeType.HaloProjectlie, this.upgradeHaloProjectileLauncher.bind(this), settings.maxHaloProjectileUpgrades);
        this.setTypeMaps(UpgradeType.Regeneration, this.upgradeRegeneration.bind(this), settings.maxRegenerationUpgrades);
    }

    public upgradeSkill(type: UpgradeType): void {
        if (!this.typeToAction.has(type)) throw new Error("Upgrade does not have " + type);
        if (this.isMaxLevel(type)) throw new Error("Upgrade is already at max level " + type);

        this.typeToAction.get(type)();
        const level: number = this.typeToLevel.get(type);
        this.typeToLevel.set(type, level + 1);
    }

    public getAvailableUpgrades(): Set<UpgradeType> {
        const availableUpgrades: Set<UpgradeType> = new Set<UpgradeType>();
        for (const key of this.typeToAction.keys()) {
            if (!this.isMaxLevel(key)) {
                availableUpgrades.add(key);
            }
        }

        return availableUpgrades;
    }

    private setTypeMaps(upgradeType: UpgradeType, action: () => void, maxLevel: number): void {
        this.typeToAction.set(upgradeType, action);
        this.typeToLevel.set(upgradeType, 0);
        this.typeToMaxLevel.set(upgradeType, maxLevel);
    }

    private upgradeWeaponLength(): void {
        this.player.Weapon.upgradeWeaponLength();
    }

    private upgradeWeaponDamage(): void {
        this.player.Weapon.upgradeWeaponDamage();
    }

    private upgradeHorizontalProjectileLauncher(): void {
        this.horizontalProjectileLauncher.upgrade();
    }

    private upgradeDiagonalProjectileLauncher(): void {
        this.diagonalProjectileLauncher.upgrade();
    }

    private upgradeHaloProjectileLauncher(): void {
        this.haloProjectileLauncher.upgrade();
    }

    private upgradeRegeneration(): void {
        this.player.Regeneration.upgrade();
    }

    private isMaxLevel(type: UpgradeType): boolean {
        return this.typeToMaxLevel.get(type) <= this.typeToLevel.get(type);
    }
}
```

## File: Game/Upgrades/UpgradeType.ts/UpgradeType.ts
```typescript
export enum UpgradeType {
    WeaponLength = "WEAPON_LENGTH",
    WeaponDamage = "WEAPON_DAMAGE",
    HorizontalProjectile = "HORIZONTAL_PROJECTILE",
    DiagonalProjectile = "DIAGONAL_PROJECTILE",
    HaloProjectlie = "HALO_PROJECTILE",
    Regeneration = "REGENERATION"
}

export enum MetaUpgradeType {
    Health = "META_HEALTH",
    OverallDamage = "META_OVERALL_DAMAGE",
    ProjectilePiercing = "META_PROJECTILE_PIERCING",
    MovementSpeed = "META_MOVEMENT_SPEED",
    XPGatherer = "META_XP_GATHERER",
    GoldGatherer = "META_GOLD_GATHERER"
}
```

## File: Menu/GameRunner.ts/GameRunner.ts
```typescript
import { director } from "cc";
import { AppRoot } from "../AppRoot/AppRoot";
import { UserData } from "../Game/Data/UserData";
import { Game, GameResult } from "../Game/Game";
import { delay } from "../Services/Utils/AsyncUtils";

export class GameRunner {
    private static instance: GameRunner = new GameRunner();

    private isRunning = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static get Instance(): GameRunner {
        return this.instance;
    }

    public get IsRunning(): boolean {
        return this.isRunning;
    }

    public async playGame(): Promise<void> {
        this.isRunning = true;
        director.loadScene("Game");
        const userData: UserData = AppRoot.Instance.LiveUserData;
        while (Game.Instance == null) await delay(10);
        const result: GameResult = await Game.Instance.play(userData, AppRoot.Instance.Settings, AppRoot.Instance.TranslationData);
        userData.game.goldCoins += result.goldCoins;

        if (userData.game.highscore < result.score) {
            userData.game.highscore = result.score;
        }
        AppRoot.Instance.saveUserData();
        director.loadScene("Menu");

        this.isRunning = false;
    }
}
```

## File: Menu/Menu.ts/Menu.ts
```typescript
import { approx, Canvas, Component, Label, Node, _decorator } from "cc";
import { AppRoot } from "../AppRoot/AppRoot";
import { requireAppRootAsync } from "../AppRoot/AppRootUtils";
import { MetaUpgradeSettings } from "../Game/Data/GameSettings";
import { MetaUpgradesData } from "../Game/Data/UserData";
import { UIButton } from "../Services/UI/Button/UIButton";
import { GameRunner } from "./GameRunner";
import { MenuModalLauncher } from "./ModalWindows/MenuModalLauncher";

const { ccclass, property } = _decorator;

@ccclass("Menu")
export class Menu extends Component {
    @property(UIButton) private playBtn: UIButton;
    @property(UIButton) private upgradeBtn: UIButton;
    @property(Node) private upgradeAvailableIndicator: Node;
    @property(Node) private goldCounter: Node;
    @property(Label) private goldLabel: Label;
    @property(UIButton) private audioSettingsBtn: UIButton;
    @property(Canvas) private menuCanvas: Canvas;
    @property(Label) private highscoreLabel: Label;

    private menuModalLauncher: MenuModalLauncher;

    public async start(): Promise<void> {
        requireAppRootAsync();
        this.menuCanvas.cameraComponent = AppRoot.Instance.MainCamera;

        this.playBtn.InteractedEvent.on(this.startGame, this);
        this.upgradeBtn.InteractedEvent.on(this.openUpgradesWindow, this);
        this.audioSettingsBtn.InteractedEvent.on(this.openAudioSettingsWindow, this);

        this.menuModalLauncher = new MenuModalLauncher(AppRoot.Instance.ModalWindowManager);

        this.highscoreLabel.string = `Highscore: ${Math.floor(AppRoot.Instance.LiveUserData.game.highscore)}`;

        this.updateGoldIndicators();
    }

    private updateGoldIndicators(): void {
        this.upgradeAvailableIndicator.active = this.isUpgradeAffordable();

        const goldCoins = AppRoot.Instance.LiveUserData.game.goldCoins;
        this.goldCounter.active = 0 < goldCoins;
        this.goldLabel.string = goldCoins.toString();
    }

    private isUpgradeAffordable(): boolean {
        const goldCoins: number = AppRoot.Instance.LiveUserData.game.goldCoins;
        const metaUpgrades: MetaUpgradesData = AppRoot.Instance.LiveUserData.game.metaUpgrades;

        const metaUpgradesSettings = AppRoot.Instance.Settings.metaUpgrades;

        const costs: number[] = [];
        this.tryPushLowestCost(metaUpgrades.goldGathererLevel, metaUpgradesSettings.goldGatherer, costs);
        this.tryPushLowestCost(metaUpgrades.healthLevel, metaUpgradesSettings.health, costs);
        this.tryPushLowestCost(metaUpgrades.movementSpeedLevel, metaUpgradesSettings.movementSpeed, costs);
        this.tryPushLowestCost(metaUpgrades.overallDamageLevel, metaUpgradesSettings.overallDamage, costs);
        this.tryPushLowestCost(metaUpgrades.projectilePiercingLevel, metaUpgradesSettings.projectilePiercing, costs);
        this.tryPushLowestCost(metaUpgrades.xpGathererLevel, metaUpgradesSettings.xpGatherer, costs);

        return 0 < costs.length ? Math.min(...costs) <= goldCoins : false;
    }

    private tryPushLowestCost(upgradeLevel: number, metaUpgradeSettings: MetaUpgradeSettings, costs: number[]): void {
        if (upgradeLevel < metaUpgradeSettings.costs.length) {
            costs.push(metaUpgradeSettings.costs[upgradeLevel]);
        }
    }

    private startGame(): void {
        AppRoot.Instance.ScreenFader.playOpen();
        GameRunner.Instance.playGame();
    }

    private async openUpgradesWindow(): Promise<void> {
        await this.menuModalLauncher.openUpgradesWindow();
        this.updateGoldIndicators();
    }

    private openAudioSettingsWindow(): void {
        this.menuModalLauncher.openAudioSettingsWindow();
    }
}
```

## File: Menu/ModalWindows/AudioSettings/AudioSettingsModalWindow.ts/AudioSettingsModalWindow.ts
```typescript
import { Slider, _decorator } from "cc";
import { AppRoot } from "../../../AppRoot/AppRoot";
import { ModalWindow } from "../../../Services/ModalWindowSystem/ModalWindow";
import { UIButton } from "../../../Services/UI/Button/UIButton";
import { Empty } from "../Upgrades/UpgradesModalWindow";

const { ccclass, property } = _decorator;

@ccclass("AudioSettingsModalWindow")
export class AudioSettingsModalWindow extends ModalWindow<Empty, Empty> {
    @property(Slider) private soundVolumeSlider: Slider;
    @property(Slider) private musicVolumeSlider: Slider;
    @property(UIButton) private okButton: UIButton;

    protected setup(): void {
        this.soundVolumeSlider.progress = AppRoot.Instance.AudioPlayer.SoundVolume;
        this.musicVolumeSlider.progress = AppRoot.Instance.AudioPlayer.MusicVolume;

        this.soundVolumeSlider.node.on("slide", this.updateSoundVolume, this);
        this.musicVolumeSlider.node.on("slide", this.updateMusicVolume, this);

        this.okButton.InteractedEvent.on(this.dismiss, this);
    }

    private updateSoundVolume(): void {
        AppRoot.Instance.AudioPlayer.setSoundVolume(this.soundVolumeSlider.progress);
    }

    private updateMusicVolume(): void {
        AppRoot.Instance.AudioPlayer.setMusicVolume(this.musicVolumeSlider.progress);
    }

    protected dismiss(result?: Empty): void {
        super.dismiss(result);
        const userData = AppRoot.Instance.LiveUserData;
        userData.musicVolume = this.musicVolumeSlider.progress;
        userData.soundVolume = this.soundVolumeSlider.progress;
        AppRoot.Instance.saveUserData();
    }
}
```

## File: Menu/ModalWindows/MenuModalLauncher.ts/MenuModalLauncher.ts
```typescript
import { ModalWindowManager } from "../../Services/ModalWindowSystem/ModalWindowManager";
import { MenuModalWindowTypes } from "./MenuModalWindowTypes";

export class MenuModalLauncher {
    public constructor(private modalWindowManager: ModalWindowManager) {}

    public async openUpgradesWindow(): Promise<void> {
        await this.modalWindowManager.showModal(MenuModalWindowTypes.Upgrades, {});
    }

    public async openAudioSettingsWindow(): Promise<void> {
        await this.modalWindowManager.showModal(MenuModalWindowTypes.AudioSettings, {});
    }
}
```

## File: Menu/ModalWindows/MenuModalWindowTypes.ts/MenuModalWindowTypes.ts
```typescript
export enum MenuModalWindowTypes {
    Upgrades = "UpgradesModalWindow",
    AudioSettings = "AudioSettingsModalWindow"
}
```

## File: Menu/ModalWindows/Upgrades/UpgradeLevelPointUI.ts/UpgradeLevelPointUI.ts
```typescript
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UpgradeLevelPointUI")
export class UpgradeLevelPointUI extends Component {
    @property(Node) private upgradedGraphics: Node;

    public init(): void {
        this.upgradedGraphics.active = false;
    }

    public upgrade(): void {
        this.upgradedGraphics.active = true;
    }
}
```

## File: Menu/ModalWindows/Upgrades/UpgradesModalWindow.ts/UpgradesModalWindow.ts
```typescript
import { AudioClip, instantiate, Label, Node, Prefab, _decorator } from "cc";
import { AppRoot } from "../../../AppRoot/AppRoot";
import { MetaUpgradeSettings } from "../../../Game/Data/GameSettings";
import { MetaUpgradesData, UserData } from "../../../Game/Data/UserData";
import { MetaUpgradeType } from "../../../Game/Upgrades/UpgradeType";
import { ModalWindow } from "../../../Services/ModalWindowSystem/ModalWindow";
import { UpgradeUI } from "./UpgradeUI";

const { ccclass, property } = _decorator;

@ccclass("UpgradesModalWindow")
export class UpgradesModalWindow extends ModalWindow<Empty, Empty> {
    @property(Prefab) private upgradeButtonPrefab: Prefab;
    @property(Node) private upgradeButtonParent: Node;
    @property(Label) private goldCoinsLabel: Label;
    @property(AudioClip) private upgradeAudioClip: AudioClip;

    private typeToLevel = new Map<MetaUpgradeType, number>();
    private typeToCosts = new Map<MetaUpgradeType, number[]>();
    private typeToLevelKey = new Map<MetaUpgradeType, keyof MetaUpgradesData>();
    private typeToUpgradeUI = new Map<MetaUpgradeType, UpgradeUI>();

    private userData: UserData;

    public setup(): void {
        this.userData = AppRoot.Instance.LiveUserData;
        const settings = AppRoot.Instance.Settings.metaUpgrades;

        this.createUpgradeButton(MetaUpgradeType.Health, settings.health, "healthLevel");
        this.createUpgradeButton(MetaUpgradeType.OverallDamage, settings.overallDamage, "overallDamageLevel");
        this.createUpgradeButton(MetaUpgradeType.ProjectilePiercing, settings.projectilePiercing, "projectilePiercingLevel");
        this.createUpgradeButton(MetaUpgradeType.MovementSpeed, settings.movementSpeed, "movementSpeedLevel");
        this.createUpgradeButton(MetaUpgradeType.XPGatherer, settings.xpGatherer, "xpGathererLevel");
        this.createUpgradeButton(MetaUpgradeType.GoldGatherer, settings.goldGatherer, "goldGathererLevel");

        this.goldCoinsLabel.string = this.userData.game.goldCoins.toString();
    }

    private createUpgradeButton<T extends keyof MetaUpgradesData>(
        upgradeType: MetaUpgradeType,
        upgradeSettings: MetaUpgradeSettings,
        levelKey: T
    ): void {
        const upgradeButton: Node = instantiate(this.upgradeButtonPrefab);
        const upgradeUI: UpgradeUI = upgradeButton.getComponent(UpgradeUI);

        upgradeUI.init(upgradeType, upgradeSettings, this.userData.game.metaUpgrades[levelKey], AppRoot.Instance.TranslationData);
        upgradeUI.InteractedEvent.on(this.tryUpgrade, this);
        upgradeButton.setParent(this.upgradeButtonParent);

        this.typeToLevel.set(upgradeType, this.userData.game.metaUpgrades[levelKey]);
        this.typeToCosts.set(upgradeType, upgradeSettings.costs);
        this.typeToLevelKey.set(upgradeType, levelKey);
        this.typeToUpgradeUI.set(upgradeType, upgradeUI);
    }

    private tryUpgrade(upgradeType: MetaUpgradeType): void {
        console.log("Trying to upgrade " + upgradeType);

        const costs: number[] = this.typeToCosts.get(upgradeType);
        const currentLevel: number = this.typeToLevel.get(upgradeType);

        if (costs.length <= currentLevel) return; // already max level
        if (this.userData.game.goldCoins < costs[currentLevel]) return; // not enough gold

        AppRoot.Instance.AudioPlayer.playSound(this.upgradeAudioClip);

        this.userData.game.goldCoins -= costs[currentLevel];
        const level = ++this.userData.game.metaUpgrades[this.typeToLevelKey.get(upgradeType)];
        this.typeToUpgradeUI.get(upgradeType).updateLevel(level);
        this.typeToLevel.set(upgradeType, level);

        this.goldCoinsLabel.string = this.userData.game.goldCoins.toString();
        AppRoot.Instance.saveUserData();
    }
}

export class Empty {}
```

## File: Menu/ModalWindows/Upgrades/UpgradeUI.ts/UpgradeUI.ts
```typescript
import { Component, instantiate, Label, Node, Prefab, Sprite, _decorator } from "cc";
import { AppRoot } from "../../../AppRoot/AppRoot";
import { MetaUpgradeSettings } from "../../../Game/Data/GameSettings";
import { TranslationData } from "../../../Game/Data/TranslationData";
import { MetaUpgradeType } from "../../../Game/Upgrades/UpgradeType";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { UIButton } from "../../../Services/UI/Button/UIButton";
import { formatString } from "../../../Services/Utils/StringUtils";
import { UpgradeLevelPointUI } from "./UpgradeLevelPointUI";
const { ccclass, property } = _decorator;

@ccclass("UpgradeUI")
export class UpgradeUI extends Component {
    @property(Prefab) private levelPointPrefab: Prefab;
    @property(Node) private levelPointsParent: Node;
    @property(Label) private title: Label;
    @property(Label) private description: Label;
    @property(Label) private cost: Label;
    @property(Label) private maxLevel: Label;
    @property(Sprite) private icon: Sprite;

    @property(UIButton) private uiButton: UIButton;

    private interactedEvent = new Signal<MetaUpgradeType>();

    private upgradeType: MetaUpgradeType;
    private upgradeSettings: MetaUpgradeSettings;
    private translationData: TranslationData;

    private levelPointUIs: UpgradeLevelPointUI[] = [];

    public init(upgradeType: MetaUpgradeType, upgradeSettings: MetaUpgradeSettings, level: number, translationData: TranslationData): void {
        this.upgradeType = upgradeType;
        this.upgradeSettings = upgradeSettings;
        this.translationData = translationData;

        this.icon.spriteFrame = AppRoot.Instance.GameAssets.MetaUpgradeIcons.getIcon(upgradeType);
        this.title.string = `${translationData[`${upgradeType}_TITLE`]}`;
        this.uiButton.InteractedEvent.on(() => this.interactedEvent.trigger(upgradeType), this);

        for (let i = 0; i < this.upgradeSettings.bonuses.length; i++) {
            const node: Node = instantiate(this.levelPointPrefab);
            node.setParent(this.levelPointsParent);

            const levelPointUI = node.getComponent(UpgradeLevelPointUI);
            levelPointUI.init();

            this.levelPointUIs.push(levelPointUI);
        }

        this.updateLevel(level);
    }

    public updateLevel(level: number): void {
        for (let i = 0; i < this.levelPointUIs.length; i++) {
            if (i < level) {
                this.levelPointUIs[i].upgrade();
            }
        }

        if (level < this.upgradeSettings.bonuses.length) {
            this.maxLevel.node.active = false;
            this.description.string = formatString(`${this.translationData[`${this.upgradeType}_DESC`]}`, [
                this.upgradeSettings.bonuses[level].toString()
            ]);
            this.cost.string = this.upgradeSettings.costs[level].toString();
        } else {
            // reached max level
            this.maxLevel.node.active = true;
            this.cost.node.active = false;
            this.description.node.active = false;
        }
    }

    public get InteractedEvent(): ISignal<MetaUpgradeType> {
        return this.interactedEvent;
    }
}
```

## File: Services/AudioPlayer/AudioPlayer.ts/AudioPlayer.ts
```typescript
import { AudioClip, AudioSource, Component, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioPlayer")
export class AudioPlayer extends Component {
    @property(AudioSource) private soundSource: AudioSource;
    @property(AudioSource) private musicSource: AudioSource;

    public init(soundVolume: number, musicVolume: number): void {
        this.setSoundVolume(soundVolume);
        this.setMusicVolume(musicVolume);
    }

    public get SoundVolume(): number {
        return this.soundSource.volume;
    }

    public get MusicVolume(): number {
        return this.musicSource.volume;
    }

    public setSoundVolume(volume: number): void {
        this.soundSource.volume = volume;
    }

    public setMusicVolume(volume: number): void {
        this.musicSource.volume = volume;
    }

    public playSound(clip: AudioClip): void {
        this.soundSource.playOneShot(clip);
    }

    public playMusic(clip: AudioClip): void {
        this.musicSource.stop();
        this.musicSource.clip = clip;
        this.musicSource.play();
    }
}
```

## File: Services/EventSystem/ISignal.ts/ISignal.ts
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISignal<T = void> {
    on(handler: (data?: T) => void, thisArg: any): void;
    off(handler: (data?: T) => void): void;
}
```

## File: Services/EventSystem/Signal.ts/Signal.ts
```typescript
// Need to capture *this*
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISignal } from "./ISignal";

export class Signal<T = void> implements ISignal<T> {
    private handlers: ((data: T) => void)[] = [];
    private thisArgs: any[] = [];

    public on(handler: (data: T) => void, thisArg: any): void {
        this.handlers.push(handler);
        this.thisArgs.push(thisArg);
    }
    public off(handler: (data: T) => void): void {
        const index: number = this.handlers.indexOf(handler);
        this.handlers.splice(index, 1);
        this.thisArgs.splice(index, 1);
    }

    public trigger(data: T): void {
        // protect from trigger >> off
        const handlers: ((data: T) => void)[] = [...this.handlers];
        const thisArgs: any[] = [...this.thisArgs];

        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(thisArgs[i], data);
        }
    }
}
```

## File: Services/GameTimer.ts/GameTimer.ts
```typescript
export class GameTimer {
    private targetDelay: number;
    private currentDelay = 0;

    public constructor(targetDelay: number) {
        this.targetDelay = targetDelay;
    }

    public gameTick(deltaTime: number): void {
        this.currentDelay += deltaTime;
    }

    public tryFinishPeriod(): boolean {
        if (this.targetDelay <= this.currentDelay) {
            this.currentDelay = 0;
            return true;
        } else {
            return false;
        }
    }
}
```

## File: Services/ModalWindowSystem/ModalWindow.ts/ModalWindow.ts
```typescript
import { Animation, Component, _decorator } from "cc";
import { UIButton } from "../UI/Button/UIButton";
import { delay } from "../Utils/AsyncUtils";

const { property } = _decorator;

export abstract class ModalWindow<TParam, TResult> extends Component {
    @property(Animation) private animation: Animation;
    @property(UIButton) private closeButton: UIButton;
    @property(UIButton) private backgroundCloseButton: UIButton;

    private result: TResult;
    private isDismissed = false;

    private openAnimationName = "open";
    private closeAnimationName = "close";

    public async runAsync(params?: TParam): Promise<TResult> {
        this.closeButton?.InteractedEvent.on(() => this.dismiss(), this);
        this.backgroundCloseButton?.InteractedEvent.on(() => this.dismiss(), this);

        this.setup(params);
        this.animation?.play(this.openAnimationName);
        while (!this.isDismissed) await delay(100);
        this.animation?.play(this.closeAnimationName);

        await delay(this.getCloseAnimationTime() * 1000);
        return this.result;
    }

    protected abstract setup(params?: TParam): void;

    protected dismiss(result?: TResult): void {
        this.result = result;
        this.isDismissed = true;
    }

    private getCloseAnimationTime(): number {
        const state = this.animation?.getState(this.closeAnimationName);
        if (state != null) {
            return state.duration;
        }

        return 0;
    }
}
```

## File: Services/ModalWindowSystem/ModalWindowManager.ts/ModalWindowManager.ts
```typescript
import { Component, instantiate, Node, Prefab, _decorator } from "cc";
import { ModalWindow } from "./ModalWindow";
const { ccclass, property } = _decorator;

@ccclass("ModalWindowManager")
export class ModalWindowManager extends Component {
    @property(Prefab) private availableWindows: Prefab[] = [];

    public async showModal<TParams, TResult>(name: string, params: TParams): Promise<TResult> {
        const windowPrefab: Prefab = this.availableWindows.find((w) => w.name === name);
        const windowNode: Node = instantiate(windowPrefab);
        windowNode.setParent(this.node);

        const modalWindow: ModalWindow<TParams, TResult> = <ModalWindow<TParams, TResult>>windowNode.getComponent(name);
        const result: TResult = await modalWindow.runAsync(params);
        windowNode.destroy();

        return result;
    }
}
```

## File: Services/ObjectPool.ts/ObjectPool.ts
```typescript
import { Component, instantiate, Node, Prefab } from "cc";

export class ObjectPool<T extends Component> {
    private prefab: Prefab;
    private parent: Node;
    private pooledObjects: PooledObject<T>[] = [];
    private componentName: string;

    public constructor(prefab: Prefab, parent: Node, defaultPoolCount: number, componentName: string) {
        this.prefab = prefab;
        this.parent = parent;
        this.componentName = componentName;

        for (let i = 0; i < defaultPoolCount; i++) {
            this.createNew();
        }
    }

    public borrow(): T {
        const objectToBorrow: PooledObject<T> | null = this.pooledObjects.find((o) => !o.IsBorrowed);
        if (objectToBorrow != null) {
            return objectToBorrow.borrow();
        }

        return this.createNew().borrow();
    }

    public return(object: T): void {
        const objectToReturn: PooledObject<T> | null = this.pooledObjects.find((o) => o.Equals(object));
        if (objectToReturn == null) {
            throw new Error("Object " + this.prefab.name + " is not a member of the pool");
        }

        objectToReturn.return();
    }

    private createNew(): PooledObject<T> {
        const newPooledObject: PooledObject<T> = new PooledObject(this.prefab, this.parent, this.componentName);
        this.pooledObjects.push(newPooledObject);

        return newPooledObject;
    }
}

class PooledObject<T extends Component> {
    private isBorrowed = false;
    private defaultParent: Node;
    private instancedNode: Node;
    private instancedComponent: T;

    public constructor(prefab: Prefab, defaultParent: Node, componentName: string) {
        this.defaultParent = defaultParent;

        this.instancedNode = instantiate(prefab);
        this.instancedComponent = <T>this.instancedNode.getComponent(componentName);
        if (this.instancedComponent == null) {
            console.error("Object " + prefab.name + " does not have component " + componentName);
        }

        this.clear();
    }

    public get IsBorrowed(): boolean {
        return this.isBorrowed;
    }

    public Equals(component: T): boolean {
        return this.instancedComponent == component;
    }

    public borrow(): T {
        this.isBorrowed = true;
        return this.instancedComponent;
    }

    public return(): void {
        this.clear();
    }

    private clear(): void {
        this.instancedNode.active = false;
        this.instancedNode.parent = this.defaultParent;
        this.isBorrowed = false;
    }
}
```

## File: Services/UI/Button/UIButton.ts/UIButton.ts
```typescript
import { _decorator, Component, Node, NodeEventType } from "cc";
import { ISignal } from "../../EventSystem/ISignal";
import { Signal } from "../../EventSystem/Signal";
const { ccclass, property } = _decorator;

@ccclass("UIButton")
export class UIButton extends Component {
    private interactedEvent = new Signal<UIButton>();

    public start(): void {
        this.node.on(Node.EventType.TOUCH_END, this.interact, this);
    }

    public get InteractedEvent(): ISignal<UIButton> {
        return this.interactedEvent;
    }

    private interact(): void {
        console.log("interact");
        this.interactedEvent.trigger(this);
    }
}
```

## File: Services/Utils/ArrayUtils.ts/ArrayUtils.ts
```typescript
export function shuffle<T>(array: T[]): T[] {
    const shuffledArray: T[] = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}
```

## File: Services/Utils/AsyncUtils.ts/AsyncUtils.ts
```typescript
export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
```

## File: Services/Utils/MathUtils.ts/MathUtils.ts
```typescript
export function roundToOneDecimal(num: number): number {
    return Math.round(num * 10) / 10;
}

export function randomPositiveOrNegative(): number {
    return Math.random() < 0.5 ? 1 : -1;
}

export function getDegreeAngleFromDirection(x: number, y: number): number {
    const radianAngle = Math.atan2(y, x);
    const angle = (radianAngle / Math.PI) * 180;

    return angle < 0 ? angle + 360 : angle;
}
```

## File: Services/Utils/StringUtils.ts/StringUtils.ts
```typescript
export function formatString(text: string, params: string[]): string {
    let textWithParams = text;
    for (let i = 0; i < params.length; i++) {
        textWithParams = textWithParams.replace(`{${i}}`, params[i]);
    }

    return textWithParams;
}
```

## File: Services/Utils/VecUtils.ts/VecUtils.ts
```typescript
import { Vec3 } from "cc";

export function getDirection(targetPosition: Vec3, sourcePosition: Vec3): Vec3 {
    const direction: Vec3 = new Vec3();
    return Vec3.subtract(direction, targetPosition, sourcePosition).normalize();
}
```

## File: Utils/OpenCloseAnimator.ts/OpenCloseAnimator.ts
```typescript
import { Animation, Component, _decorator } from "cc";
import { delay } from "../Services/Utils/AsyncUtils";
const { ccclass, property } = _decorator;

@ccclass("OpenCloseAnimator")
export class OpenCloseAnimator extends Component {
    @property(Animation) private animation: Animation;

    private readonly openStateName = "Open";
    private readonly closeStateName = "Close";

    private openDuration = 0;
    private closeDuration = 0;

    public init(): void {
        this.openDuration = this.animation.getState(this.openStateName).duration;
        this.closeDuration = this.animation.getState(this.closeStateName).duration;
    }

    public async playOpen(): Promise<void> {
        this.node.active = true;
        this.animation.play(this.openStateName);
        await delay(this.openDuration * 1000);
    }

    public async playClose(): Promise<void> {
        this.node.active = true;
        this.animation.play(this.closeStateName);
        await delay(this.closeDuration * 1000);
        this.node.active = false;
    }
}
```

## File: Utils/UIButtonAudioPlayer.ts/UIButtonAudioPlayer.ts
```typescript
import { Component, _decorator } from "cc";
import { AppRoot } from "../AppRoot/AppRoot";
import { UIButton } from "../Services/UI/Button/UIButton";
const { ccclass, property } = _decorator;

@ccclass("UIButtonAudioPlayer")
export class UIButtonAudioPlayer extends Component {
    @property(UIButton) private button: UIButton;
    public start(): void {
        this.button.InteractedEvent.on(this.playButtonClick, this);
    }

    private playButtonClick(): void {
        const audioClip = AppRoot.Instance.GameAssets.AudioAssets.buttonClick;
        AppRoot.Instance.AudioPlayer.playSound(audioClip);
    }
}
```
