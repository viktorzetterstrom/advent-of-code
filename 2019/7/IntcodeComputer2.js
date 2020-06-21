class IntcodeComputer {
  constructor(intcodes, startingInput = []) {
    this.intcodes = [...intcodes];
    this.input = startingInput;
    this.instructionPointer = 0;
    this.output = [];
  }

  getNextIntcode() {
    return this.intcodes[this.instructionPointer++];
  }

  getValue(mode) {
    return mode === 1
      ? this.getNextIntcode()
      : this.intcodes[this.getNextIntcode()];
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

      const [opcode, , mode1 = 0, mode2 = 0] = Array.from(
        String(this.nextIntcode),
        Number
      ).reverse();
      switch (opcode) {
        case 1:
          this.doAddition(mode1, mode2);
          break;
        case 2:
          this.doMultiplication(mode1, mode2);
          break;
        case 3: {
          if (this.input.length === 0) {
            this.instructionPointer--;
            return this.exit(3);
          }
          this.handleInput();
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
          this.lessThan(mode1, mode2);
          break;
        case 8:
          this.equals(mode1, mode2);
          break;
        default:
          throw new Error(`bad opcode ${opcode} at ${this.instructionPointer}`);
      }
    }

    return this.exit(99);
  }

  doAddition(mode1, mode2) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getNextIntcode();

    this.intcodes[pos] = value1 + value2;
  }

  doMultiplication(mode1, mode2) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getNextIntcode();
    this.intcodes[pos] = value1 * value2;
  }

  handleInput() {
    const pos = this.getNextIntcode();
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

  lessThan(mode1, mode2) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getNextIntcode();
    if (value1 < value2) this.intcodes[pos] = 1;
    else this.intcodes[pos] = 0;
  }

  equals(mode1, mode2) {
    const value1 = this.getValue(mode1);
    const value2 = this.getValue(mode2);
    const pos = this.getNextIntcode();
    if (value1 === value2) this.intcodes[pos] = 1;
    else this.intcodes[pos] = 0;
  }
}

module.exports = IntcodeComputer;
