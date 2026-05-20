const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', flightsController.getAllFlights);
router.get('/:id', flightsController.getFlightById);
router.post('/', flightsController.createFlight);
router.patch('/:id', flightsController.updateFlight);
router.delete('/:id', flightsController.deleteFlight);

module.exports = router;