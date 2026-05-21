const s = require('../services/flightsService');
module.exports = {
    getAll: (req, res) => res.json(s.findAll()),
    getOne: (req, res) => res.json(s.findOne(parseInt(req.params.id))),
    update: (req, res) => res.json(s.update(parseInt(req.params.id), req.body))
};