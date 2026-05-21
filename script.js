const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const from = document.getElementById('fromCity')?.value;
        const to = document.getElementById('toCity')?.value;
        alert(`✈️ Поиск билетов ${from} → ${to}`);
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

let flightCount = 4;
const moreBtn = document.getElementById('moreFlightsBtn');
const grid = document.getElementById('hotFlightsGrid');
const additional = [
    { price: '6 750 ₽', route: 'Москва — Ереван', date: '15 мая, пт', time: '11:20 – 15:40', info: '4.2 ч / Прямой' },
    { price: '3 890 ₽', route: 'Москва — Мин. воды', date: '16 мая, сб', time: '08:45 – 11:30', info: '2.8 ч / Прямой' }
];
if (moreBtn) {
    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (flightCount < 6 && grid) {
            additional.forEach(f => {
                const card = document.createElement('div');
                card.className = 'flight-card';
                card.innerHTML = `
                    <div class="flight-price">${f.price}</div>
                    <div class="flight-route">${f.route}</div>
                    <div class="flight-date">${f.date}</div>
                    <div class="flight-time">${f.time}</div>
                    <div class="flight-info">${f.info}</div>
                    <button class="flight-book">Выбрать</button>
                `;
                grid.appendChild(card);
                flightCount++;
            });
            if (flightCount >= 6) moreBtn.style.display = 'none';
        }
    });
}

const hotelsGrid = document.getElementById('hotelsGrid');
if (hotelsGrid) {
    const hotels = [
        { icon: '🏨', name: 'Swissôtel Bosphorus', loc: 'Стамбул', price: '15 990 ₽', rating: '4.9' },
        { icon: '🌊', name: 'Four Seasons', loc: 'Стамбул', price: '32 500 ₽', rating: '4.8' },
        { icon: '🏛️', name: 'Sultanahmet', loc: 'Стамбул', price: '8 990 ₽', rating: '4.6' }
    ];
    hotels.forEach(h => {
        const item = document.createElement('div');
        item.className = 'hotel-item';
        item.innerHTML = `
            <div class="hotel-icon">${h.icon}</div>
            <h4>${h.name}</h4>
            <p>${h.loc}</p>
            <div class="hotel-price">${h.price}</div>
            <div class="hotel-rating">★ ${h.rating}</div>
            <button class="hotel-book-btn">Забронировать</button>
        `;
        hotelsGrid.appendChild(item);
    });
}

const profileBtn = document.getElementById('profileBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registerLink = document.getElementById('registerLink');

if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('show');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('show');
    });
}

if (closeRegisterModal) {
    closeRegisterModal.addEventListener('click', () => {
        registerModal.classList.remove('show');
    });
}

if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        registerModal.classList.add('show');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('show');
    }
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
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
if (registerForm) {
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
        registerModal.classList.remove('restration');
        registerForm.reset();

        loginModal.classList.add('show');
    });
}
// === КАСТОМНЫЕ ДРОПДАУНЫ ДЛЯ АВИАБИЛЕТОВ И ОТЕЛЕЙ ===
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Логика дропдауна АВИАБИЛЕТОВ ---
    const flightTrigger = document.getElementById("dropdownTrigger");
    const flightMenu = document.getElementById("dropdownMenu");
    const flightTriggerText = document.getElementById("triggerText");

    if (flightTrigger && flightMenu) {
        let flightState = { adults: 1, children: 0, infants: 0, class: "Эконом" };

        flightTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            flightMenu.classList.toggle("show");
        });

        // Функция обновления строки текста
        const updateFlightText = () => {
            const total = flightState.adults + flightState.children + flightState.infants;
            let word = "пассажиров";
            if (total === 1) word = "пассажир";
            else if (total > 1 && total < 5) word = "пассажира";
            flightTriggerText.innerText = `${total} ${word}, ${flightState.class.toLowerCase()}`;
        };

        // Обработчики для счетчиков авиабилетов
        const setupCounter = (plusId, minusId, valueId, stateKey, minVal) => {
            const plus = document.getElementById(plusId);
            const minus = document.getElementById(minusId);
            const value = document.getElementById(valueId);

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

        // Радиокнопки классов
        document.querySelectorAll('input[name="flightClass"]').forEach(radio => {
            radio.addEventListener("change", (e) => {
                flightState.class = e.target.value;
                updateFlightText();
            });
        });
    }

    // --- 2. Логика дропдауна ОТЕЛЕЙ ---
    const hotelTrigger = document.getElementById("hotelDropdownTrigger");
    const hotelMenu = document.getElementById("hotelDropdownMenu");
    const hotelTriggerText = document.getElementById("hotelTriggerText");

    if (hotelTrigger && hotelMenu) {
        let hotelState = { adults: 2, children: 0 };

        hotelTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
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

            if(flightTrigger && minus && flightMenu) {
                if (hotelState[stateKey] > minVal) minus.disabled = false;
            }

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

    // Глобальное закрытие всех окон при клике вне их области
    document.addEventListener("click", () => {
        if (flightMenu) flightMenu.classList.remove("show");
        if (hotelMenu) hotelMenu.classList.remove("show");
    });
});