const { loadInput, part1, part2 } = require("./8");

const testInput = loadInput("test-input.txt");

describe("day 8 part 1", () => {
  it("finds the accumulator value after returning to beginning", () => {
    expect(part1(testInput).accumulator).toBe(5);
  });
});

describe("day 8 part 2", () => {
  it("it counts the total amount of bags needed", () => {
    expect(part2(testInput)).toBe(8);
  });
});
