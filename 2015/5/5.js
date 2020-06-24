const { readFile } = require("fs").promises;
const R = require("ramda");

const containsThreeVowels = (str) => R.match(/([aeiou])/g, str).length >= 3;
const containsTwiceInRow = (str) => /(\w)\1/g.test(str);
const containsForbidden = (str) => /(ab|cd|pq|xy)/.test(str);

const isNiceStringPart1 = (str) =>
  containsThreeVowels(str) &&
  containsTwiceInRow(str) &&
  !containsForbidden(str);

const containsPairsWithoutOverlap = (str) => /(\w\w).*\1/.test(str);
const containsRepeatingLetterWithGap = (str) => /(\w).\1/.test(str);

const isNiceStringPart2 = (str) =>
  containsPairsWithoutOverlap(str) && containsRepeatingLetterWithGap(str);

const run = async () => {
  const input = await readFile("./input.txt", { encoding: "utf-8" });

  const part1 = R.pipe(R.split("\n"), R.map(isNiceStringPart1), R.sum)(input);
  const part2 = R.pipe(R.split("\n"), R.map(isNiceStringPart2), R.sum)(input);
  console.log("Part 1", part1);
  console.log("Part 2", part2);
};
if (process.env.NODE_ENV !== "test") {
  run();
}

module.exports = {
  containsThreeVowels,
  containsTwiceInRow,
  containsForbidden,
  isNiceStringPart1,
  containsPairsWithoutOverlap,
  containsRepeatingLetterWithGap,
};
