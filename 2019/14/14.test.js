const fs = require("fs");
const {
  createChemicalMap,
  calculateOreForFuel,
  calculateFuelForOre
} = require("./14");

describe("day 14 part 1", () => {
  it("works for first testcase", () => {
    const chemicalMap0 = createChemicalMap(
      fs.readFileSync("./14/testInput0.txt").toString()
    );
    expect(calculateOreForFuel(chemicalMap0)).toBe(165);
  });
  it("works for second testcase", () => {
    const chemicalMap1 = createChemicalMap(
      fs.readFileSync("./14/testInput1.txt").toString()
    );
    expect(calculateOreForFuel(chemicalMap1)).toBe(13312);
  });
  it("works for third testcase", () => {
    const chemicalMap2 = createChemicalMap(
      fs.readFileSync("./14/testInput2.txt").toString()
    );
    expect(calculateOreForFuel(chemicalMap2)).toBe(180697);
  });
  it("works for fourth testcase", () => {
    const chemicalMap3 = createChemicalMap(
      fs.readFileSync("./14/testInput3.txt").toString()
    );
    expect(calculateOreForFuel(chemicalMap3)).toBe(2210736);
  });
});

// describe('day 14 part 2', () => {
//   it.only('works for first testcase', () => {
//     const chemicalMap0 = createChemicalMap(fs.readFileSync('./14/testInput0.txt').toString());
//     expect(calculateFuelForOre(chemicalMap0)).toBe(82892753);
//   });
//   it('works for second testcase', () => {
//     const chemicalMap1 = createChemicalMap(fs.readFileSync('./14/testInput1.txt').toString());
//     expect(calculateFuelForOre(chemicalMap1)).toBe(5586022);
//   });
//   it('works for third testcase', () => {
//     const chemicalMap2 = createChemicalMap(fs.readFileSync('./14/testInput2.txt').toString());
//     expect(calculateFuelForOre(chemicalMap2)).toBe(460664);
//   });
// });
