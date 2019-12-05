/* eslint-disable no-console */
const fs = require('fs');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);


function run(i) {
    const array = [...i];
    let programCounter = 0;

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
        case 1: array[param3] = op1 + op2;
            break;
        case 2: array[param3] = op1 * op2;
            break;
        case 3: array[param1] = 1;
            jump = 2;
            break;
        case 4: console.log(array[param1]);
            jump = 2;
            break;
        default: break;
        }

        programCounter += jump;
    }

    return array[0];
}

run(arr);
