const { loadInput, countYesPart1, countYesPart2 } = require("./6");

const testInput = loadInput("test-input.txt");

describe("day 6 part 1", () => {
  it("counts unique yes-answers per group", () => {
    expect(countYesPart1(testInput)).toBe(11);
  });
});

describe("day 6 part 2", () => {
  it("counts same yes-answers per group", () => {
    expect(countYesPart2(testInput)).toBe(6);
  });
});
