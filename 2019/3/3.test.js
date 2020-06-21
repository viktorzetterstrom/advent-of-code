const {
  closestIntersectionDistance,
  closestIntersectionSteps
} = require("./3");

test("closestIntersectionDistance is calculated properly", () => {
  const input1 = {
    wire1: ["R8", "U5", "L5", "D3"],
    wire2: ["U7", "R6", "D4", "L4"]
  };
  expect(closestIntersectionDistance(input1)).toBe(6);

  const input2 = {
    wire1: ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
    wire2: ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
  };
  expect(closestIntersectionDistance(input2)).toBe(159);

  const input3 = {
    wire1: [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ],
    wire2: ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
  };
  expect(closestIntersectionDistance(input3)).toBe(135);
});

test("closestIntersectionSteps is calculated properly", () => {
  const input1 = {
    wire1: ["R8", "U5", "L5", "D3"],
    wire2: ["U7", "R6", "D4", "L4"]
  };
  expect(closestIntersectionSteps(input1)).toBe(30);

  const input2 = {
    wire1: ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
    wire2: ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
  };
  expect(closestIntersectionSteps(input2)).toBe(610);

  const input3 = {
    wire1: [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ],
    wire2: ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
  };
  expect(closestIntersectionSteps(input3)).toBe(410);
});
