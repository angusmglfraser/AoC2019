const fs = require('fs');
const IntCode = require('../IntCode');

const array = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const computer = new IntCode(array);

const BLACK = 0;
const WHITE = 1;

const TURN_LEFT = 0;
const TURN_RIGHT = 1;

let x = 0;
let y = 0;

const visited = {
    [`${x},${y}`]: BLACK,
};

const gotColour = false;

let direction = 'up';

while (!computer.halted) {
    if (visited[`${x},${y}`] === undefined) {
        visited[`${x},${y}`] = BLACK;
    }
    computer.addInput(visited[`${x},${y}`]);

    while (computer.output === undefined) {
        computer.step();
    }

    // get colour

    const { output: colour } = computer;
    computer.output = undefined;

    visited[`${x},${y}`] = colour;

    while (computer.output === undefined) {
        computer.step();
    }

    // get direction

    const { output: instruction } = computer;
    computer.output = undefined;

    switch (instruction) {
    case TURN_LEFT:
        direction = {
            up: 'left',
            left: 'down',
            down: 'right',
            right: 'up',
        }[direction];
        break;

    case TURN_RIGHT:
        direction = {
            up: 'right',
            right: 'down',
            down: 'left',
            left: 'up',
        }[direction];
        break;

    default: break;
    }

    switch (direction) {
    case 'up':
        y++;
        break;

    case 'down':
        y--;
        break;

    case 'left':
        x--;
        break;

    case 'right':
        x++;
        break;

    default: break;
    }

    while (!(computer.halted || computer.waiting)) {
        computer.step();
    }
}

console.log(Object.keys(visited).length);
