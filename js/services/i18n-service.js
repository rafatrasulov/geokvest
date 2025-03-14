// Сервис для интернационализации
class I18nService {
    constructor() {
        this.translations = {};
        this.currentLocale = 'ru';
        this.fallbackLocale = 'ru';
    }
    
    init(app) {
        this.app = app;
        
        // Загружаем язык из настроек или localStorage
        const savedLocale = localStorage.getItem('app_locale');
        if (savedLocale) {
            this.currentLocale = savedLocale;
        } else if (app.config.language) {
            this.currentLocale = app.config.language;
        }
        
        // Загружаем переводы для текущего языка
        this.loadTranslations(this.currentLocale);
    }
    
    // Загрузка переводов
    async loadTranslations(locale) {
        try {
            // Используем динамический импорт для загрузки переводов
            const module = await import(`../data/locales/${locale}.js`);
            this.translations[locale] = module.default;
            
            // Уведомляем об изменении языка
            document.dispatchEvent(new CustomEvent('locale-changed', { 
                detail: { locale } 
            }));
        } catch (error) {
            console.error(`Failed to load translations for locale: ${locale}`, error);
            
            // Пробуем загрузить резервный язык, если он отличается от текущего
            if (locale !== this.fallbackLocale) {
                this.loadTranslations(this.fallbackLocale);
            }
        }
    }
    
    // Смена языка
    async setLocale(locale) {
        if (locale === this.currentLocale) return;
        
        // Загружаем переводы, если они еще не загружены
        if (!this.translations[locale]) {
            await this.loadTranslations(locale);
        }
        
        this.currentLocale = locale;
        localStorage.setItem('app_locale', locale);
        
        // Обновляем UI с новым языком
        this.updateUI();
        
        return this;
    }
    
    // Получение перевода по ключу
    translate(key, params = {}) {
        // Получаем перевод из текущего языка или из резервного
        const translations = this.translations[this.currentLocale] || this.translations[this.fallbackLocale] || {};
        
        // Получаем перевод по ключу
        let translation = this.getNestedTranslation(translations, key);
        
        // Если перевод не найден, возвращаем ключ
        if (!translation) {
            return key;
        }
        
        // Заменяем параметры в переводе
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                translation = translation.replace(new RegExp(`{${param}}`, 'g'), params[param]);
            });
        }
        
        return translation;
    }
    
    // Получение вложенного перевода
    getNestedTranslation(translations, key) {
        const keys = key.split('.');
        let result = translations;
        
        for (const k of keys) {
            if (!result || typeof result !== 'object') {
                return null;
            }
            result = result[k];
        }
        
        return result;
    }
    
    // Обновление UI с новыми переводами
    updateUI() {
        // Находим все элементы с атрибутом data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            // Обновляем текст элемента
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }
    
    // Сокращенная форма метода translate
    t(key, params) {
        return this.translate(key, params);
    }
}

export default I18nService; 