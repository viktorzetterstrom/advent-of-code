const fs = require("fs");
const R = require("ramda");

const getInput = (name) => R.split("\n", fs.readFileSync(name, "utf-8"));

const bracketPairs = Object.freeze({
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
});
const openingBrackets = R.values(bracketPairs);
const closingBrackets = R.keys(bracketPairs);

const illegalScores = Object.freeze({
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
});

const missingScores = Object.freeze({
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
});

const processChunks = (str) => {
  const stack = [];

  for (const c of R.split("", str)) {
    if (R.includes(c, openingBrackets)) stack.push(c);
    if (R.includes(c, closingBrackets)) {
      const next = stack.pop();
      if (bracketPairs[c] !== next) return { valid: false, firstIllegal: c };
    }
  }

  return {
    valid: true,
    missing: R.map((c) => R.invertObj(bracketPairs)[c], R.reverse(stack)),
  };
};

const scoreIllegal = R.reduce(
  (acc, { firstIllegal }) => acc + illegalScores[firstIllegal],
  0
);

const scoreMissing = R.map(({ missing }) =>
  R.reduce((iAcc, c) => iAcc * 5 + missingScores[c], 0, missing)
);

const input = getInput("2021/10/input.txt");
// const input = getInput("2021/10/test-input.txt");

const part1 = R.compose(
  scoreIllegal,
  R.filter(({ valid }) => !valid),
  R.map(processChunks)
);

const part2 = R.compose(
  (scores) => scores[Math.floor(scores.length / 2)],
  R.sort((a, b) => b - a),
  scoreMissing,
  R.filter(({ valid }) => valid),
  R.map(processChunks)
);

console.log(part1(input));
console.log(part2(input));
