const fs = require("fs");
const {
  shuffleDeck,
  dealIntoNewStack,
  dealWithIncrement,
  cut
} = require("./22");

describe("day 22 part 1", () => {
  it("has can can properly deal", () => {
    expect(dealIntoNewStack([0, 1, 2, 3])).toStrictEqual([3, 2, 1, 0]);
    expect(dealWithIncrement([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toStrictEqual([
      0,
      7,
      4,
      1,
      8,
      5,
      2,
      9,
      6,
      3
    ]);
    expect(cut([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toStrictEqual([
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      1,
      2
    ]);
    expect(cut([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], -4)).toStrictEqual([
      6,
      7,
      8,
      9,
      0,
      1,
      2,
      3,
      4,
      5
    ]);
  });

  it("works for supplied testcase", () => {
    const instructions = fs
      .readFileSync("22/testInput.txt")
      .toString()
      .split("\n")
      .map(i => {
        const [, instruction, value] = i.match(/([^\d-]*)(-?\d+)?/);
        return { instruction: instruction.trim(), value: Number(value) };
      });

    expect(shuffleDeck(instructions, 10)).toStrictEqual([
      9,
      2,
      5,
      8,
      1,
      4,
      7,
      0,
      3,
      6
    ]);
  });
});
