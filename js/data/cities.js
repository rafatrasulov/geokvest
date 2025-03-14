// Данные о городах
const cities = [
    {
        id: 'khanty-mansiysk',
        name: 'Ханты-Мансийск',
        description: 'Столица Ханты-Мансийского автономного округа - Югры, город с богатой историей и культурой коренных народов.',
        coordinates: {
            lat: 61.0042,
            lng: 69.0019
        },
        population: 107473,
        founded: 1930,
        learningContent: {
            history: "Ханты-Мансийск был основан в 1930 году как поселок Остяко-Вогульск. В 1940 году был переименован в Ханты-Мансийск по названию коренных народов ханты и манси. Статус города получил в 1950 году.",
            facts: [
                "Ханты-Мансийск входит в десятку самых благоустроенных городов России",
                "Ежегодно в городе проходит Международный фестиваль кинематографических дебютов «Дух огня»",
                "В Ханты-Мансийске расположен один из крупнейших в России музеев под открытым небом «Торум Маа»"
            ],
            educational: "<p>В Ханты-Мансийске находится крупный образовательный центр — Югорский государственный университет, основанный в 2001 году.</p><p>Город известен своими музеями, среди которых: Музей природы и человека, Музей геологии, нефти и газа, Дом-музей народного художника СССР В. А. Игошева.</p>"
        },
        controlContent: {
            quizzes: [
                {
                    question: "В каком году Ханты-Мансийск получил статус города?",
                    options: ["1930", "1940", "1950", "1960"],
                    correctAnswer: 2
                },
                {
                    question: "Какие коренные народы дали название городу?",
                    options: ["Ненцы и эвенки", "Ханты и манси", "Эвены и чукчи", "Коми и удмурты"],
                    correctAnswer: 1
                },
                {
                    question: "Какой международный фестиваль ежегодно проходит в Ханты-Мансийске?",
                    options: ["Кинофестиваль «Дух огня»", "Театральный фестиваль «Сибирь»", "Фестиваль искусств «Северное сияние»", "Музыкальный фестиваль «Югра»"],
                    correctAnswer: 0
                }
            ],
            interactiveTasks: "<div class='interactive-task'><h4>Задание: Расположите в хронологическом порядке события из истории города</h4><div class='drag-drop-container'><div class='draggable-item' data-order='3'>Получение статуса города</div><div class='draggable-item' data-order='1'>Основание поселка Остяко-Вогульск</div><div class='draggable-item' data-order='2'>Переименование в Ханты-Мансийск</div><div class='draggable-item' data-order='4'>Создание Югорского государственного университета</div></div></div>"
        },
        landmarks: [
            {
                id: 'khanty-mansiysk-1',
                name: 'Парк Победы',
                description: 'Мемориальный комплекс в честь победы в Великой Отечественной войне',
                coordinates: {
                    lat: 61.0042,
                    lng: 69.0019
                },
                image: '../../assets/images/landmarks/khanty-mansiysk/park-pobedy.jpg',
                type: 'memorial'
            },
            {
                id: 'khanty-mansiysk-2',
                name: 'Музей природы и человека',
                description: 'Краеведческий музей с экспозицией о природе и истории края',
                coordinates: {
                    lat: 61.0042,
                    lng: 69.0019
                },
                image: '../../assets/images/landmarks/khanty-mansiysk/museum.jpg',
                type: 'museum'
            },
            {
                id: "arhepark",
                name: "Археопарк",
                description: "Уникальный парк с бронзовыми скульптурами мамонтов и других животных ледникового периода."
            },
            {
                id: "museum-nature",
                name: "Музей Природы и Человека",
                description: "Крупнейший музей региона, рассказывающий об истории и природе края."
            }
        ],
        quests: [
            {
                id: 'khanty-mansiysk-quest-1',
                title: 'История столицы Югры',
                description: 'Исследуйте исторические места города и узнайте о его становлении',
                tasks: [
                    {
                        id: 'task-1',
                        title: 'Посетите Музей природы и человека',
                        description: 'Изучите экспозицию о становлении города',
                        type: 'visit',
                        points: 10
                    },
                    {
                        id: 'task-2',
                        title: 'Ответьте на вопросы о городе',
                        description: 'Проверьте свои знания о Ханты-Мансийске',
                        type: 'quiz',
                        points: 15
                    }
                ],
                totalPoints: 25,
                duration: '1 час',
                difficulty: 'easy'
            }
        ]
    },
    {
        id: 'beloyarskiy',
        name: 'Белоярский',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 63.7167,
            lng: 66.6667
        }
    },
    {
        id: 'kogalym',
        name: 'Когалым',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 62.2667,
            lng: 74.4833
        }
    },
    {
        id: 'pokachi',
        name: 'Покачи',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.7500,
            lng: 75.5833
        }
    },
    {
        id: 'pyt-yakh',
        name: 'Пыть-Ях',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 60.7500,
            lng: 72.7833
        }
    },
    {
        id: 'raduzhny',
        name: 'Радужный',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 62.1333,
            lng: 77.4667
        }
    },
    {
        id: 'sovetskiy',
        name: 'Советский',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.3667,
            lng: 63.5667
        }
    },
    {
        id: 'nizhnevartovsk',
        name: 'Нижневартовск',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 60.9333,
            lng: 76.5667
        }
    },
    {
        id: 'surgut',
        name: 'Сургут',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.2500,
            lng: 73.4167
        }
    },
    {
        id: 'nefteyugansk',
        name: 'Нефтеюганск',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.1000,
            lng: 72.6000
        }
    },
    {
        id: 'nyagan',
        name: 'Нягань',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 62.1333,
            lng: 65.3833
        }
    },
    {
        id: 'uray',
        name: 'Урай',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 60.1333,
            lng: 64.7833
        }
    },
    {
        id: 'megion',
        name: 'Мегион',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.0333,
            lng: 76.1000
        }
    },
    {
        id: 'ugorsk',
        name: 'Югорск',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.3167,
            lng: 63.3333
        }
    },
    {
        id: 'langepas',
        name: 'Лангепас',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 61.2500,
            lng: 75.1667
        }
    },
    {
        id: 'berezovo',
        name: 'Березово',
        description: 'Город в ХМАО-Югре',
        coordinates: {
            lat: 63.9333,
            lng: 65.0333
        }
    }
];

// Экспорт данных
export default cities; 