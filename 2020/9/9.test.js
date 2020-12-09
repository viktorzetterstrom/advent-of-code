const { loadInput, part1, part2 } = require("./9");

const testInput = loadInput("test-input.txt");

describe("day 9 part 1", () => {
  it("finds first number where no sum exists", () => {
    expect(part1(testInput, 5)).toBe(127);
  });
});

describe("day 9 part 2", () => {
  it("finds the contiguous set and adds smallest and largest together", () => {
    expect(part2(testInput, 127)).toBe(15 + 47);
  });
});
