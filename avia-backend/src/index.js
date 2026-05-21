const express = require('express');
const path = require('path');
const cors = require('cors'); 
const flightsRouter = require('./routes/flights');
const flightsService = require('./services/flightsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/flights.json');

// Инициализация базы данных
try {
    console.log('[БЭКЕНД] Инициализация базы данных...');
    flightsService.init(DATA_FILE_PATH);
    console.log('[БЭКЕНД] База данных успешно загружена');
} catch (error) {
    console.error('[КРИТИЧЕСКАЯ ОШИБКА] Не удалось запустить базу данных:', error);
}

app.use(cors());
app.use(express.json());

// Логгер запросов в консоль терминала
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключаем роуты
app.use('/api/flights', flightsRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера (ПОСЛЕДНЯЯ СТРОЧКА В ФАЙЛЕ!)
app.listen(PORT, () => {
    console.log(`✈️  Avia Backend запущен по адресу http://localhost:${PORT}`);
});