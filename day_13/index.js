const fs = require('fs');
const IntCode = require('../IntCode');

const EMPTY = 0;
const WALL = 1;
const BLOCK = 2;
const HORIZONTAL_PADDLE = 3;
const BALL = 4;

const input = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const computer = new IntCode(input, []);

const grid = {};

while (!computer.halted) {
    while (computer.output === undefined) {
        computer.step();
    }

    const x = computer.output;
    computer.output = undefined;

    while (computer.output === undefined) {
        computer.step();
    }

    const y = computer.output;
    computer.output = undefined;

    while (computer.output === undefined) {
        computer.step();
    }

    const block = computer.output;
    computer.output = undefined;

    grid[`${x},${y}`] = block;

    while (!(computer.output !== undefined || computer.halted)) {
        computer.step();
    }
}

console.log({ blocks: Object.values(grid).filter((x) => x === BLOCK).length });
