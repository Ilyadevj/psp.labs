const readline = require('readline');

function moveElement(arr, from, to) {
    if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) return [...arr];
    const result = [...arr];
    const [elementToMove] = result.splice(from, 1);
    result.splice(to, 0, elementToMove);
    return result;
}
console.log(moveElement([10, 20, 30, 40], 0, 2)); 


const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите массив через пробел (например: A B C D): ', (arrStr) => {
    rl.question('Индекс элемента, который двигаем (from): ', (from) => {
        rl.question('Индекс места, куда двигаем (to): ', (to) => {
            const userArr = arrStr.split(' ');
            const result = moveElement(userArr, parseInt(from), parseInt(to));
            console.log("Результат перемещения:", result);
            rl.close();
        });
    });
});