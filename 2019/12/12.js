const fs = require("fs");

const parseInput = input =>
  input.split("\n").map(row => {
    const [, x, y, z] = row.match(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/);
    return {
      x: Number(x),
      y: Number(y),
      z: Number(z),
      dx: 0,
      dy: 0,
      dz: 0
    };
  });

const applyGravityOnAxis = (a1, a2) => {
  const diff = a1 - a2;
  if (diff === 0) return 0;
  else if (diff > 0) return -1;
  return 1;
};

const applyGravity = (moon, otherMoon) => {
  moon.dx += applyGravityOnAxis(moon.x, otherMoon.x);
  moon.dy += applyGravityOnAxis(moon.y, otherMoon.y);
  moon.dz += applyGravityOnAxis(moon.z, otherMoon.z);
  return moon;
};

const applyVelocity = moon => {
  moon.x += moon.dx;
  moon.y += moon.dy;
  moon.z += moon.dz;
  return moon;
};

const applyVelocityAll = moons => moons.map(applyVelocity);

const moonEnergy = ({ x, y, z, dx, dy, dz }) =>
  (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) *
  (Math.abs(x) + Math.abs(y) + Math.abs(z));

const totalEnergy = moons =>
  moons.reduce((energy, moon) => energy + moonEnergy(moon), 0);

const moonSimulation = (input, steps = 1) => {
  const moons = parseInput(input);

  for (let step = 0; step < steps; step++) {
    for (let i = 0; i < moons.length; i++) {
      for (let j = 0; j < moons.length; j++) {
        if (i !== j) {
          moons[i] = applyGravity(moons[i], moons[j]);
        }
      }
    }
    applyVelocityAll(moons);
  }
  return { moons, energy: totalEnergy(moons) };
};

const applyGravityOnOneAxis = (moon, otherMoon) => {
  moon.speed += applyGravityOnAxis(moon.pos, otherMoon.pos);
  return moon;
};

const applyVelocityOneAxis = axis =>
  axis.map(a => {
    a.pos += a.speed;
    return a;
  });

const calculateAxisCycleTime = axis => {
  const initial = [...axis].map(a => ({ ...a }));

  let count = 0;
  while (true) {
    for (let i = 0; i < axis.length; i++) {
      for (let j = 0; j < axis.length; j++) {
        if (i !== j) {
          axis[i] = applyGravityOnOneAxis(axis[i], axis[j]);
        }
      }
    }
    axis = applyVelocityOneAxis(axis);
    count++;
    if (JSON.stringify(initial) === JSON.stringify(axis)) break;
  }
  return count;
};

const moonSimulationPart2 = input => {
  const moons = parseInput(input);

  const xAxis = moons.map(({ x, dx }) => ({ pos: x, speed: dx }));
  const yAxis = moons.map(({ y, dy }) => ({ pos: y, speed: dy }));
  const zAxis = moons.map(({ z, dz }) => ({ pos: z, speed: dz }));

  const xCycle = calculateAxisCycleTime(xAxis);
  const yCycle = calculateAxisCycleTime(yAxis);
  const zCycle = calculateAxisCycleTime(zAxis);

  return [xCycle, yCycle, zCycle];
};

if (process.env.NODE_ENV !== "test") {
  const input = fs.readFileSync("./12/input.txt").toString();

  console.log("part 1:", moonSimulation(input, 1000).energy);
  console.log("part 2: cycles: ", moonSimulationPart2(input));
  console.log("use least common multiple service to find answer");
}

module.exports = {
  moonSimulation
};
