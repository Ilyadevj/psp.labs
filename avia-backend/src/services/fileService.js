const fs = require('fs');
const path = require('path');

// Четкий путь к нашему JSON файлу
const filePath = path.join(__dirname, '../data/flights.json');

const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка при чтении flights.json:', error.message);
        return []; // Если файла нет, возвращаем пустоту
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка при записи в flights.json:', error.message);
    }
};

module.exports = {
    readData,
    writeData
};