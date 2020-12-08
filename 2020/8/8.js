const { notDeepEqual } = require("assert");
const fs = require("fs");

const parseIntstruction = (str) => {
  const [_, type, value] = str.match(/^(nop|acc|jmp) ([+-]?\d+)$/);
  return { type, value: Number.parseInt(value) };
};

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/8/${fileName}`, "utf-8")
    .split("\n")
    .map(parseIntstruction);

const part1 = (instructions) => {
  let accumulator = 0;
  let instructionIndex = 0;
  const visitedInstructions = new Set();
  while (instructionIndex < instructions.length) {
    if (visitedInstructions.has(instructionIndex))
      return { exit: "loop", accumulator };

    const { type, value } = instructions[instructionIndex];
    visitedInstructions.add(instructionIndex);
    switch (type) {
      case "acc":
        accumulator += value;
        instructionIndex++;
        break;
      case "jmp":
        instructionIndex += value;
        break;
      case "nop":
      default:
        instructionIndex++;
    }
  }

  return { exit: "boot", accumulator };
};

const switchInstruction = ({ type, value }) => {
  if (type === "jmp") return { type: "nop", value };
  if (type === "nop") return { type: "jmp", value };
  return { type, value };
};

const part2 = (instructions) => {
  for (let i = 0; i < instructions.length; i++) {
    instructions[i] = switchInstruction(instructions[i]);
    const { exit, accumulator } = part1(instructions);
    if (exit === "boot") return accumulator;
    instructions[i] = switchInstruction(instructions[i]);
  }
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const _part1 = part1(input).accumulator;
  const _part2 = part2(input);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  part1,
  part2,
};
