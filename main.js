import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('app-root');
if (root) {
    const mainPage = new MainPage(root);
    mainPage.render();
}