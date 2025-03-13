// Данные о пользователях
const users = {
    // Роли пользователей
    roles: {
        admin: {
            name: 'Администратор',
            permissions: ['all']
        },
        teacher: {
            name: 'Учитель',
            permissions: [
                'manage_groups',
                'view_statistics',
                'create_assignments',
                'grade_assignments'
            ]
        },
        student: {
            name: 'Ученик',
            permissions: [
                'view_content',
                'complete_tasks',
                'view_progress',
                'share_results'
            ]
        },
        user: {
            name: 'Пользователь',
            permissions: [
                'view_content',
                'complete_tasks',
                'view_progress'
            ]
        }
    },

    // Настройки профиля по умолчанию
    defaultProfile: {
        avatar: '../../assets/images/avatars/default.png',
        theme: 'light',
        language: 'ru',
        notifications: {
            email: true,
            push: true,
            desktop: false
        },
        privacy: {
            showProgress: true,
            showAchievements: true,
            showProfile: true
        }
    },

    // Требования к паролю
    passwordRequirements: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true
    },

    // Настройки сессии
    session: {
        timeout: 3600000, // 1 час
        maxConcurrentSessions: 1,
        rememberMe: true
    },

    // Настройки восстановления пароля
    passwordRecovery: {
        tokenExpiration: 3600000, // 1 час
        maxAttempts: 3,
        cooldownPeriod: 1800000 // 30 минут
    },

    // Настройки верификации
    verification: {
        requireEmail: true,
        requirePhone: false,
        emailTemplate: 'verification',
        smsTemplate: 'verification'
    },

    // Настройки социальной авторизации
    socialAuth: {
        providers: ['google', 'vk', 'yandex'],
        autoLink: true,
        requireEmail: true
    },

    // Настройки профиля
    profile: {
        requiredFields: ['name', 'email'],
        optionalFields: ['phone', 'avatar', 'bio'],
        maxAvatarSize: 5242880, // 5MB
        allowedAvatarTypes: ['image/jpeg', 'image/png', 'image/gif']
    },

    // Настройки групп
    groups: {
        maxMembers: 30,
        maxGroupsPerTeacher: 10,
        autoArchive: true,
        archiveAfter: 365 // дней
    },

    // Настройки статистики
    statistics: {
        trackActivity: true,
        trackProgress: true,
        trackAchievements: true,
        retentionPeriod: 365 // дней
    }
};

// Экспорт данных
export default users; 