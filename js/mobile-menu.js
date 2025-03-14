document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Изменяем иконку
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Добавляем заголовки и кнопки для сворачивания разделов в мобильной версии
    if (window.innerWidth <= 768) {
        const sections = [
            { selector: '.video-section', title: 'Приветственное видео' },
            { selector: '.features', title: 'Почему выбирают нас' }
        ];
        
        sections.forEach(section => {
            const sectionEl = document.querySelector(section.selector);
            if (sectionEl) {
                // Находим существующий заголовок или создаем новый div для заголовка
                let headerEl;
                if (section.selector === '.video-section') {
                    headerEl = sectionEl.querySelector('.video-title');
                    if (headerEl) {
                        // Создаем обертку для существующего заголовка
                        const wrapper = document.createElement('div');
                        wrapper.className = 'section-collapse';
                        headerEl.parentNode.insertBefore(wrapper, headerEl);
                        wrapper.appendChild(headerEl);
                        
                        // Добавляем иконку
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-chevron-up toggle-icon';
                        wrapper.appendChild(icon);
                    }
                } else {
                    // Для других секций
                    headerEl = sectionEl.querySelector('h2');
                    if (headerEl) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'section-collapse';
                        headerEl.parentNode.insertBefore(wrapper, headerEl);
                        wrapper.appendChild(headerEl);
                        
                        // Добавляем иконку
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-chevron-up toggle-icon';
                        wrapper.appendChild(icon);
                    }
                }
                
                // Оборачиваем содержимое в div для сворачивания
                const contentEls = Array.from(sectionEl.children).filter(child => {
                    return !child.classList.contains('section-collapse') && 
                           !(child.querySelector && child.querySelector('.section-collapse'));
                });
                
                if (contentEls.length > 0) {
                    const contentWrapper = document.createElement('div');
                    contentWrapper.className = 'collapsible-content';
                    
                    // Перемещаем содержимое в обертку
                    contentEls.forEach(el => {
                        sectionEl.removeChild(el);
                        contentWrapper.appendChild(el);
                    });
                    
                    sectionEl.appendChild(contentWrapper);
                    
                    // Добавляем обработчик событий
                    const collapseHeader = sectionEl.querySelector('.section-collapse');
                    if (collapseHeader) {
                        collapseHeader.addEventListener('click', function() {
                            this.classList.toggle('collapsed');
                            const content = sectionEl.querySelector('.collapsible-content');
                            if (content) {
                                content.classList.toggle('collapsed');
                            }
                        });
                    }
                }
            }
        });
    }

    // Добавляем поддержку переключателя режимов в мобильном меню
    const modeSwitch = document.querySelector('.mode-switch');
    if (modeSwitch && window.innerWidth <= 768) {
        // Помещаем переключатель в мобильное меню
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const modeSwitchItem = document.createElement('li');
            modeSwitchItem.className = 'nav-menu-mode-switch';
            modeSwitchItem.appendChild(modeSwitch.cloneNode(true));
            navMenu.appendChild(modeSwitchItem);
            
            // Удаляем оригинальный переключатель
            modeSwitch.parentNode.removeChild(modeSwitch);
            
            // Настраиваем обработчики для клонированного переключателя
            const learningBtn = navMenu.querySelector('.mode-switch__button--learning');
            const controlBtn = navMenu.querySelector('.mode-switch__button--control');
            
            if (learningBtn && controlBtn) {
                learningBtn.addEventListener('click', function() {
                    document.dispatchEvent(new CustomEvent('modeChanged', { detail: { mode: 'learning' } }));
                    learningBtn.classList.add('active');
                    controlBtn.classList.remove('active');
                });
                
                controlBtn.addEventListener('click', function() {
                    document.dispatchEvent(new CustomEvent('modeChanged', { detail: { mode: 'control' } }));
                    controlBtn.classList.add('active');
                    learningBtn.classList.remove('active');
                });
            }
        }
    }
});