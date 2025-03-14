// Пример миграции данных с версии 1.0.0 на версию 1.1.0
export default function migrate(app) {
    return new Promise((resolve, reject) => {
        try {
            const logger = app.getService('logger');
            logger.info('Running migration from 1.0.0 to 1.1.0');
            
            // Получаем текущее состояние из localStorage
            const oldProgressKey = 'questProgress';
            const oldProgress = localStorage.getItem(oldProgressKey);
            
            if (oldProgress) {
                try {
                    // Парсим старые данные
                    const progress = JSON.parse(oldProgress);
                    
                    // Преобразуем данные в новый формат
                    const newProgress = {
                        completedStations: progress.completedStations || [],
                        currentStation: progress.currentStation || 1,
                        points: 0, // Новое поле в версии 1.1.0
                        achievements: [], // Новое поле в версии 1.1.0
                        lastUpdated: new Date().toISOString()
                    };
                    
                    // Сохраняем в новом формате в стейт-сервисе
                    const stateService = app.getService('state');
                    stateService.set('progress', newProgress);
                    
                    // Удаляем старый ключ
                    localStorage.removeItem(oldProgressKey);
                    
                    logger.info('Migration completed successfully');
                } catch (error) {
                    logger.error('Error parsing old progress data', error);
                }
            }
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
} 