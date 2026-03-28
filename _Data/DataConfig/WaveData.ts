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
  // Wave 1: Introduction — basic enemies only
  {
    name: 'Wave 1',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 10 },
    ],
  },

  // Wave 2: Slightly faster
  {
    name: 'Wave 2',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.8, enemyType: EnemyType.MeleeBasic, enemyHp: 10 },
    ],
  },

  // Wave 3: MeleeFast appears
  {
    name: 'Wave 3',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 16 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 12 },
    ],
  },

  // Wave 4: MeleeTank appears
  {
    name: 'Wave 4',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 20 },
      { startPercent: 30, endPercent: 70, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 16 },
      { startPercent: 60, endPercent: 100, spawnFrequency: 0.3, enemyType: EnemyType.MeleeTank, enemyHp: 60 },
    ],
  },

  // Wave 5: Mixed — 70/20/10
  {
    name: 'Wave 5',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.2, enemyType: EnemyType.MeleeBasic, enemyHp: 24 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.35, enemyType: EnemyType.MeleeFast, enemyHp: 20 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.17, enemyType: EnemyType.MeleeTank, enemyHp: 72 },
    ],
  },

  // Wave 6: Burst start
  {
    name: 'Wave 6',
    segments: [
      { startPercent: 0, endPercent: 40, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 28 },
      { startPercent: 40, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 28 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeFast, enemyHp: 24 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.2, enemyType: EnemyType.MeleeTank, enemyHp: 84 },
    ],
  },

  // Wave 7: Steady pressure
  {
    name: 'Wave 7',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.4, enemyType: EnemyType.MeleeBasic, enemyHp: 32 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeFast, enemyHp: 28 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.2, enemyType: EnemyType.MeleeTank, enemyHp: 96 },
    ],
  },

  // Wave 8: Fast rush mid-wave
  {
    name: 'Wave 8',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.4, enemyType: EnemyType.MeleeBasic, enemyHp: 36 },
      { startPercent: 30, endPercent: 70, spawnFrequency: 0.8, enemyType: EnemyType.MeleeFast, enemyHp: 30 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.2, enemyType: EnemyType.MeleeTank, enemyHp: 108 },
    ],
  },

  // Wave 9: Tank push late
  {
    name: 'Wave 9',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.5, enemyType: EnemyType.MeleeBasic, enemyHp: 40 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.45, enemyType: EnemyType.MeleeFast, enemyHp: 32 },
      { startPercent: 60, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeTank, enemyHp: 120 },
    ],
  },

  // Wave 10: Big wave — all types heavy
  {
    name: 'Wave 10',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.6, enemyType: EnemyType.MeleeBasic, enemyHp: 44 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 36 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.25, enemyType: EnemyType.MeleeTank, enemyHp: 132 },
    ],
  },

  // Wave 11: Swarm of basics with fast flankers
  {
    name: 'Wave 11',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.8, enemyType: EnemyType.MeleeBasic, enemyHp: 48 },
      { startPercent: 20, endPercent: 80, spawnFrequency: 0.6, enemyType: EnemyType.MeleeFast, enemyHp: 40 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.25, enemyType: EnemyType.MeleeTank, enemyHp: 144 },
    ],
  },

  // Wave 12: Early tank pressure
  {
    name: 'Wave 12',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.8, enemyType: EnemyType.MeleeBasic, enemyHp: 52 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 44 },
      { startPercent: 0, endPercent: 50, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 156 },
    ],
  },

  // Wave 13: Relentless mixed
  {
    name: 'Wave 13',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 56 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.55, enemyType: EnemyType.MeleeFast, enemyHp: 48 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.3, enemyType: EnemyType.MeleeTank, enemyHp: 168 },
    ],
  },

  // Wave 14: Fast burst then tanks
  {
    name: 'Wave 14',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 60 },
      { startPercent: 0, endPercent: 50, spawnFrequency: 0.8, enemyType: EnemyType.MeleeFast, enemyHp: 50 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 180 },
    ],
  },

  // Wave 15: Heavy mid-game checkpoint
  {
    name: 'Wave 15',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.2, enemyType: EnemyType.MeleeBasic, enemyHp: 64 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.6, enemyType: EnemyType.MeleeFast, enemyHp: 52 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.3, enemyType: EnemyType.MeleeTank, enemyHp: 192 },
    ],
  },

  // Wave 16: Double burst
  {
    name: 'Wave 16',
    segments: [
      { startPercent: 0, endPercent: 40, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 68 },
      { startPercent: 60, endPercent: 100, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 68 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.65, enemyType: EnemyType.MeleeFast, enemyHp: 56 },
      { startPercent: 40, endPercent: 60, spawnFrequency: 0.5, enemyType: EnemyType.MeleeTank, enemyHp: 204 },
    ],
  },

  // Wave 17: Tank wall
  {
    name: 'Wave 17',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.2, enemyType: EnemyType.MeleeBasic, enemyHp: 72 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.6, enemyType: EnemyType.MeleeFast, enemyHp: 60 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 216 },
    ],
  },

  // Wave 18: Speed blitz
  {
    name: 'Wave 18',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.4, enemyType: EnemyType.MeleeBasic, enemyHp: 76 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.8, enemyType: EnemyType.MeleeFast, enemyHp: 64 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.35, enemyType: EnemyType.MeleeTank, enemyHp: 228 },
    ],
  },

  // Wave 19: All-out assault
  {
    name: 'Wave 19',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 80 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.7, enemyType: EnemyType.MeleeFast, enemyHp: 68 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 240 },
    ],
  },

  // Wave 20: Final wave — overwhelming
  {
    name: 'Wave 20',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 3.0, enemyType: EnemyType.MeleeBasic, enemyHp: 84 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.85, enemyType: EnemyType.MeleeFast, enemyHp: 72 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.45, enemyType: EnemyType.MeleeTank, enemyHp: 252 },
    ],
  },
];
