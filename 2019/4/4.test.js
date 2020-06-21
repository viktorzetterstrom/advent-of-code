const {
  hasTwoSameAdjacentDigits,
  hasTwoSameAdjacentDigitsStrict,
  digitsDontDecrease
} = require("./4");

test("hasTwoSameAdjacentDigits", () => {
  expect(hasTwoSameAdjacentDigits(122345)).toBe(true);
  expect(hasTwoSameAdjacentDigits(123456)).toBe(false);
  expect(hasTwoSameAdjacentDigits(1233456)).toBe(true);
  expect(hasTwoSameAdjacentDigits(12344456)).toBe(true);
});

test("hasTwoSameAdjacentDigitsStrict", () => {
  expect(hasTwoSameAdjacentDigitsStrict(112233)).toBe(true);
  expect(hasTwoSameAdjacentDigitsStrict(123444)).toBe(false);
  expect(hasTwoSameAdjacentDigitsStrict(222555)).toBe(false);
  expect(hasTwoSameAdjacentDigitsStrict(111122)).toBe(true);
  expect(hasTwoSameAdjacentDigitsStrict(122345)).toBe(true);
  expect(hasTwoSameAdjacentDigitsStrict(122223345)).toBe(true);
  expect(hasTwoSameAdjacentDigitsStrict(123456)).toBe(false);
  expect(hasTwoSameAdjacentDigitsStrict(1233456)).toBe(true);
  expect(hasTwoSameAdjacentDigitsStrict(12344456)).toBe(false);
});

test("digitsDontDecrease", () => {
  expect(digitsDontDecrease(122345)).toBe(true);
  expect(digitsDontDecrease(123456)).toBe(true);
  expect(digitsDontDecrease(12334564)).toBe(false);
  expect(digitsDontDecrease(121344456)).toBe(false);
});
