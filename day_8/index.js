const fs = require('fs');
const term = require('terminal-kit').terminal;

const input = fs.readFileSync('input.txt', 'utf-8').split('').map(Number);

const WIDTH = 25;
const HEIGHT = 6;

const layers = [];

for (let i = 0; i < input.length; i += WIDTH * HEIGHT) {
    layers.push(input.slice(i, i + WIDTH * HEIGHT));
}

const image = Array(WIDTH * HEIGHT).fill(2);

layers.reverse();

layers.forEach((layer) => {
    layer.forEach((pixel, i) => {
        if ([0, 1].includes(pixel)) {
            image[i] = pixel;
        }
    });
});

for (let i = 0; i < image.length; i++) {
    if (i % WIDTH === 0) {
        term('\n');
    }
    if (image[i] === 0) {
        term.blue('█');
    } else if (image[i] === 1) {
        term.red('█');
    }
}
