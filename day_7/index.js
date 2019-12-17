const fs = require('fs');
const IntCode = require('../IntCode');

const arr = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

function runWithInputSequence(array) {
    let outputValue = 0;
    array.forEach((i) => {
        outputValue = new IntCode(arr, [i, outputValue]).run(arr, [i, outputValue]);
    });
    return outputValue;
}

function permutations(array) {
    if (array.length === 2) {
        return [
            [...array],
            [array[1], array[0]],
        ];
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const subarray = [...array];
        subarray.splice(i, 1);

        const perms = permutations(subarray);

        for (let j = 0; j < perms.length; j++) {
            result.push([element, ...perms[j]]);
        }
    }

    return result;
}

let max = -Infinity;
let maxOrder;

let orders = permutations([0, 1, 2, 3, 4]);

orders.forEach((order) => {
    const val = runWithInputSequence(order);
    if (val > max) {
        max = val;
        maxOrder = order;
    }
});

console.log('PART 1');

console.log({ max, maxOrder });


orders = permutations([5, 6, 7, 8, 9]);

max = -Infinity;
orders.forEach((order) => {
    const amplifiers = order.map((x) => new IntCode(arr, [x]));

    console.log({ amplifiers });

    amplifiers.forEach((amp) => amp.run());

    let i = 0;
    let result = 0;
    let halted;

    const ampResults = [];

    while (!halted) {
        const amp = amplifiers[i % order.length];

        amp.addInput(result);

        amp.run();

        ({ output: result, halted } = amp);

        ampResults[i % order.length] = result;

        amp.output = undefined;

        i += 1;
    }

    max = Math.max(ampResults[order.length - 1], max);

    console.log({ ampResults });
});

console.log({ max });
