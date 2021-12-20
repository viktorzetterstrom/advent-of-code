const fs = require("fs");
const R = require("ramda");

const getInput = R.compose(R.split("\n"), (name) =>
  fs.readFileSync(name, "utf-8")
);

const input = getInput("2021/18/test-input-1.txt");

const add = (a, b) => [a, b];

const shouldExplode = R.compose(R.gt(R.__, 4), R.length, R.match(/\[/g));

const shouldSplit = R.compose(
  R.gt(R.__, 0),
  R.length,
  R.filter(R.gte(R.__, 10)),
  R.flatten,
  JSON.parse
);

const explode = (sn) => {};

const split = (sn) => {};

// console.log(add([1, 2], [[3, 4], 5]));
// logger(input);
