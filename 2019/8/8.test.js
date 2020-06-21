const {
  layerZeros,
  layerChecksum,
  combineRows,
  verifyImage,
  renderImage
} = require("./8");

test("layerZeros", () => {
  expect(layerZeros("000011230")).toEqual(5);
  expect(layerZeros("901011230")).toEqual(3);
});

test("layerChecksum", () => {
  expect(layerChecksum("000011230")).toEqual(2);
  expect(layerChecksum("9010112230")).toEqual(6);
});

test("part 1 testcase", () => {
  const test = "123456789012";
  expect(verifyImage(test, 3, 2)).toEqual(1);
});

test("combineRows", () => {
  expect(combineRows("22210102", "21022221")).toEqual("21010101");
});

test("part 2 testcase", () => {
  const test = "0222112222120000";
  expect(renderImage(test, 2, 2)).toStrictEqual("⬛️ ⬜️ \n⬜️ ⬛️ ");
});
