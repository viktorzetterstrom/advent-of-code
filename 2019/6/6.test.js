const { countOrbits, orbitsToSanta } = require("./6");

test("works for supplied testcase part 1", () => {
  const input = [
    ["COM", "B"],
    ["B", "C"],
    ["C", "D"],
    ["D", "E"],
    ["E", "F"],
    ["B", "G"],
    ["G", "H"],
    ["D", "I"],
    ["E", "J"],
    ["J", "K"],
    ["K", "L"]
  ].map(([key, value]) => ({ parent: key, name: value }));

  expect(countOrbits(input)).toBe(42);
});

test("works for supplied testcase part 2", () => {
  const input = [
    ["COM", "B"],
    ["B", "C"],
    ["C", "D"],
    ["D", "E"],
    ["E", "F"],
    ["B", "G"],
    ["G", "H"],
    ["D", "I"],
    ["E", "J"],
    ["J", "K"],
    ["K", "L"],
    ["K", "YOU"],
    ["I", "SAN"]
  ].map(([key, value]) => ({ parent: key, name: value }));

  expect(orbitsToSanta(input)).toBe(4);
});
