const fs = require("fs");
const { calculateBiodiversity, calculateNextLayout } = require("./24");

describe("day 24 part 1", () => {
  it("calculates biodiversity correctly", () => {
    const layout = fs
      .readFileSync("24/testInput1.txt")
      .toString()
      .split("\n")
      .map(row => row.split(""));

    expect(calculateBiodiversity(layout)).toBe(2129920);
  });
  it("calculates layouts correctly", () => {
    const layout = fs
      .readFileSync("24/testInput2.txt")
      .toString()
      .split("\n")
      .map(row => row.split(""));

    expect(calculateNextLayout(layout)).toStrictEqual([
      ["#", ".", ".", "#", "."],
      ["#", "#", "#", "#", "."],
      ["#", "#", "#", ".", "#"],
      ["#", "#", ".", "#", "#"],
      [".", "#", "#", ".", "."]
    ]);
    expect(calculateNextLayout(calculateNextLayout(layout))).toStrictEqual([
      ["#", "#", "#", "#", "#"],
      [".", ".", ".", ".", "#"],
      [".", ".", ".", ".", "#"],
      [".", ".", ".", "#", "."],
      ["#", ".", "#", "#", "#"]
    ]);
  });
});
