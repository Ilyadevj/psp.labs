class StockUrls {
    constructor() {
        // МЕНЯЕМ ТУТ: строго 127.0.0.1 вместо localhost
        this.baseUrl = 'http://127.0.0.1:3000'; 
    }

    getStocks() {
        return `${this.baseUrl}/api/flights`;
    }

    getStockById(id) {
        return `${this.baseUrl}/api/flights/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/api/flights`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/api/flights/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/api/flights/${id}`;
    }
}

export const stockUrls = new StockUrls();