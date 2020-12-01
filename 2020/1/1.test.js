const { part1, part2 } = require("./1");

const testInput = [1721, 979, 366, 299, 675, 1456];
const part1Answer = 514579;
const part2Answer = 241861950;

describe("day 1 part 1", () => {
  it("solves example case", () => {
    expect(part1(testInput)).toEqual(part1Answer);
  });
});
describe("day 1 part 2", () => {
  it("solves example case", () => {
    expect(part2(testInput)).toEqual(part2Answer);
  });
});
