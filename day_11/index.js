const fs = require('fs');
const IntCode = require('../IntCode');

const array = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const computer = new IntCode(array, [0]);

const BLACK = 0;
const WHITE = 1;

const TURN_LEFT = 0;
const TURN_RIGHT = 1;

let x = 0;
let y = 0;

const visited = {
    [`${x},${y}`]: BLACK,
};

let gotColour = false;

let direction = 'up';

while (!computer.halted) {
    computer.step();

    if (computer.output !== undefined) {
        if (!gotColour) {
            const colour = computer.output;
            visited[`${x},${y}`] = colour;
            gotColour = true;
            console.log('here');
        } else {
            console.log('there');
            gotColour = false;
            const instruction = computer.output;

            switch (instruction) {
            case TURN_RIGHT:
                direction = {
                    up: 'right',
                    right: 'down',
                    down: 'left',
                    left: 'up',
                }[direction];
                break;

            case TURN_LEFT:
                direction = {
                    up: 'left',
                    left: 'down',
                    down: 'right',
                    right: 'up',
                }[direction];
                break;

            default: break;
            }

            computer.addInput(visited[`${x},${y}`]);

            switch (direction) {
            case 'up':
                y++; break;

            case 'down':
                y--; break;

            case 'left':
                x--; break;

            case 'right':
                x++; break;

            default: break;
            }

            if (visited[`${x},${y}`] === undefined) {
                visited[`${x},${y}`] = BLACK;
            }
        }

        computer.output = undefined;
    }
}
