const flightsService = require('../services/flightsService');

const getAllFlights = (req, res) => {
    const { route, maxPrice, afterDay } = req.query; 


    const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
    const parsedAfterDay = afterDay ? parseInt(afterDay, 10) : undefined;

    const flights = flightsService.findAll(route, parsedMaxPrice, parsedAfterDay);
    res.json(flights);
};

const getFlightById = (req, res) => {
    const id = parseInt(req.params.id);
    const flight = flightsService.findOne(id);
    
    if (!flight) {
        return res.status(404).json({ error: 'Билет не найден' });
    }
    res.json(flight);
};

const createFlight = (req, res) => {
    const { price, route, date, time, info, baggage, refund } = req.body;
    
    if (!price || !route || !date) {
        return res.status(400).json({ error: 'Необходимые поля (price, route, date) не заполнены' });
    }
    
    const newFlight = flightsService.create({ price, route, date, time, info, baggage, refund });
    res.status(201).json(newFlight);
};

const updateFlight = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFlight = flightsService.update(id, req.body);
    
    if (!updatedFlight) {
        return res.status(404).json({ error: 'Билет не найден' });
    }
    res.json(updatedFlight);
};

const deleteFlight = (req, res) => {
    const id = parseInt(req.params.id);
    const success = flightsService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Билет не найден' });
    }
    res.status(204).send();
};

module.exports = { getAllFlights, getFlightById, createFlight, updateFlight, deleteFlight };