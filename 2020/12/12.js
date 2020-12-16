const fs = require("fs");

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/12/${fileName}`, "utf-8")
    .split("\n")
    .map((row) => ({
      type: row.substring(0, 1),
      amount: Number(row.substring(1)),
    }));

const leftTurn = (from, amount) => {
  const leftTurnMap = { N: "W", W: "S", S: "E", E: "N" };
  const turns = amount / 90;
  return Array.from({ length: turns }).reduce((acc) => leftTurnMap[acc], from);
};
const rightTurn = (from, amount) => {
  const rightTurnMap = { N: "E", E: "S", S: "W", W: "N" };
  const turns = amount / 90;
  return Array.from({ length: turns }).reduce((acc) => rightTurnMap[acc], from);
};

const actions = {
  N: (amount, shipState) => ({ ...shipState, N: shipState.N + amount }),
  S: (amount, shipState) => ({ ...shipState, S: shipState.S + amount }),
  E: (amount, shipState) => ({ ...shipState, E: shipState.E + amount }),
  W: (amount, shipState) => ({ ...shipState, W: shipState.W + amount }),
  L: (amount, shipState) => ({
    ...shipState,
    direction: leftTurn(shipState.direction, amount),
  }),
  R: (amount, shipState) => ({
    ...shipState,
    direction: rightTurn(shipState.direction, amount),
  }),
  F: (amount, shipState) => ({
    ...shipState,
    [shipState.direction]: shipState[shipState.direction] + amount,
  }),
};

const performAction = ({ type, amount }, shipState) =>
  actions[type](amount, shipState);

const startingState = { direction: "E", N: 0, S: 0, E: 0, W: 0 };
const part1 = (input) => {
  const { N, S, E, W } = input.reduce(
    (shipState, action) => performAction(action, shipState),
    startingState
  );
  return Math.abs(N - S) + Math.abs(E - W);
};

const leftTurn2 = ({ x, y }, amount) => {
  if (amount === 90) return { y: x, x: -y };
  if (amount === 180) return { y: -y, x: -x };
  if (amount === 270) return { y: -x, x: y };
};
const rightTurn2 = ({ x, y }, amount) => {
  if (amount === 90) return { y: -x, x: y };
  if (amount === 180) return { y: -y, x: -x };
  if (amount === 270) return { y: x, x: -y };
};

const actions2 = {
  N: (amount, shipState) => ({
    ...shipState,
    waypoint: { ...shipState.waypoint, y: shipState.waypoint.y + amount },
  }),
  S: (amount, shipState) => ({
    ...shipState,
    waypoint: { ...shipState.waypoint, y: shipState.waypoint.y - amount },
  }),
  E: (amount, shipState) => ({
    ...shipState,
    waypoint: { ...shipState.waypoint, x: shipState.waypoint.x + amount },
  }),
  W: (amount, shipState) => ({
    ...shipState,
    waypoint: { ...shipState.waypoint, x: shipState.waypoint.x - amount },
  }),
  L: (amount, shipState) => ({
    ...shipState,
    waypoint: leftTurn2(shipState.waypoint, amount),
  }),
  R: (amount, shipState) => ({
    ...shipState,
    waypoint: rightTurn2(shipState.waypoint, amount),
  }),
  F: (amount, shipState) => ({
    ...shipState,
    x: shipState.x + shipState.waypoint.x * amount,
    y: shipState.y + shipState.waypoint.y * amount,
  }),
};

const performAction2 = ({ type, amount }, shipState) =>
  actions2[type](amount, shipState);

const startingState2 = {
  x: 0,
  y: 0,
  waypoint: { x: 10, y: 1 },
};
const part2 = (input) => {
  const { x, y } = input.reduce(
    (shipState, action) => performAction2(action, shipState),
    startingState2
  );
  return Math.abs(x) + Math.abs(y);
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const _part1 = part1(input);
  const _part2 = part2(input);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  part1,
  part2,
};
