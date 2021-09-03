const { readFileSync } = require("fs");
const { ap } = require("ramda");

const input = readFileSync("2018/4/input.txt", { encoding: "utf-8" })
  .split("\n")
  .sort();

const parseRow = (row) => {
  const beginRegex =
    /\[\d+-\d+-\d+ \d+:(?<minute>\d+)\] Guard #(?<id>\d+) begins shift/;
  const wakeRegex = /\[\d+-\d+-\d+ \d+:(?<minute>\d+)\] wakes up/;
  const sleepRegex = /\[\d+-\d+-\d+ \d+:(?<minute>\d+)\] falls asleep/;

  if (beginRegex.test(row)) {
    return { ...beginRegex.exec(row).groups, event: "start" };
  }
  if (wakeRegex.test(row)) {
    return { ...wakeRegex.exec(row).groups, event: "wake" };
  }
  if (sleepRegex.test(row)) {
    return { ...sleepRegex.exec(row).groups, event: "sleep" };
  }
};

const solution = (input) => {
  let activeId;
  let sleepMinute;
  let asleep = false;

  let sleepPatterns = new Map();
  let sleepTotal = new Map();

  input.forEach((row) => {
    const { minute, id, event } = parseRow(row);

    if (event === "start") {
      activeId = id;
      asleep = false;
    }

    if (event === "sleep") {
      asleep = true;
      sleepMinute = minute;
    }

    if (event === "wake") {
      asleep = false;
      awakeMinute = minute;

      for (let i = sleepMinute; i < awakeMinute; i++) {
        const multiId = `${activeId}:${i}`;
        sleepPatterns.set(multiId, (sleepPatterns.get(multiId) || 0) + 1);
        sleepTotal.set(activeId, (sleepTotal.get(activeId) || 0) + 1);
      }
    }
  });

  const mostAsleepGuard = [...sleepTotal.entries()].reduce(
    (acc, [id, total]) => (total > acc.total ? { id, total } : acc),
    { id: null, total: 0 }
  );

  const mostAsleepMinute = [...sleepPatterns.entries()].reduce(
    (acc, [multiId, total]) => {
      const { id, minute } = /(?<id>\d+):(?<minute>\d+)/.exec(multiId).groups;
      if (total > acc.total && id === mostAsleepGuard.id)
        return { minute: Number(minute), total };
      return acc;
    },
    { minute: null, total: 0 }
  );
  const part1 = mostAsleepGuard.id * mostAsleepMinute.minute;

  const sleepiestMinute = [...sleepPatterns.entries()].reduce(
    (acc, [multiId, total]) => {
      const { id, minute } = /(?<id>\d+):(?<minute>\d+)/.exec(multiId).groups;
      if (total > acc.total)
        return { id: Number(id), total, minute: Number(minute) };
      return acc;
    },
    { id: null, minute: null, total: 0 }
  );

  const part2 = sleepiestMinute.id * sleepiestMinute.minute;
  return { part1, part2 };
};

const result = solution(input);
console.log("part1:", result.part1);
console.log("part2:", result.part2);
