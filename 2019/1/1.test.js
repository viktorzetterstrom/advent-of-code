const { fuelRequired, fuelRequiredWithFuel } = require("./1");

describe("day 1", () => {
  test("fuelRequired calculates fuel for supplied test cases", () => {
    expect(fuelRequired(12)).toBe(2);
    expect(fuelRequired(14)).toBe(2);
    expect(fuelRequired(1969)).toBe(654);
    expect(fuelRequired(100756)).toBe(33583);
  });

  test("fuelRequiredWithFuel calculates fuel for supplied test cases", () => {
    expect(fuelRequiredWithFuel(14)).toBe(2);
    expect(fuelRequiredWithFuel(1969)).toBe(966);
    expect(fuelRequiredWithFuel(100756)).toBe(50346);
  });
});
