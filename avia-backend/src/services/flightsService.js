const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (route, maxPrice, afterDay) => {
    let flights = fileService.readData(dataFilePath);
    
    // 1. Фильтр по маршруту
    if (route) {
        flights = flights.filter(flight => 
            flight.route.toLowerCase().includes(route.toLowerCase())
        );
    }

    // 2. Фильтр по цене (maxPrice уже является числом)
    if (maxPrice) {
        flights = flights.filter(flight => {
            const cleanPrice = parseFloat(flight.price.replace(/[^0-9]/g, ''));
            return cleanPrice < maxPrice;
        });
    }

    // 3. Фильтр по дате (afterDay уже является числом)
    if (afterDay !== undefined && !isNaN(afterDay)) {
        flights = flights.filter(flight => {
            const dayMatch = flight.date.match(/\d+/);
            if (dayMatch) {
                const flightDay = parseInt(dayMatch[0], 10);
                
                // Четкое математическое сравнение двух чисел
                return flightDay > afterDay; 
            }
            return false;
        });
    }
    
    return flights;
};

const findOne = (id) => {
    const flights = fileService.readData(dataFilePath);
    return flights.find(flight => flight.id === id);
};

const create = (flightData) => {
    const flights = fileService.readData(dataFilePath);
    const newId = flights.length > 0 ? Math.max(...flights.map(f => f.id)) + 1 : 1;
    
    const newFlight = { id: newId, ...flightData };
    flights.push(newFlight);
    fileService.writeData(dataFilePath, flights);
    
    return newFlight;
};

const update = (id, flightData) => {
    const flights = fileService.readData(dataFilePath);
    const index = flights.findIndex(f => f.id === id);
    
    if (index === -1) return null;
    
    flights[index] = { ...flights[index], ...flightData };
    fileService.writeData(dataFilePath, flights);
    
    return flights[index];
};

const remove = (id) => {
    const flights = fileService.readData(dataFilePath);
    const filteredFlights = flights.filter(f => f.id !== id);
    
    if (filteredFlights.length === flights.length) return false;
    
    fileService.writeData(dataFilePath, filteredFlights);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };