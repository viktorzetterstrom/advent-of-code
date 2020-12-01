const fs = require("fs");

const part1 = (numArr) => {
  for (let i = 0; i < numArr.length; i++) {
    const a = numArr[i];
    for (let j = 0; j < numArr.length; j++) {
      const b = numArr[j];
      if (a + b === 2020) return a * b;
    }
  }
  throw new Error("No result found");
};

const part2 = (numArr) => {
  for (let i = 0; i < numArr.length; i++) {
    const a = numArr[i];
    for (let j = 0; j < numArr.length; j++) {
      const b = numArr[j];
      if (a + b >= 2020) continue;
      for (let k = 0; k < numArr.length; k++) {
        const c = numArr[k];
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
    .map((row) => Number(row));

  const resultPart1 = part1(input);
  const resultPart2 = part2(input);
  console.log("Part 1:", resultPart1);
  console.log("Part 2:", resultPart2);
}

module.exports = {
  part1,
  part2,
};
