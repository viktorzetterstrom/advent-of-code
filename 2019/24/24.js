const fs = require("fs");

const calculateBiodiversity = layout => {
  let currentBioDiversity = 1;
  let totalBioDiversity = 0;
  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[0].length; x++) {
      if (layout[y][x] === "#") totalBioDiversity += currentBioDiversity;
      currentBioDiversity *= 2;
    }
  }
  return totalBioDiversity;
};

const calculateNextLayout = layout => {
  const nextLayout = [...layout.map(row => [...row])];
  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[0].length; x++) {
      let adjacentBugs = 0;
      if (layout[y + 1] && layout[y + 1][x] === "#") adjacentBugs++;
      if (layout[y - 1] && layout[y - 1][x] === "#") adjacentBugs++;
      if (layout[y][x + 1] === "#") adjacentBugs++;
      if (layout[y][x - 1] === "#") adjacentBugs++;
      nextLayout[y][x] =
        adjacentBugs === 1 || (layout[y][x] === "." && adjacentBugs === 2)
          ? "#"
          : ".";
    }
  }
  return nextLayout;
};

const firstDuplicateBiodiversity = layout => {
  const layouts = new Set([JSON.stringify(layout)]);
  while (true) {
    layout = calculateNextLayout(layout);

    if (layouts.has(JSON.stringify(layout)))
      return calculateBiodiversity(layout);
    layouts.add(JSON.stringify(layout));
  }
};

if (process.env.NODE_ENV !== "test") {
  const startLayout = fs
    .readFileSync("24/input.txt")
    .toString()
    .split("\n")
    .map(row => row.split(""));

  console.log("part 1", firstDuplicateBiodiversity(startLayout));
}

module.exports = {
  calculateBiodiversity,
  calculateNextLayout
};
