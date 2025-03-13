// Модуль для работы с достопримечательностями
const Landmarks = {
    // Список достопримечательностей
    landmarks: [],

    // Инициализация модуля
    init() {
        this.loadLandmarks();
        this.renderLandmarks();
        this.setupEventListeners();
    },

    // Загрузка достопримечательностей
    loadLandmarks() {
        // В реальном приложении здесь будет загрузка с сервера
        this.landmarks = [
            {
                id: 1,
                name: 'Достопримечательность 1',
                description: 'Описание достопримечательности',
                image: 'path/to/image1.jpg',
                coordinates: { lat: 0, lng: 0 },
                facts: [
                    'Интересный факт 1',
                    'Интересный факт 2'
                ]
            },
            {
                id: 2,
                name: 'Достопримечательность 2',
                description: 'Описание достопримечательности',
                image: 'path/to/image2.jpg',
                coordinates: { lat: 0, lng: 0 },
                facts: [
                    'Интересный факт 1',
                    'Интересный факт 2'
                ]
            }
        ];
    },

    // Отрисовка достопримечательностей
    renderLandmarks() {
        const container = document.querySelector('.landmarks-grid');
        if (!container) return;

        container.innerHTML = this.landmarks.map(landmark => `
            <div class="landmark-card" data-landmark-id="${landmark.id}">
                <div class="landmark-image">
                    <img src="${landmark.image}" alt="${landmark.name}">
                </div>
                <div class="landmark-info">
                    <h4>${landmark.name}</h4>
                    <p>${landmark.description}</p>
                    <div class="landmark-facts">
                        ${landmark.facts.map(fact => `
                            <div class="fact-item">
                                <span class="fact-icon">•</span>
                                <span class="fact-text">${fact}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="landmark-actions">
                    <button class="view-on-map">На карте</button>
                    <button class="view-3d">3D тур</button>
                </div>
            </div>
        `).join('');
    },

    // Настройка обработчиков событий
    setupEventListeners() {
        const container = document.querySelector('.landmarks-grid');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const landmarkCard = e.target.closest('.landmark-card');
            if (!landmarkCard) return;

            const landmarkId = parseInt(landmarkCard.dataset.landmarkId);
            const landmark = this.landmarks.find(l => l.id === landmarkId);

            if (e.target.classList.contains('view-on-map')) {
                this.showOnMap(landmark);
            } else if (e.target.classList.contains('view-3d')) {
                this.start3DTour(landmark);
            }
        });
    },

    // Показ достопримечательности на карте
    showOnMap(landmark) {
        // Здесь будет логика отображения на карте
        console.log('Показ на карте:', landmark.name);
    },

    // Запуск 3D тура
    start3DTour(landmark) {
        // Здесь будет логика запуска 3D тура
        console.log('Запуск 3D тура:', landmark.name);
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    Landmarks.init();
}); 