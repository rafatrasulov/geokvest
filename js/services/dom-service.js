// Сервис для абстракции работы с DOM
class DOMService {
    // Поиск элемента в DOM
    static find(selector) {
        return document.querySelector(selector);
    }

    // Поиск всех элементов в DOM
    static findAll(selector) {
        return document.querySelectorAll(selector);
    }

    // Создание элемента
    static create(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Устанавливаем атрибуты
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'text') {
                element.textContent = value;
            } else if (key === 'html') {
                element.innerHTML = value;
            } else if (key === 'events') {
                Object.entries(value).forEach(([event, handler]) => {
                    element.addEventListener(event, handler);
                });
            } else if (key === 'classes' && Array.isArray(value)) {
                value.forEach(cls => element.classList.add(cls));
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Добавляем дочерние элементы
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    }

    // Добавление класса к элементу
    static addClass(element, className) {
        element.classList.add(className);
        return element;
    }

    // Удаление класса у элемента
    static removeClass(element, className) {
        element.classList.remove(className);
        return element;
    }

    // Переключение класса у элемента
    static toggleClass(element, className) {
        element.classList.toggle(className);
        return element;
    }

    // Установка содержимого элемента
    static setContent(element, content) {
        if (typeof content === 'string') {
            element.innerHTML = content;
        } else {
            element.innerHTML = '';
            element.appendChild(content);
        }
        return element;
    }

    // Добавление обработчика события
    static on(element, eventType, handler, options) {
        element.addEventListener(eventType, handler, options);
        return {
            remove: () => element.removeEventListener(eventType, handler, options)
        };
    }

    // Делегирование события
    static delegate(element, eventType, selector, handler) {
        const listener = (event) => {
            const target = event.target.closest(selector);
            if (target && element.contains(target)) {
                handler.call(target, event, target);
            }
        };
        element.addEventListener(eventType, listener);
        return {
            remove: () => element.removeEventListener(eventType, listener)
        };
    }
}

export default DOMService; 