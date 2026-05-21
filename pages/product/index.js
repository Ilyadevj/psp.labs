import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

async getData() {
        try {
            const response = await fetch(`http://localhost:3000/api/flights/${this.id}`);
            if (!response.ok) throw new Error('Билет не найден');
            return await response.json();
        } catch (error) {
            console.error('Ошибка сети:', error);
            return null;
        }
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

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        const data = await this.getData(); // Ждем данные от бэкенда
        
        if (data) {
            const product = new ProductComponent(this.pageRoot);
            product.render(data);
        } else {
            this.pageRoot.innerHTML = '<h3 style="text-align: center; margin-top: 50px;">Извините, информация о билете не найдена.</h3>';
        }
    }
}