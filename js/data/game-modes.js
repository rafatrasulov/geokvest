// Данные о режимах игры
const gameModes = {
    // Индивидуальный режим
    individual: {
        id: 'individual',
        name: 'Индивидуальный',
        description: 'Исследуйте города самостоятельно в своем темпе',
        features: [
            'Свободный выбор порядка посещения городов',
            'Персональный прогресс',
            'Достижения',
            'Сохранение результатов'
        ],
        requirements: {
            minAge: 12,
            registration: true
        },
        rewards: {
            points: {
                video: 10,
                quiz: 15,
                visit: 10,
                achievement: 20
            },
            badges: [
                'Первые шаги',
                'Исследователь',
                'Знаток истории',
                'Фотограф'
            ]
        },
        limitations: {
            maxCitiesPerDay: 3,
            maxQuestsPerCity: 2,
            timeLimit: null
        }
    },

    // Групповой режим
    group: {
        id: 'group',
        name: 'Групповой',
        description: 'Исследуйте города вместе с друзьями или классом',
        features: [
            'Совместное прохождение квестов',
            'Групповой прогресс',
            'Соревновательный элемент',
            'Общий рейтинг'
        ],
        requirements: {
            minAge: 12,
            registration: true,
            minGroupSize: 3,
            maxGroupSize: 30
        },
        rewards: {
            points: {
                video: 15,
                quiz: 20,
                visit: 15,
                achievement: 25,
                groupBonus: 10
            },
            badges: [
                'Командный игрок',
                'Лидер группы',
                'Сплоченность',
                'Победа команды'
            ]
        },
        limitations: {
            maxCitiesPerDay: 2,
            maxQuestsPerCity: 1,
            timeLimit: '4 часа'
        }
    },

    // Образовательный режим
    educational: {
        id: 'educational',
        name: 'Образовательный',
        description: 'Исследуйте города в рамках учебной программы',
        features: [
            'Структурированные задания',
            'Учебные материалы',
            'Контроль прогресса',
            'Оценка знаний'
        ],
        requirements: {
            minAge: 12,
            registration: true,
            teacherAccount: true
        },
        rewards: {
            points: {
                video: 10,
                quiz: 20,
                visit: 15,
                achievement: 15,
                homework: 25
            },
            badges: [
                'Отличник',
                'Исследователь',
                'Знаток края',
                'Успешный ученик'
            ]
        },
        limitations: {
            maxCitiesPerDay: 1,
            maxQuestsPerCity: 1,
            timeLimit: '2 часа'
        }
    },

    // Соревновательный режим
    competitive: {
        id: 'competitive',
        name: 'Соревновательный',
        description: 'Соревнуйтесь с другими участниками за призовые места',
        features: [
            'Рейтинговая система',
            'Ежедневные соревнования',
            'Призовые места',
            'Специальные награды'
        ],
        requirements: {
            minAge: 14,
            registration: true,
            verifiedAccount: true
        },
        rewards: {
            points: {
                video: 20,
                quiz: 25,
                visit: 20,
                achievement: 30,
                competition: 50
            },
            badges: [
                'Чемпион',
                'Лидер рейтинга',
                'Победитель',
                'Профессионал'
            ]
        },
        limitations: {
            maxCitiesPerDay: 5,
            maxQuestsPerCity: 3,
            timeLimit: '8 часов'
        }
    }
};

// Экспорт данных
export default gameModes; 