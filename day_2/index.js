const fs = require('fs');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);


function run(i) {
    const array = [...i];
    let programCounter = 0;

    while (array[programCounter] !== 99) {
        const opcode = array[programCounter];
        const addr1 = array[programCounter + 1];
        const addr2 = array[programCounter + 2];
        const wrAddr = array[programCounter + 3];

        const op1 = array[addr1];
        const op2 = array[addr2];

        const result = {
            1: op1 + op2,
            2: op1 * op2,
        }[opcode];

        if (![1, 2].includes(opcode)) {
            console.log('error');
            break;
        }

        array[wrAddr] = result;

        programCounter += 4;
    }

    return array[0];
}

let done = false;
for (let i = 0; i <= 99; i += 1) {
    for (let j = 0; j < 99; j += 1) {
        const input = [...arr];
        input[1] = i;
        input[2] = j;
        const result = run(input);
        if (result === 19690720) {
            console.log({ i, j, '100 * i + j': 100 * i + j });
            done = true;
            break;
        }
    }
    if (done) break;
}
