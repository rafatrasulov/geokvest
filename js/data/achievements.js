// Данные о достижениях
const achievements = [
    // Достижения за прогресс
    {
        id: 'first-steps',
        name: 'Первые шаги',
        description: 'Посетите свой первый город',
        icon: '🚶',
        points: 50,
        category: 'progress',
        requirements: {
            citiesVisited: 1
        }
    },
    {
        id: 'explorer',
        name: 'Исследователь Югры',
        description: 'Посетите все города в регионе',
        icon: '🗺️',
        points: 500,
        category: 'progress',
        requirements: {
            citiesVisited: 16
        }
    },
    {
        id: 'speed-runner',
        name: 'Скороход',
        description: 'Завершите квест менее чем за 30 минут',
        icon: '⚡',
        points: 100,
        category: 'progress',
        requirements: {
            questTime: 1800 // 30 минут в секундах
        }
    },

    // Достижения за знания
    {
        id: 'excellent-student',
        name: 'Отличник',
        description: 'Наберите 100% на любом тесте',
        icon: '📚',
        points: 150,
        category: 'academic',
        requirements: {
            quizScore: 100
        }
    },
    {
        id: 'historian',
        name: 'Историк',
        description: 'Изучите все исторические факты о городах',
        icon: '📜',
        points: 300,
        category: 'academic',
        requirements: {
            factsLearned: 100
        }
    },
    {
        id: 'photographer',
        name: 'Фотограф',
        description: 'Сделайте фотографии всех достопримечательностей',
        icon: '📸',
        points: 200,
        category: 'academic',
        requirements: {
            landmarksPhotographed: 50
        }
    },

    // Специальные достижения
    {
        id: 'night-owl',
        name: 'Ночная сова',
        description: 'Завершите квест после 22:00',
        icon: '🦉',
        points: 75,
        category: 'special',
        requirements: {
            completionTime: '22:00'
        }
    },
    {
        id: 'early-bird',
        name: 'Ранняя пташка',
        description: 'Завершите квест до 8:00',
        icon: '🐦',
        points: 75,
        category: 'special',
        requirements: {
            completionTime: '08:00'
        }
    },
    {
        id: 'streak-master',
        name: 'Непрерывный прогресс',
        description: 'Выполняйте задания 7 дней подряд',
        icon: '🔥',
        points: 250,
        category: 'special',
        requirements: {
            consecutiveDays: 7
        }
    },

    // Социальные достижения
    {
        id: 'social-butterfly',
        name: 'Общительный',
        description: 'Поделитесь результатами в социальных сетях',
        icon: '🦋',
        points: 50,
        category: 'social',
        requirements: {
            shares: 1
        }
    },
    {
        id: 'group-leader',
        name: 'Лидер группы',
        description: 'Создайте группу и пригласите 5 друзей',
        icon: '👥',
        points: 150,
        category: 'social',
        requirements: {
            groupMembers: 5
        }
    },
    {
        id: 'mentor',
        name: 'Наставник',
        description: 'Помогите 3 новым участникам',
        icon: '👨‍🏫',
        points: 200,
        category: 'social',
        requirements: {
            helpedUsers: 3
        }
    }
];

// Категории достижений
const achievementCategories = {
    progress: {
        name: 'Прогресс',
        description: 'Достижения за продвижение по проекту',
        icon: '🎯'
    },
    academic: {
        name: 'Знания',
        description: 'Достижения за успехи в обучении',
        icon: '📚'
    },
    special: {
        name: 'Особые',
        description: 'Специальные достижения',
        icon: '⭐'
    },
    social: {
        name: 'Социальные',
        description: 'Достижения за социальную активность',
        icon: '👥'
    }
};

// Экспорт данных
export default {
    achievements,
    achievementCategories
}; 