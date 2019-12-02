const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

let programCounter = 0;

while (input[programCounter] !== 99) {
    const opcode = input[programCounter];
    const addr1 = input[programCounter + 1];
    const addr2 = input[programCounter + 2];
    const wrAddr = input[programCounter + 3];

    const op1 = input[addr1];
    const op2 = input[addr2];

    const result = {
        1: op1 + op2,
        2: op1 * op2,
    }[opcode];

    if (![1, 2].includes(opcode)) {
        console.log('error');
        break;
    }

    input[wrAddr] = result;

    console.log({
        opcode, addr1, addr2, wrAddr, op1, op2, result, input,
    });

    programCounter += 4;
}

console.log(input[0]);
