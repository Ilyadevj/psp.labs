const readline = require('readline');

function concatenate(arr, separator) {
    if (arr.length === 0) return '';
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result += separator + arr[i];
    }
    return result;
}

console.log(concatenate(['Красный', 'Зеленый', 'Синий'], ' -> '));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите элементы через запятую: ', (elementsStr) => {
    rl.question('Введите символ-разделитель: ', (separator) => {
        const userArray = elementsStr.split(',').map(item => item.trim());
        const result = concatenate(userArray, separator);
        console.log(`Результат склеивания: "${result}"`);
        rl.close();
    });
});