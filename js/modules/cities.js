import cities from '../data/cities.js';

const CitiesModule = {
    init() {
        this.renderCities();
        this.setupEventListeners();
    },

    renderCities() {
        const container = document.querySelector('.cities-grid');
        if (!container) return;

        container.innerHTML = cities.map(city => `
            <div class="city-card" data-city-id="${city.id}">
                <img class="city-image" src="assets/images/cities/${city.id}.jpg" alt="${city.name}" onerror="this.src='assets/images/cities/default.jpg'">
                <div class="city-content">
                    <h3 class="city-name">${city.name}</h3>
                    <p class="city-description">${city.description}</p>
                    ${city.population ? `
                        <div class="city-stats">
                            <span>Население: ${city.population.toLocaleString()}</span>
                            ${city.founded ? `<span>Основан: ${city.founded}</span>` : ''}
                        </div>
                    ` : ''}
                    <div class="city-actions">
                        ${city.id === 'khanty-mansiysk' ? 
                            `<a href="https://view.genially.com/67d7de5c5ae072424a4978da/interactive-content-hanty-mansijsk?id=${city.id}" class="city-button primary">Исследовать</a>` :
                            `<button class="city-button secondary" disabled>Скоро будет доступно</button>`
                        }
                    </div>
                </div>
                <div class="city-status ${city.id === 'khanty-mansiysk' ? 'available' : 'locked'}">
                    ${city.id === 'khanty-mansiysk' ? 'Доступно' : 'Заблокировано'}
                </div>
            </div>
        `).join('');
    },

    setupEventListeners() {
        const container = document.querySelector('.cities-grid');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const cityCard = e.target.closest('.city-card');
            if (!cityCard) return;

            const cityId = cityCard.dataset.cityId;
            if (cityId === 'khanty-mansiysk') {
                window.location.href = `pages/cities/city.html?id=${cityId}`;
            }
        });
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    CitiesModule.init();
}); 
