const { loadInput, part1, part2 } = require("./12");

const testInput = loadInput("test-input.txt");

describe("day 12 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput)).toBe(25);
  });
});

describe("day 12 part 2", () => {
  it("solves test cases", () => {
    expect(part2(testInput)).toBe(286);
  });
});
