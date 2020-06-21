class IntcodeComputer {
  constructor(
    intcodes,
    startingInput = [],
    instructionPointer = 0,
    relativeBase = 0
  ) {
    this.intcodes = [...intcodes, ...Array(1000).fill(0)];
    this.input = startingInput;
    this.instructionPointer = instructionPointer;
    this.relativeBase = relativeBase;
    this.output = [];
  }

  getNextIntcode() {
    return this.intcodes[this.instructionPointer++];
  }

  getValue(mode) {
    switch (mode) {
      case 0:
        return this.intcodes[this.getNextIntcode()];
      case 1:
        return this.getNextIntcode();
      case 2:
        return this.intcodes[this.getNextIntcode() + this.relativeBase];
      default:
        throw new Error(`bad mode at ${this.instructionPointer}`);
    }
  }

  getPos(mode) {
    return mode === 2
      ? this.getNextIntcode() + this.relativeBase
      : this.getNextIntcode();
  }

  exit(code) {
    const out = this.output;
    this.output = [];
    return {
      exit: code,
      out
    };
  }

  run(input = []) {
    this.input = [...this.input, ...input];

    while (this.instructionPointer < this.intcodes.length - 1) {
      this.nextIntcode = this.getNextIntcode();
      if (this.nextIntcode === 99) return this.exit(99);

      const [opcode, , mode1 = 0, mode2 = 0, mode3 = 0] = Array.from(
        String(this.nextIntcode),
        Number
      ).reverse();
      switch (opcode) {
        case 1:
          this.doAddition(mode1, mode2, mode3);
          break;
        case 2:
          this.doMultiplication(mode1, mode2, mode3);
          break;
        case 3: {
          if (this.input.length === 0) {
            this.instructionPointer--;
            return this.exit(3);
          }
          this.handleInput(mode1);
          break;
        }
        case 4:
          this.writeToOutput(mode1);
          break;
        case 5:
          this.jumpIfTrue(mode1, mode2);
          break;
        case 6:
          this.jumpIfFalse(mode1, mode2);
          break;
        case 7:
          this.lessThan(mode1, mode2, mode3);
          break;
        case 8:
          this.equals(mode1, mode2, mode3);
          break;
        case 9:
          this.adjustRelativeBase(mode1);
          break;
        default:
          throw new Error(`bad opcode ${opcode} at ${this.instructionPointer}`);
      }
    }

    return this.exit(99);
  }

  doAddition(mode1, mode2, mode3) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getPos(mode3);

    this.intcodes[pos] = value1 + value2;
  }

  doMultiplication(mode1, mode2, mode3) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getPos(mode3);
    this.intcodes[pos] = value1 * value2;
  }

  handleInput(mode) {
    const pos = this.getPos(mode);
    this.intcodes[pos] = this.input.shift();
  }

  writeToOutput(mode) {
    const value = this.getValue(mode);
    this.output.push(value);
  }

  jumpIfTrue(mode1, mode2) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    if (value1 !== 0) this.instructionPointer = value2;
  }

  jumpIfFalse(mode1, mode2) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    if (value1 === 0) this.instructionPointer = value2;
  }

  lessThan(mode1, mode2, mode3) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getPos(mode3);
    if (value1 < value2) this.intcodes[pos] = 1;
    else this.intcodes[pos] = 0;
  }

  equals(mode1, mode2, mode3) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getPos(mode3);
    if (value1 === value2) this.intcodes[pos] = 1;
    else this.intcodes[pos] = 0;
  }

  adjustRelativeBase(mode) {
    const value = this.getValue(mode);
    this.relativeBase += value;
  }

  clone() {
    return new IntcodeComputer(
      this.intcodes,
      [],
      this.instructionPointer,
      this.relativeBase
    );
  }
}

module.exports = IntcodeComputer;
