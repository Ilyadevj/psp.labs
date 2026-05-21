const readline = require('readline');

function rle(str) {
    if (!str) return '';
    let result = '';
    let count = 1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += str[i] + (count > 1 ? count : '');
            count = 1;
        }
    }
    return result;
}

console.log("RLE от 'AAAABBBCC':", rle('AAAABBBCC'));
console.log("RLE от 'XYZ':", rle('XYZ'));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите строку для RLE-сжатия (например, AAAAABBB): ', (userStr) => {
    console.log("Сжатая строка:", rle(userStr));
    rl.close();
});