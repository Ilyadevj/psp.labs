import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  // Запрашиваем массив рейсов с бэкенда через классический XHR (XMLHttpRequest)
  getData() {
    const url = stockUrls.getStocks(); // Получит http://localhost:3000/api/flights

    ajax.get(url, (data, status) => {
      if (status === 200 && data) {
        // Если сервер успешно вернул данные — отправляем их на отрисовку
        this.renderData(data);
      } else {
        const container = document.getElementById("main-page-content");
        if (container) {
          container.innerHTML = `<p style="text-align:center; color:red;">Ошибка загрузки рейсов (Status: ${status})</p>`;
        }
      }
    });
  }

  // Функция перебора коллекции данных и отрисовки карточек
  renderData(items) {
    const container = document.getElementById("main-page-content");
    if (!container) return;

    container.innerHTML = ""; // Очищаем заглушку загрузки

    items.forEach((item) => {
      // Создаем экземпляр карточки для каждого рейса
      const productCard = new ProductCardComponent(container);
      // Рендерим карточку и передаем коллбэк клика
      productCard.render(item, this.clickCard.bind(this));
    });
  }

  // Слушатель клика по карточке для перехода на страницу "Подробнее"
  clickCard(e) {
    const cardId = e.currentTarget.dataset.id;
    // Передаем тот же самый родительский элемент
    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
  }

  getHTML() {
    return `
        <div class="container mt-5">
            <h1 class="text-center mb-4" style="font-weight: 800;">✈️ Доступные авиарейсы</h1>
            
            <div id="main-page-content" class="flight-cards-scroll">
                <p style="text-align:center; width: 100%;">Загрузка списка рейсов с сервера...</p>
            </div>
        </div>
    `;
  }

  render() {
    // Очищаем родительский контейнер перед отрисовкой структуры
    this.parent.innerHTML = "";

    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    // Запускаем единственный, чистый асинхронный запрос к серверу за рейсами
    this.getData();
  }
}
