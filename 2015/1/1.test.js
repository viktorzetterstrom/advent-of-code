const { stairCounter, basementFinder } = require("./1.js");

describe("Day 1", () => {
  describe("Part 1", () => {
    it("( means +1", () => {
      expect(stairCounter("(")).toEqual(1);
    });
    it(") means -1", () => {
      expect(stairCounter(")")).toEqual(-1);
    });
    it("handles example cases", () => {
      expect(stairCounter("(())")).toEqual(0);
      expect(stairCounter("()()")).toEqual(0);
      expect(stairCounter("(((")).toEqual(3);
    });
  });

  describe("part 2", () => {
    it("returns the correct position when basement is reached", () => {
      expect(basementFinder(")")).toBe(1);
      expect(basementFinder("()())")).toBe(5);
    });
  });
});
