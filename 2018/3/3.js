const { readFileSync } = require("fs");

const input = readFileSync("2018/3/input.txt", { encoding: "utf-8" }).split(
  "\n"
);

const parseRow = (row) => {
  const rowRegex =
    /#(?<id>\d+) @ (?<x>\d+),(?<y>\d+): (?<width>\d+)x(?<height>\d+)/;
  const { id, x, y, width, height } = rowRegex.exec(row).groups;
  return {
    id,
    x: Number(x),
    y: Number(y),
    width: Number(width),
    height: Number(height),
  };
};

const createVisitedCoordsMap = (input) => {
  const visitedCoords = new Map();
  input.forEach((r) => {
    const { id, x: _x, y: _y, width, height } = parseRow(r);
    for (let x = _x; x < _x + width; x++) {
      for (let y = _y; y < _y + height; y++) {
        const key = `${x}:${y}`;
        const current = visitedCoords.get(key) || 0;
        visitedCoords.set(key, current + 1);
      }
    }
  });
  return visitedCoords;
};

const part1 = (input) => {
  const visitedCoordsMap = createVisitedCoordsMap(input);
  return Array.from(visitedCoordsMap.values()).reduce(
    (acc, curr) => (curr >= 2 ? acc + 1 : acc),
    0
  );
};

const testClaimOnMap = (claim, map) => {
  const { id, x: _x, y: _y, width, height } = claim;
  for (let x = _x; x < _x + width; x++) {
    for (let y = _y; y < _y + height; y++) {
      const key = `${x}:${y}`;
      if (map.get(key) > 1) return false;
    }
  }
  return claim;
};

const part2 = (input) => {
  const visitedCoordsMap = createVisitedCoordsMap(input);
  const claimWithoutConflict = input
    .map(parseRow)
    .map((claim) => testClaimOnMap(claim, visitedCoordsMap))
    .filter((x) => x)[0];
  return claimWithoutConflict.id;
};

console.log("part1:", part1(input));
console.log("part2:", part2(input));
