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