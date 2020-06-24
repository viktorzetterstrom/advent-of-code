const {
  containsThreeVowels,
  containsTwiceInRow,
  containsForbidden,
  isNiceStringPart1,
  containsPairsWithoutOverlap,
  containsRepeatingLetterWithGap,
} = require("./5");

describe("day 5", () => {
  describe("part 1", () => {
    it("can identify strings containing at least three vowels (aeiou)", () => {
      expect(containsThreeVowels("aei")).toEqual(true);
      expect(containsThreeVowels("xazegov")).toEqual(true);
      expect(containsThreeVowels("aeiouaeiouaeiou")).toEqual(true);
      expect(containsThreeVowels("aik")).toEqual(false);
    });
    it("can identify strings that contain the same letter two times in a row", () => {
      expect(containsTwiceInRow("aei")).toEqual(false);
      expect(containsTwiceInRow("xx")).toEqual(true);
      expect(containsTwiceInRow("abcdde")).toEqual(true);
      expect(containsTwiceInRow("aabbccdd")).toEqual(true);
    });
    it("can identify strings that ab, cd, pq, or xy", () => {
      expect(containsForbidden("aei")).toEqual(false);
      expect(containsForbidden("abi")).toEqual(true);
      expect(containsForbidden("acd")).toEqual(true);
      expect(containsForbidden("asfsafapq")).toEqual(true);
      expect(containsForbidden("asfsaxya")).toEqual(true);
    });
    it("identifies nice strings", () => {
      expect(isNiceStringPart1("aaa")).toEqual(true);
      expect(isNiceStringPart1("jchzalrnumimnmhp")).toEqual(false);
      expect(isNiceStringPart1("haegwjzuvuyypxyu")).toEqual(false);
      expect(isNiceStringPart1("dvszwmarrgswjxmb")).toEqual(false);
    });
  });
  describe("part 2", () => {
    it("can identify strings with two letter pairs that don't overlap", () => {
      expect(containsPairsWithoutOverlap("xyxy")).toEqual(true);
      expect(containsPairsWithoutOverlap("aabcdefgaa")).toEqual(true);
      expect(containsPairsWithoutOverlap("aaa")).toEqual(false);
    });
    it("can identify repeating letters with one letter gap, for example xyx", () => {
      expect(containsRepeatingLetterWithGap("xyx")).toEqual(true);
      expect(containsRepeatingLetterWithGap("xyyx")).toEqual(false);
      expect(containsRepeatingLetterWithGap("abcdefeghi")).toEqual(true);
      expect(containsRepeatingLetterWithGap("aaa")).toEqual(true);
    });
  });
});
