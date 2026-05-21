const flightsService = require('../services/flightsService');

const getAllFlights = (req, res) => {
    const flights = flightsService.findAll();
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

const updateFlight = (req, res) => {
    const id = parseInt(req.params.id);
    // Сюда прилетит { isPaid: true } или { isPaid: false } при нажатии кнопок Купить/Отменить
    const updatedFlight = flightsService.update(id, req.body);
    
    if (!updatedFlight) {
        return res.status(404).json({ error: 'Билет не найден' });
    }
    res.json(updatedFlight);
};

module.exports = {
    getAllFlights,
    getFlightById,
    updateFlight
};