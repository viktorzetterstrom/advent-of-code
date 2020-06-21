const fs = require("fs");

const createChemicalMap = inputStr =>
  inputStr.split("\n").reduce((acc, row) => {
    const matches = row.match(/(\d+ \w+)+/g).map(m => {
      const [, a, c] = m.match(/(\d+) (\w+)/);
      return { chemical: c, amount: Number(a) };
    });

    const { chemical, amount } = matches.pop();

    return {
      ...acc,
      [chemical]: {
        amount,
        input: matches
      }
    };
  }, {});

const calculateOreForFuel = (chemicalMap, fuelAmount = 1) => {
  const leftovers = Object.keys(chemicalMap).reduce(
    (acc, curr) => ({ ...acc, [curr]: 0 }),
    {}
  );

  const calculate = (chemical = "FUEL", amount = fuelAmount) => {
    if (leftovers[chemical] >= amount) {
      leftovers[chemical] -= amount;
      return 0;
    }

    const needed = amount - leftovers[chemical];
    leftovers[chemical] = 0;

    // Calc batches
    const batches = Math.ceil(needed / chemicalMap[chemical].amount);
    const spare = batches * chemicalMap[chemical].amount - needed;
    leftovers[chemical] += spare;

    // Produce with ore
    const { input } = chemicalMap[chemical];
    if (input[0].chemical === "ORE") return batches * input[0].amount;

    // Produce with chemicals
    return input.reduce(
      (oreAcc, curr) =>
        oreAcc + calculate(curr.chemical, batches * curr.amount),
      0
    );
  };

  return calculate();
};

const calculateFuelForOre = chemicalMap => {
  const targetOre = 1e12;
  let ore = 0;
  let previousOre = 0;
  let fuel = 1000000;
  let increment = 1000000;

  while (true) {
    previousOre = ore;
    ore = calculateOreForFuel(chemicalMap, fuel);

    if (previousOre >= targetOre && ore <= targetOre && increment === 1) {
      break;
    }

    if (ore < targetOre) {
      if (ore - previousOre > previousOre) {
        increment *= 2;
      }
      fuel += increment;
    } else {
      increment = Math.ceil(increment / 2);
      fuel -= increment;
    }
  }

  return fuel;
};

if (process.env.NODE_ENV !== "test") {
  const chemicalMap = createChemicalMap(
    fs.readFileSync("./14/input.txt").toString()
  );

  console.log("part 1:", calculateOreForFuel(chemicalMap));
  console.log("part 2:", calculateFuelForOre(chemicalMap));
}

module.exports = {
  createChemicalMap,
  calculateOreForFuel,
  calculateFuelForOre
};
