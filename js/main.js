import App from './core/app.js';
import StateService from './services/state-service.js';
import DOMService from './services/dom-service.js';
import DataService from './services/data-service.js';
import RouterService from './services/router-service.js';
import APIService from './services/api-service.js';
import LoggerService from './services/logger-service.js';
import I18nService from './services/i18n-service.js';
import ThemeService from './services/theme-service.js';
import MigrationService from './services/migration-service.js';

// Модули
import ModeSwitch from './modules/mode-switch.js';
import MobileMenuModule from './modules/mobile-menu.js';
import CollapsibleSectionsModule from './modules/collapsible-sections.js';
import CityModule from './modules/city.js';
import CityContentManager from './modules/city-content-manager.js';

// Конфигурация
import settings from './data/settings.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Создаем экземпляр приложения
    const app = new App();
    
    // Загружаем конфигурацию
    app.loadConfig(settings);
    
    // Регистрируем сервисы
    app.registerService('logger', new LoggerService())
       .registerService('state', new StateService())
       .registerService('dom', DOMService)
       .registerService('data', new DataService())
       .registerService('router', new RouterService())
       .registerService('api', new APIService())
       .registerService('i18n', new I18nService())
       .registerService('theme', new ThemeService())
       .registerService('migration', new MigrationService());
    
    // Регистрируем базовые модули
    app.registerModule('modeSwitch', ModeSwitch)
       .registerModule('mobileMenu', MobileMenuModule)
       .registerModule('collapsibleSections', CollapsibleSectionsModule);
    
    // Регистрируем модули в зависимости от текущей страницы
    const currentPage = window.location.pathname.split('/').pop();
    
    // Регистрируем модуль режимов на всех страницах
    app.registerModule('modeSwitch', ModeSwitch);
    
    if (currentPage === 'city.html') {
        app.registerModule('city', CityModule);
        app.registerModule('cityContentManager', CityContentManager);
    }
    
    // Инициализируем приложение
    app.init();
    
    // Получаем логгер для отладки
    const logger = app.getService('logger');
    logger.info('Приложение инициализировано успешно');
    
    // Настраиваем маршрутизацию
    const router = app.getService('router');
    
    // Пример настройки маршрутов
    router.register('/index.html', () => {
        console.log('Главная страница');
    })
    .register('/pages/cities.html', () => {
        console.log('Страница со списком городов');
    })
    .register('/pages/cities/city.html', (params) => {
        console.log('Страница города:', params.id);
    })
    .register('*', () => {
        console.log('Страница не найдена');
    });
    
    // Сохраняем ссылку на приложение в глобальном объекте для отладки
    window.app = app;
});