// Сервис для работы с API
class APIService {
    constructor() {
        this.baseUrl = '';
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    
    init(app) {
        this.app = app;
        const settings = app.config;
        
        // Устанавливаем базовый URL из настроек
        if (settings.api && settings.api.baseUrl) {
            this.baseUrl = `${settings.api.baseUrl}/${settings.api.version || ''}`;
        }
    }
    
    // Настройка заголовков
    setHeaders(headers) {
        this.headers = { ...this.headers, ...headers };
        return this;
    }
    
    // Выполнение GET-запроса
    async get(endpoint, params = {}) {
        const url = new URL(`${this.baseUrl}/${endpoint}`);
        
        // Добавляем параметры в URL
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        
        return this.request(url.toString(), {
            method: 'GET',
            headers: this.headers
        });
    }
    
    // Выполнение POST-запроса
    async post(endpoint, data = {}) {
        return this.request(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });
    }
    
    // Выполнение PUT-запроса
    async put(endpoint, data = {}) {
        return this.request(`${this.baseUrl}/${endpoint}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        });
    }
    
    // Выполнение DELETE-запроса
    async delete(endpoint) {
        return this.request(`${this.baseUrl}/${endpoint}`, {
            method: 'DELETE',
            headers: this.headers
        });
    }
    
    // Базовый метод для выполнения запросов
    async request(url, options) {
        try {
            const response = await fetch(url, options);
            
            // Проверяем статус ответа
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
            
            // Парсим JSON-ответ
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

export default APIService; 