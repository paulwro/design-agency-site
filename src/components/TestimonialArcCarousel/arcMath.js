// Cards sit on the circumference of a circle: rotation = angular offset from
// center, x = R·sin(θ), y = R·(1 − cos(θ)). Matches the "Be the first to
// experiment" carousel on labs.google (app-home-carousel), reverse-engineered
// from its live inline transforms — same formula, radius scaled up for our
// larger card.
export const STEP_ANGLE_DEG = 10;
export const RADIUS = 2350;
// Added on top of the arc's own sin(θ) spacing so neighboring cards sit
// further apart than the raw arc geometry alone would place them.
export const EXTRA_GAP = 40;

export function shortestOffset(indexInArray, activeFloat, total) {
  let diff = indexInArray - activeFloat;
  diff = ((diff % total) + total) % total;
  if (diff > total / 2) diff -= total;
  return diff;
}

export function cardTransform(offset) {
  const angleDeg = offset * STEP_ANGLE_DEG;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: RADIUS * Math.sin(angleRad) + offset * EXTRA_GAP,
    y: RADIUS * (1 - Math.cos(angleRad)),
    rotate: angleDeg,
  };
}
