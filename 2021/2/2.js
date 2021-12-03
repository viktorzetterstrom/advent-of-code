const fs = require("fs");
const R = require("ramda");

const parseRow = R.compose(
  ([direction, amount]) => [direction, Number(amount)],
  R.split(" ")
);

const parseInput = R.compose(R.map(parseRow), R.split("\n"));
const input = parseInput(
  fs.readFileSync("./2021/2/input.txt", { encoding: "utf-8" })
);

const partOneCalculation = R.reduce(
  (acc, [direction, amount]) => {
    if (direction === "down") return { ...acc, y: acc.y + amount };
    if (direction === "up") return { ...acc, y: acc.y - amount };
    if (direction === "forward") return { ...acc, x: acc.x + amount };
  },
  { x: 0, y: 0 }
);

const part1 = partOneCalculation(input);
console.log(part1.x * part1.y);

const partTwoCalculation = R.reduce(
  (acc, [direction, amount]) => {
    if (direction === "down") return { ...acc, aim: acc.aim + amount };
    if (direction === "up") return { ...acc, aim: acc.aim - amount };
    if (direction === "forward")
      return {
        ...acc,
        x: acc.x + amount,
        y: acc.y + acc.aim * amount,
      };
  },
  { aim: 0, x: 0, y: 0 }
);

const part2 = partTwoCalculation(input);
console.log(part2.x * part2.y);
