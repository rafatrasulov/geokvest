// Модуль для работы с прогрессом
const Progress = {
    // Текущий прогресс
    currentProgress: {
        completedStations: [],
        currentStation: null,
        totalProgress: 0
    },

    // Инициализация модуля
    init() {
        this.loadProgress();
        this.updateProgressDisplay();
        this.setupEventListeners();
    },

    // Загрузка прогресса
    loadProgress() {
        const savedProgress = localStorage.getItem('questProgress');
        if (savedProgress) {
            this.currentProgress = JSON.parse(savedProgress);
        }
    },

    // Сохранение прогресса
    saveProgress() {
        localStorage.setItem('questProgress', JSON.stringify(this.currentProgress));
    },

    // Обновление отображения прогресса
    updateProgressDisplay() {
        const progressContainer = document.querySelector('.progress-container');
        if (!progressContainer) return;

        const totalStations = 16; // Общее количество станций
        const completedCount = this.currentProgress.completedStations.length;
        const progress = (completedCount / totalStations) * 100;

        // Обновление прогресс-бара
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Обновление счетчика
        const progressCounter = document.getElementById('progress-counter');
        if (progressCounter) {
            progressCounter.textContent = `${completedCount}/${totalStations}`;
        }

        // Обновление общего прогресса
        this.currentProgress.totalProgress = progress;
    },

    // Добавление завершенной станции
    addCompletedStation(stationId) {
        if (!this.currentProgress.completedStations.includes(stationId)) {
            this.currentProgress.completedStations.push(stationId);
            this.saveProgress();
            this.updateProgressDisplay();
        }
    },

    // Установка текущей станции
    setCurrentStation(stationId) {
        this.currentProgress.currentStation = stationId;
        this.saveProgress();
    },

    // Проверка завершения станции
    isStationCompleted(stationId) {
        return this.currentProgress.completedStations.includes(stationId);
    },

    // Получение следующей доступной станции
    getNextAvailableStation() {
        const allStations = Array.from({ length: 16 }, (_, i) => i + 1);
        const availableStations = allStations.filter(stationId => 
            !this.currentProgress.completedStations.includes(stationId)
        );
        return availableStations[0] || null;
    },

    // Настройка обработчиков событий
    setupEventListeners() {
        // Здесь будут обработчики событий, связанных с прогрессом
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    Progress.init();
}); 