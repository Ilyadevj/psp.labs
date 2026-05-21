export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Красивый статус "ОПЛАЧЕН" без галочки, капсом, аккуратным шрифтом
        const priceOrStatusHTML = data.isPaid 
            ? `<span style="color: #22c55e; font-family: system-ui, -apple-system, sans-serif; font-weight: 700; letter-spacing: 0.5px;">ОПЛАЧЕН</span>` 
            : data.price;

        return `
            <div class="flight-card" id="flight-card-${data.id}" data-id="${data.id}" style="cursor: pointer;">
                <div class="flight-price">${priceOrStatusHTML}</div>
                <div class="flight-route">${data.route}</div>
                <div class="flight-date">${data.date}</div>
                <div class="flight-time">${data.time}</div>
                <div class="flight-info">${data.info || ''}</div>
                <button class="flight-book">Подробнее</button>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`flight-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}