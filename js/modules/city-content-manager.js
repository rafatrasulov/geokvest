import BaseModule from '../core/base-module.js';

class CityContentManager extends BaseModule {
    init() {
        // Подписываемся на изменение режима
        document.addEventListener('mode-changed', this.handleModeChange.bind(this));
        
        // Применяем текущий режим при инициализации
        this.applyCurrentMode();
    }
    
    // Обработчик изменения режима
    handleModeChange(event) {
        const { mode } = event.detail;
        this.updateCityContent(mode);
    }
    
    // Применение текущего режима
    applyCurrentMode() {
        const currentMode = this.state.get('app.mode') || 'learning';
        this.updateCityContent(currentMode);
    }
    
    // Обновление содержимого города в зависимости от режима
    updateCityContent(mode) {
        // Получаем текущий город из URL, если мы на странице города
        const urlParams = new URLSearchParams(window.location.search);
        const cityId = urlParams.get('id');
        
        if (!cityId) return; // Не на странице города
        
        // Получаем контейнеры контента для разных режимов
        const learningContent = this.dom.find('.city-content-learning');
        const controlContent = this.dom.find('.city-content-control');
        
        if (learningContent && controlContent) {
            // Переключаем видимость контента
            if (mode === 'learning') {
                this.dom.addClass(learningContent, 'active');
                this.dom.removeClass(controlContent, 'active');
            } else {
                this.dom.removeClass(learningContent, 'active');
                this.dom.addClass(controlContent, 'active');
            }
        }
        
        // Загружаем контент для текущего режима, если его еще нет
        this.loadCityContentForMode(cityId, mode);
    }
    
    // Загрузка контента города для выбранного режима
    async loadCityContentForMode(cityId, mode) {
        try {
            // Используем сервис данных для получения контента
            const dataService = this.getService('data');
            
            // Получаем данные города
            const cities = await dataService.getCities();
            const city = cities.find(c => c.id === cityId);
            
            if (!city) return;
            
            // Получаем контейнер для контента текущего режима
            const contentSelector = `.city-content-${mode}`;
            const contentContainer = this.dom.find(contentSelector);
            
            if (!contentContainer) return;
            
            // Проверяем, загружен ли уже контент для этого режима
            if (contentContainer.dataset.loaded === 'true') return;
            
            // Получаем данные контента для текущего режима
            let modeContent;
            if (mode === 'learning') {
                modeContent = city.learningContent || {};
            } else {
                modeContent = city.controlContent || {};
            }
            
            // Формируем HTML для контента
            const contentHTML = this.generateCityContentHTML(modeContent, mode);
            
            // Обновляем контейнер
            this.dom.setContent(contentContainer, contentHTML);
            
            // Отмечаем контент как загруженный
            contentContainer.dataset.loaded = 'true';
            
        } catch (error) {
            console.error('Ошибка загрузки контента города:', error);
        }
    }
    
    // Генерация HTML для контента города
    generateCityContentHTML(content, mode) {
        if (!content || Object.keys(content).length === 0) {
            return `
                <div class="empty-content">
                    <p>Контент для ${mode === 'learning' ? 'обучающего' : 'контрольного'} режима находится в разработке.</p>
                </div>
            `;
        }
        
        // Шаблон для обучающего режима
        if (mode === 'learning') {
            return `
                <div class="learning-content">
                    <div class="content-section">
                        <h3>История города</h3>
                        <div class="content-text">${content.history || 'Информация отсутствует'}</div>
                    </div>
                    
                    <div class="content-section">
                        <h3>Интересные факты</h3>
                        <ul class="facts-list">
                            ${(content.facts || []).map(fact => `<li>${fact}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="content-section">
                        <h3>Образовательные материалы</h3>
                        <div class="educational-content">${content.educational || 'Материалы в разработке'}</div>
                    </div>
                </div>
            `;
        }
        
        // Шаблон для контрольного режима
        return `
            <div class="control-content">
                <div class="content-section">
                    <h3>Тестовые задания</h3>
                    <div class="quiz-container">${this.generateQuizHTML(content.quizzes || [])}</div>
                </div>
                
                <div class="content-section">
                    <h3>Интерактивные задания</h3>
                    <div class="interactive-tasks">${content.interactiveTasks || 'Задания в разработке'}</div>
                </div>
            </div>
        `;
    }
    
    // Генерация HTML для квизов
    generateQuizHTML(quizzes) {
        if (!quizzes.length) {
            return '<p>Тесты в разработке</p>';
        }
        
        return quizzes.map((quiz, index) => `
            <div class="quiz-item" data-quiz-id="${index}">
                <h4 class="quiz-question">${quiz.question}</h4>
                <div class="quiz-options">
                    ${quiz.options.map((option, optIndex) => `
                        <div class="option-item">
                            <input type="radio" id="quiz${index}_option${optIndex}" 
                                   name="quiz${index}" value="${optIndex}">
                            <label for="quiz${index}_option${optIndex}">${option}</label>
                        </div>
                    `).join('')}
                </div>
                <button class="check-answer-btn">Проверить ответ</button>
                <div class="answer-feedback"></div>
            </div>
        `).join('<hr>');
    }
}

export default CityContentManager; 