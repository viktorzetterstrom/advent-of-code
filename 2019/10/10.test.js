const fs = require("fs");
const { findBestMiningLocation, asteroidVaporization } = require("./10");

describe("day 10 part 1", () => {
  it("works for zeroth testcase", () => {
    const input = fs.readFileSync("./10/testInput0.txt").toString();
    expect(findBestMiningLocation(input)).toStrictEqual({
      location: [3, 4],
      asteroids: 8
    });
  });
  it("works for first testcase", () => {
    const input = fs.readFileSync("./10/testInput1.txt").toString();
    expect(findBestMiningLocation(input)).toStrictEqual({
      location: [5, 8],
      asteroids: 33
    });
  });
  it("works for second testcase", () => {
    const input = fs.readFileSync("./10/testInput2.txt").toString();
    expect(findBestMiningLocation(input)).toStrictEqual({
      location: [1, 2],
      asteroids: 35
    });
  });
  it("works for third testcase", () => {
    const input = fs.readFileSync("./10/testInput3.txt").toString();
    expect(findBestMiningLocation(input)).toStrictEqual({
      location: [6, 3],
      asteroids: 41
    });
  });
  it("works for fourth testcase", () => {
    const input = fs.readFileSync("./10/testInput4.txt").toString();
    expect(findBestMiningLocation(input)).toStrictEqual({
      location: [11, 13],
      asteroids: 210
    });
  });
});

describe("day 10 part 2", () => {
  it("works for large testcase", () => {
    const input = fs.readFileSync("./10/testInput4.txt").toString();
    expect(asteroidVaporization(input, 11, 13)).toStrictEqual([8, 2]);
  });
});
