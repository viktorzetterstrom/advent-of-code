const { loadInput, part1, part2 } = require("./13");

const testInput1 = loadInput("test-input.txt");
const testInput2 = loadInput("test-input2.txt");
const testInput3 = loadInput("test-input3.txt");
const testInput4 = loadInput("test-input4.txt");

describe("day 13 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput1)).toBe(295);
  });
});

describe("day 13 part 2", () => {
  it("solves test cases", () => {
    expect(part2(testInput2, 1000)).toBe(3417);
    expect(part2(testInput1, 100000)).toBe(1068781);
    expect(part2(testInput3, 100000)).toBe(754018);
    expect(part2(testInput4, 100000)).toBe(779210);
  });
});
