const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const moons = lines.map((line) => {
    const [xPos, yPos, zPos] = line.split(',').map(Number);

    return {
        xPos,
        yPos,
        zPos,
        xVel: 0,
        yVel: 0,
        zVel: 0,
    };
});

function potentialEnergy(moon) {
    return Math.abs(moon.xPos) + Math.abs(moon.yPos) + Math.abs(moon.zPos);
}

function kineticEnergy(moon) {
    return Math.abs(moon.xVel) + Math.abs(moon.yVel) + Math.abs(moon.zVel);
}

function totalEnergy(moon) {
    return potentialEnergy(moon) * kineticEnergy(moon);
}

const maxIterations = 1000;

for (let i = 0; i < maxIterations; i++) {
    const newState = [];

    moons.forEach((moon, index) => {
        const thisMoon = moon;
        const otherMoons = moons.filter((_, x) => x !== index);

        const newMoon = { ...thisMoon };

        otherMoons.forEach((otherMoon) => {
            if (otherMoon.xPos > thisMoon.xPos) {
                newMoon.xVel += 1;
            } else if (otherMoon.xPos < thisMoon.xPos) {
                newMoon.xVel -= 1;
            }

            if (otherMoon.yPos > thisMoon.yPos) {
                newMoon.yVel += 1;
            } else if (otherMoon.yPos < thisMoon.yPos) {
                newMoon.yVel -= 1;
            }

            if (otherMoon.zPos > thisMoon.zPos) {
                newMoon.zVel += 1;
            } else if (otherMoon.zPos < thisMoon.zPos) {
                newMoon.zVel -= 1;
            }
        });

        newMoon.xPos += newMoon.xVel;
        newMoon.yPos += newMoon.yVel;
        newMoon.zPos += newMoon.zVel;

        newState.push(newMoon);
    });

    newState.forEach((x, index) => { moons[index] = x; });
}

let energy = 0;

moons.forEach((moon) => {
    energy += totalEnergy(moon);
});

console.log({ moons, energy });
