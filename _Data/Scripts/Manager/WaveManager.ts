import {
  component,
  Component,
  property,
  SoundComponent,
  TemplateAsset,
  TransformComponent,
  Vec3,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BaseEnemy } from '../Combat/BaseEnemy';
import { EnemyType } from '../../DataConfig/DataEnemies';
import { ObjectPool } from '../Core/ObjectPool';
import type { WaveDataConfig, WaveSegmentData } from '../../DataConfig/WaveData';

@component()
export class WaveManager extends Component {

  @property() private waveDuration: number = 60;
  @property() private spawnDistance: number = 15;
  @property() private poolSizePerType: number = 10;

  @property() private enemyAttackSound: Maybe<Entity> = null;
  @property() private enemyDeathSound: Maybe<Entity> = null;
  @property() private enemyHitSound: Maybe<Entity> = null;

  @property() private enemyWaveSound: Maybe<Entity> = null;

  private enemyWaveSoundComponent: Maybe<SoundComponent> = null;
  private waveSoundTimer: number = 0;
  private readonly waveSoundInterval: number = 4;

  private playerEntity: Maybe<Entity> = null;

  public readonly onStartWave = new Signal<number>();
  public readonly onWaveComplete = new Signal<number>();
  public readonly onAllWavesComplete = new Signal();

  private timer: number = 0;
  private isRunning: boolean = false;
  private isSpawningDone: boolean = false;
  private currentWaveIndex: number = 0;
  private segments: SegmentState[] = [];

  private waveConfigs: WaveDataConfig[] = [];
  private enemyPools = new Map<EnemyType, ObjectPool<BaseEnemy>>();

  public setPlayer(playerEntity: Entity): void {
    this.playerEntity = playerEntity;
    this.enemyWaveSoundComponent = this.enemyWaveSound?.getComponent(SoundComponent) ?? null;
  }

  public async registerEnemyTemplate(enemyType: EnemyType, template: TemplateAsset): Promise<void> {
    const pool = new ObjectPool<BaseEnemy>(template, BaseEnemy);
    await pool.init(this.poolSizePerType);
    this.enemyPools.set(enemyType, pool);
  }

  public setWaveConfigs(configs: WaveDataConfig[]): void {
    this.waveConfigs = configs;
  }

  public startWave(waveIndex?: number): void {

    console.log(`[WaveManager] startWave: ${waveIndex}`);
    if (waveIndex != null) {
      this.currentWaveIndex = waveIndex;
    }

    if (this.currentWaveIndex >= this.waveConfigs.length) {
      this.onAllWavesComplete.trigger(undefined as void);
      return;
    }

    const wave = this.waveConfigs[this.currentWaveIndex];
    this.timer = 0;
    this.segments = wave.segments.map(() => ({ spawnCount: 0 }));
    this.isRunning = true;
    this.isSpawningDone = false;
    this.waveSoundTimer = 0;
    this.onStartWave.trigger(this.currentWaveIndex);

    console.log(`[WaveManager] Wave ${this.currentWaveIndex + 1} started: ${wave.name}`);
  }

  public gameTick(dt: number): void {
    if (!this.isRunning) return;

    this.timer += dt;

    if (!this.isSpawningDone) {
      if (this.timer >= this.waveDuration) {
        this.isSpawningDone = true;
        this.tryEndWave();
      } else {
        this.spawnEnemies();
      }
    }

    if (!this.isRunning) return;

    this.updateEnemies(dt);

    if (this.enemyWaveSoundComponent) {
      this.waveSoundTimer += dt;
      if (this.waveSoundTimer >= this.waveSoundInterval) {
        this.waveSoundTimer -= this.waveSoundInterval;
        this.enemyWaveSoundComponent.play();
      }
    }
  }

  public stopWave(): void {
    this.isRunning = false;
    this.releaseAllEnemies();
  }

  public getTimer(): number {
    return this.timer;
  }

  public getTimeRemaining(): number {
    return Math.max(0, this.waveDuration - this.timer);
  }

  public getCurrentWaveIndex(): number {
    return this.currentWaveIndex;
  }

  public getTotalWaves(): number {
    return this.waveConfigs.length;
  }

  public getActiveEnemyCount(): number {
    let count = 0;
    for (const [, pool] of this.enemyPools) {
      count += pool.getActiveCount();
    }
    return count;
  }

  private updateEnemies(dt: number): void {
    for (const [, pool] of this.enemyPools) {
      pool.forEachActive((enemy) => {
        enemy.gameTick(dt);
      });
    }
  }

  private spawnEnemies(): void {
    const wave = this.waveConfigs[this.currentWaveIndex];
    if (!wave) return;

    for (let i = 0; i < wave.segments.length; i++) {
      const segment = wave.segments[i];
      const state = this.segments[i];

      const tStart = (segment.startPercent / 100) * this.waveDuration;
      const tEnd = (segment.endPercent / 100) * this.waveDuration;

      if (this.timer < tStart || this.timer > tEnd) continue;

      const timeSinceStart = this.timer - tStart;
      const spawnInterval = 1 / segment.spawnFrequency;

      if (timeSinceStart / spawnInterval > state.spawnCount) {
        this.spawnEnemy(segment);
        state.spawnCount++;
      }
    }
  }

  private spawnEnemy(segment: WaveSegmentData): void {
    if (!this.playerEntity) return;

    const pool = this.enemyPools.get(segment.enemyType);
    if (!pool) {
      console.error(`[WaveManager] No pool for enemyType: ${segment.enemyType}`);
      return;
    }

    const enemy = pool.borrow();
    if (!enemy) return;

    const spawnPos = this.getSpawnPosition();
    const tf = enemy.entity.getComponent(TransformComponent);
    if (tf) {
      tf.worldPosition = spawnPos;
    }

    enemy.setup(this.playerEntity, segment.enemyHp);
    enemy.setupSounds(this.enemyAttackSound!, this.enemyDeathSound!, this.enemyHitSound!);

    const releaseToPool = () => {
      enemy.onDied.off(releaseToPool);
      pool.release(enemy);
      this.tryEndWave();
    };
    enemy.onDied.on(releaseToPool, this);
  }

  private tryEndWave(): void {
    if (!this.isRunning) return;
    if (!this.isSpawningDone) return;
    if (this.getActiveEnemyCount() > 0) return;
    this.endWave();
  }

  private endWave(): void {
    this.isRunning = false;
    console.log(`[WaveManager] Wave ${this.currentWaveIndex + 1} complete`);
    this.onWaveComplete.trigger(this.currentWaveIndex);
    this.currentWaveIndex++;
  }

  private releaseAllEnemies(): void {
    for (const [, pool] of this.enemyPools) {
      pool.releaseAll();
    }
  }

  private getSpawnPosition(): Vec3 {
    if (!this.playerEntity) return new Vec3(0, 0, 0);

    const playerTf = this.playerEntity.getComponent(TransformComponent);
    if (!playerTf) return new Vec3(0, 0, 0);

    const playerPos = playerTf.worldPosition;
    const angle = Math.PI * 1.25 + Math.random() * (Math.PI * 0.5);
    const dist = this.spawnDistance + Math.random() * 5;

    return new Vec3(
      playerPos.x + Math.cos(angle) * dist,
      playerPos.y,
      playerPos.z + Math.sin(angle) * dist,
    );
  }
}

interface SegmentState {
  spawnCount: number;
}
