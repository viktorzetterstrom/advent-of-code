const { maxThrusterSignal, maxThrusterSignalWithLoop } = require("./7");
const IntcodeComputer = require("./IntcodeComputer2");

test("works for part 1 testcase in description", () => {
  expect(new IntcodeComputer([3, 0, 4, 0, 99]).run([1]).out).toStrictEqual([1]);
});

test("works for part 2 testcases in description", () => {
  const equalToEightpositionMode = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
  expect(
    new IntcodeComputer(equalToEightpositionMode).run([8]).out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(equalToEightpositionMode).run([7]).out
  ).toStrictEqual([0]);

  const lessThanEightPositionMode = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
  expect(
    new IntcodeComputer(lessThanEightPositionMode).run([7]).out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(lessThanEightPositionMode).run([8]).out
  ).toStrictEqual([0]);

  const equalToEightImmediateMode = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
  expect(
    new IntcodeComputer(equalToEightImmediateMode).run([8]).out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(equalToEightImmediateMode).run([7]).out
  ).toStrictEqual([0]);

  const lessThanEightImmediateMode = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
  expect(
    new IntcodeComputer(lessThanEightImmediateMode).run([7]).out
  ).toStrictEqual([1]);
  expect(
    new IntcodeComputer(lessThanEightImmediateMode).run([8]).out
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
  expect(new IntcodeComputer(isZeroPositionMode).run([0]).out).toStrictEqual([
    0
  ]);
  expect(new IntcodeComputer(isZeroPositionMode).run([5]).out).toStrictEqual([
    1
  ]);

  const isZeroImmediateMode = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
  expect(new IntcodeComputer(isZeroImmediateMode).run([0]).out).toStrictEqual([
    0
  ]);
  expect(new IntcodeComputer(isZeroImmediateMode).run([3]).out).toStrictEqual([
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
  expect(new IntcodeComputer(bigTest).run([7]).out).toStrictEqual([999]);
  expect(new IntcodeComputer(bigTest).run([8]).out).toStrictEqual([1000]);
  expect(new IntcodeComputer(bigTest).run([9]).out).toStrictEqual([1001]);
});

test("works for part 1 testcases", () => {
  expect(
    maxThrusterSignal([
      3,
      15,
      3,
      16,
      1002,
      16,
      10,
      16,
      1,
      16,
      15,
      15,
      4,
      15,
      99,
      0,
      0
    ])
  ).toStrictEqual(43210);
  expect(
    maxThrusterSignal([
      3,
      23,
      3,
      24,
      1002,
      24,
      10,
      24,
      1002,
      23,
      -1,
      23,
      101,
      5,
      23,
      23,
      1,
      24,
      23,
      23,
      4,
      23,
      99,
      0,
      0
    ])
  ).toStrictEqual(54321);
  expect(
    maxThrusterSignal([
      3,
      31,
      3,
      32,
      1002,
      32,
      10,
      32,
      1001,
      31,
      -2,
      31,
      1007,
      31,
      0,
      33,
      1002,
      33,
      7,
      33,
      1,
      33,
      31,
      31,
      1,
      32,
      31,
      31,
      4,
      31,
      99,
      0,
      0,
      0
    ])
  ).toStrictEqual(65210);
});

test("works for part 2 testcases", () => {
  expect(
    maxThrusterSignalWithLoop([
      3,
      26,
      1001,
      26,
      -4,
      26,
      3,
      27,
      1002,
      27,
      2,
      27,
      1,
      27,
      26,
      27,
      4,
      27,
      1001,
      28,
      -1,
      28,
      1005,
      28,
      6,
      99,
      0,
      0,
      5
    ])
  ).toStrictEqual(139629729);
  expect(
    maxThrusterSignalWithLoop([
      3,
      52,
      1001,
      52,
      -5,
      52,
      3,
      53,
      1,
      52,
      56,
      54,
      1007,
      54,
      5,
      55,
      1005,
      55,
      26,
      1001,
      54,
      -5,
      54,
      1105,
      1,
      12,
      1,
      53,
      54,
      53,
      1008,
      54,
      0,
      55,
      1001,
      55,
      1,
      55,
      2,
      53,
      55,
      53,
      4,
      53,
      1001,
      56,
      -1,
      56,
      1005,
      56,
      6,
      99,
      0,
      0,
      0,
      0,
      10
    ])
  ).toStrictEqual(18216);
});
