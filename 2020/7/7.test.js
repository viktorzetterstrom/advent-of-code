const { loadInput, nest, part1, part2 } = require("./7");

const testInput = nest(loadInput("test-input.txt"));
const testInput2 = nest(loadInput("test-input2.txt"));

describe("day 7 part 1", () => {
  it("finds the correct amouont of suitable bag colors", () => {
    expect(part1(testInput)).toBe(4);
  });
});

describe("day 7 part 2", () => {
  it("it counts the total amount of bags needed", () => {
    expect(part2(testInput)).toBe(32);
    expect(part2(testInput2)).toBe(126);
  });
});
