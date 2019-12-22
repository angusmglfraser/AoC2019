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

const INITIAL_POSITION = moons.map((x) => ({ ...x }));

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

// part 2

INITIAL_POSITION.forEach((moon, i) => {
    moons[i] = { ...moon };
});

console.log({ moons });

const periods = {};

const isEqual = (state1, state2, axis) => {
    for (let i = 0; i < state1.length; i++) {
        const moon1 = state1[i];
        const moon2 = state2[i];

        const keys = [`${axis}Pos`, `${axis}Vel`];

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if (moon1[key] !== moon2[key]) {
                return false;
            }
        }
    }

    return true;
};

const totalNum = (p) => Math.min(...p.map((period) => Object.values(period).length));

let i = 0;
while (Object.values(periods).length !== 3) {
    const newState = [];

    // eslint-disable-next-line no-loop-func
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

    if (!periods.x && isEqual(INITIAL_POSITION, moons, 'x')) {
        periods.x = BigInt(i + 1);
    }

    if (!periods.y && isEqual(INITIAL_POSITION, moons, 'y')) {
        periods.y = BigInt(i + 1);
    }

    if (!periods.z && isEqual(INITIAL_POSITION, moons, 'z')) {
        periods.z = BigInt(i + 1);
    }

    i++;
}

console.log({ periods, i });


function greatestCommonDenominator(num1, num2) {
    if (num1 === BigInt(0)) return num2;
    if (num2 === BigInt(0)) return num1;

    return greatestCommonDenominator(num2, num1 % num2);
}

function lowestCommonMultiple(num1, num2) {
    return (num1 * num2) / greatestCommonDenominator(num1, num2);
}

function lcm(nums) {
    let result = BigInt(1);
    nums.forEach((num) => {
        result = lowestCommonMultiple(result, num);
    });
    return result;
}

const array = Object.values(periods);

const result = lcm(array);

console.log({ result });
