const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('').map(Number);

const WIDTH = 25;
const HEIGHT = 6;

const layers = [];

for (let i = 0; i < input.length; i += WIDTH * HEIGHT) {
    layers.push(input.slice(i, i + WIDTH * HEIGHT));
}

let minArray = layers[0];
let minLength = Infinity;

layers.forEach((layer) => {
    const subArray = layer.filter((x) => x === 0);
    if (subArray.length < minLength) {
        minLength = subArray.length;
        minArray = layer;
    }
});

const ones = minArray.filter((x) => x === 1).length;
const twos = minArray.filter((x) => x === 2).length;

console.log({ result: ones * twos });
