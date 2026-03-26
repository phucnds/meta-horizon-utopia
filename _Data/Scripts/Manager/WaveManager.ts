import {
  component,
  Component,
  NetworkMode,
  property,
  TemplateAsset,
  TransformComponent,
  Vec3,
  WorldService,
  type Entity,
  type Maybe,
} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';
import { BaseEnemy } from '../Combat/BaseEnemy';
import { delay } from '../Utils/AsyncUtils';
import { EnemyType } from '../../DataConfig/DataEnemies';
import type { WaveDataConfig, WaveSegmentData } from '../../DataConfig/WaveData';

@component()
export class WaveManager extends Component {

  @property() private waveDuration: number = 60;
  @property() private spawnDistance: number = 15;

  private playerEntity: Maybe<Entity> = null;

  public readonly onWaveComplete = new Signal<number>();
  public readonly onAllWavesComplete = new Signal();

  private worldService = WorldService.get();
  private timer: number = 0;
  private isRunning: boolean = false;
  private currentWaveIndex: number = 0;
  private segments: SegmentState[] = [];
  private activeEnemies: BaseEnemy[] = [];

  private waveConfigs: WaveDataConfig[] = [];
  private enemyTemplateMap = new Map<EnemyType, TemplateAsset>();

  public setPlayer(playerEntity: Entity): void {
    this.playerEntity = playerEntity;
  }

  public registerEnemyTemplate(enemyType: EnemyType, template: TemplateAsset): void {
    this.enemyTemplateMap.set(enemyType, template);
  }

  public setWaveConfigs(configs: WaveDataConfig[]): void {
    this.waveConfigs = configs;
  }

  public startWave(waveIndex?: number): void {
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

    console.log(`[WaveManager] Wave ${this.currentWaveIndex + 1} started: ${wave.name}`);
  }

  public gameTick(dt: number): void {
    if (!this.isRunning) return;

    if (this.timer >= this.waveDuration) {
      this.endWave();
      return;
    }

    this.spawnEnemies();
    this.updateEnemies(dt);
    this.timer += dt;
  }

  public stopWave(): void {
    this.isRunning = false;
    this.destroyAllEnemies();
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

  private updateEnemies(dt: number): void {
    for (const enemy of this.activeEnemies) {
      enemy.gameTick(dt);
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

  private async spawnEnemy(segment: WaveSegmentData): Promise<void> {
    if (!this.playerEntity) return;

    const template = this.enemyTemplateMap.get(segment.enemyType);
    if (!template) {
      console.error(`[WaveManager] No template for enemyType: ${segment.enemyType}`);
      return;
    }

    const spawnPos = this.getSpawnPosition();

    const entity = await this.worldService.spawnTemplate({
      templateAsset: template,
      networkMode: NetworkMode.Networked,
    });

    await delay(100);

    const tf = entity.getComponent(TransformComponent);
    if (tf) {
      tf.worldPosition = spawnPos;
    }

    const enemy = entity.getComponent(BaseEnemy);
    if (!enemy || !this.playerEntity) return;

    enemy.setup(this.playerEntity, segment.enemyHp);
    enemy.onDied.on(() => this.onEnemyDied(enemy), this);
    this.activeEnemies.push(enemy);
  }

  private onEnemyDied(enemy: BaseEnemy): void {
    const idx = this.activeEnemies.indexOf(enemy);
    if (idx !== -1) this.activeEnemies.splice(idx, 1);
    enemy.entity.destroy();
  }

  private endWave(): void {
    this.isRunning = false;
    this.destroyAllEnemies();
    console.log(`[WaveManager] Wave ${this.currentWaveIndex + 1} complete`);
    this.onWaveComplete.trigger(this.currentWaveIndex);
    this.currentWaveIndex++;
  }

  private destroyAllEnemies(): void {
    for (const enemy of this.activeEnemies) {
      enemy.entity.destroy();
    }
    this.activeEnemies = [];
  }

  private getSpawnPosition(): Vec3 {
    if (!this.playerEntity) return new Vec3(0, 0, 0);

    const playerTf = this.playerEntity.getComponent(TransformComponent);
    if (!playerTf) return new Vec3(0, 0, 0);

    const playerPos = playerTf.worldPosition;
    const angle = Math.PI + Math.random() * Math.PI;
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
