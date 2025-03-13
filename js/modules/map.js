import cities from '../data/cities.js';

const MapModule = {
    init() {
        this.map = L.map('map').setView([61.0042, 69.0019], 7); // Центр карты - Ханты-Мансийск
        this.markers = new Map();
        this.unlockedCities = new Set(['khanty-mansiysk']); // Изначально разблокирован только Ханты-Мансийск
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.renderCities();
        this.setupEventListeners();
    },

    renderCities() {
        // Очищаем существующие маркеры
        this.markers.forEach(marker => marker.remove());
        this.markers.clear();

        // Рендерим города на карте
        cities.forEach(city => {
            const isUnlocked = this.unlockedCities.has(city.id);
            const marker = this.createCityMarker(city, isUnlocked);
            this.markers.set(city.id, marker);
        });

        // Обновляем список городов в сайдбаре
        this.updateCityList();
    },

    createCityMarker(city, isUnlocked) {
        const icon = L.divIcon({
            className: `city-marker ${isUnlocked ? '' : 'locked'}`,
            html: `<img src="../assets/images/cities/${city.id}.png" alt="${city.name}">`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const marker = L.marker([city.coordinates.lat, city.coordinates.lng], { icon })
            .addTo(this.map)
            .bindPopup(this.createPopupContent(city, isUnlocked));

        return marker;
    },

    createPopupContent(city, isUnlocked) {
        return `
            <div class="city-popup">
                <h3>${city.name}</h3>
                ${isUnlocked ? 
                    `<a href="cities/city.html?id=${city.id}" class="city-button">Исследовать</a>` :
                    '<p class="locked-message">Город заблокирован</p>'
                }
            </div>
        `;
    },

    updateCityList() {
        const container = document.querySelector('.city-list');
        if (!container) return;

        container.innerHTML = cities.map(city => `
            <div class="city-item ${this.unlockedCities.has(city.id) ? '' : 'locked'}" data-city-id="${city.id}">
                <img class="city-icon" src="../assets/images/cities/${city.id}.png" alt="${city.name}">
                <span class="city-name">${city.name}</span>
                <img class="city-status" 
                     src="../assets/images/${this.unlockedCities.has(city.id) ? 'unlocked' : 'locked'}.png" 
                     alt="Статус">
            </div>
        `).join('');
    },

    setupEventListeners() {
        // Обработчик клика по городам в списке
        const cityList = document.querySelector('.city-list');
        if (cityList) {
            cityList.addEventListener('click', (e) => {
                const cityItem = e.target.closest('.city-item');
                if (!cityItem) return;

                const cityId = cityItem.dataset.cityId;
                if (this.unlockedCities.has(cityId)) {
                    window.location.href = `cities/city.html?id=${cityId}`;
                }
            });
        }

        // Обработчик разблокировки города
        const unlockButton = document.getElementById('unlockButton');
        if (unlockButton) {
            unlockButton.addEventListener('click', () => {
                const codeInput = document.getElementById('unlockCode');
                const code = codeInput.value.trim();
                this.tryUnlockCity(code);
            });
        }
    },

    tryUnlockCity(code) {
        // Здесь будет логика проверки кода и разблокировки города
        // Например, после прохождения квеста в Ханты-Мансийске
        // пользователь получает код для разблокировки следующего города
        if (code === 'SURGUT2024') {
            this.unlockedCities.add('surgut');
            this.renderCities();
            alert('Город Сургут разблокирован!');
        } else {
            alert('Неверный код');
        }
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    MapModule.init();
}); 