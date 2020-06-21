const fs = require("fs");

const isAsteroid = coord => coord === "#";

const greatestCommonDivisor = (a, b) =>
  b === 0 ? Math.abs(a) : greatestCommonDivisor(b, a % b);

const calculateVisibleAsteroids = (asteroidMap, centerX, centerY) => {
  const asteroidDeltas = new Set();
  for (let y = 0; y < asteroidMap.length; y++) {
    for (let x = 0; x < asteroidMap[0].length; x++) {
      if (isAsteroid(asteroidMap[y][x])) {
        const dx = x - centerX;
        const dy = y - centerY;
        const divisor = greatestCommonDivisor(dx, dy);
        asteroidDeltas.add(`${dx / divisor}|${dy / divisor}`);
      }
    }
  }
  return asteroidDeltas.size - 1;
};

const findBestMiningLocation = input => {
  const asteroidMap = input.split("\n").map(row => row.split(""));

  const visibleAsteroidMap = asteroidMap.map((row, y) =>
    row.map((_, x) =>
      isAsteroid(asteroidMap[y][x])
        ? calculateVisibleAsteroids(asteroidMap, x, y)
        : 0
    )
  );

  let bestLocation = {
    asteroids: 0,
    location: null
  };
  asteroidMap.forEach((row, y) =>
    row.forEach((_, x) => {
      if (visibleAsteroidMap[y][x] > bestLocation.asteroids) {
        bestLocation = {
          asteroids: visibleAsteroidMap[y][x],
          location: [x, y]
        };
      }
    })
  );

  return bestLocation;
};

const createAsteroidAngleMap = (asteroidMap, centerX, centerY) => {
  const asteroidAngles = new Map();
  for (let y = 0; y < asteroidMap.length; y++) {
    for (let x = 0; x < asteroidMap[0].length; x++) {
      if (isAsteroid(asteroidMap[y][x]) && !(x === centerX && y === centerY)) {
        const dx = x - centerX;
        const dy = centerY - y;
        let angle = Math.atan2(dx, dy) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        if (asteroidAngles.has(angle)) {
          asteroidAngles.set(angle, [...asteroidAngles.get(angle), [x, y]]);
        } else {
          asteroidAngles.set(angle, [[x, y]]);
        }
      }
    }
  }
  return asteroidAngles;
};

const asteroidVaporization = (input, centerX, centerY) => {
  const asteroidMap = input.split("\n").map(row => row.split(""));

  const angleMap = createAsteroidAngleMap(asteroidMap, centerX, centerY);
  const blastingOrder = [...angleMap.entries()]
    .sort(([angleA], [angleB]) => angleA - angleB)
    .map(([, asteroids]) => asteroids);

  let blast = 0;
  const blasted = [];
  while (blastingOrder.length > 0) {
    const i = blast % blastingOrder.length;
    blasted.push(blastingOrder[i].pop());
    if (blastingOrder[i].length === 0) {
      blastingOrder.splice(i, 1);
      blast--;
    }
    blast++;
  }
  return blasted[199];
};

if (process.env.NODE_ENV !== "test") {
  const input = fs.readFileSync("./10/input.txt").toString();

  const part1 = findBestMiningLocation(input);
  console.log("part1", part1.asteroids);
  const [x, y] = asteroidVaporization(input, ...part1.location);
  console.log("part2", x * 100 + y);
}

module.exports = {
  findBestMiningLocation,
  asteroidVaporization
};
