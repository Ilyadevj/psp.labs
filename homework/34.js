const readline = require('readline');

function sortSentence(sentence) {
    const words = sentence.trim().split(/\s+/);
    const processedWords = words.map(word => {
        const sortedLetters = word.toLowerCase().split('').sort().join('');
        return sortedLetters.charAt(0).toUpperCase() + sortedLetters.slice(1);
    });
    return processedWords.sort().join(' ');
}

console.log(sortSentence("Медведь")); 

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите предложение для сортировки: ', (userSentence) => {
    console.log("Результат сортировки:", sortSentence(userSentence));
    rl.close();
});