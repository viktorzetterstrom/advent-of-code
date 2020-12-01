const fs = require("fs");

const part1 = (data) => {
  for (let i = 0; i < data.length; i++) {
    const a = data[i];
    for (let j = 0; j < data.length; j++) {
      const b = data[j];
      if (a + b === 2020) return a * b;
    }
  }
  throw new Error("No result found");
};

const part2 = (data) => {
  for (let i = 0; i < data.length; i++) {
    const a = data[i];
    for (let j = 0; j < data.length; j++) {
      const b = data[j];
      if (a + b >= 2020) continue;
      for (let k = 0; k < data.length; k++) {
        const c = data[k];
        if (a + b + c === 2020) return a * b * c;
      }
    }
  }
  throw new Error("No result found");
};

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./2020/1/input.txt")
    .toString()
    .split("\n")
    .map(Number);

  const resultPart1 = part1(input);
  const resultPart2 = part2(input);
  console.log("Part 1:", resultPart1);
  console.log("Part 2:", resultPart2);
}

module.exports = {
  part1,
  part2,
};
