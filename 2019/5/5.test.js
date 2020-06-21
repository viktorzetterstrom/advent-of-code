const IntcodeComputer = require("./IntcodeComputer");

test("works for day 2 testcases", () => {
  expect(new IntcodeComputer([1, 0, 0, 0, 99]).run().codes).toStrictEqual([
    2,
    0,
    0,
    0,
    99
  ]);
  expect(new IntcodeComputer([2, 3, 0, 3, 99]).run().codes).toStrictEqual([
    2,
    3,
    0,
    6,
    99
  ]);
  expect(new IntcodeComputer([2, 4, 4, 5, 99, 0]).run().codes).toStrictEqual([
    2,
    4,
    4,
    5,
    99,
    9801
  ]);
  expect(
    new IntcodeComputer([1, 1, 1, 4, 99, 5, 6, 0, 99]).run().codes
  ).toStrictEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
});

test("works for part 1 testcase in description", () => {
  expect(new IntcodeComputer([3, 0, 4, 0, 99]).run().out).toStrictEqual([1]);
});

test("works for part 2 testcases in description", () => {
  const equalToEightpositionMode = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
  expect(
    new IntcodeComputer(equalToEightpositionMode, 8).run().out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(equalToEightpositionMode, 7).run().out
  ).toStrictEqual([0]);

  const lessThanEightPositionMode = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
  expect(
    new IntcodeComputer(lessThanEightPositionMode, 7).run().out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(lessThanEightPositionMode, 8).run().out
  ).toStrictEqual([0]);

  const equalToEightImmediateMode = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
  expect(
    new IntcodeComputer(equalToEightImmediateMode, 8).run().out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(equalToEightImmediateMode, 7).run().out
  ).toStrictEqual([0]);

  const lessThanEightImmediateMode = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
  expect(
    new IntcodeComputer(lessThanEightImmediateMode, 7).run().out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(lessThanEightImmediateMode, 8).run().out
  ).toStrictEqual([0]);

  const isZeroPositionMode = [
    3,
    12,
    6,
    12,
    15,
    1,
    13,
    14,
    13,
    4,
    13,
    99,
    -1,
    0,
    1,
    9
  ];
  expect(new IntcodeComputer(isZeroPositionMode, 0).run().out).toStrictEqual([
    0
  ]);
  expect(new IntcodeComputer(isZeroPositionMode, 5).run().out).toStrictEqual([
    1
  ]);

  const isZeroImmediateMode = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
  expect(new IntcodeComputer(isZeroImmediateMode, 0).run().out).toStrictEqual([
    0
  ]);
  expect(new IntcodeComputer(isZeroImmediateMode, 3).run().out).toStrictEqual([
    1
  ]);
});

test("works for longer part 2 testcase", () => {
  const bigTest = [
    3,
    21,
    1008,
    21,
    8,
    20,
    1005,
    20,
    22,
    107,
    8,
    21,
    20,
    1006,
    20,
    31,
    1106,
    0,
    36,
    98,
    0,
    0,
    1002,
    21,
    125,
    20,
    4,
    20,
    1105,
    1,
    46,
    104,
    999,
    1105,
    1,
    46,
    1101,
    1000,
    1,
    20,
    4,
    20,
    1105,
    1,
    46,
    98,
    99
  ];
  expect(new IntcodeComputer(bigTest, 7).run().out).toStrictEqual([999]);
  expect(new IntcodeComputer(bigTest, 8).run().out).toStrictEqual([1000]);
  expect(new IntcodeComputer(bigTest, 9).run().out).toStrictEqual([1001]);
});
