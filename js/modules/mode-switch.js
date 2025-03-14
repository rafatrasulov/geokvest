import BaseModule from '../core/base-module.js';

class ModeSwitchModule extends BaseModule {
    init() {
        // Получаем элементы переключателя режимов
        this.learningButton = this.dom.find('.mode-switch__button--learning');
        this.controlButton = this.dom.find('.mode-switch__button--control');
        
        // Получаем элементы содержимого режимов
        this.learningContent = this.dom.find('.mode-content--learning');
        this.controlContent = this.dom.find('.mode-content--control');

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
        
        // Обновляем содержимое страницы в зависимости от режима
        this.updatePageContent(mode);
        
        // Вызываем событие смены режима для других модулей
        document.dispatchEvent(new CustomEvent('mode-changed', { 
            detail: { mode } 
        }));
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
    
    updatePageContent(mode) {
        // Обновляем содержимое режимов на главной странице
        if (this.learningContent && this.controlContent) {
            this.dom.removeClass(this.learningContent, 'active');
            this.dom.removeClass(this.controlContent, 'active');
            
            if (mode === 'learning') {
                this.dom.addClass(this.learningContent, 'active');
            } else {
                this.dom.addClass(this.controlContent, 'active');
            }
        }
        
        // Обновляем классы на body для глобальных стилей
        this.dom.removeClass(document.body, 'mode-learning');
        this.dom.removeClass(document.body, 'mode-control');
        this.dom.addClass(document.body, `mode-${mode}`);
    }

    loadSavedMode() {
        // Получаем сохраненный режим из состояния
        const savedMode = this.state.get('app.mode') || 'learning';
        
        // Обновляем UI
        this.updateUI(savedMode);
        
        // Обновляем содержимое страницы
        this.updatePageContent(savedMode);
    }
}

export default ModeSwitchModule;