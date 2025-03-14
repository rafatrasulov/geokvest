// Основной модуль приложения, реализующий инверсию зависимостей
class App {
    constructor() {
        this.services = {};
        this.modules = {};
        this.config = {};
    }

    // Регистрация сервисов (внедрение зависимостей)
    registerService(name, serviceInstance) {
        this.services[name] = serviceInstance;
        return this;
    }

    // Регистрация модулей
    registerModule(name, ModuleClass) {
        this.modules[name] = new ModuleClass(this);
        return this;
    }

    // Загрузка конфигурации
    loadConfig(config) {
        this.config = { ...this.config, ...config };
        return this;
    }

    // Получение сервиса (для использования в модулях)
    getService(name) {
        return this.services[name];
    }

    // Инициализация всего приложения
    init() {
        // Инициализируем сервисы
        Object.values(this.services).forEach(service => {
            if (typeof service.init === 'function') {
                service.init(this);
            }
        });

        // Инициализируем модули
        Object.values(this.modules).forEach(module => {
            if (typeof module.init === 'function') {
                module.init();
            }
        });

        return this;
    }
}

export default App; 