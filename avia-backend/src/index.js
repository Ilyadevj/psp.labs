const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
require('./services/flightsService').init(path.join(__dirname, 'data/flights.json'));
app.use('/api/flights', require('./routes/flights'));
app.listen(3000, () => console.log('Сервер на 3000 порту'));