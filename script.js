import { MainPage } from './pages/main/index.js';

// === 1. ПОИСК АВИАБИЛЕТОВ И ПЕРЕХОДЫ ===
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const from = document.getElementById('fromCity')?.value;
        const to = document.getElementById('toCity')?.value;
        if (from && to) {
            alert(`✈️ Поиск билетов ${from} → ${to}`);
        } else {
            alert('❌ Заполните города вылета и прибытия');
        }
    });
}

const ostrovokLink = document.getElementById('ostrovokLink');
if (ostrovokLink) {
    ostrovokLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://ostrovok.ru', '_blank');
    });
}

const hotelBannerBtn = document.getElementById('hotelBannerBtn');
if (hotelBannerBtn) {
    hotelBannerBtn.addEventListener('click', () => {
        window.location.href = 'hotels.html';
    });
}

// === 2. МОДАЛЬНЫЕ ОКНА (ВХОД И РЕГИСТРАЦИЯ) ===
const profileBtn = document.getElementById('profileBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registerLink = document.getElementById('registerLink');

if (profileBtn && loginModal) {
    profileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('show');
    });
}

if (closeModal && loginModal) {
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('show');
    });
}

if (closeRegisterModal && registerModal) {
    closeRegisterModal.addEventListener('click', () => {
        registerModal.classList.remove('show');
    });
}

if (registerLink && loginModal && registerModal) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        registerModal.classList.add('show');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.remove('show');
    if (e.target === registerModal) registerModal.classList.remove('show');
});

// Отправка форм
const loginForm = document.getElementById('loginForm');
if (loginForm && loginModal) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (email && password) {
            alert(`✅ Добро пожаловать!\n\nEmail: ${email}\nВы успешно вошли в профиль!`);
            loginModal.classList.remove('show');
            loginForm.reset();
        } else {
            alert('❌ Пожалуйста, заполните все поля');
        }
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm && registerModal && loginModal) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        if (!name || !email || !password || !confirmPassword) {
            alert('❌ Пожалуйста, заполните все поля');
            return;
        }
        if (password !== confirmPassword) {
            alert('❌ Пароли не совпадают');
            return;
        }
        if (password.length < 6) {
            alert('❌ Пароль должен содержать минимум 6 символов');
            return;
        }
        
        alert(`✅ Регистрация успешна!\n\nИмя: ${name}\nEmail: ${email}\n\nТеперь вы можете войти в профиль!`);
        registerModal.classList.remove('show');
        registerForm.reset();
        loginModal.classList.add('show');
    });
}

// === 3. КАСТОМНЫЕ ДРОПДАУНЫ (ПАССАЖИРЫ И КЛАССЫ) ===
document.addEventListener("DOMContentLoaded", () => {
    
    // Дропдаун авиабилетов
    const flightTrigger = document.getElementById("dropdownTrigger");
    const flightMenu = document.getElementById("dropdownMenu");
    const flightTriggerText = document.getElementById("triggerText");

    if (flightTrigger && flightMenu) {
        let flightState = { adults: 1, children: 0, infants: 0, class: "Эконом" };

        flightTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            if (hotelMenu) hotelMenu.classList.remove("show");
            flightMenu.classList.toggle("show");
        });

        const updateFlightText = () => {
            const total = flightState.adults + flightState.children + flightState.infants;
            let word = "пассажиров";
            if (total === 1) word = "пассажир";
            else if (total > 1 && total < 5) word = "пассажира";
            flightTriggerText.innerText = `${total} ${word}, ${flightState.class.toLowerCase()}`;
        };

        const setupCounter = (plusId, minusId, valueId, stateKey, minVal) => {
            const plus = document.getElementById(plusId);
            const minus = document.getElementById(minusId);
            const value = document.getElementById(valueId);

            if (!plus || !minus || !value) return;

            plus.addEventListener("click", (e) => {
                e.stopPropagation();
                flightState[stateKey]++;
                value.innerText = flightState[stateKey];
                minus.disabled = false;
                updateFlightText();
            });

            minus.addEventListener("click", (e) => {
                e.stopPropagation();
                if (flightState[stateKey] > minVal) {
                    flightState[stateKey]--;
                    value.innerText = flightState[stateKey];
                    if (flightState[stateKey] === minVal) minus.disabled = true;
                    updateFlightText();
                }
            });
        };

        setupCounter("plusAdults", "minusAdults", "valueAdults", "adults", 1);
        setupCounter("plusChildren", "minusChildren", "valueChildren", "children", 0);
        setupCounter("plusInfants", "minusInfants", "valueInfants", "infants", 0);

        document.querySelectorAll('input[name="flightClass"]').forEach(radio => {
            radio.addEventListener("change", (e) => {
                flightState.class = e.target.value;
                updateFlightText();
            });
        });
    }

    // Дропдаун отелей
    const hotelTrigger = document.getElementById("hotelDropdownTrigger");
    const hotelMenu = document.getElementById("hotelDropdownMenu");
    const hotelTriggerText = document.getElementById("hotelTriggerText");

    if (hotelTrigger && hotelMenu) {
        let hotelState = { adults: 2, children: 0 };

        hotelTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            if (flightMenu) flightMenu.classList.remove("show");
            hotelMenu.classList.toggle("show");
        });

        const updateHotelText = () => {
            let text = `${hotelState.adults} взрослых`;
            if (hotelState.adults === 1) text = `1 взрослый`;
            if (hotelState.children > 0) {
                text += ` + ${hotelState.children} ${hotelState.children === 1 ? 'ребёнок' : 'детей'}`;
            }
            hotelTriggerText.innerText = text;
        };

        const setupHotelCounter = (plusId, minusId, valueId, stateKey, minVal) => {
            const plus = document.getElementById(plusId);
            const minus = document.getElementById(minusId);
            const value = document.getElementById(valueId);

            if (!plus || !minus || !value) return;

            plus.addEventListener("click", (e) => {
                e.stopPropagation();
                hotelState[stateKey]++;
                value.innerText = hotelState[stateKey];
                minus.disabled = false;
                updateHotelText();
            });

            minus.addEventListener("click", (e) => {
                e.stopPropagation();
                if (hotelState[stateKey] > minVal) {
                    hotelState[stateKey]--;
                    value.innerText = hotelState[stateKey];
                    if (hotelState[stateKey] === minVal) minus.disabled = true;
                    updateHotelText();
                }
            });
        };

        setupHotelCounter("hotelPlusAdults", "hotelMinusAdults", "hotelValueAdults", "adults", 1);
        setupHotelCounter("hotelPlusChildren", "hotelMinusChildren", "hotelValueChildren", "children", 0);
    }

    // Глобальное закрытие кликом мимо
    document.addEventListener("click", () => {
        if (flightMenu) flightMenu.classList.remove("show");
        if (hotelMenu) hotelMenu.classList.remove("show");
    });

    const appContainer = document.getElementById('app'); 
    if (appContainer) {
        const mainPage = new MainPage(appContainer);
        mainPage.render();
    }
});