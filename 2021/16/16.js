const fs = require("fs");
const R = require("ramda");

const getInput = (name) => fs.readFileSync(name, "utf-8");

const hexToBitMap = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const parseToBinaryString = R.compose(
  R.join(""),
  R.map((hex) => hexToBitMap[hex]),
  R.split("")
);

const spliceToInt = (count, chars) =>
  Number.parseInt(chars.splice(0, count).join(""), 2);

const parseBin = (bin) => {
  const chars = R.split("", bin);

  const version = spliceToInt(3, chars);
  const type = spliceToInt(3, chars);

  if (type === 4) {
    let value = "";
    while (true) {
      const [head, ...tail] = chars.splice(0, 5);

      value += R.join("", tail);

      if (head === "0") break;
    }
    return {
      packet: { version, type, value: Number.parseInt(value, 2) },
      rest: R.join("", chars),
    };
  }

  const lengthType = spliceToInt(1, chars);

  if (lengthType === 0) {
    const length = spliceToInt(15, chars);
    let subPacketContent = R.join("", chars.splice(0, length));

    const subPackets = [];
    while (subPacketContent.length > 0) {
      const { packet, rest } = parseBin(subPacketContent);
      subPackets.push(packet);
      subPacketContent = rest;
    }

    return {
      packet: { version, type, subPackets },
      rest: R.join("", chars),
    };
  }

  if (lengthType === 1) {
    const count = spliceToInt(11, chars);
    let subData = R.join("", chars);

    const subPackets = [];
    for (let i = 0; i < count; i++) {
      const { packet, rest } = parseBin(subData);

      subPackets.push(packet);
      subData = rest;
    }

    return {
      packet: { version, type, subPackets },
      rest: subData,
    };
  }
};

const parsePacket = R.compose(parseBin, parseToBinaryString);

const input = getInput("2021/16/input.txt");

const partOne = (input) => {
  const { packet: root } = parsePacket(input);

  const packetVersionSum = (packet) => {
    if (packet.value) return packet.version;
    return (
      packet.version +
      R.reduce(
        (acc, curr) => acc + packetVersionSum(curr),
        0,
        packet.subPackets
      )
    );
  };

  return packetVersionSum(root);
};

console.log(partOne(input));

const typeFunctions = {
  0: R.sum,
  1: R.product,
  2: (xs) => Math.min(...xs),
  3: (xs) => Math.max(...xs),
  5: ([a, b]) => (R.gt(a, b) ? 1 : 0),
  6: ([a, b]) => (R.lt(a, b) ? 1 : 0),
  7: ([a, b]) => (R.equals(a, b) ? 1 : 0),
};

const partTwo = (input) => {
  const { packet: root } = parsePacket(input);

  const packetCalculation = (packet) => {
    if (packet.value) return packet.value;

    const subValues = R.map(packetCalculation, packet.subPackets);

    return typeFunctions[packet.type](subValues);
  };

  return packetCalculation(root);
};

console.log(partTwo(input));
