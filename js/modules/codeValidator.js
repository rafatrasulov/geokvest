// Модуль для валидации кодов
const CodeValidator = {
    // Формат кода: CODE{номер_станции}
    // Например: CODE1, CODE2, и т.д.

    // Проверка кода
    validateCode(code) {
        if (!code || typeof code !== 'string') {
            return {
                isValid: false,
                message: 'Код не может быть пустым'
            };
        }

        // Проверка формата кода
        const codePattern = /^CODE\d+$/;
        if (!codePattern.test(code)) {
            return {
                isValid: false,
                message: 'Неверный формат кода'
            };
        }

        // Извлечение номера станции
        const stationNumber = parseInt(code.replace('CODE', ''));
        
        // Проверка диапазона номера станции
        if (stationNumber < 1 || stationNumber > 16) {
            return {
                isValid: false,
                message: 'Неверный номер станции'
            };
        }

        // Проверка, не разблокирована ли уже станция
        const progress = JSON.parse(localStorage.getItem('questProgress') || '{}');
        if (progress.completedStations && progress.completedStations.includes(stationNumber)) {
            return {
                isValid: false,
                message: 'Эта станция уже разблокирована'
            };
        }

        return {
            isValid: true,
            stationNumber: stationNumber,
            message: 'Код принят'
        };
    },

    // Генерация кода для станции
    generateCode(stationNumber) {
        if (stationNumber < 1 || stationNumber > 16) {
            throw new Error('Неверный номер станции');
        }
        return `CODE${stationNumber}`;
    },

    // Проверка кода и разблокировка станции
    validateAndUnlock(code) {
        const validationResult = this.validateCode(code);
        
        if (!validationResult.isValid) {
            return validationResult;
        }

        // Разблокировка станции
        const progress = JSON.parse(localStorage.getItem('questProgress') || '{}');
        if (!progress.completedStations) {
            progress.completedStations = [];
        }

        if (!progress.completedStations.includes(validationResult.stationNumber)) {
            progress.completedStations.push(validationResult.stationNumber);
            localStorage.setItem('questProgress', JSON.stringify(progress));
        }

        return {
            isValid: true,
            stationNumber: validationResult.stationNumber,
            message: 'Станция успешно разблокирована'
        };
    }
};

// Экспорт модуля
export default CodeValidator; 