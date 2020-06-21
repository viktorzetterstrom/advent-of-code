const fs = require("fs");
const IntcodeComputer = require("./IntcodeComputer4");

const DIRECTIONS = Object.freeze({
  1: { x: 0, y: -1 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 0 },
  4: { x: 1, y: 0 }
});

const positionHash = (x, y) => `${x}|${y}`;

const findFewestSteps = intcodes => {
  const visited = {};
  const queue = [
    {
      x: 0,
      y: 0,
      steps: 0,
      intcodeComputer: new IntcodeComputer(intcodes)
    }
  ];

  while (true) {
    const current = queue.shift();

    if (!visited[positionHash(current.x, current.y)]) {
      visited[positionHash(current.x, current.y)] = true;
      const steps = current.steps + 1;

      for (let direction = 1; direction <= 4; direction++) {
        const newX = current.x + DIRECTIONS[direction].x;
        const newY = current.y + DIRECTIONS[direction].y;
        const newIntcodeComputer = current.intcodeComputer.clone();
        const out = newIntcodeComputer.run([direction]).out.pop();
        if (out === 2) {
          return {
            x: newX,
            y: newY,
            steps
          };
        } else if (out === 0) visited[positionHash(newX, newY)] = true;
        else {
          queue.push({
            x: newX,
            y: newY,
            steps,
            intcodeComputer: newIntcodeComputer
          });
        }
      }
    }
  }
};

const buildMap = intcodes => {
  const visited = {};
  const queue = [
    {
      x: 0,
      y: 0,
      steps: 0,
      intcodeComputer: new IntcodeComputer(intcodes)
    }
  ];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!visited[positionHash(current.x, current.y)]) {
      visited[positionHash(current.x, current.y)] = 1;
      const steps = current.steps + 1;

      for (let direction = 1; direction <= 4; direction++) {
        const newX = current.x + DIRECTIONS[direction].x;
        const newY = current.y + DIRECTIONS[direction].y;
        const newIntcodeComputer = current.intcodeComputer.clone();
        const out = newIntcodeComputer.run([direction]).out.pop();

        if (out === 2) visited[positionHash(newX, newY)] = 2;
        else if (out === 0) visited[positionHash(newX, newY)] = 0;
        else {
          queue.push({
            x: newX,
            y: newY,
            steps,
            intcodeComputer: newIntcodeComputer
          });
        }
      }
    }
  }

  return visited;
};

const oxygenFillTime = intcodes => {
  const shipMap = buildMap(intcodes);
  const visited = {};
  const queue = [
    {
      x: 12,
      y: 14,
      minutes: 0
    }
  ];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!visited[positionHash(current.x, current.y)]) {
      visited[positionHash(current.x, current.y)] = current.minutes;
      const minutes = current.minutes + 1;

      for (let direction = 1; direction <= 4; direction++) {
        const newX = current.x + DIRECTIONS[direction].x;
        const newY = current.y + DIRECTIONS[direction].y;

        if (
          !visited[positionHash(newX, newY)] &&
          shipMap[positionHash(newX, newY)] === 1
        ) {
          queue.push({
            x: newX,
            y: newY,
            minutes
          });
        }
      }
    }
  }
  return Object.keys(visited).reduce(
    (acc, curr) => Math.max(acc, visited[curr]),
    0
  );
};

if (process.env.NODE_ENV !== "test") {
  const intcodes = fs
    .readFileSync("./15/input.txt")
    .toString()
    .split(",")
    .map(Number);

  console.log("part 1:", findFewestSteps(intcodes));
  console.log("part 2:", oxygenFillTime(intcodes));
}
