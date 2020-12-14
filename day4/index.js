const fs = require('fs');

const checkHexRegEx = new RegExp('^[#]([0-9]|[a-f]){6}$');
const passportIdRegEx = new RegExp('^[0-9]{9}$');

// from and to are array of two number which identify range. 
const isInRange = (year, [from, to]) => from <= year && year <= to;
const getRangeForHeight = (height) => { 
    if (height.includes('cm')) return [150, 193, height.split('cm')[0]]
    if (height.includes('in')) return [59, 76, height.split('in')[0]]

    return [];
}

const checkHeight = (height) => {
    const [from, to, value] = getRangeForHeight(height);

    if (!from || !to) { 
        return false;
    }

    return from <= value && value <= to;
};

const isValuidEyeColor = (color) => {
    const possibleColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    return possibleColors.some(possibleColor => possibleColor === color);
};

const fieldNames = Object.entries({
    byr: (year) => isInRange(year, [1920, 2002]),
    iyr: (year) => isInRange(year, [2010, 2020]),
    eyr: (year) => isInRange(year, [2020, 2030]),
    hgt: (height) => checkHeight(height),
    hcl: (color) => checkHexRegEx.test(color),
    ecl: (color) => isValuidEyeColor(color),
    pid: (passportId) => passportIdRegEx.test(passportId),
});

const input = fs.readFileSync('input', 'utf-8').split('\n\n');
const parsedInput = input
    .map((item) => item.split('\n').join(' ').split(' '))
    .map((item) => item.reduce((res, prop) => { 
        const [key, value] = prop.split(':');
        res[key] = value;
        return res;
    }, {}));

const res = parsedInput.filter((item) => {
    return fieldNames.every(([prop, validator]) => { 
        if (!item[prop]) { 
            return false;
        }

        return validator(item[prop]);
    })     
});

// const res = input
//     .filter(item => fieldNames.every(name => item.includes(name)));

console.log(res.length);