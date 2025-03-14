// Модуль переключения режимов обучения и контроля
export default class ModeSwitch {
    constructor() {
        this.currentMode = localStorage.getItem('currentMode') || 'learning';
        this.descriptions = {
            learning: {
                title: 'Обучающий режим',
                text: 'В обучающем режиме вы сможете изучить историю и географию городов ХМАО-Югры, познакомиться с их достопримечательностями и культурными особенностями.'
            },
            control: {
                title: 'Контрольный режим',
                text: 'В контрольном режиме вы сможете проверить свои знания через тесты и интерактивные задания. Зарабатывайте баллы и открывайте новые города.'
            }
        };
    }

    init() {
        // Находим кнопки переключения режимов
        this.learningBtn = document.querySelector('.mode-switch__button--learning');
        this.controlBtn = document.querySelector('.mode-switch__button--control');
        
        // Находим элементы для отображения описания режима
        this.modeTitle = document.querySelector('.mode-description-title');
        this.modeText = document.querySelector('.mode-description-text');
        
        if (!this.learningBtn || !this.controlBtn) {
            console.log('Элементы переключения режимов не найдены на странице');
            return;
        }
        
        // Добавляем обработчики событий на кнопки
        this.learningBtn.addEventListener('click', () => this.switchMode('learning'));
        this.controlBtn.addEventListener('click', () => this.switchMode('control'));
        
        // Устанавливаем начальный режим
        this.switchMode(this.currentMode);
        
        console.log('Модуль переключения режимов инициализирован');
    }
    
    // Метод переключения режима
    switchMode(mode) {
        this.currentMode = mode;
        localStorage.setItem('currentMode', mode);
        
        // Обновляем активный класс кнопок
        if (mode === 'learning') {
            this.learningBtn.classList.add('active');
            this.controlBtn.classList.remove('active');
        } else {
            this.learningBtn.classList.remove('active');
            this.controlBtn.classList.add('active');
        }
        
        // Обновляем текст описания режима
        if (this.modeTitle && this.modeText) {
            this.modeTitle.textContent = this.descriptions[mode].title;
            this.modeText.textContent = this.descriptions[mode].text;
        }
        
        // Отправляем событие смены режима
        document.dispatchEvent(new CustomEvent('modeChanged', {
            detail: { mode: mode }
        }));
        
        console.log(`Режим переключен на: ${mode}`);
    }
}