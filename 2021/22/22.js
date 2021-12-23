const fs = require("fs");
const R = require("ramda");

const getRawInput = (name) => fs.readFileSync(name, "utf-8");

const parseInput = R.compose(
  R.map(([_, command, x1, x2, y1, y2, z1, z2]) => ({
    command,
    xLow: Math.min(Number(x1), Number(x2)),
    xHigh: Math.max(Number(x1), Number(x2)),
    yLow: Math.min(Number(y1), Number(y2)),
    yHigh: Math.max(Number(y1), Number(y2)),
    zLow: Math.min(Number(z1), Number(z2)),
    zHigh: Math.max(Number(z1), Number(z2)),
  })),
  R.map(
    R.match(
      /(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/
    )
  ),
  R.split("\n"),
  getRawInput
);

const input = parseInput("2021/22/input.txt");

const coordStr = (x, y, z) => `${x},${y},${z}`;

const partOne = (input) => {
  const on = new Set();

  const ont = R.reduce(
    (acc, { command, xLow, xHigh, yLow, yHigh, zLow, zHigh }) => {
      for (const x of R.range(Math.max(-50, xLow), Math.min(50, xHigh) + 1)) {
        for (const y of R.range(Math.max(-50, yLow), Math.min(50, yHigh) + 1)) {
          for (const z of R.range(
            Math.max(-50, zLow),
            Math.min(50, zHigh) + 1
          )) {
            const coord = coordStr(x, y, z);
            if (command === "on") acc.add(coord);
            else acc.delete(coord);
          }
        }
      }
      return acc;
    },
    new Set(),
    input
  );

  console.log(ont.size);
};

partOne(input);
