import BaseModule from '../core/base-module.js';
import LandmarkCard from '../components/landmark-card.js';
import QuestCard from '../components/quest-card.js';

class CityModule extends BaseModule {
    init() {
        // Получаем ID города из URL
        this.cityId = this.getCityIdFromUrl();
        
        // Инициализируем дочерние модули
        this.initSubModules();
        
        // Если ID города получен, загружаем данные
        if (this.cityId) {
            this.loadCityData();
        } else {
            this.showError("Город не найден");
        }
    }
    
    // Дочерние модули
    initSubModules() {
        this.landmarksModule = {
            renderLandmarks: (landmarks, container) => {
                if (!landmarks || !landmarks.length) return;
                
                const landmarksHTML = landmarks.map(landmark => 
                    LandmarkCard.render(landmark)
                ).join('');
                
                container.innerHTML = landmarksHTML;
                
                // Добавляем обработчики событий
                this.setupLandmarkEvents(container);
            }
        };
        
        this.questsModule = {
            renderQuests: (quests, container) => {
                if (!quests || !quests.length) return;
                
                const questsHTML = quests.map(quest => 
                    QuestCard.render(quest)
                ).join('');
                
                container.innerHTML = questsHTML;
                
                // Добавляем обработчики событий
                this.setupQuestEvents(container);
            }
        };
    }
    
    // Получение ID города из URL
    getCityIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }
    
    // Загрузка данных города
    async loadCityData() {
        try {
            // Используем сервис для загрузки данных
            const dataService = this.getService('data');
            const cities = await dataService.getCities();
            
            const city = cities.find(c => c.id === this.cityId);
            
            if (city) {
                this.renderCityData(city);
            } else {
                this.showError("Город не найден");
            }
        } catch (error) {
            console.error('Ошибка загрузки данных города:', error);
            this.showError("Ошибка загрузки данных");
        }
    }
    
    // Отображение ошибки
    showError(message) {
        const container = this.dom.find('.city-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Ошибка</h2>
                    <p>${message}</p>
                    <a href="../cities.html" class="btn btn-primary">Вернуться к списку городов</a>
                </div>
            `;
        }
    }
    
    // Рендеринг данных города
    renderCityData(city) {
        // Обновляем заголовок страницы
        document.title = `${city.name} - ГеоКвест по ХМАО-Югре`;
        
        // Обновляем заголовок города
        const cityTitle = this.dom.find('.city-title');
        if (cityTitle) {
            cityTitle.textContent = city.name;
        }
        
        // Обновляем статистику
        const statsContainer = this.dom.find('.city-stats');
        if (statsContainer) {
            const populationElement = statsContainer.querySelector('.stat-value:first-child');
            const foundedElement = statsContainer.querySelector('.stat-value:last-child');
            
            if (populationElement && city.population) {
                populationElement.textContent = city.population.toLocaleString();
            }
            
            if (foundedElement && city.founded) {
                foundedElement.textContent = city.founded;
            }
        }
        
        // Обновляем описание
        const descriptionContainer = this.dom.find('.city-description');
        if (descriptionContainer && city.description) {
            descriptionContainer.innerHTML = `<p>${city.description}</p>`;
        }
        
        // Рендерим достопримечательности
        this.renderLandmarks(city.landmarks || []);
        
        // Рендерим квесты
        this.renderQuests(city.quests || []);
    }
    
    // Рендеринг достопримечательностей
    renderLandmarks(landmarks) {
        const container = this.dom.find('.landmarks-grid');
        if (container) {
            this.landmarksModule.renderLandmarks(landmarks, container);
        }
    }
    
    // Настройка обработчиков событий для достопримечательностей
    setupLandmarkEvents(container) {
        this.delegateDOMEvent(container, 'click', '.landmark-card', (e, target) => {
            const landmarkId = target.dataset.landmarkId;
            if (!landmarkId) return;
            
            // Обработка различных действий
            if (e.target.closest('.view-on-map')) {
                this.showLandmarkOnMap(landmarkId);
            } else if (e.target.closest('.view-3d')) {
                this.start3DTour(landmarkId);
            }
        });
    }
    
    // Рендеринг квестов
    renderQuests(quests) {
        const container = this.dom.find('.quests-grid');
        if (container) {
            this.questsModule.renderQuests(quests, container);
        }
    }
    
    // Настройка обработчиков событий для квестов
    setupQuestEvents(container) {
        this.delegateDOMEvent(container, 'click', '.quest-card', (e, target) => {
            const questId = target.dataset.questId;
            if (!questId) return;
            
            // Обработка различных действий для квестов
            if (e.target.closest('.start-quest')) {
                this.startQuest(questId);
            }
        });
    }
    
    // Показ достопримечательности на карте
    showLandmarkOnMap(landmarkId) {
        // Реализация показа на карте
        console.log('Показать на карте:', landmarkId);
    }
    
    // Запуск 3D-тура
    start3DTour(landmarkId) {
        // Реализация запуска 3D-тура
        console.log('Запустить 3D-тур:', landmarkId);
    }
    
    // Запуск квеста
    startQuest(questId) {
        // Навигация к квесту
        window.location.href = `quest.html?id=${questId}&city=${this.cityId}`;
    }
}

export default CityModule; 