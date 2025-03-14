// Сервис для работы с данными
class DataService {
    constructor() {
        this.cache = {};
    }

    init(app) {
        this.app = app;
    }

    // Асинхронная загрузка данных из модулей
    async loadModule(modulePath) {
        if (this.cache[modulePath]) {
            return this.cache[modulePath];
        }

        try {
            const module = await import(`../data/${modulePath}.js`);
            const data = module.default;
            this.cache[modulePath] = data;
            return data;
        } catch (error) {
            console.error(`Ошибка загрузки модуля данных ${modulePath}:`, error);
            return null;
        }
    }

    // Получение данных городов
    async getCities() {
        return this.loadModule('cities');
    }

    // Получение данных режимов игры
    async getGameModes() {
        return this.loadModule('gameModes');
    }

    // Получение новостей
    async getNews() {
        const newsData = await this.loadModule('news');
        return newsData ? newsData.news : [];
    }

    // Получение категорий новостей
    async getNewsCategories() {
        const newsData = await this.loadModule('news');
        return newsData ? newsData.newsCategories : {};
    }

    // Получение настроек
    getSettings() {
        return this.app.config;
    }
}

export default DataService; 