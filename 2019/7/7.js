const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer2");

const getAllPhaserSettings = string => {
  const results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }
  [...string].forEach((c, i) => {
    const firstChar = c;
    const charsLeft = string.substring(0, i) + string.substring(i + 1);
    const innerPermutations = getAllPhaserSettings(charsLeft);
    innerPermutations.forEach(innerPermutation => {
      results.push(firstChar + innerPermutation);
    });
  });
  return results;
};

const calculateThrusterSignal = (intcodes, [A, B, C, D, E]) => {
  const ampA = new IntcodeComputer(intcodes).run([A, 0]);
  const ampB = new IntcodeComputer(intcodes).run([B, ampA.out.pop()]);
  const ampC = new IntcodeComputer(intcodes).run([C, ampB.out.pop()]);
  const ampD = new IntcodeComputer(intcodes).run([D, ampC.out.pop()]);
  const ampE = new IntcodeComputer(intcodes).run([E, ampD.out.pop()]);
  return ampE.out;
};

const maxThrusterSignal = intcodes =>
  getAllPhaserSettings("01234").reduce(
    (max, phaserSetting) =>
      Math.max(
        calculateThrusterSignal(intcodes, [...phaserSetting].map(Number)),
        max
      ),
    0
  );

const calculateThrusterSignalWithLoop = (intcodes, [A, B, C, D, E]) => {
  const ampA = new IntcodeComputer(intcodes, [A]);
  const ampB = new IntcodeComputer(intcodes, [B]);
  const ampC = new IntcodeComputer(intcodes, [C]);
  const ampD = new IntcodeComputer(intcodes, [D]);
  const ampE = new IntcodeComputer(intcodes, [E]);

  let io = { out: [0] };
  while (true) {
    io = ampA.run(io.out);
    io = ampB.run(io.out);
    io = ampC.run(io.out);
    io = ampD.run(io.out);
    io = ampE.run(io.out);
    if (io.exit === 99) break;
  }
  return io.out;
};

const maxThrusterSignalWithLoop = intcodes =>
  getAllPhaserSettings("56789").reduce(
    (max, phaserSetting) =>
      Math.max(
        calculateThrusterSignalWithLoop(
          intcodes,
          [...phaserSetting].map(Number)
        ),
        max
      ),
    0
  );

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./7/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log("part 1:", maxThrusterSignal(input));
  console.log("part 2:", maxThrusterSignalWithLoop(input));
}

module.exports = {
  maxThrusterSignal,
  maxThrusterSignalWithLoop
};
