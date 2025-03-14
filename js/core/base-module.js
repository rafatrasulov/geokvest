// Базовый класс для всех модулей
class BaseModule {
    constructor(app) {
        this.app = app;
        this.domListeners = [];
        this.stateSubscriptions = [];
    }

    // Получение сервиса
    getService(name) {
        return this.app.getService(name);
    }

    // Доступ к сервису состояния
    get state() {
        return this.getService('state');
    }

    // Доступ к DOM-сервису
    get dom() {
        return this.getService('dom');
    }

    // Подписка на изменение состояния
    subscribeToState(path, callback) {
        const unsubscribe = this.state.subscribe(path, callback);
        this.stateSubscriptions.push(unsubscribe);
        return unsubscribe;
    }

    // Добавление прослушивателя DOM-события с автоматической очисткой
    addDOMListener(element, eventType, handler, options) {
        const listener = this.dom.on(element, eventType, handler, options);
        this.domListeners.push(listener);
        return listener;
    }

    // Делегирование события с автоматической очисткой
    delegateDOMEvent(element, eventType, selector, handler) {
        const listener = this.dom.delegate(element, eventType, selector, handler);
        this.domListeners.push(listener);
        return listener;
    }

    // Очистка всех прослушивателей при уничтожении модуля
    destroy() {
        // Удаляем DOM-прослушиватели
        this.domListeners.forEach(listener => listener.remove());
        this.domListeners = [];
        
        // Отписываемся от состояния
        this.stateSubscriptions.forEach(unsubscribe => unsubscribe());
        this.stateSubscriptions = [];
    }
}

export default BaseModule; 