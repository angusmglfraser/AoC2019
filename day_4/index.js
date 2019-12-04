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

  let i = 0;

  while (i < str.length - 1) {
    if (str[i] === str[i + 1]) {
      if (str[i] !== str[i + 2]) {
        return true;
      }
      let newIndex = i;

      while (str[newIndex] === str[i]) {
        newIndex += 1;
      }

      i = newIndex;
    } else {
      i += 1;
    }
  }

  return false;
}

function isValidPassword(num) {
  return isInOrder(num) && hasAdjacents(num);
}

const arr = [];

for (let i = 152085; i < 670283; i += 1) {
  if (isValidPassword(i)) arr.push(i);
}

console.log({ length: arr.length });
