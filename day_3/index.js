const fs = require('fs');

const map = {};

const input = fs.readFileSync('input.txt', 'utf-8');

const [row1, row2] = input.split('\n');

let x = 0; let y = 0;

row1.split(',').forEach((instr) => {
    const dir = instr[0];
    const dist = Number(instr.substring(1));

    for (let i = 0; i < dist; i += 1) {
        switch (dir) {
        case 'U':
            y += 1;
            break;
        case 'D':
            y -= 1;
            break;
        case 'L':
            x -= 1;
            break;
        case 'R':
            x += 1;
            break;
        default: break;
        }

        const mapIndex = `${x},${y}`;

        map[mapIndex] = { row1: true };
    }
});

x = 0; y = 0;

row2.split(',').forEach((instr) => {
    const dir = instr[0];
    const dist = Number(instr.substring(1));

    for (let i = 0; i < dist; i += 1) {
        switch (dir) {
        case 'U':
            y += 1;
            break;
        case 'D':
            y -= 1;
            break;
        case 'L':
            x -= 1;
            break;
        case 'R':
            x += 1;
            break;
        default: break;
        }

        const mapIndex = `${x},${y}`;

        map[mapIndex] = { ...map[mapIndex] || {}, row2: true };
    }
});

console.log({ map });

const intersections = Object.keys(map).filter((key) => map[key].row1 && map[key].row2);

const distances = intersections.map((str) => {
    const [i, j] = str.split(',').map(Number);

    console.log({ i, j });

    return Math.abs(i) + Math.abs(j);
});

console.log({ intersections, distances });

console.log(Math.min(...distances));
