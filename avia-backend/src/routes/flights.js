const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', flightsController.getAllFlights.bind(flightsController));
router.get('/:id', flightsController.getFlightById.bind(flightsController));
router.patch('/:id', flightsController.updateFlight.bind(flightsController));

module.exports = router;