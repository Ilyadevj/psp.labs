import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

getData() {
        const flights = {
            1: { id: 1, price: '2 878 ₽', route: 'Москва — Сочи', date: '11 мая, пн', time: '16:50 – 20:35', baggage: '🎒 Ручная кладь 5 кг (40x30x20 см). Багаж платно.', refund: '❌ Билет невозвратный' },
            2: { id: 2, price: '5 382 ₽', route: 'Москва — Анталья', date: '12 мая, вт', time: '08:15 – 12:45', baggage: '🧳 Багаж 20 кг включен + ручная кладь 10 кг.', refund: '⚠️ Возврат со штрафом 1500 ₽' },
            3: { id: 3, price: '3 450 ₽', route: 'Москва — СПБ', date: '13 мая, ср', time: '09:30 – 11:00', baggage: '🎒 Ручная кладь 10 кг.', refund: '❌ Билет невозвратный' },
            4: { id: 4, price: '4 990 ₽', route: 'Москва — Казань', date: '14 мая, чт', time: '13:20 – 15:10', baggage: '🧳 Багаж 10 кг включен.', refund: '✅ Полный возврат без штрафов' },
            5: { id: 5, price: '6 750 ₽', route: 'Москва — Ереван', date: '15 мая, пт', time: '11:20 – 15:40', baggage: '🧳 Багаж 23 кг включен.', refund: '⚠️ Возврат со штрафом 2000 ₽' },
            6: { id: 6, price: '3 890 ₽', route: 'Москва — Мин. воды', date: '16 мая, сб', time: '08:45 – 11:30', baggage: '🎒 Ручная кладь 10 кг.', refund: '✅ Полный возврат без штрафов' }
        };
        return flights[this.id];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="back-button-container" style="margin-bottom: 24px;"></div>
            <div id="product-page"></div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}