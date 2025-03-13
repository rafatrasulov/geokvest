// Основной модуль приложения
const App = {
    // Инициализация приложения
    init() {
        this.setupEventListeners();
        this.loadUserProgress();
        this.setupMode();
    },

    // Настройка обработчиков событий
    setupEventListeners() {
        // Обработчики для модальных окон
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Обработчики для кнопок закрытия модальных окон
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    },

    // Загрузка прогресса пользователя
    loadUserProgress() {
        const progress = localStorage.getItem('userProgress');
        if (progress) {
            this.userProgress = JSON.parse(progress);
        } else {
            this.userProgress = {
                completedStations: [],
                currentStation: 1,
                mode: 'learning'
            };
        }
    },

    // Сохранение прогресса пользователя
    saveUserProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    },

    // Настройка режима работы
    setupMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode') || 'learning';
        this.userProgress.mode = mode;
        this.saveUserProgress();
        
        // Обновление отображения режима на странице
        const modeElements = document.querySelectorAll('[id="current-mode"]');
        modeElements.forEach(element => {
            element.textContent = mode === 'learning' ? 'Обучающий квест' : 'Контрольный квест';
        });
    }
};

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    App.init();
}); 