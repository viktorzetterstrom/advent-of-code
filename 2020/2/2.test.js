const { isValidPassword, isValidPassword2, countPasswords } = require("./2");

const testRow1 = "1-3 a: abcde";
const testRow2 = "2-9 c: ccccccccc";
const testRow3 = "1-3 b: cdefg";
const testRow4 = "10-15 w: wgfwwcwtmwwgwpwwh";

const testInput = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

describe("day 2 part 1", () => {
  it("determines if a password is valid", () => {
    expect(isValidPassword(testRow1)).toEqual(true);
    expect(isValidPassword(testRow2)).toEqual(true);
    expect(isValidPassword(testRow3)).toEqual(false);
    expect(isValidPassword(testRow4)).toEqual(false);
  });
  it("counts the correct amount of valid passwords", () => {
    expect(countPasswords(testInput, isValidPassword)).toBe(2);
  });
});

describe("day 2 part 2", () => {
  it("determines if a password is valid", () => {
    expect(isValidPassword2(testRow1)).toEqual(true);
    expect(isValidPassword2(testRow2)).toEqual(false);
    expect(isValidPassword2(testRow3)).toEqual(false);
  });
  it("counts the correct amount of valid passwords", () => {
    expect(countPasswords(testInput, isValidPassword2)).toBe(1);
  });
});
describe("day 1 part 2", () => {});
