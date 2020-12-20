const { loadInput, part1, part2 } = require("./16");

const testInput1 = loadInput("test-input.txt");
const testInput2 = loadInput("test-input2.txt");

describe("day 16 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput1)).toBe(71);
  });
});

describe("day 16 part 2", () => {
  it("solves test cases", () => {
    // expect(part2(testInput1)).toEqual(["row", "class", "seat"]);
    expect(part2(testInput2)).toEqual(["row", "class", "seat"]);
  });
});
