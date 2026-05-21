export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    // Вспомогательный метод для рендера правильной надписи цены
    getPriceHTML(data) {
        if (data.isPaid) {
            return `<span style="color: #22c55e;">Оплачен</span>`;
        }
        return data.price;
    }

    // Вспомогательный метод для рендера блока кнопок в зависимости от статуса
    getButtonsHTML(data) {
        if (data.isPaid) {
            // Если оплачен: Показываем зеленую кнопку "Оплачено" и красную "Отменить"
            return `
                <div class="d-flex gap-2 w-100">
                    <button class="btn btn-success" style="flex: 1; padding: 14px; border-radius: 16px; font-weight: 700; border: none;" disabled>
                        Оплачено
                    </button>
                    <button id="cancel-btn-${data.id}" class="btn btn-outline-danger" style="flex: 1; padding: 14px; border-radius: 16px; font-weight: 700;">
                        Отменить
                    </button>
                </div>
            `;
        }
        // Если не оплачен: Показываем одну синюю кнопку "Купить билет"
        return `
            <button id="buy-btn-${data.id}" class="search-btn w-100" style="padding: 14px 28px; border-radius: 16px; font-weight: 700; font-size: 16px; border: none;">
                Купить билет
            </button>
        `;
    }

    getHTML(data) {
        return `
            <div class="flight-card" style="max-width: 600px; margin: 0 auto; cursor: default; transform: none; box-shadow: var(--shadow);">
                <div class="flight-route" style="font-size: 24px; text-align: center;">${data.route}</div>
                
                <div class="flight-price" id="detail-price-${data.id}" style="font-size: 36px; text-align: center; margin: 16px 0;">
                    ${this.getPriceHTML(data)}
                </div>
                
                <div class="flight-date" style="font-size: 16px; text-align: center; margin-bottom: 24px;">Вылет: ${data.date} в ${data.time.split(' – ')[0]}</div>
                
                <div class="accordion" id="flightAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <strong>Информация о багаже</strong>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#flightAccordion">
                            <div class="accordion-body">
                                ${data.baggage}
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <strong>Условия возврата</strong>
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#flightAccordion">
                            <div class="accordion-body">
                                ${data.refund}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="button-container-${data.id}" class="mt-4 d-flex justify-content-center">
                    ${this.getButtonsHTML(data)}
                </div>
            </div>
        `;
    }

    addListeners(data) {
        // Запоминаем элементы DOM, чтобы обновлять их внутри слушателей
        const container = document.getElementById(`button-container-${data.id}`);
        const priceDisplay = document.getElementById(`detail-price-${data.id}`);

        // Код внутри этой функции мы вызываем каждый раз при обновлении кнопок,
        // чтобы "навесить" события на новые появившиеся в HTML кнопки.
        const attachEventListeners = () => {
            const buyBtn = document.getElementById(`buy-btn-${data.id}`);
            const cancelBtn = document.getElementById(`cancel-btn-${data.id}`);

            // === Логика кнопки Купить ===
            if (buyBtn) {
                buyBtn.addEventListener("click", async () => {
                    try {
                        buyBtn.innerText = "Обработка...";
                        buyBtn.disabled = true;

                        const response = await fetch(`http://localhost:3000/api/flights/${data.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ isPaid: true }) // Ставим флаг оплаты
                        });
                        if (!response.ok) throw new Error('Ошибка при оплате');

                        // Обновляем статус в данных (локально)
                        data.isPaid = true;

                        // Точечно обновляем HTML цены и кнопок
                        priceDisplay.innerHTML = this.getPriceHTML(data);
                        container.innerHTML = this.getButtonsHTML(data);

                        // Переподключаем слушатели для новых появившихся кнопок
                        attachEventListeners();

                    } catch (error) {
                        console.error('Ошибка:', error);
                        alert('Не удалось провести оплату.');
                        buyBtn.innerText = "Купить билет";
                        buyBtn.disabled = false;
                    }
                });
            }

            // === Логика кнопки Отменить ===
            if (cancelBtn) {
                cancelBtn.addEventListener("click", async () => {
                    try {
                        cancelBtn.innerText = "Отмена...";
                        cancelBtn.disabled = true;

                        const response = await fetch(`http://localhost:3000/api/flights/${data.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ isPaid: false }) // Снимаем флаг оплаты
                        });
                        if (!response.ok) throw new Error('Ошибка при отмене');

                        // Обновляем статус в данных (локально)
                        data.isPaid = false;

                        // Точечно обновляем HTML цены и кнопок
                        priceDisplay.innerHTML = this.getPriceHTML(data);
                        container.innerHTML = this.getButtonsHTML(data);

                        // Переподключаем слушатели для новых появившихся кнопок
                        attachEventListeners();

                    } catch (error) {
                        console.error('Ошибка:', error);
                        alert('Не удалось отменить оплату.');
                        cancelBtn.innerText = "Отменить";
                        cancelBtn.disabled = false;
                    }
                });
            }
        };

        // Запускаем подключение слушателей при первой отрисовке
        attachEventListeners();
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data);
    }
}