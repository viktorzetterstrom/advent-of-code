const fs = require("fs");
const R = require("ramda");

const getRawInput = (name) => fs.readFileSync(name, "utf-8");
const parsePolyMap = R.compose(
  (xs) => new Map(xs),
  R.map(R.split(" -> ")),
  R.split("\n")
);
const parseInput = R.compose(
  ([start, rawPolyMap]) => ({
    start,
    polyMap: parsePolyMap(rawPolyMap),
  }),
  R.split("\n\n")
);

const getInput = R.compose(parseInput, getRawInput);

const { start, polyMap } = getInput("2021/14/input.txt");

const insertNewPolys = (polys) => {
  let newPolys = "";
  for (let i = 0; i < polys.length - 1; i++) {
    const poly = polys.slice(i, i + 2);
    const newPoly = polyMap.get(poly);
    newPolys += `${polys[i]}${newPoly}`;
  }
  newPolys += R.last(polys);
  return newPolys;
};

const runInserts = R.reduce(insertNewPolys, start);
const partOnePolys = runInserts(R.range(0, 10));
const count = R.countBy((a) => a)(partOnePolys);
const values = R.compose(
  R.sort((a, b) => b - a),
  R.values
)(count);
const partOne = R.head(values) - R.last(values);
console.log(partOne);

const createPairs = (polys) => {
  let pairs = {};
  for (let i = 0; i < polys.length - 1; i++) {
    const pair = polys.slice(i, i + 2);
    pairs[pair] = pairs[pair] ? pairs[pair] + 1 : 1;
  }
  return pairs;
};

const pairs = createPairs(start);
const polymers = R.countBy((a) => a, start);

const insertNewPairs = ({ pairs, polymers }) => {
  const newPairs = {};
  for (const [pair, count] of Object.entries(pairs)) {
    const newPoly = polyMap.get(pair);
    polymers[newPoly] = polymers[newPoly] ? polymers[newPoly] + count : count;

    const newPairOne = R.head(pair) + newPoly;
    newPairs[newPairOne] = newPairs[newPairOne]
      ? newPairs[newPairOne] + count
      : count;

    const newPairTwo = newPoly + R.tail(pair);
    newPairs[newPairTwo] = newPairs[newPairTwo]
      ? newPairs[newPairTwo] + count
      : count;

    // console.log({
    //   pair,
    //   count,
    //   newPoly,
    //   newPairOne,
    //   newPairOneCount: newPairs[newPairOne] ? newPairs[newPairOne] + 1 : 1,
    //   newPairTwo,
    //   newPairTwoCount: newPairs[newPairTwo] ? newPairs[newPairTwo] + 1 : 1,
    // });
  }
  // console.log({ pairs, newPairs });
  return { pairs: newPairs, polymers };
};

const runInsertPairs = R.reduce(insertNewPairs, { pairs, polymers });
const partTwoRes = runInsertPairs(R.range(0, 40));

const valuesTwo = R.compose(
  R.sort((a, b) => b - a),
  R.values
)(partTwoRes.polymers);
const partTwo = R.head(valuesTwo) - R.last(valuesTwo);
console.log(partTwo);
