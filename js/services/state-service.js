// Сервис для централизованного управления состоянием
class StateService {
    constructor() {
        this.state = {};
        this.listeners = {};
    }

    // Инициализация сервиса
    init(app) {
        this.app = app;
        this.loadFromLocalStorage();
    }

    // Загрузка состояния из localStorage
    loadFromLocalStorage() {
        try {
            const savedState = localStorage.getItem('app_state');
            if (savedState) {
                this.state = JSON.parse(savedState);
            }
        } catch (e) {
            console.error('Ошибка загрузки состояния:', e);
        }
    }

    // Сохранение состояния в localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('app_state', JSON.stringify(this.state));
        } catch (e) {
            console.error('Ошибка сохранения состояния:', e);
        }
    }

    // Получение состояния
    get(path) {
        return this.getNestedProperty(this.state, path);
    }

    // Обновление состояния
    set(path, value) {
        this.setNestedProperty(this.state, path, value);
        this.notifyListeners(path);
        this.saveToLocalStorage();
        return this;
    }

    // Подписка на изменения состояния
    subscribe(path, callback) {
        if (!this.listeners[path]) {
            this.listeners[path] = [];
        }
        this.listeners[path].push(callback);
        return () => this.unsubscribe(path, callback);
    }

    // Отписка от изменений состояния
    unsubscribe(path, callback) {
        if (this.listeners[path]) {
            this.listeners[path] = this.listeners[path].filter(cb => cb !== callback);
        }
    }

    // Уведомление подписчиков об изменениях
    notifyListeners(path) {
        const value = this.get(path);
        if (this.listeners[path]) {
            this.listeners[path].forEach(callback => callback(value));
        }
        
        // Также уведомляем слушателей родительских путей
        const pathParts = path.split('.');
        while (pathParts.length > 1) {
            pathParts.pop();
            const parentPath = pathParts.join('.');
            if (this.listeners[parentPath]) {
                this.listeners[parentPath].forEach(callback => callback(this.get(parentPath)));
            }
        }
    }

    // Вспомогательные методы для работы с вложенными свойствами
    getNestedProperty(obj, path) {
        const props = path.split('.');
        let result = obj;
        for (const prop of props) {
            if (result === undefined || result === null) return undefined;
            result = result[prop];
        }
        return result;
    }

    setNestedProperty(obj, path, value) {
        const props = path.split('.');
        let current = obj;
        for (let i = 0; i < props.length - 1; i++) {
            const prop = props[i];
            if (current[prop] === undefined) {
                current[prop] = {};
            }
            current = current[prop];
        }
        current[props[props.length - 1]] = value;
    }
}

export default StateService; 