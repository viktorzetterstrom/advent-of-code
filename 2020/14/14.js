const fs = require("fs");

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/14/${fileName}`, "utf-8")
    .split("\n")
    .map((row) => row.match(/(\w+)\[?(\d*)]? = ([\w\d]+)/))
    .map(([_, instruction, address, value]) => ({
      instruction,
      address: Number(address),
      value: instruction === "mem" ? Number(value) : value,
    }));

const decToBinStr = (dec, padLength = 36) =>
  (dec >>> 0).toString(2).padStart(padLength, "0");

const writeWithMask = (binStr, mask) =>
  mask
    .split("")
    .map((x, i) => (x === "X" ? binStr[i] : mask[i]))
    .join("");

const part1 = (instructions) => {
  let mask;
  const memory = instructions.reduce((acc, { instruction, address, value }) => {
    if (instruction === "mask") {
      mask = value;
      return acc;
    }
    if (instruction === "mem") {
      return {
        ...acc,
        [address]: writeWithMask(decToBinStr(value), mask),
      };
    }
  }, {});

  return Object.values(memory).reduce(
    (acc, curr) => acc + Number.parseInt(curr, 2),
    0
  );
};

const decodeAddressMask = (addrBinStr, memoryMask) =>
  memoryMask
    .split("")
    .flatMap((bitmask, i) => {
      if (bitmask === "0") return addrBinStr[i];
      return bitmask;
    })
    .join("");

const getAddressesFromMask = (addressMask) => {
  const xIndeces = addressMask
    .split("")
    .map((m, i) => (m === "X" ? i : false))
    .filter((a) => a !== false);

  const permutations = Array.from({
    length: Math.pow(2, xIndeces.length),
  }).map((_, i) => decToBinStr(i));

  const t = permutations
    .map((perm) => perm.slice(-xIndeces.length).split(""))
    .map((perm, i) => {
      const newPerm = addressMask.split("");
      newPerm.forEach((x, j) => {
        if (x === "X") newPerm[j] = perm.shift();
      });
      return newPerm.join("");
    });
  return t;
};

const part2 = (instructions) => {
  let mask;
  const memory = instructions.reduce((acc, { instruction, address, value }) => {
    if (instruction === "mask") {
      mask = value;
      return acc;
    }
    if (instruction === "mem") {
      const addressMask = decodeAddressMask(decToBinStr(address), mask);
      const addresses = getAddressesFromMask(addressMask);

      const newValues = addresses.reduce((vals, address) => {
        vals.set(address, value);
        return vals;
      }, new Map());

      return new Map([...acc, ...newValues]);
    }
  }, new Map());

  return [...memory.values()].reduce((acc, curr) => acc + curr, 0);
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const _part1 = part1(input);
  const _part2 = part2(input);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  part1,
  part2,
};
