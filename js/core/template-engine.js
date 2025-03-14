// Простой шаблонизатор для создания компонентов
class TemplateEngine {
    // Компиляция шаблона
    static compile(template, data) {
        return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
            const keys = key.trim().split('.');
            let value = data;
            
            for (const k of keys) {
                value = value?.[k];
                if (value === undefined) break;
            }
            
            return value === undefined ? '' : value;
        });
    }
    
    // Рендеринг массива элементов с использованием шаблона
    static renderList(items, templateFn) {
        return items.map(item => templateFn(item)).join('');
    }
    
    // Создание компонента (рендеринг шаблона и навешивание обработчиков)
    static createComponent(template, data, events = {}) {
        const html = this.compile(template, data);
        const container = document.createElement('div');
        container.innerHTML = html;
        const element = container.firstChild;
        
        // Добавляем обработчики событий
        Object.entries(events).forEach(([selector, eventHandlers]) => {
            Object.entries(eventHandlers).forEach(([eventType, handler]) => {
                const targets = element.querySelectorAll(selector);
                targets.forEach(target => {
                    target.addEventListener(eventType, (e) => handler(e, data));
                });
            });
        });
        
        return element;
    }
}

export default TemplateEngine; 