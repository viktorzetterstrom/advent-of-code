const { calcPaper, calcRibbon } = require("./2");

describe("day 2", () => {
  describe("part 1", () => {
    it("calcs the area correctly", () => {
      expect(calcPaper(2, 3, 4)).toEqual(58);
      expect(calcPaper(1, 1, 10)).toEqual(43);
    });
  });
  describe("part 2", () => {
    it("calcs ribbon needed correctly", () => {
      expect(calcRibbon(2, 3, 4)).toEqual(34);
      expect(calcRibbon(1, 1, 10)).toEqual(14);
      expect(calcRibbon(8, 23, 6)).toEqual(1132);
      expect(calcRibbon(25, 2, 25)).toEqual(1304);
    });
  });
});
