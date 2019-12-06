const fs = require('fs');

const nodes = {};

const input = fs.readFileSync('input.txt', 'utf-8');

const arr = input.split('\n');

arr.forEach((entry) => {
    const [parent, child] = entry.split(')');

    if (!nodes[parent]) {
        nodes[parent] = { neighbours: [child], visited: false, value: Infinity };
    } else {
        nodes[parent].neighbours.push(child);
    }

    if (!nodes[child]) {
        nodes[child] = { neighbours: [parent], visited: false, value: Infinity };
    } else {
        nodes[child].neighbours.push(parent);
    }
});

nodes.YOU.value = 0;
nodes.YOU.visited = true;

const nodeSet = Object.values(nodes);

while (nodeSet.length > 0) {
    // find node with minimum distance
    let min = Infinity;
    let currentNode = nodeSet[0];
    let nodeIndex = 0;
    nodeSet.forEach((node, index) => {
        if (node.value < min) {
            min = node.value;
            currentNode = node;
            nodeIndex = index;
        }
    });

    nodeSet.splice(nodeIndex, 1);

    if (currentNode.neighbours.find((x) => x === 'SAN')) {
        // distance is off by one since the path is
        // supposed to be between orbits rather than planets
        console.log({ lengthToSanta: currentNode.value - 1 });
        break;
    }

    currentNode.neighbours.forEach((n) => {
        const neighbour = nodes[n];
        if (neighbour.visited) {
            neighbour.value = Math.min(neighbour.value, currentNode.value + 1);
        } else {
            neighbour.value = currentNode.value + 1;
            neighbour.visited = true;
        }
    });
}
