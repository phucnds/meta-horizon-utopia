import { Vec3 } from 'meta/worlds';

// All calculations on XZ plane (2D top-down)

export function distanceXZ(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

export function directionXZ(from: Vec3, to: Vec3): Vec3 {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const len = Math.sqrt(dx * dx + dz * dz);
  if (len === 0) return new Vec3(0, 0, 0);
  return new Vec3(dx / len, 0, dz / len);
}

export function lerpXZ(from: Vec3, to: Vec3, t: number): Vec3 {
  return new Vec3(
    from.x + (to.x - from.x) * t,
    from.y,
    from.z + (to.z - from.z) * t,
  );
}

export function angleXZ(from: Vec3, to: Vec3): number {
  return Math.atan2(to.x - from.x, to.z - from.z);
}
