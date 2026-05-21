const readline = require('readline');

function anagram(words) {
    const groups = {};
    for (const word of words) {
        const key = word.toLowerCase().split('').sort().join('');
        if (!groups[key]) groups[key] = [];
        groups[key].push(word);
    }
    const result = [];
    for (const key in groups) {
        if (groups[key].length >= 2) {
            result.push(groups[key].sort());
        }
    }
    return result.sort((a, b) => a[0].localeCompare(b[0]));
}

console.log(anagram(['ток', 'рост', 'кот', 'сорт', 'кто', 'тест'])); 

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите слова через пробел для поиска анаграмм: ', (wordsStr) => {
    const wordsList = wordsStr.split(' ').map(w => w.trim()).filter(w => w.length > 0);
    console.log("Найденные группы анаграмм:", anagram(wordsList));
    rl.close();
});