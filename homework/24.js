const readline = require('readline');

function diff(arr1, arr2) {
    const searchSet = new Set(arr2);
    return arr1.filter(item => !searchSet.has(item));
}

console.log("Разность:", diff([1, 2, 3, 4], [2, 4, 6]));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите первый массив через пробел: ', (arr1Str) => {
    rl.question('Введите второй массив через пробел: ', (arr2Str) => {
        const arr1 = arr1Str.split(' ');
        const arr2 = arr2Str.split(' ');
        console.log("Элементы, которые есть в 1-м, но нет во 2-м:", diff(arr1, arr2));
        rl.close();
    });
})