const fs = require('fs');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const ADD = 1;
const MULTIPLY = 2;
const READ = 3;
const OUTPUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const JUMP_IF_LESS = 7;
const JUMP_IF_EQUAL = 8;
const ADD_TO_RELATIVE_BASE = 9;

function run(i) {
    const array = [...i];
    let programCounter = 0;
    let result = 0;

    let relativeBase = 0;

    // let counter = 0;


    while (array[programCounter] !== 99) {
        const instructionCode = array[programCounter];

        const [opPart1, opPart2 = 0, mode1 = 0, mode2 = 0, mode3 = 0] = `${instructionCode || 0}`.split('').reverse().map((x) => Number(x) || 0);


        const opCode = opPart1 + (opPart2 * 10);

        const param1 = array[programCounter + 1];
        const param2 = array[programCounter + 2];
        const param3 = array[programCounter + 3];


        const op1 = {
            0: array[param1] || 0,
            1: param1,
            2: array[relativeBase + param1] || 0,
        }[mode1];

        const op2 = {
            0: array[param2] || 0,
            1: param2,
            2: array[relativeBase + param2] || 0,
        }[mode2];

        const writeAddr = {
            0: param3,
            2: param3 + relativeBase,
        }[mode3];

        let jump = 4;

        switch (opCode) {
        case ADD:
            array[writeAddr] = op1 + op2;
            break;
        case MULTIPLY:
            array[writeAddr] = op1 * op2;
            break;
        case READ:
            array[writeAddr] = 1;
            jump = 2;
            break;
        case OUTPUT:
            if (mode1 === 0) {
                console.log(array[param1]);
                result = array[param1];
            } else if (mode1 === 2) {
                console.log(array[param1 + relativeBase]);
                result = array[param1 + relativeBase];
            } else {
                return NaN;
            }
            jump = 2;
            break;
        case JUMP_IF_TRUE:
            if (op1) {
                programCounter = op2;
                jump = 0;
            } else {
                jump = 3;
            }
            break;
        case JUMP_IF_FALSE:
            if (!op1) {
                programCounter = op2;
                jump = 0;
            } else {
                jump = 3;
            }
            break;
        case JUMP_IF_LESS:
            if (op1 < op2) {
                array[writeAddr] = 1;
            } else {
                array[writeAddr] = 0;
            }
            break;
        case JUMP_IF_EQUAL:
            if (op1 === op2) {
                array[writeAddr] = 1;
            } else {
                array[writeAddr] = 0;
            }
            break;
        case ADD_TO_RELATIVE_BASE:
            relativeBase += op1;
            jump = 2;
            break;
        default: break;
        }


        programCounter += jump;
    }


    return result;
}

run(arr);
