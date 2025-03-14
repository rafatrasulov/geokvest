import BaseModule from '../core/base-module.js';

class ModeSwitchModule extends BaseModule {
    init() {
        // Получаем элементы переключателя режимов
        this.learningButton = this.dom.find('.mode-switch__button--learning');
        this.controlButton = this.dom.find('.mode-switch__button--control');

        // Если элементы найдены, настраиваем их
        if (this.learningButton && this.controlButton) {
            this.setupEventListeners();
            this.loadSavedMode();
        }
    }

    setupEventListeners() {
        this.addDOMListener(this.learningButton, 'click', () => this.switchMode('learning'));
        this.addDOMListener(this.controlButton, 'click', () => this.switchMode('control'));
    }

    switchMode(mode) {
        // Устанавливаем состояние в хранилище
        this.state.set('app.mode', mode);
        
        // Обновляем UI
        this.updateUI(mode);
    }

    updateUI(mode) {
        // Удаляем активный класс у всех кнопок
        this.dom.removeClass(this.learningButton, 'active');
        this.dom.removeClass(this.controlButton, 'active');

        // Добавляем активный класс выбранной кнопке
        if (mode === 'learning') {
            this.dom.addClass(this.learningButton, 'active');
        } else {
            this.dom.addClass(this.controlButton, 'active');
        }
    }

    loadSavedMode() {
        // Получаем сохраненный режим из состояния
        const savedMode = this.state.get('app.mode') || 'learning';
        this.updateUI(savedMode);
    }
}

export default ModeSwitchModule;