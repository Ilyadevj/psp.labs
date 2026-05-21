const express = require('express');
const path = require('path');
const cors = require('cors'); 
const flightsRouter = require('./routes/flights');
const flightsService = require('./services/flightsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/flights.json');

// Инициализируем базу данных
try {
    console.log('[БЭКЕНД] Инициализация базы данных...');
    flightsService.init(DATA_FILE_PATH);
    console.log('[БЭКЕНД] База данных успешно загружена');
} catch (error) {
    console.error('[КРИТИЧЕСКАЯ ОШИБКА БД]:', error);
}

// Настройка CORS и парсера JSON
app.use(cors());
app.use(express.json());

// Логгер запросов в консоль
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключаем твои роуты авиарейсов
app.use('/api/flights', flightsRouter);

// Обработка несуществующих маршрутов
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный обработчик ошибок сервера
app.use((err, req, res, next) => {
    console.error('[ОШИБКА СЕРВЕРА]:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск прослушивания порта
app.listen(PORT, () => {
    console.log(`✈️  Avia Backend запущен и стабильно работает по адресу http://localhost:${PORT}`);
});