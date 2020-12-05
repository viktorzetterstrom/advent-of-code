const fs = require("fs");

const parseSeatStringToBin = (seatString) =>
  seatString.replace(/[FL]/g, "0").replace(/[BR]/g, "1");

const parseRow = (seatBin) => Number.parseInt(seatBin.substring(0, 7), 2);
const parseCol = (seatBin) => Number.parseInt(seatBin.substring(7), 2);

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/5/${fileName}`, "utf-8")
    .split("\n")
    .map(parseSeatStringToBin)
    .map((seatBin) => ({
      row: parseRow(seatBin),
      col: parseCol(seatBin),
    }));

const calculateSeatId = ({ row, col }) => row * 8 + col;

const findHighestSeatId = (seats) => Math.max(...seats.map(calculateSeatId));

const findMySeat = (seats) => {
  const sortedSeats = seats.map(calculateSeatId).sort((a, b) => a - b);
  const first = sortedSeats[0];
  const last = sortedSeats[sortedSeats.length - 1];
  const actualSum = sortedSeats.reduce((a, b) => a + b, 0);
  const calculatedSum = (last * (last + 1) - first * (first - 1)) / 2;

  return calculatedSum - actualSum;
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const part1 = findHighestSeatId(input);
  const part2 = findMySeat(input);

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

module.exports = {
  loadInput,
  calculateSeatId,
  findHighestSeatId,
};
