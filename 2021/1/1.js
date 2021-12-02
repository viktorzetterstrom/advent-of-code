const fs = require("fs");
const { compose, split, map, reduce, addIndex, or } = require("ramda");
const reduceIndexed = addIndex(reduce);
const mapIndexed = addIndex(map);

const rawInput = fs.readFileSync("./2021/1/input.txt", { encoding: "utf-8" });
const processInput = compose(map(Number), split("\n"));
const input = processInput(rawInput);
// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const partOneCount = reduceIndexed(
  (acc, val, i, list) => (val < or(list[i + 1], 0) ? acc + 1 : acc),
  0
);

console.log(partOneCount(input));

const partTwoSum = mapIndexed(
  (val, i, list) => val + or(list[i + 1], 0) + or(list[i + 2], 0)
);

console.log(compose(partOneCount, partTwoSum)(input));
