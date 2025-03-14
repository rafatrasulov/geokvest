import BaseModule from '../core/base-module.js';

class CityContentManager extends BaseModule {
    constructor(app) {
        super(app);
        this.currentMode = 'learning';
        this.cityId = null;
        this.isLoaded = {
            learning: false,
            control: false
        };
    }
    
    init() {
        // Получаем ID города из URL
        const urlParams = new URLSearchParams(window.location.search);
        this.cityId = urlParams.get('id');
        
        if (!this.cityId) {
            console.error('ID города не найден в URL');
            return;
        }
        
        // Подписываемся на событие изменения режима
        document.addEventListener('modeChanged', (event) => {
            this.currentMode = event.detail.mode;
            this.loadContentForMode(this.currentMode);
        });
        
        // Загружаем содержимое для текущего режима
        this.currentMode = localStorage.getItem('currentMode') || 'learning';
        this.loadContentForMode(this.currentMode);
    }
    
    loadContentForMode(mode) {
        if (this.isLoaded[mode]) return;
        
        const container = document.querySelector(`.city-content-${mode}`);
        if (!container) {
            console.error(`Контейнер для режима ${mode} не найден`);
            return;
        }
        
        const loadingIndicator = container.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.textContent = `Загрузка содержимого для режима '${mode === 'learning' ? 'обучающий' : 'контрольный'}'...`;
        }
        
        // Имитируем загрузку данных
        setTimeout(() => {
            this.renderContent(mode, container);
            this.isLoaded[mode] = true;
        }, 1000);
    }
    
    renderContent(mode, container) {
        const dataService = this.getService('data');
        
        if (mode === 'learning') {
            container.innerHTML = `
                <section class="city-info">
                    <h2>О городе ${this.cityId}</h2>
                    <p>Подробная информация о городе в обучающем режиме...</p>
                </section>
                <section class="city-history">
                    <h2>История</h2>
                    <p>Историческая справка о городе...</p>
                </section>
                <section class="landmarks-section">
                    <h2>Достопримечательности</h2>
                    <div class="landmarks-grid">
                        <!-- Карточки достопримечательностей будут здесь -->
                    </div>
                </section>
            `;
        } else {
            container.innerHTML = `
                <section class="city-quiz">
                    <h2>Проверка знаний о городе ${this.cityId}</h2>
                    <div class="quiz-container">
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
                </section>
            `;
            
            // Добавляем обработчики для проверки ответов
            const quizButtons = container.querySelectorAll('.check-answer-btn');
            quizButtons.forEach(button => {
                this.addDOMListener(button, 'click', this.checkAnswer.bind(this));
            });
        }
    }
    
    checkAnswer(event) {
        const button = event.target;
        const quizItem = button.closest('.quiz-item');
        const selectedOption = quizItem.querySelector('input[type="radio"]:checked');
        const feedback = quizItem.querySelector('.answer-feedback');
        
        if (!selectedOption) {
            feedback.textContent = 'Пожалуйста, выберите ответ';
            feedback.className = 'answer-feedback';
            return;
        }
        
        // В реальном приложении здесь будет проверка правильности ответа
        const isCorrect = selectedOption.value === '2'; // Предположим, что правильный ответ - второй вариант
        
        if (isCorrect) {
            feedback.textContent = 'Правильно!';
            feedback.className = 'answer-feedback correct';
        } else {
            feedback.textContent = 'Неправильно. Попробуйте еще раз.';
            feedback.className = 'answer-feedback incorrect';
        }
    }
}

export default CityContentManager; 