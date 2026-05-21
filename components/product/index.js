export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getPriceHTML(data) {
        return data.isPaid ? `<span style="color: #22c55e;">Оплачен</span>` : data.price;
    }

    getButtonsHTML(data) {
        if (data.isPaid) {
            return `
                <div class="d-flex gap-2 w-100" style="height: 100%;">
                    <button class="btn btn-success" style="flex: 1; border-radius: 16px; font-weight: 700; border: none; background: #22c55e; color: white; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" disabled>
                        ✓ Оплачено
                    </button>
                    <button id="cancel-btn-${data.id}" class="btn btn-outline-danger" style="flex: 1; border-radius: 16px; font-weight: 700; border: 2px solid #ef4444; color: #ef4444; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
                        Отменить
                    </button>
                </div>`;
        }
        return `<button id="buy-btn-${data.id}" class="search-btn w-100" style="height: 100%; border-radius: 16px; font-weight: 700; font-size: 16px; border: none; background: #2563eb; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">Купить билет</button>`;
    }

    getHTML(data) {
        return `
            <div class="flight-card" style="max-width: 600px; margin: 0 auto; box-shadow: var(--shadow); background: white; padding: 24px; border-radius: 24px;">
                <div class="flight-route" style="font-size: 24px; text-align: center; font-weight: 700;">${data.route}</div>
                
                <div class="flight-price" id="detail-price-${data.id}" style="font-size: 36px; text-align: center; margin: 16px 0; font-weight: 800; height: 43px; display: flex; align-items: center; justify-content: center;">
                    ${this.getPriceHTML(data)}
                </div>
                
                <div class="flight-date" style="font-size: 16px; text-align: center; margin-bottom: 24px; color: #64748b;">Вылет: ${data.date} в ${data.time}</div>
                
                <div id="button-container-${data.id}" class="mt-4 w-100" style="height: 52px;">
                    ${this.getButtonsHTML(data)}
                </div>
            </div>`;
    }

    addListeners(data) {
        const container = document.getElementById(`button-container-${data.id}`);
        const priceDisplay = document.getElementById(`detail-price-${data.id}`);

        if (container && priceDisplay) {
            container.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            priceDisplay.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
        }

        const updateWithAnimation = async (updatedData) => {
            if (container && priceDisplay) {
                container.style.opacity = '0';
                container.style.transform = 'translateY(10px)';
                priceDisplay.style.opacity = '0';
                priceDisplay.style.transform = 'translateY(-10px)';
            }

            await new Promise(resolve => setTimeout(resolve, 300));

            data.isPaid = updatedData.isPaid;
            if (priceDisplay) priceDisplay.innerHTML = this.getPriceHTML(data);
            if (container) container.innerHTML = this.getButtonsHTML(data);
            attachEventListeners();

            if (container) void container.offsetWidth; 

            if (container && priceDisplay) {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
                priceDisplay.style.opacity = '1';
                priceDisplay.style.transform = 'translateY(0)';
            }
        };

        const attachEventListeners = () => {
            const buyBtn = document.getElementById(`buy-btn-${data.id}`);
            const cancelBtn = document.getElementById(`cancel-btn-${data.id}`);

            if (buyBtn) {
                buyBtn.addEventListener("click", async () => {
                    buyBtn.innerHTML = `<span class="spinner-border spinner-border-sm" style="margin-right: 8px;"></span> Ожидайте...`;
                    buyBtn.disabled = true;

                    await new Promise(resolve => setTimeout(resolve, 500));
                    buyBtn.innerHTML = `<span class="spinner-border spinner-border-sm" style="margin-right: 8px;"></span> Обработка...`;
                    
                    try {
                        const response = await fetch(`/api/flights/${data.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ isPaid: true })
                        });
                        const updated = await response.json();
                        await updateWithAnimation(updated);
                    } catch (e) { console.error(e); }
                });
            }

            if (cancelBtn) {
                cancelBtn.addEventListener("click", async () => {
                    cancelBtn.innerHTML = `<span class="spinner-border spinner-border-sm" style="margin-right: 8px;"></span> Ожидайте...`;
                    cancelBtn.disabled = true;

                    await new Promise(resolve => setTimeout(resolve, 500));
                    cancelBtn.innerHTML = `<span class="spinner-border spinner-border-sm" style="margin-right: 8px;"></span> Отмена...`;
                    
                    try {
                        const response = await fetch(`/api/flights/${data.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ isPaid: false })
                        });
                        const updated = await response.json();
                        await updateWithAnimation(updated);
                    } catch (e) { console.error(e); }
                });
            }
        };
        attachEventListeners();
    }

    render(data) {
        this.parent.innerHTML = this.getHTML(data);
        this.addListeners(data);
    }
}