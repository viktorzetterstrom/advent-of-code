const fs = require("fs");
const R = require("ramda");

const parseRows = R.map(R.compose(R.map(Number), R.split("")));
const getRows = (name) => fs.readFileSync(name, "utf-8").split("\n");
const getInput = R.compose(parseRows, getRows);

const reduceIndexed = R.addIndex(R.reduce);

const concatFlatten = R.compose(R.flatten, R.concat);

const findLocalMinima = reduceIndexed(
  (oAcc, row, y, list) =>
    concatFlatten(
      oAcc,
      reduceIndexed(
        (iAcc, val, x) => {
          const above = val < (list?.[y - 1]?.[x] ?? Infinity);
          const below = val < (list?.[y + 1]?.[x] ?? Infinity);
          const left = val < (list?.[y]?.[x - 1] ?? Infinity);
          const right = val < (list?.[y]?.[x + 1] ?? Infinity);

          if (above && below && left && right) return [...iAcc, { val, x, y }];
          return iAcc;
        },
        [],
        row
      )
    ),
  []
);

const part1 = R.compose(
  R.sum,
  R.map(R.compose(R.add(1), R.prop("val"))),
  findLocalMinima
);

const createCloseCoords = (p, visited, remaining = []) => {
  const { x, y } = p;
  const above = { x, y: y - 1, val: input?.[y - 1]?.[x] };
  const below = { x, y: y + 1, val: input?.[y + 1]?.[x] };
  const left = { x: x - 1, y, val: input?.[y]?.[x - 1] };
  const right = { x: x + 1, y, val: input?.[y]?.[x + 1] };

  const outOfBounds = R.filter(({ val }) => val);
  const examined = R.filter((p) => !visited.has(coordStr(p)));
  const peaks = R.filter(({ val }) => val < 9);
  const alreadyQueued = R.filter((p) => !R.includes(p, remaining));
  const filterCoords = R.compose(alreadyQueued, peaks, examined, outOfBounds);
  return filterCoords([above, below, left, right]);
};

const coordStr = (p) => `${p.x}, ${p.y}`;

const exploreBasin = (remaining, basin, visited) => {
  if (remaining.length === 0) return basin;
  const p = R.head(remaining);
  visited.add(coordStr(p));

  const newCoords = createCloseCoords(p, visited, remaining);

  return exploreBasin(
    [...R.tail(remaining), ...newCoords],
    [...basin, p],
    visited
  );
};

const findBasins = R.reduce((acc, p) => {
  const visited = new Set([coordStr(p)]);
  const remaining = createCloseCoords(p, visited);
  const basin = [p];
  return [...acc, exploreBasin(remaining, basin, visited)];
}, []);

const part2 = R.compose(
  R.reduce(R.multiply, 1),
  R.slice(0, 3),
  R.sort((a, b) => b - a),
  R.map(R.length),
  findBasins,
  findLocalMinima
);

const input = getInput("./2021/9/input.txt");
// const input = getInput("./2021/9/test-input.txt");

console.log(part1(input));
console.log(part2(input));
