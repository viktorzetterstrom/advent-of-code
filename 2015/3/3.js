const { readFile } = require("fs").promises;
const R = require("ramda");
const { constants } = require("buffer");

const directions = {
  ">": { x: 1, y: 0 },
  "<": { x: -1, y: 0 },
  "^": { x: 0, y: 1 },
  v: { x: 0, y: -1 },
};

const deliverPresents = (path) => {
  const visitedHouses = new Set();
  const currentPosition = { x: 0, y: 0 };

  R.split("", path).forEach((direction) => {
    visitedHouses.add(JSON.stringify(currentPosition));
    currentPosition.x += directions[direction].x;
    currentPosition.y += directions[direction].y;
  });

  return visitedHouses.size;
};

const deliverPresentsDuo = (path) => {
  const currentPositionSanta = { x: 0, y: 0 };
  const currentPositionRobot = { x: 0, y: 0 };
  const visitedHousesSanta = new Set([JSON.stringify(currentPositionSanta)]);
  const visitedHousesRobot = new Set([JSON.stringify(currentPositionRobot)]);

  R.split("", path).forEach((direction, i) => {
    if (i % 2 === 0) {
      currentPositionSanta.x += directions[direction].x;
      currentPositionSanta.y += directions[direction].y;
      visitedHousesSanta.add(JSON.stringify(currentPositionSanta));
    } else {
      currentPositionRobot.x += directions[direction].x;
      currentPositionRobot.y += directions[direction].y;
      visitedHousesRobot.add(JSON.stringify(currentPositionRobot));
    }
  });

  return new Set([...visitedHousesSanta, ...visitedHousesRobot]).size;
};

const run = async () => {
  const input = await readFile("./input.txt", { encoding: "utf-8" });

  const part1 = deliverPresents(input);
  const part2 = deliverPresentsDuo(input);
  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
};
if (process.env.NODE_ENV !== "test") {
  run();
}

module.exports = { deliverPresents, deliverPresentsDuo };
