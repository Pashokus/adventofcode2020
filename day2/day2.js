// const fs = require('fs');

// const input = fs.readFileSync('day2input', 'utf8');

// const res = input.split('\n').filter((item) => {
//     const config = item.split(' ');

//     const targetLetter = config[1][0];
//     const letters = config[2].split('').filter(a => a === targetLetter);
//     const range = config[0].split('-');

//     return letters.length >= range[0] && letters.length <= range[1];
// });

// console.log(res.length);

const fs = require('fs');

const input = fs.readFileSync('day2input', 'utf8');

const res = input.split('\n').filter((item) => {
    const config = item.split(' ');

    const targetLetter = config[1][0];
    const letters = config[2].split('');
    const range = config[0].split('-');

    if (letters[range[0] - 1] === targetLetter && letters[range[1] - 1] === targetLetter) { 
        return false;
    }

    return letters[range[0] - 1] === targetLetter || letters[range[1] - 1] === targetLetter;
});

console.log(res.length);