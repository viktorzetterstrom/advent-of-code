const { loadInput, part1, part2 } = require("./10");

const testInput = loadInput("test-input.txt");
const testInput2 = loadInput("test-input2.txt");
const testInput3 = loadInput("test-input3.txt");

describe("day 10 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput)).toBe(5 * 7);
    expect(part1(testInput2)).toBe(22 * 10);
  });
});

describe("day 10 part 2", () => {
  it("solves test cases", () => {
    expect(part2(testInput)).toBe(8);
    expect(part2(testInput2)).toBe(19208);
  });
});
