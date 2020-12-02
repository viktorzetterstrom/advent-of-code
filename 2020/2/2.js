const fs = require("fs");

const parseRow = (row) => {
  const matches = row.match(/(\d+)-(\d+) (\w): (.*)/);
  const [_, min, max, letter, password] = matches;
  return [min, max, letter, password];
};

const isValidPassword = (row) => {
  const [min, max, letter, password] = parseRow(row);

  const count = (password.match(new RegExp(letter, "g")) || []).length;
  return min <= count && count <= max;
};

const isValidPassword2 = (row) => {
  const [firstPos, lastPos, letter, password] = parseRow(row);

  const firstValid = password[firstPos - 1] === letter;
  const secondValid = password[lastPos - 1] === letter;
  return (firstValid && !secondValid) || (!firstValid && secondValid);
};

const countPasswords = (list, validationFn) =>
  list.map(validationFn).reduce((acc, valid) => (valid ? acc + 1 : acc), 0);

if (process.env.NODE_ENV !== "test") {
  const input = fs.readFileSync("./2020/2/input.txt", "utf-8").split("\n");

  const part1 = countPasswords(input, isValidPassword);
  const part2 = countPasswords(input, isValidPassword2);

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

module.exports = { isValidPassword, isValidPassword2, countPasswords };
