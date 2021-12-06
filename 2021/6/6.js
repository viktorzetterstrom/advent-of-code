const fs = require("fs");
const R = require("ramda");

const getInput = (name) =>
  R.map(Number, fs.readFileSync(name, "utf-8").split(","));

const input = getInput("./2021/6/input.txt");
// const input = getInput("./2021/6/test-input.txt");

const createFishState = R.compose(
  R.map(([days, count]) => ({ days: Number(days), count })),
  R.toPairs,
  R.countBy((val) => val)
);

const ageFish = R.map(({ days, count }) => ({ days: days - 1, count }));

const getSpawning = R.filter(R.compose((n) => n < 0, R.prop("days")));

const processDay = (state) => {
  const agedFish = ageFish(state);
  const spawning = R.reduce(
    (acc, curr) => acc + curr.count,
    0,
    getSpawning(agedFish)
  );

  return R.concat(
    R.filter(({ days }) => days >= 0, agedFish),
    spawning
      ? [
          { days: 6, count: spawning },
          { days: 8, count: spawning },
        ]
      : []
  );
};

const runSimulation = (days) =>
  R.reduce(processDay, createFishState(input), R.range(0, days));
const sum = R.reduce((acc, curr) => acc + curr.count, 0);

console.log(sum(runSimulation(80)));
console.log(sum(runSimulation(256)));
