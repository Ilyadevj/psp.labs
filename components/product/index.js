import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getButtonsHTML(data) {
    if (data.isPaid) {
      return `
            <div class="d-flex gap-2 w-100" style="margin-top: 32px; display: flex; gap: 12px;">
                <button type="button" class="btn btn-success" style="flex: 1; background: #22c55e; color: white; border: none; padding: 12px; border-radius: 12px; font-weight: 700; font-family: system-ui, -apple-system, sans-serif;" disabled>
                    Оплачено
                </button>
                <button id="cancel-btn-${data.id}" type="button" style="flex: 1; background: white; color: #ef4444; border: 2px solid #ef4444; padding: 12px; border-radius: 12px; font-weight: 700; font-family: system-ui, -apple-system, sans-serif; cursor: pointer;">
                    Отменить
                </button>
            </div>
        `;
    }
    return `
        <div class="w-100" style="margin-top: 32px;">
            <button id="buy-btn-${data.id}" type="button" style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 700; font-family: system-ui, -apple-system, sans-serif; background: #2563eb; color: white; border: none; cursor: pointer;">
                Купить билет
            </button>
        </div>
    `;
  }

  getHTML(data) {
    return `
            <div class="flight-card" style="max-width: 600px; margin: 0 auto; cursor: default; transform: none; box-shadow: var(--shadow); background: white; padding: 24px; border-radius: 24px;">
                <div class="flight-route" style="font-size: 24px; text-align: center; font-weight: 700;">${data.route}</div>
                
                <div class="flight-price" id="detail-price-${data.id}" style="font-size: 36px; text-align: center; margin: 16px 0; font-weight: 800; font-family: system-ui, -apple-system, sans-serif; transition: opacity 0.3s ease, transform 0.3s ease;">
                    ${data.isPaid ? `<span style="color: #22c55e;">Оплачен</span>` : data.price}
                </div>
                
                <div class="flight-date" style="font-size: 16px; text-align: center; margin-bottom: 24px; color: #64748b;">
                    Вылет: ${data.date} в ${data.time ? data.time.split(" – ")[0] : ""}
                </div>

                <div id="button-container-${data.id}" style="transition: opacity 0.3s ease, transform 0.3s ease;">
                    ${this.getButtonsHTML(data)}
                </div>
            </div>
        `;
  }

  updateWithAnimation(data, updatedData) {
    const container = document.getElementById(`button-container-${data.id}`);
    const priceDisplay = document.getElementById(`detail-price-${data.id}`);

    if (container && priceDisplay) {
      container.style.opacity = "0";
      container.style.transform = "translateY(10px)";
      priceDisplay.style.opacity = "0";
      priceDisplay.style.transform = "translateY(-10px)";

      setTimeout(() => {
        data.isPaid = updatedData.isPaid;

        priceDisplay.innerHTML = data.isPaid
          ? `<span style="color: #22c55e;">Оплачен</span>`
          : data.price;
        container.innerHTML = this.getButtonsHTML(data);

        this.addListeners(data);

        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
        priceDisplay.style.opacity = "1";
        priceDisplay.style.transform = "translateY(0)";
      }, 300);
    }
  }

  addListeners(data) {
    const buyBtn = document.getElementById(`buy-btn-${data.id}`);
    const cancelBtn = document.getElementById(`cancel-btn-${data.id}`);

    if (buyBtn) {
      buyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        buyBtn.innerHTML = `Обработка...`;
        buyBtn.disabled = true;

        const url = stockUrls.updateStockById(data.id);
        ajax.patch(url, { isPaid: true }, (updatedData, status) => {
          if (status === 200 && updatedData) {
            // Просто плавно меняем кнопку на "Оплачено" и "Отменить" прямо тут!
            // Никаких редиректов, пользователь остается смотреть на красивый билет
            this.updateWithAnimation(data, updatedData);
          } else {
            alert("Ошибка при оплате");
            buyBtn.innerHTML = `Купить билет`;
            buyBtn.disabled = false;
          }
        });
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        cancelBtn.innerHTML = `Отмена...`;
        cancelBtn.disabled = true;

        const url = stockUrls.updateStockById(data.id);
        ajax.patch(url, { isPaid: false }, (updatedData, status) => {
          if (status === 200 && updatedData) {
            // Просто плавно возвращаем кнопку "Купить билет" обратно
            this.updateWithAnimation(data, updatedData);
          } else {
            alert("Ошибка при отмене");
            cancelBtn.disabled = false;
          }
        });
      });
    }
  }
  render(data) {
    this.parent.innerHTML = "";
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data);
  }
}
