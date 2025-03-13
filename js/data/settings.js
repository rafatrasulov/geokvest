// Настройки проекта
const settings = {
    // Основные настройки
    app: {
        name: 'ГеоКвест по ХМАО-Югре',
        version: '1.0.0',
        language: 'ru',
        defaultMode: 'individual',
        maxCities: 16,
        supportedBrowsers: ['Chrome', 'Firefox', 'Safari', 'Edge']
    },

    // Настройки прогресса
    progress: {
        saveInterval: 30000, // 30 секунд
        maxSaveAttempts: 3,
        storageKey: 'geokvest_progress'
    },

    // Настройки видео
    video: {
        maxDuration: 600, // 10 минут
        supportedFormats: ['mp4', 'webm'],
        quality: {
            default: '720p',
            options: ['360p', '720p', '1080p']
        }
    },

    // Настройки карты
    map: {
        provider: 'yandex',
        defaultZoom: 10,
        maxZoom: 18,
        minZoom: 5,
        defaultCenter: {
            lat: 61.0042,
            lng: 69.0019
        }
    },

    // Настройки квестов
    quest: {
        maxAttempts: 3,
        timeLimit: 3600, // 1 час
        requiredScore: 80,
        rewards: {
            points: {
                video: 100,
                quiz: 200,
                tour: 150
            }
        }
    },

    // Настройки безопасности
    security: {
        maxLoginAttempts: 5,
        sessionTimeout: 3600000, // 1 час
        passwordMinLength: 8,
        requireEmailVerification: true
    },

    // Настройки уведомлений
    notifications: {
        enabled: true,
        types: {
            quest: true,
            achievement: true,
            news: true,
            system: true
        },
        sound: true,
        desktop: true
    },

    // Настройки доступности
    accessibility: {
        highContrast: false,
        largeText: false,
        screenReader: false,
        keyboardNavigation: true
    },

    // Настройки аналитики
    analytics: {
        enabled: true,
        provider: 'google',
        trackEvents: true,
        trackErrors: true
    },

    // Настройки кэширования
    cache: {
        enabled: true,
        maxSize: 100, // MB
        expiration: 86400 // 24 часа
    },

    // Настройки API
    api: {
        baseUrl: 'https://api.geokvest-hmao.ru',
        version: 'v1',
        timeout: 30000,
        retryAttempts: 3
    }
};

// Экспорт данных
export default settings; 