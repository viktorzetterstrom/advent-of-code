const fs = require("fs");
const R = require("ramda");

const getRawInput = (name) => R.split("\n", fs.readFileSync(name, "utf-8"));
const parseRow = R.split(" -> ");
const parseCoords = R.map(
  R.compose(([x, y]) => ({ x, y }), R.map(Number), R.split(","))
);

const getInput = R.compose(
  R.map(R.compose(parseCoords, parseRow)),
  getRawInput
);

const isHorizontalOrVertical = ([p1, p2]) => p1.x === p2.x || p1.y === p2.y;
const onlyHorizontalAndVertical = R.filter(isHorizontalOrVertical);

const getDelta = (a, b) => {
  if (a === b) return 0;
  if (a < b) return 1;
  if (a > b) return -1;
};

const plot = R.reduce((acc, [p1, p2]) => {
  const p = { ...p1 };
  const dx = getDelta(p1.x, p2.x);
  const dy = getDelta(p1.y, p2.y);

  const newCoords = {};
  while (true) {
    const key = `${p.x},${p.y}`;
    newCoords[key] = acc[key] ? acc[key] + 1 : 1;

    if (p.x === p2.x && p.y === p2.y) break;
    p.x += dx;
    p.y += dy;
  }

  return R.merge(acc, newCoords);
}, {});

const overlapCount = R.compose(
  R.reduce((acc, n) => (n > 1 ? acc + 1 : acc), 0),
  R.values
);

const solve = R.compose(overlapCount, plot);

const input = getInput("./2021/5/input.txt");
// const input = getInput("./2021/5/test-input.txt");
const partOneInput = onlyHorizontalAndVertical(input);

console.log(solve(partOneInput));
console.log(solve(input));
