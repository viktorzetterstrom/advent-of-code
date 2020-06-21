const fs = require("fs");
const { calculateIntersections } = require("./17");

describe("day 17 part 1", () => {
  it("works for given testcase", () => {
    const input = fs
      .readFileSync("17/testInput.txt")
      .toString()
      .split("\n")
      .map(row => row.split(""));

    expect(calculateIntersections(input)).toBe(76);
  });
});
