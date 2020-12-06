const { loadInput, findHighestSeatId } = require("./5");

const testInput = loadInput("test-input.txt");
const highestId = 820;

describe("day 5 part 1", () => {
  it("finds highest seatid", () => {
    expect(findHighestSeatId(testInput)).toBe(highestId);
  });
});
