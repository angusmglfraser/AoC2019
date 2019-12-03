const fs = require('fs');

const map = {};

const input = fs.readFileSync('input.txt', 'utf-8');

const [row1, row2] = input.split('\n');

let x = 0; let y = 0;
let totalDist = 0;

row1.split(',').forEach((instr) => {
    const dir = instr[0];
    const dist = Number(instr.substring(1));

    for (let i = 0; i < dist; i += 1) {
        totalDist += 1;
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

        if (!map[mapIndex]) {
            map[mapIndex] = { row1: true, row1Dist: totalDist };
        }
    }
});

x = 0; y = 0; totalDist = 0;

row2.split(',').forEach((instr) => {
    const dir = instr[0];
    const dist = Number(instr.substring(1));

    for (let i = 0; i < dist; i += 1) {
        totalDist += 1;
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

        map[mapIndex].row2Dist = map[mapIndex].row2Dist || totalDist;
    }
});

console.log({ map });

const intersections = Object.keys(map).filter((key) => map[key].row1 && map[key].row2);

const distances = intersections.map((str) => {
    const obj = map[str];

    return obj.row1Dist + obj.row2Dist;
});

console.log({ intersections, distances });

console.log(Math.min(...distances));
