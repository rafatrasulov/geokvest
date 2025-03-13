document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkButton');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('testForm');
    const studentForm = document.getElementById('studentForm');
    const startTestButton = document.getElementById('startTest');
    const variants = document.querySelectorAll('.variant');
    const studentInfoSection = document.getElementById('student-info');

    let selectedVariant = null;

    variants.forEach(variant => {
        variant.style.display = 'none';
    });

    startTestButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const className = document.getElementById('class').value;

        if (!name || !surname || !className) {
            alert('Пожалуйста, заполните все поля с информацией об ученике.');
            return;
        }

        let studentNameInput = document.getElementById('studentName');
        if (!studentNameInput) {
            studentNameInput = document.createElement('input');
            studentNameInput.type = 'hidden';
            studentNameInput.id = 'studentName';
            studentNameInput.name = 'studentName';
            form.appendChild(studentNameInput);
        }
        studentNameInput.value = name;

        let studentSurnameInput = document.getElementById('studentSurname');
        if (!studentSurnameInput) {
            studentSurnameInput = document.createElement('input');
            studentSurnameInput.type = 'hidden';
            studentSurnameInput.id = 'studentSurname';
            studentSurnameInput.name = 'studentSurname';
            form.appendChild(studentSurnameInput);
        }
        studentSurnameInput.value = surname;

        let studentClassInput = document.getElementById('studentClass');
        if (!studentClassInput) {
            studentClassInput = document.createElement('input');
            studentClassInput.type = 'hidden';
            studentClassInput.id = 'studentClass';
            studentClassInput.name = 'studentClass';
            form.appendChild(studentClassInput);
        }
        studentClassInput.value = className;


        const variantIds = ['variant2', 'variant3', 'variant4', 'variant5', 'variant6', 'variant7', 'variant8'];
        const randomIndex = Math.floor(Math.random() * variantIds.length);
        selectedVariant = document.getElementById(variantIds[randomIndex]);

        variants.forEach(variant => {
            variant.style.display = 'none';
        });
        if (selectedVariant) {
            selectedVariant.style.display = 'block';
            studentInfoSection.style.display = 'none';
            selectedVariant.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            console.error("Не удалось найти элемент варианта.");
        }
    });

    checkButton.addEventListener('click', function() {
        if (!selectedVariant) {
            alert('Пожалуйста, начните тест, чтобы выбрать вариант.');
            return;
        }

        const variantId = selectedVariant.id;
        const answers = getCorrectAnswers(variantId);

        let correctCount = 0;
        let totalQuestions = 0;

        let studentAnswers = {};
        for (const name in answers) {
            if (answers.hasOwnProperty(name)) {
                totalQuestions++;
                const answer = answers[name];
                const inputElement = form.querySelector(`[name="${name}"]`);

                if (inputElement) {
                    let inputValue = parseFloat(inputElement.value);
                    console.log(`Поле ${name}:`, inputValue); // Для отладки - проверяем значения

                    if (typeof answer === 'object' && answer !== null) {
                        const wholeValue = parseFloat(form.querySelector(`[name="${name}_whole"]`)?.value || 0);
                        const numValue = parseFloat(form.querySelector(`[name="${name}_num"]`)?.value || 0);
                        const denValue = parseFloat(form.querySelector(`[name="${name}_den"]`)?.value || 1);

                        const userAnswerDecimal = wholeValue + (numValue / denValue);
                        studentAnswers[name] = userAnswerDecimal;

                        if (!isNaN(userAnswerDecimal) && Math.abs(userAnswerDecimal - (answer.whole + (answer.num / answer.den))) < 0.001) {
                            correctCount++;
                        }

                    } else {
                        studentAnswers[name] = inputValue;
                        if (!isNaN(inputValue) && Math.abs(inputValue - answer) < 0.001) {
                            correctCount++;
                        }
                    }
                }
            }
        }

        console.log("studentAnswers (перед отправкой):", studentAnswers); // Для отладки - проверяем ответы

        const percentage = (correctCount / totalQuestions) * 100;
        let grade;
        if (percentage >= 90) {
            grade = "5";
        } else if (percentage >= 75) {
            grade = "4";
        } else if (percentage >= 60) {
            grade = "3";
        } else {
            grade = "2";
        }

        resultDiv.textContent = `Правильных ответов: ${correctCount} из ${totalQuestions} (${percentage.toFixed(2)}%). Оценка: ${grade}`;

        const studentName = document.getElementById('studentName').value;
        const studentSurname = document.getElementById('studentSurname').value;
        const studentClass = document.getElementById('studentClass').value;

        // **ВАЖНО: Замените значения ниже на свои!**
        // const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // ЗАМЕНИТЕ! //Теперь закомментировано.
        const telegramBotToken = "6109669042:AAHAIRDrp6iVSKS5ZxPaoANih6j1BEGjd4g";
        const telegramChatId = '715400202';   // ЗАМЕНИТЕ!

        const messageText = `
Новый результат теста:
Имя: ${studentName}
Фамилия и класс: ${studentSurname} (${studentClass})
Вариант: ${variantId}
Оценка: ${grade}
Правильных ответов: ${correctCount} из ${totalQuestions} (${percentage.toFixed(2)}%)
    `;

        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: messageText
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Сообщение успешно отправлено в Telegram');
                alert('Результаты отправлены учителю.');
            } else {
                console.error('Ошибка отправки сообщения в Telegram:', response.status);
                alert('Ошибка отправки результатов в Telegram. Проверьте консоль браузера.');
            }
        })
        .catch(error => {
            console.error('Ошибка отправки сообщения в Telegram:', error);
            alert('Ошибка отправки результатов в Telegram. Проверьте консоль браузера.');
        });
    });

    function getCorrectAnswers(variantId) {
        switch (variantId) {
            case 'variant2':
                return {
                    "var2_1a_whole": 90, "var2_1a_num": 1, "var2_1a_den": 2,
                     "var2_1b_num": 37, "var2_1b_den": 96,
                    "var2_1c_whole": 33, "var2_1c_num": 661, "var2_1c_den": 2000,
                    "var2_1d_whole": 30, "var2_1d_num": 22, "var2_1d_den": 27,
                    "var2_1e_whole": 1, "var2_1e_num": 11, "var2_1e_den": 62,
                    "var2_1f_whole": 122, "var2_1f_num": 6, "var2_1f_den": 25,
                    "var2_1g_whole": 18, "var2_1g_num": 3, "var2_1g_den": 80,
                    "var2_1h_whole": 2, "var2_1h_num": 5, "var2_1h_den": 29,
                    "var2_2": 12,
                    "var2_3": 21,
                    "var2_4_whole": 12, "var2_4_num": 25, "var2_4_den": 96
                };
            case 'variant3':
                return {
                    "var3_1a_whole": 111,
                    "var3_1b_num": 65, "var3_1b_den": 126,
                    "var3_1c_whole": 64, "var3_1c_num": 91, "var3_1c_den": 300,
                    "var3_1d_whole": 13, "var3_1d_num": 2, "var3_1d_den": 21,
                    "var3_1e_num": 34, "var3_1e_den": 43,
                    "var3_1f_whole": 112,
                    "var3_1g_whole": 24, "var3_1g_num": 2, "var3_1g_den": 9,
                    "var3_1h_whole": 2, "var3_1h_num": 7, "var3_1h_den": 20,
                    "var3_2": 8,
                    "var3_3": 35,
                    "var3_4_whole": 24, "var3_4_num": 103, "var3_4_den": 200
                };
            case 'variant4':
                return {
                    "var4_1a_whole": 64, "var4_1a_num": 1, "var4_1a_den": 2,
                    "var4_1b_num": 28, "var4_1b_den": 75,
                    "var4_1c_whole": 56, "var4_1c_num": 129, "var4_1c_den":160,
                    "var4_1d_whole": 17, "var4_1d_num": 1, "var4_1d_den": 10,
                    "var4_1e_whole": 1, "var4_1e_num": 5, "var4_1e_den": 34,
                    "var4_1f_whole": 130, "var4_1f_num": 1, "var4_1f_den": 2,
                    "var4_1g_whole": 26, "var4_1g_num": 5, "var4_1g_den": 8,
                    "var4_1h_whole": 1, "var4_1h_num": 3, "var4_1h_den": 5,
                    "var4_2": 30,
                    "var4_3": 14,
                    "var4_4_whole": 8, "var4_4_num": 19, "var4_4_den": 72
                };
            default:
                return {};
        }
    }
});