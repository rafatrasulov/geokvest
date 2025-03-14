// Сервис для управления темами приложения
class ThemeService {
    constructor() {
        this.themes = ['light', 'dark', 'high-contrast'];
        this.currentTheme = 'light';
    }
    
    init(app) {
        this.app = app;
        
        // Загружаем тему из localStorage
        const savedTheme = localStorage.getItem('app_theme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }
        
        // Применяем текущую тему
        this.applyTheme(this.currentTheme);
        
        // Слушаем системные настройки
        this.setupSystemPreferenceListener();
    }
    
    // Установка темы
    setTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.error(`Theme "${theme}" is not available`);
            return;
        }
        
        this.currentTheme = theme;
        localStorage.setItem('app_theme', theme);
        
        // Применяем тему
        this.applyTheme(theme);
    }
    
    // Получение текущей темы
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Применение темы
    applyTheme(theme) {
        // Удаляем все классы тем у body
        document.body.classList.remove(...this.themes.map(t => `theme-${t}`));
        
        // Добавляем класс текущей темы
        document.body.classList.add(`theme-${theme}`);
        
        // Оповещаем о смене темы
        document.dispatchEvent(new CustomEvent('theme-changed', { 
            detail: { theme } 
        }));
    }
    
    // Переключение на следующую тему
    toggleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.setTheme(this.themes[nextIndex]);
    }
    
    // Слушаем системные настройки темы
    setupSystemPreferenceListener() {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Обработчик изменения системной темы
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('app_theme')) {
                // Пользователь не установил тему вручную, применяем системную
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        // Добавляем слушатель изменения системной темы
        darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
        
        // Проверяем текущую системную тему
        if (!localStorage.getItem('app_theme')) {
            handleSystemThemeChange(darkModeMediaQuery);
        }
    }
}

export default ThemeService; 