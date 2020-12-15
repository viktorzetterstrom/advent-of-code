const fs = require("fs");

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/11/${fileName}`, "utf-8")
    .split("\n")
    .map((row) => row.split(""));

const EMPTY = "L";
const OCCUPIED = "#";

const equalSeats = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const progressSeats = (seats) => {
  const newSeats = JSON.parse(JSON.stringify(seats));
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      if (seats[i][j] === EMPTY) {
        if (
          seats?.[i - 1]?.[j - 1] !== OCCUPIED &&
          seats?.[i - 1]?.[j] !== OCCUPIED &&
          seats?.[i - 1]?.[j + 1] !== OCCUPIED &&
          seats[i]?.[j - 1] !== OCCUPIED &&
          seats[i]?.[j + 1] !== OCCUPIED &&
          seats?.[i + 1]?.[j - 1] !== OCCUPIED &&
          seats?.[i + 1]?.[j] !== OCCUPIED &&
          seats?.[i + 1]?.[j + 1] !== OCCUPIED
        ) {
          newSeats[i][j] = OCCUPIED;
        }
      }
      if (seats[i][j] === OCCUPIED) {
        let occupiedAdjacentSeats = 0;
        if (seats?.[i - 1]?.[j - 1] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats?.[i - 1]?.[j] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats?.[i - 1]?.[j + 1] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats[i]?.[j - 1] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats[i]?.[j + 1] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats?.[i + 1]?.[j - 1] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats?.[i + 1]?.[j] === OCCUPIED) occupiedAdjacentSeats++;
        if (seats?.[i + 1]?.[j + 1] === OCCUPIED) occupiedAdjacentSeats++;

        if (occupiedAdjacentSeats >= 4) {
          newSeats[i][j] = EMPTY;
        }
      }
    }
  }
  return newSeats;
};

const countOccupied = (seats) =>
  (seats.join("\n").match(new RegExp(OCCUPIED, "g")) || []).length;

const part1 = (seats) => {
  let oldSeats = seats;
  while (true) {
    newSeats = progressSeats(oldSeats);
    if (equalSeats(newSeats, oldSeats)) {
      return countOccupied(newSeats);
    }
    oldSeats = newSeats;
  }
};

const findSeat = (seats, i, j, [di, dj]) => {
  while (seats?.[i]?.[j]) {
    i += di;
    j += dj;
    const seat = seats?.[i]?.[j];
    if (seat === OCCUPIED) return 1;
    if (seat === EMPTY) return 0;
  }
  return 0;
};

const progressSeats2 = (seats) => {
  const newSeats = JSON.parse(JSON.stringify(seats));
  const deltas = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      const occupiedSeats = deltas.reduce(
        (sum, delta) => sum + findSeat(seats, i, j, delta),
        0
      );
      if (seats[i][j] === EMPTY && occupiedSeats === 0) {
        newSeats[i][j] = OCCUPIED;
      }
      if (seats[i][j] === OCCUPIED && occupiedSeats >= 5) {
        newSeats[i][j] = EMPTY;
      }
    }
  }
  return newSeats;
};

const part2 = (seats) => {
  let oldSeats = seats;
  while (true) {
    newSeats = progressSeats2(oldSeats);
    if (equalSeats(newSeats, oldSeats)) {
      return countOccupied(newSeats);
    }
    oldSeats = newSeats;
  }
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
