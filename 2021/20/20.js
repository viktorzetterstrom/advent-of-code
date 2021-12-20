const { count } = require("console");
const fs = require("fs");
const R = require("ramda");

const getRawInput = (name) => fs.readFileSync(name, "utf-8");

const getInput = R.compose(
  ([enhancement, image]) => ({
    enhancement: R.split("", enhancement),
    image: R.compose(R.map(R.split("")), R.split("\n"))(image),
  }),
  R.split("\n\n"),
  getRawInput
);

const { image, enhancement } = getInput("2021/20/input.txt");

const getPixelValue = (px, edge) => {
  if (px === undefined) return edge;
  return px === "#" ? "1" : "0";
};

const processPixel = (x, y, edge, image) => {
  const tl = getPixelValue(image?.[y - 1]?.[x - 1], edge);
  const tm = getPixelValue(image?.[y - 1]?.[x], edge);
  const tr = getPixelValue(image?.[y - 1]?.[x + 1], edge);
  const ml = getPixelValue(image?.[y]?.[x - 1], edge);
  const mm = getPixelValue(image?.[y]?.[x], edge);
  const mr = getPixelValue(image?.[y]?.[x + 1], edge);
  const ll = getPixelValue(image?.[y + 1]?.[x - 1], edge);
  const lm = getPixelValue(image?.[y + 1]?.[x], edge);
  const lr = getPixelValue(image?.[y + 1]?.[x + 1], edge);

  const index = Number.parseInt(tl + tm + tr + ml + mm + mr + ll + lm + lr, 2);
  return enhancement[index];
};

const padImage = (image, char) => [
  Array.from({ length: image[0].length + 2 }).fill(char),
  ...R.map((row) => [char, ...row, char], image),
  Array.from({ length: image[0].length + 2 }).fill(char),
];

const mapIndexed = R.addIndex(R.map);

const infinity = (n) => {
  if (enhancement[0] === ".") return ".";
  return n % 2 === 0 ? "." : "#";
};

const processImage = (image, iterations) =>
  R.reduce(
    (acc, i) => {
      const edge = infinity(i);
      const newImage = padImage(acc, edge);
      return mapIndexed(
        (row, y) => mapIndexed((__, x) => processPixel(x, y, i, newImage), row),
        newImage
      );
    },
    image,
    R.range(0, iterations)
  );

const countPixels = R.reduce(
  (oAcc, row) =>
    oAcc + R.reduce((iAcc, px) => (px === "#" ? iAcc + 1 : iAcc), 0, row),
  0
);

const processedImageOne = processImage(image, 2);
const partOne = countPixels(processedImageOne);
console.log(partOne);

const processedImageTwo = processImage(image, 50);
const partTwo = countPixels(processedImageTwo);
console.log(partTwo);
