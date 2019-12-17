const fs = require('fs');
const IntCode = require('../IntCode');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

arr[1] = 12;
arr[2] = 2;

const computer = new IntCode(arr);

computer.run();

console.log(computer.arr[0]);
