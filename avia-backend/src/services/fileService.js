const fs = require('fs');

class FlightsService {
    constructor() {
        this.dataPath = '';
        this.flights = [];
    }

    init(dataPath) {
        this.dataPath = dataPath;
        const fileContent = fs.readFileSync(this.dataPath, 'utf-8');
        this.flights = JSON.parse(fileContent);
    }

    getAll() {
        return this.flights;
    }

    getById(id) {
        return this.flights.find(f => f.id === id);
    }

    update(id, dataToUpdate) {
        const flightIndex = this.flights.findIndex(f => f.id === id);
        if (flightIndex === -1) return null;

        // Обновляем данные в памяти
        this.flights[flightIndex] = {
            ...this.flights[flightIndex],
            ...dataToUpdate
        };

        // Записываем в файл синхронно
        fs.writeFileSync(this.dataPath, JSON.stringify(this.flights, null, 2), 'utf-8');
        return this.flights[flightIndex];
    }
}

module.exports = new FlightsService();