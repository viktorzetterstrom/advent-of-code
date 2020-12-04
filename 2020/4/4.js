const fs = require("fs");

const loadInput = (fileName) =>
  fs
    .readFileSync(`2020/4/${fileName}`, "utf-8")
    .split("\n\n")
    .map((row) =>
      row.split(/[\n ]/).reduce(
        (acc, curr) => ({
          ...acc,
          [curr.split(":")[0]]: curr.split(":")[1],
        }),
        {}
      )
    );

const requiredPassportKeys = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];
const hasRequiredKeys = (passport) =>
  requiredPassportKeys.every((passportKey) => !!passport[passportKey]);

const validationFunctions = {
  byr: (byr) => 1920 <= byr && byr <= 2002,
  iyr: (iyr) => 2010 <= iyr && iyr <= 2020,
  eyr: (eyr) => 2020 <= eyr && eyr <= 2030,
  hgt: (hgt) => {
    const matches = hgt.match(/(\d+)(cm|in)/);
    if (!matches) return false;
    const [_, height, unit] = matches;
    if (unit === "cm") return 150 <= height && height <= 193;
    if (unit === "in") return 59 <= height && height <= 76;
  },
  hcl: (hcl) => /#[0-9a-f]{6}/.test(hcl),
  ecl: (ecl) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl),
  pid: (isValidPid = (pid) => /^\d{9}$/.test(pid)),
  cid: () => true,
};

const isValidPassport = (passport) =>
  Object.entries(passport).every(([key, value]) =>
    validationFunctions[key](value)
  );

const countPassportsWithRequiredKeys = (data) =>
  data.filter(hasRequiredKeys).length;

const countValidPassports = (data) =>
  data.filter(hasRequiredKeys).filter(isValidPassport).length;

if (process.env.NODE_ENV !== "test") {
  const input = loadInput("input.txt");

  const part1 = countPassportsWithRequiredKeys(input);
  const part2 = countValidPassports(input);

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

module.exports = {
  loadInput,
  countPassportsWithRequiredKeys,
  countValidPassports,
  validationFunctions,
};
