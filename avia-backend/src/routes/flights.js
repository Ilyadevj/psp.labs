const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', flightsController.getAllFlights);
router.get('/:id', flightsController.getFlightById);
router.patch('/:id', flightsController.updateFlight);

module.exports = router;