// Модуль для работы с квестами
const Quest = {
    // Текущий город
    currentCity: null,
    
    // Задания для текущего города
    tasks: [],

    // Инициализация модуля
    init() {
        this.loadCityData();
        this.loadTasks();
        this.renderTasks();
        this.setupEventListeners();
    },

    // Загрузка данных о городе
    loadCityData() {
        const urlParams = new URLSearchParams(window.location.search);
        const cityId = parseInt(urlParams.get('id'));
        
        // В реальном приложении здесь будет загрузка с сервера
        this.currentCity = {
            id: cityId,
            name: 'Название города',
            description: 'Описание города'
        };

        // Обновление информации на странице
        document.getElementById('city-name').textContent = this.currentCity.name;
        document.getElementById('city-title').textContent = this.currentCity.name;
        document.getElementById('city-description').textContent = this.currentCity.description;
    },

    // Загрузка заданий
    loadTasks() {
        // В реальном приложении здесь будет загрузка с сервера
        this.tasks = [
            {
                id: 1,
                title: 'Знакомство с городом',
                type: 'video',
                content: 'URL_видео',
                isCompleted: false
            },
            {
                id: 2,
                title: 'Историческая викторина',
                type: 'quiz',
                questions: [],
                isCompleted: false
            },
            {
                id: 3,
                title: 'Виртуальная экскурсия',
                type: 'tour',
                content: 'URL_3D_тура',
                isCompleted: false
            }
        ];
    },

    // Отрисовка заданий
    renderTasks() {
        const container = document.querySelector('.quest-tasks');
        if (!container) return;

        container.innerHTML = this.tasks.map(task => `
            <div class="task-card ${task.isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
                <h4>${task.title}</h4>
                <div class="task-content">
                    ${this.renderTaskContent(task)}
                </div>
                <div class="task-actions">
                    ${task.isCompleted ? 
                        '<span class="completed-badge">Выполнено</span>' : 
                        '<button class="start-task">Начать</button>'
                    }
                </div>
            </div>
        `).join('');
    },

    // Отрисовка содержимого задания
    renderTaskContent(task) {
        switch (task.type) {
            case 'video':
                return `<div class="video-container">
                    <iframe src="${task.content}" frameborder="0" allowfullscreen></iframe>
                </div>`;
            case 'quiz':
                return `<div class="quiz-container">
                    <div class="quiz-questions"></div>
                </div>`;
            case 'tour':
                return `<div class="tour-container">
                    <iframe src="${task.content}" frameborder="0" allowfullscreen></iframe>
                </div>`;
            default:
                return '';
        }
    },

    // Настройка обработчиков событий
    setupEventListeners() {
        const container = document.querySelector('.quest-tasks');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const taskCard = e.target.closest('.task-card');
            if (!taskCard) return;

            const taskId = parseInt(taskCard.dataset.taskId);
            const task = this.tasks.find(t => t.id === taskId);

            if (e.target.classList.contains('start-task')) {
                this.startTask(task);
            }
        });
    },

    // Начало выполнения задания
    startTask(task) {
        // В зависимости от типа задания
        switch (task.type) {
            case 'video':
                this.startVideoTask(task);
                break;
            case 'quiz':
                this.startQuizTask(task);
                break;
            case 'tour':
                this.startTourTask(task);
                break;
        }
    },

    // Завершение задания
    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.isCompleted = true;
            this.renderTasks();
            this.updateProgress();
            this.saveProgress();
        }
    },

    // Обновление прогресса
    updateProgress() {
        const completedTasks = this.tasks.filter(t => t.isCompleted).length;
        const totalTasks = this.tasks.length;
        const progress = (completedTasks / totalTasks) * 100;

        const progressBar = document.getElementById('quest-progress');
        const progressText = document.getElementById('quest-counter');

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `${completedTasks}/${totalTasks}`;
        }

        // Проверка завершения всех заданий
        if (completedTasks === totalTasks) {
            this.showCompletionModal();
        }
    },

    // Сохранение прогресса
    saveProgress() {
        localStorage.setItem(`city_${this.currentCity.id}_progress`, JSON.stringify(this.tasks));
    },

    // Показ модального окна завершения
    showCompletionModal() {
        const modal = document.getElementById('completionModal');
        if (!modal) return;

        const code = this.generateCompletionCode();
        document.getElementById('rewardCode').textContent = code;
        modal.style.display = 'block';
    },

    // Генерация кода для разблокировки следующей станции
    generateCompletionCode() {
        return `CODE${this.currentCity.id + 1}`;
    }
};

// Инициализация модуля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    Quest.init();
}); 