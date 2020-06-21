const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer4");

const calculateCloseToBeam = intcodes => {
  let count = 0;
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      const { out } = new IntcodeComputer(intcodes).run([x, y]);
      count += Number(out);
    }
  }
  return count;
};

const calculateShipFit = intcodes => {
  let startX = 4;
  let x = 4;
  let y = 4;
  for (let i = 0; i < 10; i++) {
    const out = new IntcodeComputer(intcodes).run([x, y]).out.pop();
    console.log({
      startX,
      x,
      y,
      out
    });
    if (out === 1 && startX === null) startX = x;
    else if (startX !== null) {
      startX = null;
      y++;
    } else {
      x++;
    }
  }
};

if (process.env.NODE_ENV !== "test") {
  const intcodes = fs
    .readFileSync("19/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log("part 1:", calculateCloseToBeam(intcodes));
  console.log("part 2:", calculateShipFit(intcodes));
}
