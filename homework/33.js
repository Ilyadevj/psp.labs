const readline = require('readline');

function flatten(arr) {
    let result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result.push(item);
        }
    }
    return result;
}

console.log(flatten([1, [2, 3], [[4, 5]]])); // [1, 2, 3, 4, 5]

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите вложенный массив в формате JSON (например: [1,[2,[3,4]]]): ', (jsonStr) => {
    try {
        const userArr = JSON.parse(jsonStr);
        console.log("Плоский массив:", flatten(userArr));
    } catch (e) {
        console.log("Ошибка! Введите корректную структуру массива в формате JSON.");
    }
    rl.close();
});