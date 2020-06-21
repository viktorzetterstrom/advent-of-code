const fs = require("fs");

const processIntcode = (opcode, arg1, arg2) => {
  switch (opcode) {
    case 1:
      return arg1 + arg2;
    case 2:
      return arg1 * arg2;
    default:
      throw new Error(`Bad code: ${opcode} ${arg1} ${arg2}`);
  }
};

const processIntcodes = intcodes => {
  const newIntcodes = [...intcodes];
  let ip = 0;
  while (true) {
    const [opcode, arg1, arg2, arg3] = newIntcodes.slice(ip, ip + 4);
    if (opcode === 99) break;
    const result = processIntcode(opcode, newIntcodes[arg1], newIntcodes[arg2]);
    newIntcodes[arg3] = result;
    ip += 4;
  }
  return newIntcodes;
};

const nounVerbPreprocessing = (intcodes, noun, verb) => {
  const newIntcodes = [...intcodes];
  newIntcodes[1] = noun;
  newIntcodes[2] = verb;
  return newIntcodes;
};

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./2/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log(
    `part 1: ${processIntcodes(nounVerbPreprocessing(input, 12, 2))[0]}`
  );

  const desiredOutput = 19690720;
  let done = false;
  for (let noun = 1; noun < 100; noun += 1) {
    for (let verb = 1; verb < 100; verb += 2) {
      const output = processIntcodes(
        nounVerbPreprocessing(input, noun, verb)
      )[0];
      if (output === desiredOutput) {
        console.log(`part 2: ${100 * noun + verb}`);
        done = true;
        break;
      }
    }
    if (done) break;
  }
}

module.exports = {
  processIntcodes
};
