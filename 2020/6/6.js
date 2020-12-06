const fs = require("fs");

const loadInput = (fileName) =>
  fs.readFileSync(`2020/6/${fileName}`, "utf-8").split("\n\n");

const countYes1 = (group) => new Set(group.replace(/\n/g, "")).size;
const countYesPart1 = (data) => data.map(countYes1).reduce((a, b) => a + b);

const intersection = (setA, setB) => {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
};
const countYes2 = (group) =>
  group
    .split("\n")
    .reduce(
      (acc, curr) => intersection(acc, new Set(curr.split(""))),
      new Set(group.replace(/\n/g, "").split(""))
    );
const countYesPart2 = (data) =>
  data
    .map(countYes2)
    .map((set) => set.size)
    .reduce((a, b) => a + b);

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const part1 = countYesPart1(input);
  const part2 = countYesPart2(input);

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

module.exports = {
  loadInput,
  countYesPart1,
  countYesPart2,
};
