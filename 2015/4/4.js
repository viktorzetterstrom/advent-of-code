const { createHash } = require("crypto");
const md5 = (str) => createHash("md5").update(str).digest("hex");

const createHashValidator = (leadingZeros) => (hash) =>
  new RegExp(`^0{${leadingZeros}}`).test(hash);

const findHash = (secret, leadingZeros) => {
  const isValidHash = createHashValidator(leadingZeros);

  let num = 0;
  let valid = false;
  while (!valid) {
    num++;
    let candidate = `${secret}${num}`;
    let hash = md5(candidate);
    valid = isValidHash(hash);
  }
  return num;
};

const run = async () => {
  const SECRET = "iwrupvqb";

  const part1 = findHash(SECRET, 5);
  const part2 = findHash(SECRET, 6);
  console.log("Part 1", part1);
  console.log("Part 2", part2);
};
if (process.env.NODE_ENV !== "test") {
  run();
}

module.exports = { createHashValidator };
