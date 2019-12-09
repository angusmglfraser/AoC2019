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

function* run(i, input) {
    const array = [...i];
    let programCounter = 0;
    let result = 0;

    let usedFirstInput = false;

    while (array[programCounter] !== 99) {
        const instructionCode = array[programCounter];

        const [opPart1, opPart2 = 0, mode1 = 0, mode2 = 0] = `${instructionCode}`.split('').reverse().map((x) => Number(x) || 0);


        const opCode = opPart1 + (opPart2 * 10);

        const param1 = array[programCounter + 1];
        const param2 = array[programCounter + 2];
        const param3 = array[programCounter + 3];


        const op1 = {
            0: array[param1],
            1: param1,
        }[mode1];

        const op2 = {
            0: array[param2],
            1: param2,
        }[mode2];


        let jump = 4;

        switch (opCode) {
        case ADD:
            array[param3] = op1 + op2;
            break;
        case MULTIPLY:
            array[param3] = op1 * op2;
            break;
        case READ:
            if (!usedFirstInput) {
                array[param1] = input;
                usedFirstInput = true;
            } else {
                array[param1] = yield;
            }
            jump = 2;
            break;
        case OUTPUT:
            yield array[param1];
            result = array[param1];
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
                array[param3] = 1;
            } else {
                array[param3] = 0;
            }
            break;
        case JUMP_IF_EQUAL:
            if (op1 === op2) {
                array[param3] = 1;
            } else {
                array[param3] = 0;
            }
            break;
        default: break;
        }

        programCounter += jump;
    }


    return result;
}

function runWithInputSequence(array) {
    let outputValue = 0;
    array.forEach((i) => {
        outputValue = run(arr, [i, outputValue]);
    });
    return outputValue;
}

function permutations(array) {
    if (array.length === 2) {
        return [
            [...array],
            [array[1], array[0]],
        ];
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const subarray = [...array];
        subarray.splice(i, 1);

        const perms = permutations(subarray);

        for (let j = 0; j < perms.length; j++) {
            result.push([element, ...perms[j]]);
        }
    }

    return result;
}


const orders = permutations([5, 6, 7, 8, 9]);

let max = -Infinity;
orders.forEach((order) => {
    const amplifiers = order.map((x) => run(arr, x));
    // amplifiers.forEach((amp) => {
    //     amp.next();
    // });
    let i = 0;
    let result = 0;
    let value;
    let done;

    const ampResults = [];

    while (!done) {
        ({ value, done } = amplifiers[i % order.length].next(result));
        if (value !== undefined) {
            result = value;
            ampResults[i % order.length] = value;
            i++;
        }
    }

    max = Math.max(ampResults[order.length - 1], max);
});

console.log({ max });
