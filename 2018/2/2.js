const { readFileSync } = require("fs");

const input = readFileSync("2018/2/input.txt", { encoding: "utf-8" }).split(
  "\n"
);

const hasLetterPair = (str) => {
  for (let i = 0; i < str.length; i++) {
    const letterCount = (str.match(new RegExp(str.at(i), "g")) || []).length;
    if (letterCount === 2) return true;
  }
};

const hasLetterTriplet = (str) => {
  for (let i = 0; i < str.length; i++) {
    const letterCount = (str.match(new RegExp(str.at(i), "g")) || []).length;
    if (letterCount === 3) return true;
  }
};

const part1 = (input) => {
  const pairCount = input.reduce(
    (acc, curr) => (hasLetterPair(curr) ? acc + 1 : acc),
    0
  );
  const tripletCount = input.reduce(
    (acc, curr) => (hasLetterTriplet(curr) ? acc + 1 : acc),
    0
  );
  return pairCount * tripletCount;
};

const countCharDifference = (str1, str2) => {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1.at(i) !== str2.at(i)) count++;
  }
  return count;
};

const stripDifferingCharacters = (str1, str2) => {
  let matchingChars = "";
  for (let i = 0; i < str1.length; i++) {
    if (str1.at(i) === str2.at(i)) matchingChars += str1.at(i);
  }
  return matchingChars;
};

const part2 = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const difference = countCharDifference(input[i], input[j]);
      if (difference === 1) {
        return stripDifferingCharacters(input[i], input[j]);
      }
    }
  }
};

console.log("part1:", part1(input));
console.log("part2:", part2(input));
