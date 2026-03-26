import { EnemyType } from './DataEnemies';

export interface WaveDataConfig {
  name: string;
  segments: WaveSegmentData[];
}

export interface WaveSegmentData {
  startPercent: number;      // 0-100
  endPercent: number;        // 0-100
  spawnFrequency: number;    // enemies per second
  enemyType: EnemyType;
  enemyHp: number;
}

export const WAVE_DATA: WaveDataConfig[] = [
  // Wave 1: Slow spawn, low hp
  {
    name: 'Wave 1',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeBasic, enemyHp: 3 },
    ],
  },

  // Wave 2: Faster spawn, more hp
  {
    name: 'Wave 2',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.8, enemyType: EnemyType.MeleeBasic, enemyHp: 5 },
    ],
  },

  // Wave 3: Two segments, ramp up at 50%
  {
    name: 'Wave 3',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 8 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeBasic, enemyHp: 10 },
    ],
  },

  // Wave 4: Heavy pressure, overlapping segments
  {
    name: 'Wave 4',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.2, enemyType: EnemyType.MeleeBasic, enemyHp: 12 },
      { startPercent: 30, endPercent: 70, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 15 },
    ],
  },

  // Wave 5: Swarm — burst early, calm mid, burst end
  {
    name: 'Wave 5',
    segments: [
      { startPercent: 0, endPercent: 30, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 10 },
      { startPercent: 30, endPercent: 70, spawnFrequency: 0.5, enemyType: EnemyType.MeleeBasic, enemyHp: 15 },
      { startPercent: 70, endPercent: 100, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 20 },
    ],
  },
];
