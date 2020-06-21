const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer3");

const determineNewOrientation = (orientation, turn) => {
  switch (orientation) {
    case "up":
      return turn === 1 ? "left" : "right";
    case "down":
      return turn === 1 ? "right" : "left";
    case "left":
      return turn === 1 ? "down" : "up";
    case "right":
      return turn === 1 ? "up" : "down";
    default:
      throw new Error(`Bad orientation - ${orientation}`);
  }
};

const paintShipHull = (intcodes, startOnWhite = false) => {
  const robotComputer = new IntcodeComputer(intcodes);
  const shipHull = Array.from(Array(150), () => new Array(150).fill(0));
  let x = 75;
  let y = 75;
  if (startOnWhite) shipHull[y][x] = 1;

  const paintedTiles = new Set();
  let orientation = "up";
  let output = { exit: null };
  while (output.exit !== 99) {
    const color = shipHull[y][x];
    output = robotComputer.run([color]);
    const [newColor, turn] = output.out;
    shipHull[y][x] = newColor;
    paintedTiles.add(`${x}|${y}`);

    orientation = determineNewOrientation(orientation, turn);
    switch (orientation) {
      case "up":
        y--;
        break;
      case "down":
        y++;
        break;
      case "left":
        x++;
        break;
      case "right":
        x--;
        break;
      default:
        throw new Error(`Bad orientation - ${orientation}`);
    }
  }
  return { paintedTiles, shipHull };
};

const countPaintedTiles = intcodes => paintShipHull(intcodes).paintedTiles.size;

const saveHullPaintJob = intcodes => {
  const hull = paintShipHull(intcodes, true)
    .shipHull.map(row =>
      row.map(tile => (tile === 1 ? "⬜️" : "⬛️")).join(" ")
    )
    .join("\n");
  fs.writeFileSync("./11/hull.txt", hull);
};

if (process.env.NODE_ENV !== "test") {
  const intcodes = fs
    .readFileSync("./11/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log("part 1:", countPaintedTiles(intcodes));
  saveHullPaintJob(intcodes);
  console.log("part 2 saved to file hull.txt");
}
