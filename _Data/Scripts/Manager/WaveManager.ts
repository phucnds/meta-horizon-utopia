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

  public startWave(waveIndex?: number): boolean {
    if (waveIndex != null) this.currentWaveIndex = waveIndex;
    if (this.currentWaveIndex >= this.waveConfigs.length) return false;

    const wave = this.waveConfigs[this.currentWaveIndex];
    this.timer = 0;
    this.segments = wave.segments.map(() => ({ spawnCount: 0 }));
    this.isRunning = true;
    this.isSpawningDone = false;
    this.waveSoundTimer = 0;
    this.onStartWave.trigger(this.currentWaveIndex);
    return true;
  }

  public gameTick(dt: number): void {
    if (!this.isRunning) return;
    this.timer += dt;

    if (!this.isSpawningDone) {
      if (this.timer >= this.waveDuration) {
        this.isSpawningDone = true;
        this.tryEndWave();
      } else this.spawnEnemies();
    }

    if (!this.isRunning) return;
    this.updateEnemies(dt);

    if (!this.enemyWaveSoundComponent) return;
    this.waveSoundTimer += dt;
    if (this.waveSoundTimer >= this.waveSoundInterval) {
      this.waveSoundTimer -= this.waveSoundInterval;
      this.enemyWaveSoundComponent.play();
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
      const seg = wave.segments[i];
      const state = this.segments[i];
      const t0 = (seg.startPercent / 100) * this.waveDuration;
      const t1 = (seg.endPercent / 100) * this.waveDuration;
      if (this.timer < t0 || this.timer > t1) continue;
      const interval = 1 / seg.spawnFrequency;
      if ((this.timer - t0) / interval > state.spawnCount) {
        this.spawnEnemy(seg);
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
    if (!this.isRunning) {
      console.log('[WaveManager] tryEndWave: skip (not running)');
      return;
    }
    if (!this.isSpawningDone) {
      console.log('[WaveManager] tryEndWave: skip (spawning not finished)');
      return;
    }
    const active = this.getActiveEnemyCount();
    if (active > 0) {
      console.log(`[WaveManager] tryEndWave: skip (${active} enemies still active)`);
      return;
    }
    console.log(`[WaveManager] tryEndWave: ending wave index ${this.currentWaveIndex}`);
    this.endWave();
  }

  private endWave(): void {
    this.isRunning = false;
    this.onWaveComplete.trigger(this.currentWaveIndex);
    this.currentWaveIndex++;
  }

  private releaseAllEnemies(): void {
    for (const [, pool] of this.enemyPools) {
      pool.releaseAll();
    }
  }

  private getSpawnPosition(): Vec3 {
    const origin = new Vec3(0, 0, 0);
    const playerTf = this.playerEntity?.getComponent(TransformComponent);
    if (!playerTf) return origin;
    const p = playerTf.worldPosition;
    const angle = Math.PI * 1.25 + Math.random() * (Math.PI * 0.5);
    const dist = this.spawnDistance + Math.random() * 5;
    return new Vec3(p.x + Math.cos(angle) * dist, p.y, p.z + Math.sin(angle) * dist);
  }
}

interface SegmentState {
  spawnCount: number;
}
