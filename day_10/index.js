const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const rows = input.split('\n').map((column) => column.split('').map((x) => x === '#'));


function getSlopes(row, column) {
    const slopes = {};

    for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
            if (!(r === row && c === column)) {
                if (rows[r][c]) {
                    const rise = r - row;
                    const run = c - column;

                    let index = `${run >= 0 ? '+' : '-'}${rise / run}`;
                    if (rise === 0) {
                        index = run > 0 ? '+0' : '-0';
                    }

                    if (slopes[index]) {
                        slopes[index].push([r, c]);
                    } else {
                        slopes[index] = [[r, c]];
                    }
                }
            }
        }
    }


    return slopes;
}

const row = 13;
const column = 11;

let slopes = Object.entries(getSlopes(row, column)).sort((obj1, obj2) => {
    const key1 = obj1[0];
    const key2 = obj2[0];

    const dir1 = key1[0];
    const dir2 = key2[0];

    if (dir1 === dir2) {
        const num1 = Number(key1.substring(1));
        const num2 = Number(key2.substring(1));

        return num1 - num2;
    }
    if (dir1 === '+') {
        return -1;
    }
    return 1;
});


let slopeCounter = 0;

slopes = slopes.map((entry) => {
    const [s, arr] = entry;

    const coordinates = [...arr].sort((a, b) => {
        const distance = (coords) => Math.abs(coords[0] - row) + Math.abs(coords[1] - column);

        return distance(a) - distance(b);
    });

    return [s, coordinates];
});


function printGrid(r, c) {
    for (let rowI = 0; rowI < rows.length; rowI++) {
        let str = '';
        for (let col = 0; col < rows.length; col++) {
            if (rowI === r && col === c) {
                str += '*';
            } else {
                str += `${Number(rows[rowI][col])}`;
            }
        }
        console.log(str);
    }

    console.log();
}


let counter = 0;
let coords;
while (counter < 200) {
    const slope = slopes[slopeCounter % slopes.length];
    const tmp = slope[1].shift();
    if (tmp) {
        counter++;
        coords = tmp;
        // printGrid(...coords);
    }

    slopeCounter++;
}


console.log({ coords });
