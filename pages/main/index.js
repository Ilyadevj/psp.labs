import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            { id: 1, price: '2 878 ₽', route: 'Москва — Сочи', date: '11 мая, пн', time: '16:50 – 20:35', info: '3.5 ч в пути / Прямой' },
            { id: 2, price: '5 382 ₽', route: 'Москва — Анталья', date: '12 мая, вт', time: '08:15 – 12:45', info: '4.5 ч в пути / Прямой' },
            { id: 3, price: '3 450 ₽', route: 'Москва — СПБ', date: '13 мая, ср', time: '09:30 – 11:00', info: '1.5 ч в пути / Прямой' },
            { id: 4, price: '4 990 ₽', route: 'Москва — Казань', date: '14 мая, чт', time: '13:20 – 15:10', info: '1.8 ч в пути / Прямой' },
            { id: 5, price: '6 750 ₽', route: 'Москва — Ереван', date: '15 мая, пт', time: '11:20 – 15:40', info: '4.2 ч в пути / Прямой' },
            { id: 6, price: '3 890 ₽', route: 'Москва — Мин. воды', date: '16 мая, сб', time: '08:45 – 11:30', info: '2.8 ч в пути / Прямой' }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="section-header">
                <h2 class="section-title">Горячие билеты</h2>
            </div>
            <div class="flights-grid" id="main-page"></div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}