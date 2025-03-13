const ModeSwitch = {
    init() {
        this.setupEventListeners();
        this.loadSavedMode();
    },

    setupEventListeners() {
        const learningButton = document.querySelector('.mode-switch__button--learning');
        const controlButton = document.querySelector('.mode-switch__button--control');

        learningButton.addEventListener('click', () => this.switchMode('learning'));
        controlButton.addEventListener('click', () => this.switchMode('control'));
    },

    switchMode(mode) {
        const learningButton = document.querySelector('.mode-switch__button--learning');
        const controlButton = document.querySelector('.mode-switch__button--control');

        // Удаляем активный класс у всех кнопок
        learningButton.classList.remove('active');
        controlButton.classList.remove('active');

        // Добавляем активный класс выбранной кнопке
        if (mode === 'learning') {
            learningButton.classList.add('active');
        } else {
            controlButton.classList.add('active');
        }

        // Сохраняем выбранный режим
        localStorage.setItem('appMode', mode);
    },

    loadSavedMode() {
        const savedMode = localStorage.getItem('appMode') || 'learning';
        this.switchMode(savedMode);
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    ModeSwitch.init();
});