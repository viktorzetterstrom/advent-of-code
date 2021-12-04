const fs = require("fs");
const R = require("ramda");

const getInput = (name) => fs.readFileSync(name, "utf-8").split("\n\n");
const input = getInput("./2021/4/input.txt");
// const input = getInput("./2021/4/test-input.txt");

const getDraw = R.compose(R.split(","), R.head);

const getBoards = R.compose(
  R.map(
    R.compose(
      R.map(
        R.compose(
          R.map((n) => ({ n, x: false })),
          R.split(/ +/),
          R.trim
        )
      ),
      R.split(/\n/)
    )
  ),
  R.drop(1)
);

const updateBoard = (board, n) =>
  R.map(
    R.map((s) => (s.n === n ? { ...s, x: true } : s)),
    board
  );

const updateBoards = (boards, n) =>
  R.map((board) => updateBoard(board, n), boards);

const isWinningBoardHorizontal = (board) => R.any(R.all(R.prop("x")), board);

const isWinningBoardVertical = (board) =>
  isWinningBoardHorizontal(R.transpose(board));

const isWinningBoard = (board) =>
  isWinningBoardHorizontal(board) || isWinningBoardVertical(board);

const getWinningBoard = (boards) => R.find(isWinningBoard, boards);

const getWinner = (boards = getBoards(input), draw = getDraw(input)) => {
  const currentDraw = R.head(draw);
  const updatedBoards = updateBoards(boards, currentDraw);
  const winningBoard = getWinningBoard(updatedBoards);
  if (winningBoard) return { winningBoard, last: currentDraw };

  return getWinner(updatedBoards, R.drop(1, draw));
};

const sumRow = (row) =>
  R.reduce((acc, s) => (s.x ? acc : acc + Number(s.n)), 0, row);

const calculateScore = ({ winningBoard, last }) =>
  R.reduce((acc, row) => acc + sumRow(row), 0, winningBoard) * Number(last);

const part1 = R.compose(calculateScore, getWinner);

console.log(part1());

const getWinningBoards = R.filter(isWinningBoard);
const getRemainingBoards = R.filter((board) => R.not(isWinningBoard(board)));

const getLastWinner = (
  boards = getBoards(input),
  winnerBoards = [],
  draw = getDraw(input)
) => {
  const currentDraw = R.head(draw);
  const updatedBoards = updateBoards(boards, currentDraw);
  const updatedWinnerBoards = [
    ...winnerBoards,
    ...getWinningBoards(updatedBoards),
  ];
  const remainingBoards = getRemainingBoards(updatedBoards);
  if (remainingBoards.length === 0)
    return {
      winningBoard: R.last(updatedWinnerBoards),
      last: currentDraw,
    };

  return getLastWinner(remainingBoards, updatedWinnerBoards, R.drop(1, draw));
};

const part2 = R.compose(calculateScore, getLastWinner);

console.log(part2());
