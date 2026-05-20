export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="flight-card" style="max-width: 600px; margin: 0 auto; cursor: default; transform: none; box-shadow: var(--shadow);">
                <div class="flight-route" style="font-size: 24px; text-align: center;">${data.route}</div>
                <div class="flight-price" style="font-size: 36px; text-align: center; margin: 16px 0;">${data.price}</div>
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

                <button class="search-btn" style="margin-top: 32px;" onclick="alert('Переход к оплате...')">Купить билет</button>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}