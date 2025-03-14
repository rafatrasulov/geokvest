// Новый модуль для сворачиваемых секций
import BaseModule from '../core/base-module.js';
import DOMService from '../services/dom-service.js';

class CollapsibleSectionsModule extends BaseModule {
    init() {
        // Добавляем сворачиваемые секции только на мобильных устройствах
        if (window.innerWidth <= 768) {
            this.setupCollapsibleSections();
        }
    }
    
    setupCollapsibleSections() {
        const sections = [
            { selector: '.video-section', title: 'Приветственное видео' },
            { selector: '.features', title: 'Почему выбирают нас' }
        ];
        
        sections.forEach(section => this.makeCollapsible(section));
    }
    
    makeCollapsible({ selector, title }) {
        const sectionEl = DOMService.find(selector);
        if (!sectionEl) return;
        
        // Находим существующий заголовок или создаем новый
        let headerEl;
        if (selector === '.video-section') {
            headerEl = sectionEl.querySelector('.video-title');
        } else {
            headerEl = sectionEl.querySelector('h2');
        }
        
        if (headerEl) {
            // Создаем обертку для заголовка
            const wrapper = DOMService.create('div', { 
                classes: ['section-collapse'] 
            });
            
            headerEl.parentNode.insertBefore(wrapper, headerEl);
            wrapper.appendChild(headerEl);
            
            // Добавляем иконку
            const icon = DOMService.create('i', { 
                classes: ['fas', 'fa-chevron-up', 'toggle-icon'] 
            });
            wrapper.appendChild(icon);
            
            // Оборачиваем содержимое в div для сворачивания
            const contentEls = Array.from(sectionEl.children).filter(child => {
                return !child.classList.contains('section-collapse') && 
                       !(child.querySelector && child.querySelector('.section-collapse'));
            });
            
            if (contentEls.length > 0) {
                const contentWrapper = DOMService.create('div', { 
                    classes: ['collapsible-content'] 
                });
                
                // Перемещаем содержимое в обертку
                contentEls.forEach(el => {
                    sectionEl.removeChild(el);
                    contentWrapper.appendChild(el);
                });
                
                sectionEl.appendChild(contentWrapper);
                
                // Добавляем обработчик событий
                this.addDOMListener(wrapper, 'click', () => this.toggleSection(wrapper, contentWrapper));
            }
        }
    }
    
    toggleSection(header, content) {
        DOMService.toggleClass(header, 'collapsed');
        DOMService.toggleClass(content, 'collapsed');
    }
}

export default CollapsibleSectionsModule; 