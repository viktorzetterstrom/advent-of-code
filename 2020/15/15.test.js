const { part1, part2 } = require("./15");

const testInput1 = [0, 3, 6];
const testInput2 = [2, 1, 3];
const testInput3 = [1, 2, 3];
const testInput4 = [2, 3, 1];
const testInput5 = [3, 2, 1];
const testInput6 = [3, 1, 2];

describe("day 15 part 1", () => {
  it("solves test cases", () => {
    expect(part1(testInput1, 10)).toBe(0);
    expect(part1(testInput1)).toBe(436);
    expect(part1(testInput2)).toBe(10);
    expect(part1(testInput3)).toBe(27);
    expect(part1(testInput4)).toBe(78);
    expect(part1(testInput5)).toBe(438);
    expect(part1(testInput6)).toBe(1836);
  });
});

describe("day 15 part 2", () => {
  it("solves test cases", () => {
    expect(part1(testInput1, 30000000)).toBe(175594);
  });
});
