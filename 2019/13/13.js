const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer3");

const chunkArray = (arr, len) => {
  const chunks = [];
  let i = 0;
  while (i < arr.length) chunks.push(arr.slice(i, (i += len)));
  return chunks;
};

const countBlockTiles = intcodes => {
  const { out } = new IntcodeComputer(intcodes).run();

  const tiles = chunkArray(out, 3);
  return tiles.filter(([, , tileType]) => tileType === 2).length;
};

const determineInput = (paddleX, ballX) => {
  if (ballX > paddleX) return 1;
  if (ballX < paddleX) return -1;
  return 0;
};

const playGame = intcodes => {
  const insertedQuarterIntcodes = [2, ...intcodes.slice(1)];
  const arcadeComputer = new IntcodeComputer(insertedQuarterIntcodes);

  let input;
  let tiles = [];
  let paddleX;
  let ballX;
  let score;
  while (true) {
    const { out, exit } = arcadeComputer.run(input);
    tiles = chunkArray(out, 3);

    [, , score] = tiles.find(([x, y]) => x === -1 && y === 0) || [
      null,
      null,
      score
    ];
    [paddleX] = tiles.find(([, , code]) => code === 3) || [paddleX];
    [ballX] = tiles.find(([, , code]) => code === 4) || [ballX];
    input = [determineInput(paddleX, ballX)];
    if (exit === 99) break;
  }
  return score;
};

if (process.env.NODE_ENV !== "test") {
  const intcodes = fs
    .readFileSync("./13/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log("part 1: ", countBlockTiles(intcodes));
  console.log("part 2: ", playGame(intcodes));
}
