// Сервис для управления навигацией и маршрутизацией
class RouterService {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.params = {};
    }
    
    init(app) {
        this.app = app;
        
        // Обработчик изменения URL
        window.addEventListener('popstate', () => this.handleRouteChange());
        
        // Начальная инициализация маршрута
        this.handleRouteChange();
    }
    
    // Регистрация маршрута
    register(path, handler) {
        this.routes[path] = handler;
        return this;
    }
    
    // Навигация к указанному пути
    navigate(path, params = {}, replaceState = false) {
        const url = new URL(path, window.location.origin);
        
        // Добавляем параметры в URL
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        
        // Обновляем историю браузера
        if (replaceState) {
            window.history.replaceState(null, '', url.toString());
        } else {
            window.history.pushState(null, '', url.toString());
        }
        
        // Обрабатываем изменение маршрута
        this.handleRouteChange();
    }
    
    // Парсинг параметров из URL
    parseParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        
        return params;
    }
    
    // Обработка изменения маршрута
    handleRouteChange() {
        const path = window.location.pathname;
        this.params = this.parseParams();
        
        // Находим подходящий обработчик
        const matchedRoute = Object.keys(this.routes)
            .find(route => {
                if (route === '*') return true;
                
                // Простое сравнение путей
                if (route === path) return true;
                
                // Проверка с учетом параметров в пути
                const routeParts = route.split('/');
                const pathParts = path.split('/');
                
                if (routeParts.length !== pathParts.length) return false;
                
                return routeParts.every((part, i) => {
                    if (part.startsWith(':')) {
                        // Это параметр пути, извлекаем его
                        const paramName = part.slice(1);
                        this.params[paramName] = pathParts[i];
                        return true;
                    }
                    return part === pathParts[i];
                });
            });
        
        // Вызываем обработчик маршрута
        if (matchedRoute) {
            this.currentRoute = matchedRoute;
            this.routes[matchedRoute](this.params);
        } else if (this.routes['*']) {
            // Обработчик для неизвестных маршрутов
            this.currentRoute = '*';
            this.routes['*'](this.params);
        }
    }
    
    // Получение текущих параметров
    getParams() {
        return this.params;
    }
    
    // Получение текущего маршрута
    getCurrentRoute() {
        return this.currentRoute;
    }
}

export default RouterService; 