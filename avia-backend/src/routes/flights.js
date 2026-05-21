const express = require('express');
const router = express.Router();
const c = require('../controllers/flightsController');
router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.patch('/:id', c.update);
module.exports = router;