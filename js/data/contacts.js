// Данные о контактах
const contacts = {
    // Основная информация
    project: {
        name: 'ГеоКвест по ХМАО-Югре',
        organization: 'Департамент образования и молодежной политики ХМАО-Югры',
        description: 'Образовательный проект по изучению городов Ханты-Мансийского автономного округа - Югры'
    },

    // Контактная информация
    contactInfo: {
        email: 'info@geokvest-hmao.ru',
        phone: '+7 (3467) 123-456',
        address: 'г. Ханты-Мансийск, ул. Мира, 14',
        workingHours: {
            weekdays: '09:00 - 18:00',
            weekends: '10:00 - 16:00'
        }
    },

    // Социальные сети
    socialMedia: {
        vk: {
            name: 'ВКонтакте',
            url: 'https://vk.com/geokvest_hmao',
            icon: 'vk'
        },
        telegram: {
            name: 'Telegram',
            url: 'https://t.me/geokvest_hmao',
            icon: 'telegram'
        },
        youtube: {
            name: 'YouTube',
            url: 'https://youtube.com/geokvest_hmao',
            icon: 'youtube'
        }
    },

    // Форма обратной связи
    feedbackForm: {
        fields: [
            {
                name: 'name',
                label: 'Ваше имя',
                type: 'text',
                required: true,
                placeholder: 'Введите ваше имя'
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                required: true,
                placeholder: 'Введите ваш email'
            },
            {
                name: 'subject',
                label: 'Тема',
                type: 'select',
                required: true,
                options: [
                    { value: 'general', label: 'Общий вопрос' },
                    { value: 'technical', label: 'Техническая поддержка' },
                    { value: 'education', label: 'Образовательная программа' },
                    { value: 'partnership', label: 'Сотрудничество' },
                    { value: 'other', label: 'Другое' }
                ]
            },
            {
                name: 'message',
                label: 'Сообщение',
                type: 'textarea',
                required: true,
                placeholder: 'Введите ваше сообщение',
                rows: 5
            }
        ],
        submitButton: 'Отправить сообщение',
        successMessage: 'Спасибо! Ваше сообщение отправлено.',
        errorMessage: 'Произошла ошибка. Пожалуйста, попробуйте позже.'
    },

    // Часто задаваемые вопросы
    faq: [
        {
            question: 'Как начать использовать проект?',
            answer: 'Для начала работы необходимо зарегистрироваться на сайте и выбрать режим игры. После этого вы сможете начать исследовать города и выполнять задания.'
        },
        {
            question: 'Какие режимы игры доступны?',
            answer: 'В проекте доступны четыре режима: индивидуальный, групповой, образовательный и соревновательный. Каждый режим имеет свои особенности и преимущества.'
        },
        {
            question: 'Как сохраняется мой прогресс?',
            answer: 'Ваш прогресс автоматически сохраняется в личном кабинете. Вы можете продолжить с того места, где остановились, в любое время.'
        },
        {
            question: 'Можно ли использовать проект в образовательных целях?',
            answer: 'Да, проект специально разработан для использования в образовательном процессе. Учителя могут создавать группы и отслеживать прогресс учеников.'
        }
    ],

    // Политика конфиденциальности
    privacy: {
        lastUpdated: '2024-03-15',
        dataCollection: [
            'Персональные данные (имя, email)',
            'Данные о прогрессе',
            'Результаты тестов',
            'Фотографии и материалы'
        ],
        dataUsage: [
            'Улучшение работы проекта',
            'Анализ эффективности обучения',
            'Отправка уведомлений',
            'Создание статистики'
        ]
    }
};

// Экспорт данных
export default contacts; 