const fs = require("fs");
const R = require("ramda");

const readFile = (name) => fs.readFileSync(name, "utf-8");
const parseRows = R.map(R.compose(R.map(Number), R.split("")));

const getInput = R.compose(parseRows, R.split("\n"), readFile);
// const input = getInput("./2021/3/test-input.txt");
const input = getInput("./2021/3/input.txt");

const getBits = R.reduce(
  (acc, [key, val]) => (val > 0 ? `${acc}1` : `${acc}0`),
  ""
);

const reduceIndexed = R.addIndex(R.reduce);
const sumBinary = R.reduce((outerAcc, curr) => {
  const change = reduceIndexed(
    (innerAcc, val, i) => ({
      ...innerAcc,
      [i]: val > (innerAcc[i] ? innerAcc[i] : 0) ? 1 : -1,
    }),
    {}
  );
  return R.mergeWith(R.add, outerAcc, change(curr));
}, {});

const swap = R.compose(
  R.reduce((acc, curr) => (curr === "1" ? `${acc}0` : `${acc}1`), ""),
  R.split("")
);

const calculateGamma = R.compose(getBits, R.toPairs, sumBinary);
const gamma = calculateGamma(input);
const epsilon = swap(gamma);
const part1 = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log(part1);

const getKeep = (inp, i) => (sumBinary(inp)[i] >= 0 ? 1 : 0);

const oxygenFilter = (inp, i, keep) => R.filter((row) => row[i] === keep, inp);

const co2filter = (inp, i, keep) => R.filter((row) => row[i] !== keep, inp);

const part2 = (inp, filter, i = 0) => {
  const keep = getKeep(inp, i);
  if (inp.length === 1) return inp[0];
  return part2(filter(inp, i, keep), filter, i + 1);
};

const toNumber = R.compose(
  (x) => parseInt(x, 2),
  R.join(""),
  R.map(R.toString)
);

console.log(
  toNumber(part2(input, oxygenFilter)) * toNumber(part2(input, co2filter))
);
