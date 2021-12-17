const R = require("ramda");

// input = target area: x=288..330, y=-96..-50;
// test-input = x=20..30, y=-10..-5;

// const xLowTarget = 20;
// const xHighTarget = 30 + 1;
// const yLowTarget = -10;
// const yHighTarget = -5 + 1;
const xLowTarget = 288;
const xHighTarget = 330 + 1;
const yLowTarget = -96;
const yHighTarget = -50 + 1;

const validX = R.range(xLowTarget, xHighTarget);
const validY = R.range(yLowTarget, yHighTarget);

const isHit = (pos) =>
  R.and(R.includes(pos.x, validX), R.includes(pos.y, validY));

const wentWide = (pos) => R.or(pos.x > xHighTarget, pos.y < yLowTarget);

const findPeakPos = R.compose(R.head, R.reverse, R.sortBy(R.prop("y")));

const shoot = (initialVelo) => {
  const startingPos = { x: 0, y: 0 };

  const step = (velo = initialVelo, positions = [startingPos]) => {
    const currPos = R.last(positions);
    if (isHit(currPos))
      return { hit: true, initialVelo, peak: findPeakPos(positions) };
    if (wentWide(currPos)) return false;

    const newPos = {
      x: currPos.x + velo.x,
      y: currPos.y + velo.y,
    };

    const newVelo = {
      x: velo.x === 0 ? 0 : velo.x > 0 ? velo.x - 1 : velo.x + 1,
      y: velo.y - 1,
    };

    return step(newVelo, [...positions, newPos]);
  };

  return step();
};

const partOne = () => {
  const xLow = 5;
  const xHigh = 100;
  const yLow = 4;
  const yHigh = 100;

  const shots = [];
  for (let y = yLow; y <= yHigh; y++) {
    for (let x = xLow; x <= xHigh; x++) {
      shots.push(shoot({ x, y }));
    }
  }

  const getPeak = R.compose(
    R.compose(R.prop("y"), R.prop("peak")),
    R.head,
    R.reverse,
    R.sortBy(R.compose(R.prop("y"), R.prop("peak"))),
    R.filter((a) => a)
  );

  return getPeak(shots);
};

const partTwo = () => {
  const xLow = -400;
  const xHigh = 400;
  const yLow = -100;
  const yHigh = 100;

  const shots = [];
  for (let y = yLow; y <= yHigh; y++) {
    for (let x = xLow; x <= xHigh; x++) {
      shots.push(shoot({ x, y }));
    }
  }

  const sortShots = R.compose(
    R.prop("length"),
    R.filter((a) => a)
  );

  return sortShots(shots);
};

console.log(partOne());
console.log(partTwo());

// const testOne = { x: 7, y: 2 };
// const testTwo = { x: 6, y: 3 };
// const testThree = { x: 9, y: 0 };
// const testFour = { x: 17, y: -4 };
// const testFive = { x: 6, y: 9 };

// console.log(shoot(testOne));
// console.log(shoot(testTwo));
// console.log(shoot(testThree));
// console.log(shoot(testFour));
// console.log(shoot(testFive));
