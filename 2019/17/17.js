const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer4");

const MAP_VALUES = Object.freeze({
  35: "#",
  46: "."
});

const createMap = ({ out }) => {
  const map = [[]];
  out.forEach(val => {
    if (val === 10) map.push([]);
    else map[map.length - 1].push(MAP_VALUES[val]);
  });
  return map;
};

const calculateIntersections = scaffoldingMap => {
  let intersectionScore = 0;
  for (let y = 1; y < scaffoldingMap.length - 1; y++) {
    for (let x = 1; x < scaffoldingMap[0].length - 1; x++) {
      if (
        scaffoldingMap[y][x] === "#" &&
        scaffoldingMap[y - 1][x] === "#" &&
        scaffoldingMap[y + 1][x] === "#" &&
        scaffoldingMap[y][x - 1] === "#" &&
        scaffoldingMap[y][x + 1] === "#"
      ) {
        intersectionScore += x * y;
      }
    }
  }
  return intersectionScore;
};

if (process.env.NODE_ENV !== "test") {
  const intcodes = fs
    .readFileSync("17/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log(
    "part 1:",
    calculateIntersections(createMap(new IntcodeComputer(intcodes).run()))
  );
}

module.exports = {
  calculateIntersections
};
