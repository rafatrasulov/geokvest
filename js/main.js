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

    // Для отладки 
    console.log('Проверка кнопок:');
    const learningBtn = document.querySelector('.mode-switch__button--learning');
    const controlBtn = document.querySelector('.mode-switch__button--control');
    console.log('Кнопка обучения:', learningBtn);
    console.log('Кнопка контроля:', controlBtn);

    console.log('Проверка контейнеров:');
    const learningContent = document.querySelector('.city-content-learning');
    const controlContent = document.querySelector('.city-content-control');
    console.log('Контейнер обучения:', learningContent);
    console.log('Контейнер контроля:', controlContent);

    document.addEventListener('modeChanged', function(event) {
        const mode = event.detail.mode;
        console.log(`Режим изменен на: ${mode}`);
        
        // Здесь можно добавить дополнительную логику при изменении режима
        // Например, загрузку соответствующих данных для текущего режима
        
        // Пример загрузки данных для города, если мы на странице города
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'city.html') {
            const cityId = new URLSearchParams(window.location.search).get('id');
            if (cityId) {
                loadCityData(cityId, mode);
            }
        }
    });

    // Функция загрузки данных города в зависимости от режима
    function loadCityData(cityId, mode) {
        const dataService = app.getService('data');
        const contentContainer = document.querySelector(`.city-content-${mode}`);
        
        if (contentContainer && contentContainer.getAttribute('data-loaded') === 'false') {
            contentContainer.innerHTML = '<div class="loading-indicator">Загрузка данных...</div>';
            
            // Имитация загрузки данных (в реальном приложении здесь будет запрос к API)
            setTimeout(() => {
                let content = '';
                
                if (mode === 'learning') {
                    content = `
                        <div class="content-section">
                            <h3>Об этом городе</h3>
                            <p>Информационный текст о городе ${cityId} для обучающего режима...</p>
                        </div>
                        <div class="content-section">
                            <h3>История</h3>
                            <p>Историческая справка о городе...</p>
                        </div>
                        <div class="landmarks-section">
                            <h3>Достопримечательности</h3>
                            <div class="landmarks-grid">
                                <!-- Здесь будут достопримечательности -->
                            </div>
                        </div>
                    `;
                } else {
                    content = `
                        <div class="content-section">
                            <h3>Тестирование знаний</h3>
                            <div class="quiz-container">
                                <h4>Проверьте, насколько хорошо вы знаете город ${cityId}</h4>
                                <div class="quiz-item">
                                    <p class="quiz-question">Вопрос 1: В каком году был основан город?</p>
                                    <div class="quiz-options">
                                        <label class="option-item"><input type="radio" name="q1" value="1"> 1725</label>
                                        <label class="option-item"><input type="radio" name="q1" value="2"> 1840</label>
                                        <label class="option-item"><input type="radio" name="q1" value="3"> 1932</label>
                                    </div>
                                    <button class="check-answer-btn">Проверить</button>
                                    <div class="answer-feedback"></div>
                                </div>
                                <!-- Другие вопросы -->
                            </div>
                        </div>
                    `;
                }
                
                contentContainer.innerHTML = content;
                contentContainer.setAttribute('data-loaded', 'true');
            }, 1000);
        }
    }
});