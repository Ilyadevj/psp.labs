import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

async getData() {
        try {
            const response = await fetch('http://localhost:3000/api/flights');
            if (!response.ok) throw new Error('Ошибка при загрузке билетов');
            return await response.json();
        } catch (error) {
            console.error('Ошибка сети:', error);
            return []; 
        }
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

async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = await this.getData(); // Ждем данные от бэкенда
        
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}