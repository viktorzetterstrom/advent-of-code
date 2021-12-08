const fs = require("fs");
const R = require("ramda");

//   0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//   5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

const patterns = Object.freeze({
  1: "cf",
  7: "acf",
  4: "bcdf",
  2: "acdeg",
  3: "acdfg",
  5: "abdfg",
  0: "abcefg",
  6: "abdefg",
  9: "abcdfg",
  8: "abcdefg",
});

const sortStringAlpha = (s) => s.split("").sort().join("");
const sortStrings = R.map(sortStringAlpha);

const parseRow = R.compose(
  ([sequence, output]) => ({
    sequence: sortStrings(sequence),
    output: sortStrings(output),
  }),
  R.map(R.split(" ")),
  R.split(" | ")
);
const getRawInput = (name) => fs.readFileSync(name, "utf-8").split("\n");
const getInput = R.compose(R.map(parseRow), getRawInput);

const input = getInput("./2021/8/input.txt");
// const input = getInput("./2021/8/test-input-1.txt");
// const input = getInput("./2021/8/test-input-2.txt");

const partOnePatternLengths = R.compose(
  R.map(R.length),
  R.values,
  R.pick([1, 4, 7, 8])
)(patterns);

const part1 = R.reduce(
  (acc, length) =>
    R.add(
      acc,
      R.compose(
        R.length,
        R.filter(R.equals(length)),
        R.map(R.length),
        R.flatten,
        R.map(R.prop("output"))
      )(input)
    ),
  0,
  partOnePatternLengths
);

console.log(part1);

const byPatternLengthOf = R.curry(
  (match, s) => s.length === patterns[match].length
);
const byLengthOf = R.curry((length, s) => s.length === length);

const longest = (a, b) => (a.length >= b.length ? a : b);
const shortest = (a, b) => (a.length < b.length ? a : b);
const findDifference = (a, b) =>
  R.difference(R.split("", longest(a, b)), R.split("", shortest(a, b)));

const test = R.reduce((acc, { sequence, output }) => {
  // one, four, seven eight
  const one = R.find(byPatternLengthOf(1), sequence);
  const four = R.find(byPatternLengthOf(4), sequence);
  const seven = R.find(byPatternLengthOf(7), sequence);
  const eight = R.find(byPatternLengthOf(8), sequence);

  // lengthFives - 2, 3, 5
  const lengthFives = R.filter(byLengthOf(5), sequence);

  // lengthSixes - 0, 6, 9
  const lengthSixes = R.filter(byLengthOf(6), sequence);

  // from 1 and lengthSixes, find six, c and f
  const six = R.head(
    R.filter((x) => findDifference(x, one).length === 5, lengthSixes)
  );
  const c = R.head(R.without(six, one));
  const f = R.head(findDifference(one, R.head(c)));

  // from c, f and lengthFives find two, three, five
  const two = R.head(
    R.filter(
      (x) => R.and(R.includes(c, x), R.not(R.includes(f, x))),
      lengthFives
    )
  );
  const three = R.head(
    R.filter((x) => R.and(R.includes(c, x), R.includes(f, x)), lengthFives)
  );
  const five = R.head(
    R.filter(
      (x) => R.and(R.not(R.includes(c, x)), R.includes(f, x)),
      lengthFives
    )
  );

  // from five and six find e
  const e = R.head(findDifference(five, six));

  // from e and lengthSixes, find nine and zero
  const nine = R.head(
    R.filter((x) => findDifference(x, e).length === 6, lengthSixes)
  );
  const zero = R.head(R.difference(lengthSixes, [six, nine]));

  const valueMap = {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
  };

  const getValue = R.compose(
    Number,
    R.join(""),
    R.map((x) => valueMap[x])
  );

  return acc + getValue(output);
}, 0);

console.log(test(input));
