import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = parseInt(id);
  }

  // 1. Этот метод делает асинхронный запрос к серверу
  getData() {
    const url = stockUrls.getStockById(this.id);

    ajax.get(url, (data, status) => {
      if (status === 200 && data) {
        // Как только сервер ответил — создаем компонент билета внутри нашего #product-page
        const product = new ProductComponent(this.pageRoot);

        // Вызываем render самого КОМПОНЕНТА билета (тот код, который ты скидывал)
        product.render(data);
      } else {
        if (this.pageRoot) {
          this.pageRoot.innerHTML = `<p style="text-align:center; color:red;">Ошибка загрузки данных рейса</p>`;
        }
      }
    });
  }

  get pageRoot() {
    return document.getElementById("product-page");
  }

  getHTML() {
    return `
            <div id="back-button-container" style="margin-bottom: 24px;"></div>
            <div id="product-page"><p style="text-align:center;">Загрузка информации...</p></div>
        `;
  }

  clickBack() {
    // Никаких window.location.href!
    // Просто перерисовываем главную страницу внутри текущей сессии
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  // 2. ВОТ ОН! Главный метод рендера самой СТРАНИЦЫ билета
  render() {
    // Очищаем главный контейнер приложения
    this.parent.innerHTML = "";

    // Вставляем каркас (контейнер для кнопки назад и контейнер для билета)
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    // Отрисовываем кнопку Назад
    const backButtonContainer = document.getElementById(
      "back-button-container",
    );
    const backButton = new BackButtonComponent(backButtonContainer);
    backButton.render(this.clickBack.bind(this));

    // Запускаем получение данных по сети. Когда они придут, отрисуется сам билет.
    this.getData();
  }
}
