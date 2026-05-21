export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Проверяем флаг isPaid, полученный с бэкенда
        const priceDisplay = data.isPaid ? `<span style="color: #22c55e;">Оплачен</span>` : data.price;

        return `
            <div class="flight-card">
                <div class="flight-price">${priceDisplay}</div>
                <div class="flight-route">${data.route}</div>
                <div class="flight-date">${data.date}</div>
                <div class="flight-time">${data.time}</div>
                <div class="flight-info">${data.info}</div>
                <button class="flight-book" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}