/* eslint-disable no-console */
const fs = require('fs');
const IntCode = require('../IntCode');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);
const computer = new IntCode(arr, [5]);

computer.run();

console.log({ output: computer.output });
