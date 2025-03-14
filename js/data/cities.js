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