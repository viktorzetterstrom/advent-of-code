const { loadInput, part1, part2 } = require("./14");

const testInput = loadInput("test-input.txt");
const testInput2 = loadInput("test-input2.txt");
const testInput3 = loadInput("test-input3.txt");

describe("day 14 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput)).toBe(165);
  });
});

describe("day 14 part 2", () => {
  it("solves test cases", () => {
    // expect(part2(testInput2)).toBe(208);
    expect(part2(testInput3)).toBe(52);
  });
});
