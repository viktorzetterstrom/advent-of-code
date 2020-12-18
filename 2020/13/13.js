const fs = require("fs");

const loadInput = (fileName) => {
  const [time, buses] = fs
    .readFileSync(`2020/13/${fileName}`, "utf-8")
    .split("\n");

  return {
    start: Number(time),
    buses: buses
      .split(",")
      .map((bus, i) => (bus !== "x" ? { bus: Number(bus), pos: i } : false))
      .filter((x) => x),
  };
};

const part1 = ({ start, buses }) => {
  const difs = buses.reduce((acc, { bus }) => {
    let time = bus;
    while (time <= start) time += bus;
    return {
      ...acc,
      [bus]: time - start,
    };
  }, {});

  const [[key, val]] = Object.entries(difs).sort(
    ([_key1, val1], [_key2, val2]) => val1 - val2
  );

  return key * val;
};

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

const part2 = ({ buses }, start) => {
  let num = start;
  let increment = 1;
  const found = new Set();
  while (true) {
    for (let i = 0; i < buses.length; i++) {
      const { bus, pos } = buses[i];
      if ((num + pos) % bus === 0) {
        found.add(bus);
        increment = lcmAll([...found.values()]);
      } else break;
      if (i === buses.length - 1) return num;
    }
    num += increment;
  }
};

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const _part1 = part1(input);
  const _part2 = part2(input, 100000000000000);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  loadInput,
  part1,
  part2,
};
