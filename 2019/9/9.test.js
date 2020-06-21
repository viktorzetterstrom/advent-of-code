const IntcodeComputer = require("./IntcodeComputer3");

describe("day 9 part 1", () => {
  it("works for provided testcases", () => {
    const quineTest = [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99
    ];
    expect(new IntcodeComputer(quineTest).run().out).toStrictEqual(quineTest);

    const sixteenDigitTest = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
    expect(
      new IntcodeComputer(sixteenDigitTest).run().out[0].toString().length
    ).toBe(16);

    const largeNumberTest = [104, 1125899906842624, 99];
    expect(new IntcodeComputer(largeNumberTest).run().out[0]).toBe(
      1125899906842624
    );
  });
});
