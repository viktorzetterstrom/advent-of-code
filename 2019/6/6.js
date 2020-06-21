const fs = require("fs");

const countOrbits = orbitPairs => {
  let orbits = 0;
  orbitPairs.forEach(({ parent }) => {
    orbits++;
    while (parent !== "COM") {
      orbits++;
      parent = orbitPairs.find(({ name }) => name === parent).parent;
    }
  });
  return orbits;
};

const orbitsToSanta = orbitPairs => {
  const comPath = {};
  orbitPairs.forEach(({ parent, name }) => {
    const path = [parent];
    while (parent !== "COM") {
      parent = orbitPairs.find(pair => pair.name === parent).parent;
      path.push(parent);
    }
    comPath[name] = path;
  });

  const youToSanPath = [
    ...comPath.YOU.filter(val => !comPath.SAN.includes(val)),
    ...comPath.SAN.filter(val => !comPath.YOU.includes(val))
  ];

  return youToSanPath.length;
};

if (process.env.NODE_ENV !== "test") {
  const input = fs
    .readFileSync("./6/input.txt")
    .toString()
    .split("\n")
    .map(orbitPair => orbitPair.split(")"))
    .map(([key, value]) => ({ parent: key, name: value }));

  console.log("part1:", countOrbits(input));
  console.log("part2:", orbitsToSanta(input));
}

module.exports = {
  countOrbits,
  orbitsToSanta
};
