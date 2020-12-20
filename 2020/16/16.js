const fs = require("fs");

const loadInput = (fileName) => {
  const rows = fs
    .readFileSync(`2020/16/${fileName}`, "utf-8")
    .split("\n")
    .filter((r) => r !== "");

  const input = { fields: [] };
  let row = rows.shift();
  while (row !== "your ticket:") {
    const [_, name, from1, to1, from2, to2] = row.match(
      /([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)/
    );
    input.fields.push({
      name,
      validator: (val) =>
        (from1 <= val && val <= to1) || (from2 <= val && val <= to2),
    });
    row = rows.shift();
  }

  input.myTicket = rows.shift().split(",").map(Number);
  input.nearbyTickets = rows.slice(1).map((t) => t.split(",").map(Number));

  return input;
};

const isInvalidValue = (value, fields) =>
  !fields.some(({ validator }) => validator(value)) ? value : false;

const part1 = ({ fields, nearbyTickets }) =>
  nearbyTickets
    .flatMap((values) => values.map((value) => isInvalidValue(value, fields)))
    .reduce((a, b) => a + b);

const isValidTicket = (values, fields) =>
  values.every((value) => fields.some(({ validator }) => validator(value)))
    ? values
    : false;

const part2 = ({ fields, myTicket, nearbyTickets }) => {
  const validTickets = nearbyTickets
    .map((values) => isValidTicket(values, fields))
    .filter((t) => t);

  const possibleFields = {};

  for (let i = 0; i < myTicket.length; i++) {
    fields.forEach(({ name, validator }) => {
      validTickets.forEach((values) => {
        if (!possibleFields[i])
          possibleFields[i] = fields.reduce(
            (acc, { name }) => ({ ...acc, [name]: [] }),
            {}
          );

        possibleFields[i] = {
          ...possibleFields[i],
          [name]: [...possibleFields[i][name], validator(values[i])],
        };
      });
      possibleFields[i][name] = possibleFields[i][name].every((a) => a);
    });
  }
  let t = Object.entries(possibleFields).reduce((acc, [i, fields]) => {
    const validFields = Object.entries(fields)
      .map(([name, valid]) => valid && name)
      .filter((x) => x);

    return [...acc, { index: i, validFields }];
  }, []);

  const chosenFields = [];
  for (let x = 0; x < 12; x++) {
    for (let i = 0; i < t.length; i++) {
      const { index, validFields } = t[i];
      if (validFields.length === 1) chosenFields[index] = validFields[0];

      t = t.map(({ index, validFields }) => ({
        index,
        validFields: validFields.filter((a) => !chosenFields.includes(a)),
      }));
    }
  }

  const ans = chosenFields
    .map((x, i) => (x.match(/departure/) ? { i, x, val: myTicket[i] } : false))
    .filter((a) => a)
    .reduce((acc, { val }) => acc * val, 1);

  return ans;
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
