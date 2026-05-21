const fileService = require('./fileService');

const findAll = () => {
    return fileService.readData();
};

const findOne = (id) => {
    const flights = fileService.readData();
    return flights.find(flight => flight.id === id);
};

const update = (id, updatedData) => {
    const flights = fileService.readData();
    const index = flights.findIndex(flight => flight.id === id);
    
    if (index === -1) {
        return null;
    }
    
    // Обновляем данные билета (например, меняем isPaid)
    flights[index] = { ...flights[index], ...updatedData };
    
    // Сохраняем обновленный массив обратно в JSON-файл
    fileService.writeData(flights);
    
    return flights[index];
};

module.exports = {
    findAll,
    findOne,
    update
};