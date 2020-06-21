const fs = require("fs");

const createDeck = size => [...Array(size).keys()];

const dealIntoNewStack = deck => deck.reverse();

const dealWithIncrement = (deck, increment) => {
  const newDeck = [...deck];
  let dealt = 0;
  let i = 0;
  while (dealt < newDeck.length) {
    newDeck[i % newDeck.length] = deck.shift();
    i += increment;
    dealt++;
  }
  return newDeck;
};

const cut = (deck, amount) => [...deck.slice(amount), ...deck.slice(0, amount)];

const instructionHandler = Object.freeze({
  "deal into new stack": dealIntoNewStack,
  "deal with increment": dealWithIncrement,
  cut
});

const shuffleDeck = (instructions, deckSize) => {
  let deck = createDeck(deckSize);
  instructions.forEach(({ instruction, value }) => {
    deck = instructionHandler[instruction](deck, value);
  });
  return deck;
};

if (process.env.NODE_ENV !== "test") {
  const instructions = fs
    .readFileSync("22/input.txt")
    .toString()
    .split("\n")
    .map(i => {
      const [, instruction, value] = i.match(/([^\d-]*)(-?\d+)?/);
      return { instruction: instruction.trim(), value: Number(value) };
    });

  console.log(
    "part 1",
    shuffleDeck(instructions, 10007).findIndex(val => val === 2019)
  );
}

module.exports = {
  dealIntoNewStack,
  dealWithIncrement,
  cut,
  shuffleDeck
};
