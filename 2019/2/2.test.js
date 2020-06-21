const { processIntcodes } = require("./2");

test("the opcode program works for example cases", () => {
  expect(processIntcodes([1, 0, 0, 0, 99])).toStrictEqual([2, 0, 0, 0, 99]);
  expect(processIntcodes([2, 3, 0, 3, 99])).toStrictEqual([2, 3, 0, 6, 99]);
  expect(processIntcodes([2, 4, 4, 5, 99, 0])).toStrictEqual([
    2,
    4,
    4,
    5,
    99,
    9801
  ]);
  expect(processIntcodes([1, 1, 1, 4, 99, 5, 6, 0, 99])).toStrictEqual([
    30,
    1,
    1,
    4,
    2,
    5,
    6,
    0,
    99
  ]);
});
