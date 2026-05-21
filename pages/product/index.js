import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    // Получаем конкретный билет по ID через fetch
    async getData() {
        try {
            const response = await fetch(`/api/flights/${this.id}`);
            if (!response.ok) throw new Error('Билет не найден');
            
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка в ProductPage:', error);
        }
    }

    renderData(data) {
        const productPageRoot = document.getElementById('product-page');
        if (!productPageRoot) return;

        if (data) {
            const product = new ProductComponent(productPageRoot);
            product.render(data);
        } else {
            productPageRoot.innerHTML = '<h3 style="text-align: center; margin-top: 50px;">Билет не найден.</h3>';
        }
    }

    getHTML() {
        return `
            <div id="back-button-container" style="margin-bottom: 24px;"></div>
            <div id="product-page">Загрузка данных...</div>
        `;
    }

    clickBack() {
        new MainPage(this.parent).render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}