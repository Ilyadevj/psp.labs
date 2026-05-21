const fs = require('fs');
const fileService = require('./fileService'); // если чтение файла вынесено туда

class FlightsService {
    constructor() {
        this.dataPath = '';
        this.flights = [];
    }

    init(dataPath) {
        this.dataPath = dataPath;
        // Читаем файл при старте сервера
        const fileContent = fs.readFileSync(this.dataPath, 'utf-8');
        this.flights = JSON.parse(fileContent);
    }

    getAll() {
        return this.flights;
    }

    getById(id) {
        return this.flights.find(f => f.id === id);
    }

    // Метод обновления флага оплаты
    update(id, dataToUpdate) {
        const flightIndex = this.flights.findIndex(f => f.id === id);
        if (flightIndex === -1) return null;

        // Обновляем состояние в оперативной памяти сервера
        this.flights[flightIndex] = {
            ...this.flights[flightIndex],
            ...dataToUpdate
        };

        // Записываем обновленный массив обратно в flights.json синхронно!
        fs.writeFileSync(this.dataPath, JSON.stringify(this.flights, null, 2), 'utf-8');

        // Возвращаем именно обновленный объект рейса
        return this.flights[flightIndex];
    }
}

module.exports = new FlightsService();