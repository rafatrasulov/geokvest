import BaseModule from '../core/base-module.js';

class ModeSwitch extends BaseModule {
    constructor(app) {
        super(app);
        this.currentMode = 'learning'; // По умолчанию - обучающий режим
    }

    init() {
        // Получаем элементы переключателя
        this.learningBtn = document.querySelector('.mode-switch__button--learning');
        this.controlBtn = document.querySelector('.mode-switch__button--control');
        
        // Получаем контейнеры содержимого
        this.learningContent = document.querySelector('.content-learning');
        this.controlContent = document.querySelector('.content-control');
        
        // Если не нашли ни одной кнопки, значит на этой странице нет переключателя
        if (!this.learningBtn || !this.controlBtn) {
            console.log('Переключатель режимов не найден на этой странице');
            return;
        }
        
        // Добавляем обработчики событий
        this.addDOMListener(this.learningBtn, 'click', () => this.switchToMode('learning'));
        this.addDOMListener(this.controlBtn, 'click', () => this.switchToMode('control'));
        
        // Используем сохраненный режим или режим по умолчанию
        const savedMode = localStorage.getItem('currentMode') || 'learning';
        this.switchToMode(savedMode);
        
        console.log('Модуль переключения режимов инициализирован');
    }
    
    // Переключение режима
    switchToMode(mode) {
        this.currentMode = mode;
        
        // Сохраняем выбранный режим
        localStorage.setItem('currentMode', mode);
        
        // Обновляем кнопки
        if (this.learningBtn && this.controlBtn) {
            if (mode === 'learning') {
                this.learningBtn.classList.add('active');
                this.controlBtn.classList.remove('active');
            } else {
                this.learningBtn.classList.remove('active');
                this.controlBtn.classList.add('active');
            }
        }
        
        // Обновляем видимость контента
        document.querySelectorAll('.content-learning, .content-control').forEach(container => {
            container.classList.remove('active');
        });
        
        // Активируем соответствующий контент на основе текущего режима
        const activeContainers = document.querySelectorAll(`.content-${mode}`);
        activeContainers.forEach(container => {
            container.classList.add('active');
        });
        
        // Отправляем событие о смене режима
        const event = new CustomEvent('modeChanged', { detail: { mode } });
        document.dispatchEvent(event);
        
        console.log(`Режим переключен на: ${mode}`);
    }
}

export default ModeSwitch;