const fs = require("fs");
const flatMap = require("flatmap");

const basePhase = [0, 1, 0, -1];

const applyPhase = (input, n) => {
  let newDigits = [...input];
  for (let phaseCount = 0; phaseCount < n; phaseCount++) {
    newDigits = [...input].map((_, i) => {
      const phase = flatMap(basePhase, p => new Array(i + 1).fill(p));

      const digitPhaseApplied = newDigits.reduce(
        (acc, curr, j) =>
          phase[(j + 1) % phase.length] !== 0
            ? acc + Number(curr) * phase[(j + 1) % phase.length]
            : 0,
        0
      );

      return Math.abs(digitPhaseApplied % 10);
    });
  }
  return newDigits.join("").substring(0, 8);
};

const applyFft = input => applyPhase(input, 100);

const applyFftReal = input => {
  const realInput = input;
  const position = Number(applyPhase(realInput, 100));
  return realInput.substring(position, position + 8);
};

if (process.env.NODE_ENV !== "test") {
  const input = fs.readFileSync("./16/input.txt").toString();

  console.log("part 1:", applyFft(input));
}

module.exports = {
  applyPhase,
  applyFft,
  applyFftReal
};
