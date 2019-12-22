const ADD = 1;
const MULTIPLY = 2;
const READ = 3;
const OUTPUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const LESS_THAN = 7;
const EQUAL = 8;
const ADD_TO_RELATIVE_BASE = 9;
const HALT = 99;

const IMMEDIATE = 1;
const ADDRESS = 0;
const RELATIVE = 2;

function IntCode(program = [], inputArray = [], options = {}) {
    const computer = {
        arr: program.slice(),
        input: inputArray,

        inputIndex: 0,
        programCounter: 0,
        relativeBase: 0,

        output: undefined,
        halted: false,

        waiting: false,

        suppressOutput: options.suppressOutput || false,

        getValue(index, mode = ADDRESS) {
            let readAddr;
            if (mode === ADDRESS) {
                readAddr = index;
            } else if (mode === RELATIVE) {
                readAddr = this.relativeBase + index;
            } else {
                return index;
            }

            this.arr[readAddr] = this.arr[readAddr] || 0;

            return this.arr[readAddr];
        },

        addInput(val) {
            this.input.push(val);
            this.waiting = false;
        },

        setValue(index, value, mode = ADDRESS) {
            let writeAddr;
            if (mode === ADDRESS) {
                writeAddr = index;
            } else {
                writeAddr = index + this.relativeBase;
            }

            this.arr[writeAddr] = value;
        },

        getInstruction(code) {
            const [opPart1, opPart2 = 0, mode1 = 0, mode2 = 0, mode3 = 0] = code.toString().split('').reverse().map(Number);

            const opCode = opPart1 + (10 * opPart2);

            return {
                opCode, mode1, mode2, mode3,
            };
        },

        step() {
            if (this.programCounter < this.arr.length && !(this.waiting || this.halted)) {
                const code = this.getValue(this.programCounter);
                const {
                    opCode, mode1, mode2, mode3,
                } = this.getInstruction(code);

                const param1 = this.getValue(this.programCounter + 1);
                const param2 = this.getValue(this.programCounter + 2);
                const param3 = this.getValue(this.programCounter + 3);
                let result;

                switch (opCode) {
                case ADD:
                    result = this.getValue(param1, mode1) + this.getValue(param2, mode2);
                    this.setValue(
                        param3,
                        result,
                        mode3,
                    );
                    this.programCounter += 4;
                    break;

                case MULTIPLY:
                    result = this.getValue(param1, mode1) * this.getValue(param2, mode2);
                    this.setValue(
                        param3,
                        result,
                        mode3,
                    );
                    this.programCounter += 4;
                    break;

                case READ:
                    if (this.inputIndex >= this.input.length) {
                        this.waiting = true;
                    } else {
                        this.waiting = false;
                        this.setValue(param1, this.input[this.inputIndex++], mode1);
                        this.programCounter += 2;
                    }
                    break;

                case OUTPUT:
                    this.output = this.getValue(param1, mode1);
                    if (!this.suppressOutput) {
                        console.log(this.output);
                    }
                    this.programCounter += 2;
                    break;

                case JUMP_IF_TRUE:
                    if (this.getValue(param1, mode1) !== 0) {
                        this.programCounter = this.getValue(param2, mode2);
                    } else {
                        this.programCounter += 3;
                    }
                    break;

                case JUMP_IF_FALSE:
                    if (this.getValue(param1, mode1) === 0) {
                        this.programCounter = this.getValue(param2, mode2);
                    } else {
                        this.programCounter += 3;
                    }
                    break;

                case LESS_THAN:
                    if (this.getValue(param1, mode1) < this.getValue(param2, mode2)) {
                        this.setValue(param3, 1, mode3);
                    } else {
                        this.setValue(param3, 0, mode3);
                    }
                    this.programCounter += 4;
                    break;

                case EQUAL:
                    if (this.getValue(param1, mode1) === this.getValue(param2, mode2)) {
                        this.setValue(param3, 1, mode3);
                    } else {
                        this.setValue(param3, 0, mode3);
                    }
                    this.programCounter += 4;
                    break;

                case ADD_TO_RELATIVE_BASE:
                    this.relativeBase += this.getValue(param1, mode1);
                    this.programCounter += 2;
                    break;

                case HALT:
                    this.halted = true; break;

                default:
                    console.log({ opCode, pc: this.programCounter });
                    break;
                }
            } else if (this.halted) {
                console.log('halted');
            } else if (this.waiting) {
                console.log('waiting');
            } else {
                console.error('something went wrong');
            }
        },

        run() {
            while (!(this.halted || this.waiting)) {
                this.step();
            }

            return this.output;
        },

        bigStep() {
            while (!(this.halted || this.waiting || this.output !== undefined)) {
                this.step();
            }
        },
    };

    return computer;
}

module.exports = IntCode;
