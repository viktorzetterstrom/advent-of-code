const { createHashValidator } = require("./4");

describe("day 4", () => {
  describe("part 1", () => {
    it("validates hashes with at least 5 leading zeros correctly", () => {
      const isValidHash = createHashValidator(5);
      expect(isValidHash("000001dbbfa")).toBe(true);
      expect(isValidHash("00000001dbbfa")).toBe(true);
      expect(isValidHash("010001dbbfa")).toBe(false);
      expect(isValidHash("000006136ef")).toBe(true);
    });
  });
  describe("part 2", () => {
    it("validates hashes with at least 6 leading zeros correctly", () => {
      const isValidHash = createHashValidator(6);
      expect(isValidHash("000001dbbfa")).toBe(false);
      expect(isValidHash("00000001dbbfa")).toBe(true);
      expect(isValidHash("010001dbbfa")).toBe(false);
      expect(isValidHash("000006136ef")).toBe(false);
    });
  });
});
