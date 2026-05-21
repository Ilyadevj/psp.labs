import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    // Запрос к бэкенду через fetch
    async getData() {
        try {
            const response = await fetch('/api/flights');
            if (!response.ok) throw new Error('Ошибка при получении списка билетов');
            
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка в MainPage:', error);
            this.parent.innerHTML = `<h3 style="color:red; text-align:center; margin-top:50px;">Не удалось загрузить билеты</h3>`;
        }
    }

    renderData(items) {
        const pageRoot = this.pageRoot;
        if (!pageRoot) return;
        pageRoot.innerHTML = ''; // Убираем надпись "Загрузка..."
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="section-header">
                <h2 class="section-title">Горячие билеты</h2>
            </div>
            <div class="flights-grid" id="main-page">Загрузка билетов...</div>
        `;
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        if (cardId) {
            const productPage = new ProductPage(this.parent, cardId);
            productPage.render();
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.getData();
    }
}