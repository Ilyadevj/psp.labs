const flightsService = require('../services/flightsService');

class FlightsController {
    // Получение всех рейсов (GET /api/flights)
    getAllFlights(req, res) {
        const flights = flightsService.getAll();
        res.status(200).json(flights);
    }

    // Получение одного рейса (GET /api/flights/:id)
    getFlightById(req, res) {
        const id = parseInt(req.params.id);
        const flight = flightsService.getById(id);
        if (!flight) {
            return res.status(404).json({ error: "Рейс не найден" });
        }
        res.status(200).json(flight);
    }

    // КРИТИЧНО: Обновление статуса оплаты (PATCH /api/flights/:id)
    updateFlight(req, res) {
        const id = parseInt(req.params.id);
        const { isPaid } = req.body; // Получаем { isPaid: true/false } из фронтенда

        // Вызываем сервис для перезаписи данных в flights.json
        const updatedFlight = flightsService.update(id, { isPaid });

        if (!updatedFlight) {
            return res.status(404).json({ error: "Рейс не найден для обновления" });
        }

        // ОБЯЗАТЕЛЬНО: Возвращаем измененный объект обратно фронтенду!
        res.status(200).json(updatedFlight);
    }
}

module.exports = new FlightsController();