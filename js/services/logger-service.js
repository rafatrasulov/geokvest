// Сервис для централизованного логирования и отслеживания ошибок
class LoggerService {
    constructor() {
        this.logLevels = {
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3
        };
        this.currentLevel = this.logLevels.INFO;
        this.handlers = [];
    }
    
    init(app) {
        this.app = app;
        
        // Глобальный обработчик необработанных ошибок
        window.addEventListener('error', (event) => {
            this.error('Uncaught Error', event.error);
            return false;
        });
        
        // Глобальный обработчик отклоненных промисов
        window.addEventListener('unhandledrejection', (event) => {
            this.error('Unhandled Promise Rejection', event.reason);
            return false;
        });
    }
    
    // Установка уровня логирования
    setLevel(level) {
        this.currentLevel = level;
        return this;
    }
    
    // Добавление обработчика логов
    addHandler(handler) {
        this.handlers.push(handler);
        return this;
    }
    
    // Логирование ошибки
    error(message, error) {
        if (this.currentLevel >= this.logLevels.ERROR) {
            const logEntry = this.formatLogEntry('ERROR', message, error);
            this.processLogEntry(logEntry);
            
            // Можно добавить отправку ошибки на сервер аналитики
            // this.sendToAnalyticsServer(logEntry);
        }
        return this;
    }
    
    // Логирование предупреждения
    warn(message, data) {
        if (this.currentLevel >= this.logLevels.WARN) {
            const logEntry = this.formatLogEntry('WARN', message, data);
            this.processLogEntry(logEntry);
        }
        return this;
    }
    
    // Логирование информационного сообщения
    info(message, data) {
        if (this.currentLevel >= this.logLevels.INFO) {
            const logEntry = this.formatLogEntry('INFO', message, data);
            this.processLogEntry(logEntry);
        }
        return this;
    }
    
    // Логирование отладочного сообщения
    debug(message, data) {
        if (this.currentLevel >= this.logLevels.DEBUG) {
            const logEntry = this.formatLogEntry('DEBUG', message, data);
            this.processLogEntry(logEntry);
        }
        return this;
    }
    
    // Форматирование записи лога
    formatLogEntry(level, message, data) {
        return {
            timestamp: new Date(),
            level,
            message,
            data
        };
    }
    
    // Обработка записи лога
    processLogEntry(logEntry) {
        // Вывод в консоль
        const { timestamp, level, message, data } = logEntry;
        console[level.toLowerCase()](`[${timestamp.toISOString()}] [${level}] ${message}`, data);
        
        // Вызов всех обработчиков
        this.handlers.forEach(handler => {
            try {
                handler(logEntry);
            } catch (e) {
                console.error('Error in log handler:', e);
            }
        });
    }
}

export default LoggerService; 