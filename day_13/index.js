const fs = require('fs');
const { terminal } = require('terminal-kit');
const IntCode = require('../IntCode');

const EMPTY = 0;
const WALL = 1;
const BLOCK = 2;
const HORIZONTAL_PADDLE = 3;
const BALL = 4;

const NEUTRAL_PADDLE = 0;
const LEFT_PADDLE = -1;
const RIGHT_PADDLE = 1;

const input = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const computer = new IntCode(input, [], { suppressOutput: true });

const grid = {};

let score = 0;
let paddleX = 0;
let ballX = 0;
let newBall = 0;

while (!computer.halted) {
    computer.bigStep();

    const x = computer.output;
    computer.output = undefined;

    computer.bigStep();

    const y = computer.output;
    computer.output = undefined;

    computer.bigStep();

    const block = computer.output;
    computer.output = undefined;


    if (x === -1 && y === 0) {
        score = block;
        terminal.saveCursor();
        terminal.moveTo(80, 80);
        terminal(score);
        terminal.restoreCursor();
    } else {
        grid[`${x},${y}`] = block;
        terminal.moveTo(x + 1, y + 2);
        switch (block) {
        case EMPTY:
            terminal.black('█');
            break;
        case WALL:
            terminal.white('█');
            break;
        case BLOCK:
            terminal.yellow('█');
            break;
        case HORIZONTAL_PADDLE:
            paddleX = x;
            terminal.white('█');
            break;
        case BALL:
            newBall = x;
            terminal.white('o');
            break;
        default: break;
        }

        if (newBall !== ballX) {
            ballX = newBall;
            if (ballX < paddleX) {
                computer.addInput(LEFT_PADDLE);
            } else if (ballX > paddleX) {
                computer.addInput(RIGHT_PADDLE);
            } else {
                computer.addInput(NEUTRAL_PADDLE);
            }
        }
    }

    computer.bigStep();
}

console.log({ score });
