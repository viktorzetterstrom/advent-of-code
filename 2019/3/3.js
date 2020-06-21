const fs = require("fs");

const createWirePoints = wire => {
  let x = 0;
  let y = 0;
  let distance = 0;
  const points = new Set();
  const distances = new Map();

  wire.forEach(w => {
    const direction = w.slice(0, 1);
    const length = Number(w.slice(1));

    for (let i = 0; i < length; i += 1) {
      switch (direction) {
        case "U":
          y += 1;
          break;
        case "D":
          y -= 1;
          break;
        case "L":
          x -= 1;
          break;
        case "R":
          x += 1;
          break;
        default:
          throw new Error("bad direction");
      }
      distance += 1;
      points.add(`${x}|${y}`);
      if (!distances.has(`${x}|${y}`)) distances.set(`${x}|${y}`, distance);
    }
  });
  return { points, distances };
};

const closestIntersectionDistance = ({ wire1, wire2 }) => {
  const wire1points = createWirePoints(wire1).points;
  const wire2points = createWirePoints(wire2).points;

  const intersection = new Set(
    [...wire1points].filter(p => wire2points.has(p))
  );
  const manhattanDistance = point =>
    point
      .split("|")
      .map(Number)
      .reduce((distance, val) => distance + Math.abs(val), 0);

  return Math.min(...[...intersection].map(manhattanDistance));
};

const closestIntersectionSteps = ({ wire1, wire2 }) => {
  const wire1points = createWirePoints(wire1);
  const wire2points = createWirePoints(wire2);

  const intersection = new Set(
    [...wire1points.points].filter(p => wire2points.points.has(p))
  );
  const distances = [...intersection].map(
    point => wire1points.distances.get(point) + wire2points.distances.get(point)
  );
  return Math.min(...distances);
};

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./3/input.txt")
    .toString()
    .split("\n")
    .reduce(
      (acc, curr, i) => ({
        ...acc,
        [`wire${i + 1}`]: curr.split(",")
      }),
      {}
    );

  console.log(`part1: ${closestIntersectionDistance(input)}`);
  console.log(`part2: ${closestIntersectionSteps(input)}`);
}

module.exports = {
  closestIntersectionDistance,
  closestIntersectionSteps
};
