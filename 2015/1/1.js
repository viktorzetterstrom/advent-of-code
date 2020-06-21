const { readFile } = require("fs").promises;
const R = require("ramda");

const values = {
  "(": 1,
  ")": -1,
};

const stairCounter = (instructions) =>
  R.reduce((acc, direction) => acc + values[direction], 0, instructions);

const basementFinder = (instructions) =>
  R.addIndex(R.reduce)(
    (acc, direction, position) =>
      acc + values[direction] === -1
        ? R.reduced(position + 1)
        : acc + values[direction],
    0,
    instructions
  );

const run = async () => {
  const input = await readFile("./input.txt", { encoding: "utf-8" });

  const part1 = stairCounter(input);
  console.log("Part 1", part1);

  const part2 = basementFinder(input);
  console.log("Part 2", part2);
};
if (process.env.NODE_ENV !== "test") {
  run();
}

module.exports = { stairCounter, basementFinder };
