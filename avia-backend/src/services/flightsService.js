const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = () => {
    return fileService.readData(dataFilePath);
};

const findOne = (id) => {
    const flights = fileService.readData(dataFilePath);
    return flights.find(flight => flight.id === id);
};

const update = (id, flightData) => {
    const flights = fileService.readData(dataFilePath);
    const index = flights.findIndex(f => f.id === id);
    
    if (index === -1) return null;
    
    flights[index] = { ...flights[index], ...flightData };
    fileService.writeData(dataFilePath, flights);
    
    return flights[index];
};

module.exports = { init, findAll, findOne, update };