const hasTwoSameAdjacentDigits = number => /(\d)\1/.test(String(number));

const hasTwoSameAdjacentDigitsStrict = number =>
  /(\d)\1/.test(String(number).replace(/(\d)\1{2,}/g, ""));

const digitsDontDecrease = number => {
  const digits = Array.from(String(number), Number);
  for (let i = 1; i < digits.length; i += 1) {
    if (digits[i] < digits[i - 1]) return false;
  }
  return true;
};

if (process.env.NODE_ENV !== "test") {
  const MIN = 168630;
  const MAX = 718098;

  const meetsCriteriaPart1 = [];
  const meetsCriteriaPart2 = [];
  for (let candidate = MIN; candidate <= MAX; candidate += 1) {
    if (digitsDontDecrease(candidate)) {
      if (hasTwoSameAdjacentDigits(candidate))
        meetsCriteriaPart1.push(candidate);
      if (hasTwoSameAdjacentDigitsStrict(candidate))
        meetsCriteriaPart2.push(candidate);
    }
  }
  console.log(`part1: ${meetsCriteriaPart1.length}`);
  console.log(`part2: ${meetsCriteriaPart2.length}`);
}

module.exports = {
  hasTwoSameAdjacentDigits,
  hasTwoSameAdjacentDigitsStrict,
  digitsDontDecrease
};
