const fs = require("fs");

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/3/${fileName}`, "utf-8")
    .split("\n")
    .map((row) => row.split(""));

const countTrees = (data, { dx, dy }) => {
  const isTree = (x) => x === "#";
  const height = data.length;
  const width = data[0].length;
  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < height) {
    const curr = data[y][x];
    if (isTree(curr)) trees++;
    x = (x + dx) % width;
    y += dy;
  }
  return trees;
};

const treeOptimization = (input, slopes) =>
  slopes
    .map((slope) => countTrees(input, slope))
    .reduce((acc, curr) => acc * curr, 1);

if (process.env.NODE_ENV !== "test") {
  const part1Slope = { dx: 3, dy: 1 };
  const part2Slopes = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ];

  const input = loadInput("input.txt");
  const part1 = countTrees(input, part1Slope);
  const part2 = treeOptimization(input, part2Slopes);

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

module.exports = { loadInput, countTrees, treeOptimization };
