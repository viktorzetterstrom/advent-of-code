const fs = require("fs");
const R = require("ramda");
const { finished } = require("stream");

const readFile = (name) => fs.readFileSync(name, "utf-8");
const getInput = R.compose(R.map(R.split("-")), R.split("\n"), readFile);
const addOtherWay = (input) => [...input, ...R.map(([a, b]) => [b, a], input)];
const getPaths = R.compose(
  R.reduce(
    (acc, [from, to]) => ({
      ...acc,
      [from]: acc[from] ? [...acc[from], to] : [to],
    }),
    {}
  ),
  addOtherWay
);

const input = getInput("2021/12/input.txt");
const paths = getPaths(input);

const isSmallCave = (c) => /[a-z]+/.test(c);
const isBigCave = R.complement(isSmallCave);
const isVisited = (c, route) => R.includes(c, route);
const isNotNil = R.complement(R.isNil);

const isFinished = R.compose(R.equals("end"), R.last);
const isOpen = R.complement(isFinished);

const findPartOneRoutes = (openRoutes = [["start"]], finishedRoutes = []) => {
  if (R.isEmpty(openRoutes)) return finishedRoutes;

  const newRoutes = R.reduce(
    (acc, route) => {
      const next = R.compose(
        R.filter(isNotNil),
        R.map((n) =>
          isSmallCave(n) && isVisited(n, route) ? null : [...route, n]
        )
      )(paths[R.last(route)]);

      return [...acc, ...next];
    },
    [],
    openRoutes
  );

  const newOpenRoutes = R.filter(isOpen, newRoutes);
  const newFinishedRoutes = R.filter(isFinished, newRoutes);

  return findPartOneRoutes(newOpenRoutes, [
    ...finishedRoutes,
    ...newFinishedRoutes,
  ]);
};

const hasSmallCaveDoubleVisit = (route) => {
  const visitedSmallCaves = new Set();
  for (const c of route) {
    if (isSmallCave(c) && visitedSmallCaves.has(c)) return true;
    visitedSmallCaves.add(c);
  }
  return false;
};

const isStart = R.equals("start");
const isEnd = R.equals("end");

const findPartTwoRoutes = (openRoutes = [["start"]], finishedRoutes = []) => {
  if (R.isEmpty(openRoutes)) return finishedRoutes;

  const newRoutes = R.reduce(
    (acc, route) => {
      const next = R.compose(
        R.filter(isNotNil),
        R.map((n) => {
          if (isBigCave(n)) return [...route, n];
          if (isEnd(n)) return [...route, n];
          if (isStart(n)) return null;
          if (hasSmallCaveDoubleVisit(route) && !isVisited(n, route))
            return [...route, n];
          if (!hasSmallCaveDoubleVisit(route)) return [...route, n];
        })
      )(paths[R.last(route)]);

      return [...acc, ...next];
    },
    [],
    openRoutes
  );

  const newOpenRoutes = R.filter(isOpen, newRoutes);
  const newFinishedRoutes = R.filter(isFinished, newRoutes);

  return findPartTwoRoutes(newOpenRoutes, [
    ...finishedRoutes,
    ...newFinishedRoutes,
  ]);
};

// console.log(findPartOneRoutes().length);
console.log(findPartTwoRoutes().length);
