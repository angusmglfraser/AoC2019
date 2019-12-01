const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8');

const nums = input.split('\n').map(Number);

let total = 0;

nums.forEach(num => {
    total += Math.floor(num / 3) - 2
});

console.log({total})
