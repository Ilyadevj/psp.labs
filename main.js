import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { MainPage } from './pages/main/index.js';

// 3. Сюда переезжает UI-логика модалок и дропдаунов из script.js
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const from = document.getElementById('fromCity')?.value;
        const to = document.getElementById('toCity')?.value;
        if (from && to) alert(`✈️ Поиск билетов ${from} → ${to}`);
    });
}

const ostrovokLink = document.getElementById('ostrovokLink');
if (ostrovokLink) {
    ostrovokLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://ostrovok.ru', '_blank');
    });
}

// Модальные окна
const profileBtn = document.getElementById('profileBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registerLink = document.getElementById('registerLink');

if (profileBtn) profileBtn.addEventListener('click', (e) => { e.preventDefault(); loginModal?.classList.add('show'); });
if (closeModal) closeModal.addEventListener('click', () => loginModal?.classList.remove('show'));
if (closeRegisterModal) closeRegisterModal.addEventListener('click', () => registerModal?.classList.remove('show'));
if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal?.classList.remove('show');
        registerModal?.classList.add('show');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const flightTrigger = document.getElementById("dropdownTrigger");
    const flightMenu = document.getElementById("dropdownMenu");
    const flightTriggerText = document.getElementById("triggerText");

    if (flightTrigger && flightMenu) {
        let flightState = { adults: 1, children: 0, infants: 0, class: "Эконом" };
        flightTrigger.addEventListener("click", (e) => { e.stopPropagation(); flightMenu.classList.toggle("show"); });

        const updateFlightText = () => {
            const total = flightState.adults + flightState.children + flightState.infants;
            let word = total === 1 ? "пассажир" : (total > 1 && total < 5 ? "пассажира" : "пассажиров");
            flightTriggerText.innerText = `${total} ${word}, ${flightState.class.toLowerCase()}`;
        };

        const setupCounter = (plusId, minusId, valueId, stateKey, minVal) => {
            const plus = document.getElementById(plusId);
            const minus = document.getElementById(minusId);
            const value = document.getElementById(valueId);
            if (!plus || !minus || !value) return;

            plus.addEventListener("click", (e) => {
                e.stopPropagation(); flightState[stateKey]++; value.innerText = flightState[stateKey];
                minus.disabled = false; updateFlightText();
            });
            minus.addEventListener("click", (e) => {
                e.stopPropagation();
                if (flightState[stateKey] > minVal) {
                    flightState[stateKey]--; value.innerText = flightState[stateKey];
                    if (flightState[stateKey] === minVal) minus.disabled = true;
                    updateFlightText();
                }
            });
        };
        setupCounter("plusAdults", "minusAdults", "valueAdults", "adults", 1);
        setupCounter("plusChildren", "minusChildren", "valueChildren", "children", 0);
        setupCounter("plusInfants", "minusInfants", "valueInfants", "infants", 0);
    }

    const appContainer = document.getElementById('app');
    if (appContainer) {
        const mainPage = new MainPage(appContainer);
        mainPage.render();
    }
});