const { Console } = require("console");
const fs = require("fs");

const loadInput = (fileName) =>
  fs.readFileSync(`2020/10/${fileName}`, "utf-8").split("\n").map(Number);

const sortAsc = (a, b) => a - b;

const formatInput = (input) => [
  0,
  ...input.sort(sortAsc),
  Math.max(...input) + 3,
];

const part1 = (input) => {
  const data = formatInput(input);
  const differences = data
    .map((val, i) => (data[i + 1] ? data[i + 1] - val : 0))
    .reduce(
      (acc, val) => ({
        ...acc,
        [val]: acc[val] ? acc[val] + 1 : 1,
      }),
      {}
    );
  return differences[1] * differences[3];
};

const part2 = (input) => {
  const data = formatInput(input);
  const paths = data.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {});
  paths[0] = 1;

  for (let i = 0; i < data.length; i++) {
    const candidate = data[i];
    const pathCount = paths[candidate];
    if (paths[candidate + 1] !== undefined) {
      paths[candidate + 1] += pathCount;
    }
    if (paths[candidate + 2] !== undefined) {
      paths[candidate + 2] += pathCount;
    }
    if (paths[candidate + 3] !== undefined) {
      paths[candidate + 3] += pathCount;
    }
  }

  return paths[data[data.length - 1]];
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const _part1 = part1(input);
  const _part2 = part2(input);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  part1,
  part2,
};
