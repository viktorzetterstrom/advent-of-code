const part1 = (input, turnLimit = 2020) => {
  const numbers = [...input];
  const lastOccurences = new Map(
    input.slice(0, -1).reduce((acc, curr, i) => [...acc, [curr, i + 1]], [])
  );

  let turn = numbers.length + 1;
  while (numbers.length < turnLimit) {
    const lastNumber = numbers[turn - 2];
    const lastOccurence = lastOccurences.get(lastNumber);
    const newNumber = lastOccurence ? turn - lastOccurence - 1 : 0;
    numbers.push(newNumber);
    lastOccurences.set(lastNumber, turn - 1);
    turn++;
  }
  return numbers[numbers.length - 1];
};

const part2 = (input) => {};

if (process.env.NODE_ENV !== "test") {
  const input = [5, 1, 9, 18, 13, 8, 0];

  const _part1 = part1(input);
  const _part2 = part1(input, 30000000);

  console.log("Part 1:", _part1);
  console.log("Part 2:", _part2);
}

module.exports = {
  part1,
  part2,
};
