const { loadInput, part1, part2 } = require("./11");

const testInput = loadInput("test-input.txt");

describe("day 11 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput)).toBe(37);
  });
});

describe("day 11 part 2", () => {
  it("solves test cases", () => {
    expect(part2(testInput)).toBe(26);
  });
});
