const fs = require("fs");
const R = require("ramda");
const Graph = require("node-dijkstra");

const getRawInput = (name) => fs.readFileSync(name, "utf-8");
const parseInput = R.compose(
  R.map(R.compose(R.map(Number), R.split(""))),
  R.split("\n")
);
const getInput = R.compose(parseInput, getRawInput);

const input = getInput("2021/15/input.txt");
// const input = getInput("2021/15/test-input-1.txt");

const coordString = (x, y) => `${x}, ${y}`;
const forEachIndexed = R.addIndex(R.forEach);
const createGraph = (input) => {
  const graph = new Graph();
  const Y = input.length - 1;
  const X = input[0].length - 1;

  forEachIndexed(
    (row, y) =>
      forEachIndexed((_, x) => {
        const neighbours = {};
        if (0 < x) neighbours[coordString(x - 1, y)] = input[y][x - 1];
        if (x < X) neighbours[coordString(x + 1, y)] = input[y][x + 1];
        if (0 < y) neighbours[coordString(x, y - 1)] = input[y - 1][x];
        if (y < Y) neighbours[coordString(x, y + 1)] = input[y + 1][x];

        graph.addNode(coordString(x, y), neighbours);
      }, row),
    input
  );
  return graph;
};

const graph = createGraph(input);
const Y1 = input.length - 1;
const X1 = input[0].length - 1;
const part1 = graph.path(coordString(0, 0), coordString(X1, Y1), {
  cost: true,
});
console.log(part1);

const increase = R.curry((amount, n) =>
  n + amount > 9 ? (n + amount) % 9 : n + amount
);

const createPartTwoInput = (input) =>
  Array(5 * input.length)
    .fill(0)
    .map((_, y) =>
      Array(5 * input.length)
        .fill(0)
        .map((_, x) => {
          const originalX = x % input.length;
          const originalY = y % input.length;
          const offset =
            Math.floor(x / input.length) + Math.floor(y / input.length);
          const value = input[originalY][originalX] + offset;
          return value > 9 ? value - 9 : value;
        })
    );

const partTwoInput = createPartTwoInput(input);
const graphTwo = createGraph(partTwoInput);
const Y2 = partTwoInput.length - 1;
const X2 = partTwoInput[0].length - 1;
const part2 = graphTwo.path(coordString(0, 0), coordString(X2, Y2), {
  cost: true,
});
console.log(part2);
