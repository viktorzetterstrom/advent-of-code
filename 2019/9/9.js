const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer3");

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./9/input.txt")
    .toString()
    .split(",")
    .map(Number);
  console.log("part 1:", new IntcodeComputer(input).run([1]).out);
  console.log("part 2:", new IntcodeComputer(input).run([2]).out);
}
