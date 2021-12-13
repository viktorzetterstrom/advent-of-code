const { create } = require("domain");
const fs = require("fs");
const R = require("ramda");

const getRawInput = (name) => fs.readFileSync(name, "utf-8");

const parseCoords = R.compose(
  R.map(R.compose(([x, y]) => ({ x, y }), R.map(Number), R.split(","))),
  R.split("\n")
);

const parseFolds = R.compose(
  R.flatten,
  R.map(
    R.compose(
      R.map(
        R.compose(([axis, at]) => ({ axis, at: Number(at) }), R.split("="))
      ),
      R.drop(2),
      R.split(" ")
    )
  ),
  R.split("\n")
);

const parseInput = R.compose(
  ([rawCoords, rawFolds]) => ({
    coords: parseCoords(rawCoords),
    folds: parseFolds(rawFolds),
  }),
  R.split("\n\n")
);

const getInput = R.compose(parseInput, getRawInput);
const input = getInput("2021/13/input.txt");

const getWidth = R.compose(R.reduce(R.max, -Infinity), R.map(R.prop("x")));
const getHeight = R.compose(R.reduce(R.max, -Infinity), R.map(R.prop("y")));

const mapIndexed = R.addIndex(R.map);
const createMatrix = (x, y) =>
  R.map(
    () => Array.from({ length: x + 1 }).fill("."),
    Array.from({ length: y + 1 })
  );

const createPaperFromCoords = (coords) => {
  const width = getWidth(coords);
  const height = getHeight(coords);
  const paper = createMatrix(width, height);
  R.forEach(({ x, y }) => (paper[y][x] = "#"), coords);
  return paper;
};

const logPaper = R.forEach(R.compose(console.log, R.join("")));

const paper = createPaperFromCoords(input.coords);

const splitPaper = (paper, { axis, at }) => {
  if (axis === "y") {
    const [a, b] = R.splitAt(at, paper);
    return [a, R.reverse(R.drop(1, b))];
  }
  if (axis === "x") {
    const [a, b] = R.compose(
      R.map(R.transpose),
      ([a, b]) => [a, R.reverse(R.drop(1, b))],
      R.splitAt(at),
      R.transpose
    )(paper);
    return [a, b];
  }
};

const combinePaper = (a, b) =>
  mapIndexed(
    (r, y) =>
      mapIndexed((p, x) => {
        if (p === "#" || b[y][x] === "#") return "#";
        return ".";
      }, r),
    a
  );

const fold = (paper, { axis, at }) => {
  const [a, b] = splitPaper(paper, { axis, at });

  return combinePaper(a, b);
};

const countDots = R.reduce(
  (oAcc, row) =>
    oAcc + R.reduce((iAcc, p) => (p === "#" ? iAcc + 1 : iAcc), 0, row),
  0
);

const part1 = R.reduce(fold, paper, [input.folds[0]]);
console.log(countDots(part1));

const part2 = R.reduce(fold, paper, input.folds);
logPaper(part2);
