const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const rows = input.split('\n').map((column) => column.split('').map((x) => x === '#'));


function countVisible(row, column) {
    const slopes = {};

    for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
            if (!(r === row && c === column)) {
                if (rows[r][c]) {
                    const rise = r - row;
                    const run = c - column;

                    let index = `${run > 0 ? '+' : '-'}${rise / run}`;
                    if (rise === 0) {
                        index = run >= 0 ? '0' : '-0';
                    }

                    slopes[index] = `${r},${c}`;
                }
            }
        }
    }


    return Object.keys(slopes).length;
}


let max = -Infinity;

let maxCoord = [0, 0];


for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[row].length; column++) {
        if (rows[row][column]) {
            const value = countVisible(row, column);
            if (value > max) {
                max = value;
                maxCoord = [column, row];
            }
        }
    }
}

console.log({ maxCoord, max });
