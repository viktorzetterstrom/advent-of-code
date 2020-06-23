const { deliverPresents, deliverPresentsDuo } = require("./3");

describe("day 3", () => {
  describe("part 1", () => {
    it("delivers presents according to example cases", () => {
      expect(deliverPresents(">")).toBe(1);
      expect(deliverPresents("^>v<")).toBe(4);
      expect(deliverPresents("^v^v^v^v^v")).toBe(2);
    });
  });
  describe("part 2", () => {
    it("delivers presents according to example cases", () => {
      expect(deliverPresentsDuo("^v")).toBe(3);
      expect(deliverPresentsDuo("^>v<")).toBe(3);
      expect(deliverPresentsDuo("^v^v^v^v^v")).toBe(11);
    });
  });
});
