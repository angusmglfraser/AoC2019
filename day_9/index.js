const fs = require('fs');
const IntCode = require('../IntCode');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const computer = new IntCode(arr, [1]);

console.log('Part 1');

computer.run();


const computer2 = new IntCode(arr, [2]);

console.log('Part 2');

computer2.run();
