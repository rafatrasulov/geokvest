import BaseModule from '../core/base-module.js';

class ModeSwitch extends BaseModule {
    constructor(app) {
        super(app);
        this.currentMode = 'learning'; // По умолчанию - обучающий режим
    }

    init() {
        // Находим кнопки переключения режимов
        this.learningBtn = document.querySelector('.mode-switch__button--learning');
        this.controlBtn = document.querySelector('.mode-switch__button--control');
        
        // Находим контейнеры с содержимым
        this.learningContent = document.querySelector('.city-content-learning');
        this.controlContent = document.querySelector('.city-content-control');
        
        if (!this.learningBtn || !this.controlBtn) {
            console.error('Кнопки переключения режимов не найдены');
            return;
        }
        
        // Добавляем обработчики событий для кнопок
        this.addDOMListener(this.learningBtn, 'click', () => this.switchMode('learning'));
        this.addDOMListener(this.controlBtn, 'click', () => this.switchMode('control'));
        
        // Инициализация начального состояния
        this.switchMode(this.currentMode);
        
        console.log('Модуль переключения режимов инициализирован');
    }
    
    // Метод переключения режимов
    switchMode(mode) {
        this.currentMode = mode;
        
        // Обновляем классы кнопок
        this.learningBtn.classList.toggle('active', mode === 'learning');
        this.controlBtn.classList.toggle('active', mode === 'control');
        
        // Обновляем видимость контейнеров
        if (this.learningContent && this.controlContent) {
            this.learningContent.classList.toggle('active', mode === 'learning');
            this.controlContent.classList.toggle('active', mode === 'control');
            
            // Загружаем содержимое, если оно еще не загружено
            if (mode === 'learning' && this.learningContent.getAttribute('data-loaded') === 'false') {
                this.loadLearningContent();
            } else if (mode === 'control' && this.controlContent.getAttribute('data-loaded') === 'false') {
                this.loadControlContent();
            }
        }
        
        // Публикуем событие о смене режима
        if (this.state) {
            this.state.set('currentMode', mode);
        }
        
        console.log(`Режим переключен на: ${mode}`);
    }
    
    // Загрузка содержимого для обучающего режима
    loadLearningContent() {
        // Эмуляция загрузки контента (в реальном приложении здесь был бы AJAX-запрос)
        setTimeout(() => {
            if (this.learningContent) {
                this.learningContent.innerHTML = `
                    <div class="learning-content">
                        <div class="content-section">
                            <h3>Информация о городе</h3>
                            <p>В этом разделе вы можете изучить историю и интересные факты о городе.</p>
                            <div class="facts-list">
                                <ul>
                                    <li>Факт 1 об истории города</li>
                                    <li>Факт 2 о географическом положении</li>
                                    <li>Факт 3 о культурных особенностях</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                this.learningContent.setAttribute('data-loaded', 'true');
            }
        }, 1000);
    }
    
    // Загрузка содержимого для контрольного режима
    loadControlContent() {
        // Эмуляция загрузки контента (в реальном приложении здесь был бы AJAX-запрос)
        setTimeout(() => {
            if (this.controlContent) {
                this.controlContent.innerHTML = `
                    <div class="control-content">
                        <div class="content-section">
                            <h3>Тестирование знаний</h3>
                            <p>Проверьте свои знания о городе, ответив на вопросы.</p>
                            <div class="quiz-item">
                                <div class="quiz-question">Вопрос 1: Когда был основан этот город?</div>
                                <div class="option-item">
                                    <input type="radio" name="q1" id="q1a" value="a">
                                    <label for="q1a">Вариант A</label>
                                </div>
                                <div class="option-item">
                                    <input type="radio" name="q1" id="q1b" value="b">
                                    <label for="q1b">Вариант B</label>
                                </div>
                                <div class="option-item">
                                    <input type="radio" name="q1" id="q1c" value="c">
                                    <label for="q1c">Вариант C</label>
                                </div>
                                <button class="check-answer-btn">Проверить ответ</button>
                                <div class="answer-feedback"></div>
                            </div>
                        </div>
                    </div>
                `;
                this.controlContent.setAttribute('data-loaded', 'true');
            }
        }, 1000);
    }
}

export default ModeSwitch;