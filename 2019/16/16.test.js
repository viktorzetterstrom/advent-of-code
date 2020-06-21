const { applyFft, applyFftReal, applyPhase } = require("./16");

// describe('day 16 part 1', () => {
//   it('has a working applyPhase function', () => {
//     expect(applyPhase('12345678', 1)).toBe('48226158');
//     expect(applyPhase('12345678', 2)).toBe('34040438');
//     expect(applyPhase('12345678', 3)).toBe('03415518');
//     expect(applyPhase('12345678', 4)).toBe('01029498');
//   });
//   it('works for first testcase', () => {
//     expect(applyFft('80871224585914546619083218645595')).toBe('24176176');
//   });
//   it('works for second testcase', () => {
//     expect(applyFft('19617804207202209144916044189917')).toBe('73745418');
//   });
//   it('works for third testcase', () => {
//     expect(applyFft('69317163492948606335995924319873')).toBe('52432133');
//   });
// });

describe("day 16 part 2", () => {
  it("works for first testcase", () => {
    // expect(applyFftReal('80871224585914546619083218645595')).toBe('84462026');
    console.log(applyFftReal("1111111111"));
  });
  // it('works for second testcase', () => {
  //   expect(applyFftReal('19617804207202209144916044189917')).toBe('78725270');
  // });
  // it('works for third testcase', () => {
  //   expect(applyFftReal('69317163492948606335995924319873')).toBe('53553731');
  // });
});
