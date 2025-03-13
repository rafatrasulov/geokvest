// Модуль для работы со станциями
const Stations = {
    // Список всех станций (городов)
    stations: [
        {
            id: 1,
            name: 'Ханты-Мансийск',
            description: 'Столица ХМАО-Югры',
            image: 'assets/images/cities/khanty-mansiysk.jpg',
            isLocked: false
        },
        // Добавьте остальные города здесь
    ],

    // Инициализация модуля
    init() {
        this.loadStations();
        this.renderStations();
        this.setupEventListeners();
    },

    // Загрузка данных о станциях
    loadStations() {
        // В реальном приложении здесь будет загрузка с сервера
        // Сейчас используем локальные данные
    },

    // Отрисовка станций на странице
    renderStations() {
        const container = document.querySelector('.stations-grid');
        if (!container) return;

        container.innerHTML = this.stations.map(station => `
            <div class="station-card ${station.isLocked ? 'locked' : ''}" data-station-id="${station.id}">
                <img src="${station.image}" alt="${station.name}">
                <h3>${station.name}</h3>
                <p>${station.description}</p>
                ${station.isLocked ? 
                    '<button class="unlock-button">Разблокировать</button>' : 
                    '<a href="city.html?id=' + station.id + '" class="enter-button">Войти</a>'
                }
            </div>
        `).join('');
    },

    // Настройка обработчиков событий
    setupEventListeners() {
        const container = document.querySelector('.stations-grid');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const stationCard = e.target.closest('.station-card');
            if (!stationCard) return;

            const stationId = parseInt(stationCard.dataset.stationId);
            const station = this.stations.find(s => s.id === stationId);

            if (station.isLocked) {
                this.showCodeModal(stationId);
            }
        });
    },

    // Показ модального окна для ввода кода
    showCodeModal(stationId) {
        const modal = document.getElementById('codeModal');
        if (!modal) return;

        modal.dataset.stationId = stationId;
        modal.style.display = 'block';
    },

    // Проверка кода для разблокировки станции
    validateCode(stationId, code) {
        // В реальном приложении здесь будет проверка кода на сервере
        // Сейчас используем простую проверку
        return code === `CODE${stationId}`;
    },

    // Разблокировка станции
    unlockStation(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (station) {
            station.isLocked = false;
            this.renderStations();
            this.saveStations();
        }
    },

    // Сохранение состояния станций
    saveStations() {
        localStorage.setItem('stations', JSON.stringify(this.stations));
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    Stations.init();
}); 