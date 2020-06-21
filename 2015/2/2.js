const R = require("ramda");
const { readFile } = require("fs").promises;

const calcSideArea = (s1, s2) => 2 * s1 * s2;
const calcPaper = (w, h, l) => {
  const a1 = calcSideArea(w, h);
  const a2 = calcSideArea(w, l);
  const a3 = calcSideArea(h, l);
  return a1 + a2 + a3 + Math.min(a1, a2, a3) / 2;
};

const calcRibbon = (w, h, l) => {
  const diff = (a, b) => a - b;
  const [s1, s2] = R.sort(diff, [w, h, l]);
  return 2 * (s1 + s2) + w * h * l;
};

const run = async () => {
  const input = await readFile("./input.txt", { encoding: "utf-8" });

  const formatInput = R.pipe(
    R.split("\n"),
    R.map(R.split("x")),
    R.map(R.map(Number))
  );

  const part1 = R.pipe(
    formatInput,
    R.map((x) => calcPaper(...x))
  );

  const part2 = R.pipe(
    formatInput,
    R.map((x) => calcRibbon(...x)),
    R.sum
  );

  const p1 = part1(input);
  const p2 = part2(input);
  console.log("Part 1", p1);
  console.log("Part 2", p2);
};
if (process.env.NODE_ENV !== "test") {
  run();
}

module.exports = { calcPaper, calcRibbon };
