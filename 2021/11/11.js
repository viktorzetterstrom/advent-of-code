const fs = require("fs");
const R = require("ramda");

const readFile = (name) => fs.readFileSync(name, "utf-8");
const getInput = R.compose(
  R.map(R.compose(R.map(Number), R.split(""))),
  R.split("\n"),
  readFile
);

const shouldFlash = (o) => o > 9;

const coordStr = (x, y) => `${x}, ${y}`;

const increaseEnergy = R.map(R.map(R.add(1)));

const increaseEnergyAround = (octos, x, y) => {
  if (octos?.[y + 1]?.[x]) octos[y + 1][x] += 1;
  if (octos?.[y - 1]?.[x]) octos[y - 1][x] += 1;
  if (octos?.[y]?.[x + 1]) octos[y][x + 1] += 1;
  if (octos?.[y]?.[x - 1]) octos[y][x - 1] += 1;

  if (octos?.[y + 1]?.[x + 1]) octos[y + 1][x + 1] += 1;
  if (octos?.[y + 1]?.[x - 1]) octos[y + 1][x - 1] += 1;
  if (octos?.[y - 1]?.[x - 1]) octos[y - 1][x - 1] += 1;
  if (octos?.[y - 1]?.[x + 1]) octos[y - 1][x + 1] += 1;

  return octos;
};

const doFlash = (octos) => {
  const flashed = new Set();
  let added = true;

  while (added) {
    let newOctos = R.clone(octos);
    added = false;
    for (let y = 0; y < octos.length; y++) {
      for (let x = 0; x < octos[0].length; x++) {
        const o = octos[y][x];
        if (shouldFlash(o) && !flashed.has(coordStr(x, y))) {
          newOctos = increaseEnergyAround(newOctos, x, y);
          flashed.add(coordStr(x, y));
          added = true;
        }
      }
    }
    octos = newOctos;
  }

  return octos;
};

let flashTotalPartOne = 0;
const deFlash = R.map(
  R.map((o) => {
    if (shouldFlash(o)) {
      flashTotalPartOne++;
      return 0;
    }
    return o;
  })
);

const isSynchronous = (octos) => R.all((o) => o === 0, R.flatten(octos));

const logOctos = (octos) => R.forEach((r) => console.log(r.join(",")), octos);
const log = R.curry((message, x) => console.log(message) || logOctos(x) || x);
const input = getInput("2021/11/input.txt");

const step = R.compose(deFlash, doFlash, increaseEnergy);

R.reduce(step, input, R.range(0, 100));
console.log(flashTotalPartOne);

const part2 = (octos, i = 1) => {
  const newOctos = step(octos);
  return isSynchronous(newOctos) ? i : part2(newOctos, i + 1);
};

console.log(part2(input));
