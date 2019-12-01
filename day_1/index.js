const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const nums = input.split('\n').map(Number);

let total = 0;

nums.forEach((num) => {
  total += getFuelRequirement(num);
});

console.log({ total });

function getFuelRequirement(num) {
  let total = 0;
  let val = num;

  while (val > 0) {
    const fuel = Math.floor(val / 3) - 2;
    total += fuel > 0 ? fuel : 0;
    val = fuel;
  }

  return (total);
}
