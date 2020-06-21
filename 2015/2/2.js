const R = require("ramda");
const { readFile } = require("fs").promises;

const calcSideArea = (s1, s2) => 2 * s1 * s2;
const calcPaper = (w, h, l) => {
  const sideOne = calcSideArea(w, h);
  const sideTwo = calcSideArea(w, l);
  const sideThree = calcSideArea(h, l);
  return (
    sideOne + sideTwo + sideThree + Math.min(sideOne, sideTwo, sideThree) / 2
  );
};

const calcRibbon = (w, h, l) => 2 * (R.min(w, h) + R.min(h, l)) + w * h * l;

const run = async () => {
  const input = await readFile("./input.txt", { encoding: "utf-8" });

  const formatInput = R.pipe(
    R.split("\n"),
    R.map(R.split("x")),
    R.map(R.map(Number))
  );

  const part1Calculator = R.pipe(
    formatInput,
    R.map((x) => calcPaper(...x)),
    R.sum
  );

  const part2Calculator = R.pipe(
    formatInput,
    R.map((x) => calcRibbon(...x)),
    R.sum
  );

  const part1 = part1Calculator(input);
  const part2 = part2Calculator(input);
  console.log("Part 1", part1);
  console.log("Part 2", part2);
};
if (process.env.NODE_ENV !== "test") {
  run();
}

module.exports = { calcPaper, calcRibbon };
