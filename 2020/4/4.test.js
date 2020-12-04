const {
  loadInput,
  countPassportsWithRequiredKeys,
  countValidPassports,
  validationFunctions,
} = require("./4");

const testInput = loadInput("test-input.txt");
const testInput2 = loadInput("test-input2.txt");

describe("day 4 part 1", () => {
  it("counts the correct amount passports with valid keys", () => {
    expect(countPassportsWithRequiredKeys(testInput)).toBe(2);
  });
});

describe("day 4 part 2", () => {
  it("has working validation functions", () => {
    expect(validationFunctions.byr("2002")).toBe(true);
    expect(validationFunctions.byr("2003")).toBe(false);

    expect(validationFunctions.hgt("60in")).toBe(true);
    expect(validationFunctions.hgt("190cm")).toBe(true);
    expect(validationFunctions.hgt("190in")).toBe(false);
    expect(validationFunctions.hgt("190")).toBe(false);

    expect(validationFunctions.hcl("#123abc")).toBe(true);
    expect(validationFunctions.hcl("#123abz")).toBe(false);
    expect(validationFunctions.hcl("123abc")).toBe(false);

    expect(validationFunctions.ecl("brn")).toBe(true);
    expect(validationFunctions.ecl("wat")).toBe(false);

    expect(validationFunctions.pid("000000001")).toBe(true);
    expect(validationFunctions.pid("0123456789")).toBe(false);
  });
  it("counts the correct amount of valid passports", () => {
    expect(countValidPassports(testInput2)).toBe(4);
  });
});
