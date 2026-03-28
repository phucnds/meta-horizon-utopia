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
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 5 },
    ],
  },

  // Wave 2: Slightly faster
  {
    name: 'Wave 2',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.8, enemyType: EnemyType.MeleeBasic, enemyHp: 5 },
    ],
  },

  // Wave 3: MeleeFast appears
  {
    name: 'Wave 3',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 8 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 6 },
    ],
  },

  // Wave 4: MeleeTank appears
  {
    name: 'Wave 4',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 10 },
      { startPercent: 30, endPercent: 70, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 8 },
      { startPercent: 60, endPercent: 100, spawnFrequency: 0.3, enemyType: EnemyType.MeleeTank, enemyHp: 50 },
    ],
  },

  // Wave 5: Mixed — 70/20/10
  {
    name: 'Wave 5',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.2, enemyType: EnemyType.MeleeBasic, enemyHp: 12 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.35, enemyType: EnemyType.MeleeFast, enemyHp: 10 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.17, enemyType: EnemyType.MeleeTank, enemyHp: 60 },
    ],
  },

  // Wave 6: Burst start
  {
    name: 'Wave 6',
    segments: [
      { startPercent: 0, endPercent: 40, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 14 },
      { startPercent: 40, endPercent: 100, spawnFrequency: 1.0, enemyType: EnemyType.MeleeBasic, enemyHp: 14 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeFast, enemyHp: 12 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.2, enemyType: EnemyType.MeleeTank, enemyHp: 70 },
    ],
  },

  // Wave 7: Steady pressure
  {
    name: 'Wave 7',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.4, enemyType: EnemyType.MeleeBasic, enemyHp: 16 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeFast, enemyHp: 14 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.2, enemyType: EnemyType.MeleeTank, enemyHp: 80 },
    ],
  },

  // Wave 8: Fast rush mid-wave
  {
    name: 'Wave 8',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.4, enemyType: EnemyType.MeleeBasic, enemyHp: 18 },
      { startPercent: 30, endPercent: 70, spawnFrequency: 0.8, enemyType: EnemyType.MeleeFast, enemyHp: 15 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.2, enemyType: EnemyType.MeleeTank, enemyHp: 90 },
    ],
  },

  // Wave 9: Tank push late
  {
    name: 'Wave 9',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.5, enemyType: EnemyType.MeleeBasic, enemyHp: 20 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.45, enemyType: EnemyType.MeleeFast, enemyHp: 16 },
      { startPercent: 60, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeTank, enemyHp: 100 },
    ],
  },

  // Wave 10: Big wave — all types heavy
  {
    name: 'Wave 10',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.6, enemyType: EnemyType.MeleeBasic, enemyHp: 22 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 18 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.25, enemyType: EnemyType.MeleeTank, enemyHp: 110 },
    ],
  },

  // Wave 11: Swarm of basics with fast flankers
  {
    name: 'Wave 11',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.8, enemyType: EnemyType.MeleeBasic, enemyHp: 24 },
      { startPercent: 20, endPercent: 80, spawnFrequency: 0.6, enemyType: EnemyType.MeleeFast, enemyHp: 20 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.25, enemyType: EnemyType.MeleeTank, enemyHp: 120 },
    ],
  },

  // Wave 12: Early tank pressure
  {
    name: 'Wave 12',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 1.8, enemyType: EnemyType.MeleeBasic, enemyHp: 26 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.5, enemyType: EnemyType.MeleeFast, enemyHp: 22 },
      { startPercent: 0, endPercent: 50, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 130 },
    ],
  },

  // Wave 13: Relentless mixed
  {
    name: 'Wave 13',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 28 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.55, enemyType: EnemyType.MeleeFast, enemyHp: 24 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.3, enemyType: EnemyType.MeleeTank, enemyHp: 140 },
    ],
  },

  // Wave 14: Fast burst then tanks
  {
    name: 'Wave 14',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.0, enemyType: EnemyType.MeleeBasic, enemyHp: 30 },
      { startPercent: 0, endPercent: 50, spawnFrequency: 0.8, enemyType: EnemyType.MeleeFast, enemyHp: 25 },
      { startPercent: 50, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 150 },
    ],
  },

  // Wave 15: Heavy mid-game checkpoint
  {
    name: 'Wave 15',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.2, enemyType: EnemyType.MeleeBasic, enemyHp: 32 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.6, enemyType: EnemyType.MeleeFast, enemyHp: 26 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.3, enemyType: EnemyType.MeleeTank, enemyHp: 160 },
    ],
  },

  // Wave 16: Double burst
  {
    name: 'Wave 16',
    segments: [
      { startPercent: 0, endPercent: 40, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 34 },
      { startPercent: 60, endPercent: 100, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 34 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.65, enemyType: EnemyType.MeleeFast, enemyHp: 28 },
      { startPercent: 40, endPercent: 60, spawnFrequency: 0.5, enemyType: EnemyType.MeleeTank, enemyHp: 170 },
    ],
  },

  // Wave 17: Tank wall
  {
    name: 'Wave 17',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.2, enemyType: EnemyType.MeleeBasic, enemyHp: 36 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.6, enemyType: EnemyType.MeleeFast, enemyHp: 30 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 180 },
    ],
  },

  // Wave 18: Speed blitz
  {
    name: 'Wave 18',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.4, enemyType: EnemyType.MeleeBasic, enemyHp: 38 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.8, enemyType: EnemyType.MeleeFast, enemyHp: 32 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.35, enemyType: EnemyType.MeleeTank, enemyHp: 190 },
    ],
  },

  // Wave 19: All-out assault
  {
    name: 'Wave 19',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 2.5, enemyType: EnemyType.MeleeBasic, enemyHp: 40 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.7, enemyType: EnemyType.MeleeFast, enemyHp: 34 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.4, enemyType: EnemyType.MeleeTank, enemyHp: 200 },
    ],
  },

  // Wave 20: Final wave — overwhelming
  {
    name: 'Wave 20',
    segments: [
      { startPercent: 0, endPercent: 100, spawnFrequency: 3.0, enemyType: EnemyType.MeleeBasic, enemyHp: 42 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.85, enemyType: EnemyType.MeleeFast, enemyHp: 36 },
      { startPercent: 0, endPercent: 100, spawnFrequency: 0.45, enemyType: EnemyType.MeleeTank, enemyHp: 210 },
    ],
  },
];
