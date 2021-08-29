const { readFileSync } = require("fs");

const input = readFileSync("2018/1/input.txt", { encoding: "utf-8" }).split(
  "\n"
);

const part1 = (input) =>
  input.reduce((acc, curr) => acc + Number.parseInt(curr), 0);

const part2 = (input) => {
  let i = 0;
  let current = 0;
  const seen = new Set([current]);
  while (true) {
    current = current + Number.parseInt(input[i % input.length]);
    if (seen.has(current)) return current;
    seen.add(current);
    i++;
  }
};

console.log("part1:", part1(input));
console.log("part2:", part2(input));
