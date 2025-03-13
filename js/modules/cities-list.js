import cities from '../data/cities.js';

const CitiesListModule = {
    init() {
        this.cities = [...cities];
        this.filteredCities = [...cities];
        this.currentSort = 'name';
        this.currentSearch = '';

        this.renderCities();
        this.setupEventListeners();
    },

    renderCities() {
        const container = document.querySelector('.cities-grid');
        if (!container) return;

        container.innerHTML = this.filteredCities.map(city => `
            <div class="city-card" data-city-id="${city.id}">
                <img class="city-image" 
                     src="../assets/images/cities/${city.id}.jpg" 
                     alt="${city.name}"
                     onerror="this.src='../assets/images/cities/default.jpg'">
                <div class="city-content">
                    <h3 class="city-name">${city.name}</h3>
                    ${city.description ? `
                        <p class="city-description">${city.description}</p>
                    ` : ''}
                    ${city.population ? `
                        <div class="city-stats">
                            <span>Население: ${city.population.toLocaleString()}</span>
                            ${city.founded ? `<span>Основан: ${city.founded}</span>` : ''}
                        </div>
                    ` : ''}
                    <div class="city-actions">
                        ${city.id === 'khanty-mansiysk' ? 
                            `<a href="cities/city.html?id=${city.id}" class="city-button primary">Исследовать</a>` :
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
        // Поиск городов
        const searchInput = document.getElementById('citySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value.toLowerCase();
                this.filterCities();
            });
        }

        // Сортировка городов
        const sortSelect = document.getElementById('sortCities');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortCities();
            });
        }

        // Обработка кликов по карточкам городов
        const container = document.querySelector('.cities-grid');
        if (container) {
            container.addEventListener('click', (e) => {
                const cityCard = e.target.closest('.city-card');
                if (!cityCard) return;

                const cityId = cityCard.dataset.cityId;
                if (cityId === 'khanty-mansiysk') {
                    window.location.href = `cities/city.html?id=${cityId}`;
                }
            });
        }
    },

    filterCities() {
        this.filteredCities = this.cities.filter(city => 
            city.name.toLowerCase().includes(this.currentSearch)
        );
        this.sortCities();
    },

    sortCities() {
        this.filteredCities.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'population':
                    return (b.population || 0) - (a.population || 0);
                case 'founded':
                    return (a.founded || 0) - (b.founded || 0);
                default:
                    return 0;
            }
        });
        this.renderCities();
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    CitiesListModule.init();
}); 