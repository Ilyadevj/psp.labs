export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getPriceHTML(data) {
        if (data.isPaid) {
            return `<span style="color: #22c55e;">Оплачен</span>`;
        }
        return data.price;
    }

    getButtonsHTML(data) {
        if (data.isPaid) {
            return `
                <div class="d-flex gap-2 w-100">
                    <button class="btn btn-success" style="flex: 1; padding: 14px; border-radius: 16px; font-weight: 700; border: none; background: #22c55e; color: white;" disabled>
                        Оплачено
                    </button>
                    <button id="cancel-btn-${data.id}" class="btn btn-outline-danger" style="flex: 1; padding: 14px; border-radius: 16px; font-weight: 700; border: 2px solid #ef4444; color: #ef4444; background: white; cursor: pointer;">
                        Отменить
                    </button>
                </div>
            `;
        }
        return `
            <button id="buy-btn-${data.id}" class="search-btn w-100" style="padding: 14px 28px; border-radius: 16px; font-weight: 700; font-size: 16px; border: none; background: #2563eb; color: white; cursor: pointer;">
                Купить билет
            </button>
        `;
    }

    getHTML(data) {
        return `
            <div class="flight-card" style="max-width: 600px; margin: 0 auto; cursor: default; transform: none; box-shadow: var(--shadow); background: white; padding: 24px; border-radius: 24px;">
                <div class="flight-route" style="font-size: 24px; text-align: center; font-weight: 700;">${data.route}</div>
                
                <div class="flight-price" id="detail-price-${data.id}" style="font-size: 36px; text-align: center; margin: 16px 0; font-weight: 800;">
                    ${this.getPriceHTML(data)}
                </div>
                
                <div class="flight-date" style="font-size: 16px; text-align: center; margin-bottom: 24px; color: #64748b;">Вылет: ${data.date} в ${data.time.split(' – ')[0]}</div>
                
                <div class="accordion" id="flightAccordion" style="margin-top: 20px;">
                    <div style="margin-bottom: 12px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px;">
                        <strong>Информация о багаже:</strong> ${data.baggage}
                    </div>
                    <div style="margin-bottom: 12px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px;">
                        <strong>Условия возврата:</strong> ${data.refund}
                    </div>
                </div>

                <div id="button-container-${data.id}" class="mt-4 d-flex justify-content-center" style="margin-top: 24px;">
                    ${this.getButtonsHTML(data)}
                </div>
            </div>
        `;
    }

    addListeners(data) {
        const container = document.getElementById(`button-container-${data.id}`);
        const priceDisplay = document.getElementById(`detail-price-${data.id}`);

        const attachEventListeners = () => {
            const buyBtn = document.getElementById(`buy-btn-${data.id}`);
            const cancelBtn = document.getElementById(`cancel-btn-${data.id}`);

            // === Логика кнопки Купить ===
            if (buyBtn) {
                buyBtn.addEventListener("click", () => {
                    buyBtn.innerText = "Обработка...";
                    buyBtn.disabled = true;

                    setTimeout(() => {
                        // Меняем статус напрямую в объекте билета
                        data.isPaid = true;

                        // Перерисовываем элементы страницы билета
                        priceDisplay.innerHTML = this.getPriceHTML(data);
                        container.innerHTML = this.getButtonsHTML(data);
                        attachEventListeners();
                    }, 400); // Небольшая задержка анимации
                });
            }

            // === Логика кнопки Отменить ===
            if (cancelBtn) {
                cancelBtn.addEventListener("click", () => {
                    cancelBtn.innerText = "Отмена...";
                    cancelBtn.disabled = true;

                    setTimeout(() => {
                        // Снимаем оплату напрямую в объекте билета
                        data.isPaid = false;

                        // Перерисовываем элементы страницы билета
                        priceDisplay.innerHTML = this.getPriceHTML(data);
                        container.innerHTML = this.getButtonsHTML(data);
                        attachEventListeners();
                    }, 400);
                });
            }
        };

        attachEventListeners();
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data);
    }
}