const { loadInput, countTrees, treeOptimization } = require("./3");

const testInput = loadInput("test-input.txt");

describe("day 3 part 1", () => {
  it("counts the correct amount of trees for the test input", () => {
    const slope = { dx: 3, dy: 1 };
    expect(countTrees(testInput, slope)).toBe(7);
  });
});

describe("day 3 part 2", () => {
  it("counts the correct amount of trees for the test input", () => {
    const part2Slopes = [
      { dx: 1, dy: 1 },
      { dx: 3, dy: 1 },
      { dx: 5, dy: 1 },
      { dx: 7, dy: 1 },
      { dx: 1, dy: 2 },
    ];

    expect(treeOptimization(testInput, part2Slopes)).toBe(336);
  });
});
