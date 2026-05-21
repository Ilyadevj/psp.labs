const readline = require('readline');

function merge(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !(key in result)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

console.log(merge({a: 1, b: 2}, {b: 99, c: 3}));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
console.log("Введите два простых объекта в формате JSON (например: {\"x\":1} )");
rl.question('Объект 1: ', (obj1Str) => {
    rl.question('Объект 2: ', (obj2Str) => {
        try {
            const obj1 = JSON.parse(obj1Str);
            const obj2 = JSON.parse(obj2Str);
            console.log("Результат слияния (ранние значения в приоритете):", merge(obj1, obj2));
        } catch (e) {
            console.log("Ошибка! Неверный формат JSON.");
        }
        rl.close();
    });
});