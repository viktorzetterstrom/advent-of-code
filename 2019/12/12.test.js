const fs = require("fs");
const { moonSimulation } = require("./12");

describe("day 12 part 1", () => {
  it("works for first testcase", () => {
    const input = fs.readFileSync("./12/testInput0.txt").toString();
    expect(moonSimulation(input, 1).moons).toStrictEqual([
      { x: 2, y: -1, z: 1, dx: 3, dy: -1, dz: -1 },
      { x: 3, y: -7, z: -4, dx: 1, dy: 3, dz: 3 },
      { x: 1, y: -7, z: 5, dx: -3, dy: 1, dz: -3 },
      { x: 2, y: 2, z: 0, dx: -1, dy: -3, dz: 1 }
    ]);
    expect(moonSimulation(input, 2).moons).toStrictEqual([
      { x: 5, y: -3, z: -1, dx: 3, dy: -2, dz: -2 },
      { x: 1, y: -2, z: 2, dx: -2, dy: 5, dz: 6 },
      { x: 1, y: -4, z: -1, dx: 0, dy: 3, dz: -6 },
      { x: 1, y: -4, z: 2, dx: -1, dy: -6, dz: 2 }
    ]);
    expect(moonSimulation(input, 3).moons).toStrictEqual([
      { x: 5, y: -6, z: -1, dx: 0, dy: -3, dz: 0 },
      { x: 0, y: 0, z: 6, dx: -1, dy: 2, dz: 4 },
      { x: 2, y: 1, z: -5, dx: 1, dy: 5, dz: -4 },
      { x: 1, y: -8, z: 2, dx: 0, dy: -4, dz: 0 }
    ]);
    expect(moonSimulation(input, 10)).toStrictEqual({
      energy: 179,
      moons: [
        { x: 2, y: 1, z: -3, dx: -3, dy: -2, dz: 1 },
        { x: 1, y: -8, z: 0, dx: -1, dy: 1, dz: 3 },
        { x: 3, y: -6, z: 1, dx: 3, dy: 2, dz: -3 },
        { x: 2, y: 0, z: 4, dx: 1, dy: -1, dz: -1 }
      ]
    });
  });

  it("works for second test case", () => {
    const input = fs.readFileSync("./12/testInput1.txt").toString();
    expect(moonSimulation(input, 100)).toStrictEqual({
      energy: 1940,
      moons: [
        { x: 8, y: -12, z: -9, dx: -7, dy: 3, dz: 0 },
        { x: 13, y: 16, z: -3, dx: 3, dy: -11, dz: -5 },
        { x: -29, y: -11, z: -1, dx: -3, dy: 7, dz: 4 },
        { x: 16, y: -13, z: 23, dx: 7, dy: 1, dz: 1 }
      ]
    });
  });
});
