const readline = require('readline');

function inverse(arr, offset = 0) {
    if (offset === 0) return [...arr].reverse();
    const result = [...arr];
    if (offset > 0) {
        const partToReverse = result.slice(offset).reverse();
        return [...result.slice(0, offset), ...partToReverse];
    } else {
        const absOffset = Math.abs(offset);
        const partToReverse = result.slice(0, result.length - absOffset).reverse();
        return [...partToReverse, ...result.slice(result.length - absOffset)];
    }
}

console.log("Обычный реверс [1, 2, 3]:", inverse([1, 2, 3])); // [3, 2, 1]
console.log("Реверс с пропуском первых двух [1, 2, 3, 4, 5], offset=2:", inverse([1, 2, 3, 4, 5], 2)); // [1, 2, 5, 4, 3]

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите массив элементов через пробел: ', (arrStr) => {
    rl.question('Введите число offset (0, положительное или отрицательное): ', (offset) => {
        const userArr = arrStr.split(' ');
        console.log("Результат инверсии:", inverse(userArr, parseInt(offset)));
        rl.close();
    });
});