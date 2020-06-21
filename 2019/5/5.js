const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer");

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./5/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log("part 1:", new IntcodeComputer(input).run().out.pop());
  console.log("part 2:", new IntcodeComputer(input, 5).run().out.pop());
}
