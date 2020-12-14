const fs = require('fs');

const input = fs.readFileSync('day3input', 'utf8').split('\n');
const map = input.map((item) => {
    const arr = new Array(input.length).fill(undefined);
    return arr.map(() => item).join('');
});

function countSlopes (arr, right, down) { 
    let rowCounter = 0;
    let treeCounter = 0;

    for (let i = 0; i < arr.length; i += down) {
        if (arr[i][rowCounter] === '#') { 
            treeCounter++;
        }

        rowCounter += right;
    }

    return treeCounter;
};

const ranges = [
    [3, 1],
    [1, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];

const res = ranges
    .map(([right, down]) => countSlopes(map, right, down))
    .reduce((res, el) => res * el, 1);

console.log(res);