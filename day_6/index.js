const fs = require('fs');

function countToRoot(object, key) {
    if (!object[key]) return 0;
    return 1 + countToRoot(object, object[key]);
}
const orbits = { com: null };

const input = fs.readFileSync('input.txt', 'utf-8');

const arr = input.split('\n');

arr.forEach((entry) => {
    const [parent, child] = entry.split(')');

    orbits[child] = parent;
});

let checkSum = 0;

Object.keys(orbits).forEach((orbit) => {
    if (orbits[orbit]) {
        checkSum += countToRoot(orbits, orbit);
    }
});

console.log({ checkSum });
