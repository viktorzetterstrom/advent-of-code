const fs = require("fs");

const layerZeros = layer => (layer.match(/0/g) ? layer.match(/0/g).length : 0);

const layerChecksum = layer =>
  layer.match(/1/g) && layer.match(/2/g)
    ? layer.match(/1/g).length * layer.match(/2/g).length
    : 0;

const verifyImage = (imageData, width, height) =>
  layerChecksum(
    imageData
      .match(new RegExp(`(\\d){${width * height}}`, "g"))
      .reduce((acc, layer) =>
        layerZeros(layer) < layerZeros(acc) ? layer : acc
      )
  );

const combineRows = (row1, row2) =>
  [...row1].map((val, i) => (val === "2" ? row2[i] : val)).join("");

const combineLayers = (layer1, layer2) =>
  layer1.map((row, i) => combineRows(row, layer2[i]));

const renderImage = (imageData, width, height) =>
  imageData
    .match(new RegExp(`(\\d){${width * height}}`, "g"))
    .map(layer => layer.match(new RegExp(`(\\d){${width}}`, "g")))
    .reduce(combineLayers)
    .map(row => row.replace(/1/g, "⬜️ ").replace(/0/g, "⬛️ "))
    .join("\n");

if (process.env.NODE_ENV !== "test") {
  const input = fs.readFileSync("./8/input.txt").toString();
  console.log("part1:", verifyImage(input, 25, 6));
  console.log("part2:");
  console.log(renderImage(input, 25, 6));
}

module.exports = {
  layerZeros,
  layerChecksum,
  verifyImage,
  combineRows,
  combineLayers,
  renderImage
};
