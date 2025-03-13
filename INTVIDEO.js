document.addEventListener('DOMContentLoaded', function() {
    const testContainer = document.getElementById('test-container');
    const questionText = document.getElementById('question');
    const optionsContainer = document.querySelector('.options');
    const video = document.getElementById('main-video');

    // Настройки для видео и вопроса
    const videoSrc1 = "https://cdn.glitch.me/f6758a2f-af7a-487d-92ec-3278bd7e2976/1.mp4?v=1741245488295";
    const videoSrc2 = "https://cdn.glitch.me/f6758a2f-af7a-487d-92ec-3278bd7e2976/2.mp4?v=1741245523671";
    const question = "В каком университете обучается студент?";
    const options = ["СурГПУ", "СурГУ", "Нет правильного ответа"];
    const correctOptionIndex = 1; // СурГУ
    const questionTime = 12; // 12 секунд
    const nextVideoTime = 20; // 20 секунд

    let testActive = false;

    video.src = videoSrc1; // Устанавливаем начальный источник видео
    video.controls = false; // Отключаем стандартные элементы управления

    // Функция для показа теста
    function showTest() {
        testContainer.classList.remove('hidden');
        questionText.textContent = question;
        optionsContainer.innerHTML = '';

        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.dataset.option = index;
            button.addEventListener('click', checkAnswer);
            optionsContainer.appendChild(button);
        });
        video.pause(); // Ставим видео на паузу
    }

    // Функция для проверки ответа
    function checkAnswer(event) {
        const selectedOptionIndex = parseInt(event.target.dataset.option, 10);
        testContainer.classList.add('hidden');
        optionsContainer.innerHTML = '';
        testActive = false;

        if (selectedOptionIndex === correctOptionIndex) {
            video.src = videoSrc2; // Меняем источник видео
            video.currentTime = nextVideoTime; // Перематываем на 20 секунду
            video.play(); // Продолжаем воспроизведение
        } else {
            video.currentTime = 0; // Перематываем в начало
            video.play(); // Начинаем воспроизведение
        }
    }

    // Показываем тест через 12 секунд
    video.addEventListener('timeupdate', function() {
        if (video.currentTime >= questionTime && !testActive) {
            testActive = true;
            showTest();
        }
    });
});