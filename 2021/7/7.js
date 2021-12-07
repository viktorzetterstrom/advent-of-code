const fs = require("fs");
const R = require("ramda");

const parseInput = R.compose(R.map(Number), R.split(","));
const getInput = (name) => parseInput(fs.readFileSync(name, "utf-8"));

const fuelCostPartOne = (position, destination) =>
  Math.abs(position - destination);

const fuelCostPartTwo = (position, destination) =>
  R.reduce(R.add, 0, R.range(0, Math.abs(position - destination) + 1));

const fuelForDestination = (destination, subs, fuelCostFn) =>
  R.reduce((acc, sub) => acc + fuelCostFn(sub, destination), 0, subs);

const findCheapestDestination = (subs, destinations, fuelCostFn) =>
  R.reduce(
    (acc, destination) =>
      Math.min(fuelForDestination(destination, subs, fuelCostFn), acc),
    Infinity,
    destinations
  );

const input = getInput("./2021/7/input.txt");
// const input = getInput("./2021/7/test-input.txt");
const destinations = R.range(Math.min(...input), Math.max(...input) + 1);

console.log(findCheapestDestination(input, destinations, fuelCostPartOne));
console.log(findCheapestDestination(input, destinations, fuelCostPartTwo));
