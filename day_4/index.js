function isInOrder(num) {
  const str = `${num}`;

  const arr = str.split('').map(Number);

  for (let i = 0; i < arr.length - 1; i += 1) {
    if (arr[i] > arr[i + 1]) return false;
  }

  return true;
}

function hasAdjacents(num) {
  const str = `${num}`;

  return str.match(/(\d)\1/g);
}

function isValidPassword(num) {
  return isInOrder(num) && hasAdjacents(num);
}

const arr = [];

for (let i = 152085; i < 670283; i += 1) {
  if (isValidPassword(i)) arr.push(i);
}

console.log({ length: arr.length });
