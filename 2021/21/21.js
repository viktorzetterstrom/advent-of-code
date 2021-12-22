const R = require("ramda");

const startingState = {
  playerOne: { position: 2, score: 0 },
  playerTwo: { position: 7, score: 0 },
};
const testStartingState = {
  playerOne: { position: 4, score: 0 },
  playerTwo: { position: 8, score: 0 },
};

const deterministicDie = (() => {
  let next = 0;
  return {
    timesRolled: () => next,
    roll: () => (next++ % 100) + 1,
  };
})();

const rollThreeTimes = () =>
  deterministicDie.roll() + deterministicDie.roll() + deterministicDie.roll();

const playerRound = ({ position, score }) => {
  const roll = rollThreeTimes();
  const newPosition =
    (position + roll) % 10 === 0 ? 10 : (position + roll) % 10;
  return {
    position: newPosition,
    score: score + newPosition,
  };
};

const turn = ({ playerOne, playerTwo }) => {
  const newPlayerOne = playerRound(playerOne);
  if (newPlayerOne.score >= 1000)
    return {
      playerOne: newPlayerOne,
      playerTwo,
    };

  const newPlayerTwo = playerRound(playerTwo);
  if (newPlayerTwo.score >= 1000)
    return {
      playerOne: newPlayerOne,
      playerTwo: newPlayerTwo,
    };

  return turn({
    playerOne: newPlayerOne,
    playerTwo: newPlayerTwo,
  });
};

const partOne = ({ playerOne, playerTwo }) =>
  playerOne.score < playerTwo.score
    ? playerOne.score * deterministicDie.timesRolled()
    : playerTwo.score * deterministicDie.timesRolled();

console.log(partOne(turn(startingState)));
