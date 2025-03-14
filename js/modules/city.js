import cities from '../../data/cities.js';

const CityModule = {
    init() {
        this.cityId = this.getCityIdFromUrl();
        this.city = this.getCityData();
        
        if (!this.city) {
            this.showError();
            return;
        }

        this.renderCityData();
        this.setupEventListeners();
    },

    getCityIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    },

    getCityData() {
        return cities.find(city => city.id === this.cityId);
    },

    showError() {
        const container = document.querySelector('.city-container');
        if (!container) return;

        container.innerHTML = `
            <div class="error-message">
                <h2>Город не найден</h2>
                <p>Извините, запрашиваемый город не существует или недоступен.</p>
                <a href="../../index.html" class="back-button">Вернуться на главную</a>
            </div>
        `;
    },

    renderCityData() {
        // Обновляем заголовок
        document.title = `${this.city.name} - ГеоКвест по ХМАО-Югре`;
        
        // Обновляем название города
        const cityTitle = document.querySelector('.city-title');
        if (cityTitle) {
            cityTitle.textContent = this.city.name;
        }

        // Обновляем статистику
        const statsContainer = document.querySelector('.city-stats');
        if (statsContainer && this.city.population) {
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Население:</span>
                    <span class="stat-value">${this.city.population.toLocaleString()}</span>
                </div>
                ${this.city.founded ? `
                    <div class="stat-item">
                        <span class="stat-label">Основан:</span>
                        <span class="stat-value">${this.city.founded}</span>
                    </div>
                ` : ''}
            `;
        }

        // Обновляем описание
        const descriptionContainer = document.querySelector('.city-description');
        if (descriptionContainer) {
            descriptionContainer.innerHTML = `<p>${this.city.description}</p>`;
        }

        // Рендерим достопримечательности
        this.renderLandmarks();

        // Рендерим квесты
        this.renderQuests();
    },

    renderLandmarks() {
        const landmarksContainer = document.querySelector('.landmarks-grid');
        if (!landmarksContainer || !this.city.landmarks) return;

        landmarksContainer.innerHTML = this.city.landmarks.map(landmark => `
            <div class="landmark-card">
                <img class="landmark-image" 
                     src="../../assets/images/landmarks/${landmark.id}.jpg" 
                     alt="${landmark.name}"
                     onerror="this.src='../../assets/images/landmarks/default.jpg'">
                <div class="landmark-content">
                    <h3 class="landmark-name">${landmark.name}</h3>
                    <p class="landmark-description">${landmark.description}</p>
                    <span class="landmark-type">${landmark.type}</span>
                </div>
            </div>
        `).join('');
    },

    renderQuests() {
        const questsContainer = document.querySelector('.quests-grid');
        if (!questsContainer || !this.city.quests) return;

        questsContainer.innerHTML = this.city.quests.map(quest => `
            <div class="quest-card">
                <img class="quest-image" 
                     src="../../assets/images/quests/${quest.id}.jpg" 
                     alt="${quest.name}"
                     onerror="this.src='../../assets/images/quests/default.jpg'">
                <div class="quest-content">
                    <h3 class="quest-name">${quest.name}</h3>
                    <p class="quest-description">${quest.description}</p>
                    <span class="quest-difficulty">${quest.difficulty}</span>
                    <div class="quest-stats">
                        <span>Длительность: ${quest.duration}</span>
                        <span>Очки: ${quest.totalPoints}</span>
                    </div>
                    <a href="../../pages/quests/quest.html?id=${quest.id}" class="quest-button">
                        Начать квест
                    </a>
                </div>
            </div>
        `).join('');
    },

    setupEventListeners() {
        // Здесь можно добавить обработчики событий для интерактивных элементов
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    CityModule.init();
}); 