const fs = require("fs");

const loadInput = (fileName) =>
  fs.readFileSync(`2020/9/${fileName}`, "utf-8").split("\n").map(Number);

const validateNumber = (number, precedingNumbers) =>
  new Set(
    precedingNumbers.flatMap((a) => precedingNumbers.map((b) => a + b))
  ).has(number);

const part1 = (data, lookback = 25) => {
  for (i = lookback; i < data.length; i++) {
    const number = data[i];
    const valid = validateNumber(number, data.slice(i - lookback, i));
    if (!valid) return number;
  }
};

sumArray = (arr) => arr.reduce((a, b) => a + b);

const part2 = (data, targetNumber) => {
  for (let i = 0; i < data.length; i++) {
    let j = i + 1;
    let contigousSet = data.slice(i, j);
    let sum = sumArray(contigousSet);

    while (sum <= targetNumber) {
      if (sum === targetNumber) {
        return Math.min(...contigousSet) + Math.max(...contigousSet);
      }
      contigousSet = data.slice(i, ++j);
      sum = sumArray(contigousSet);
    }
  }
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const _part1 = part1(input);
  const _part2 = part2(input, _part1);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  part1,
  part2,
};
