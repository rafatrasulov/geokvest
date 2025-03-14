import BaseModule from '../core/base-module.js';
import DOMService from '../services/dom-service.js';

class MobileMenuModule extends BaseModule {
    init() {
        this.mobileMenuToggle = DOMService.find('.mobile-menu-toggle');
        this.navMenu = DOMService.find('.nav-menu');
        
        if (this.mobileMenuToggle && this.navMenu) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        this.addDOMListener(this.mobileMenuToggle, 'click', () => this.toggleMenu());
    }
    
    toggleMenu() {
        DOMService.toggleClass(this.navMenu, 'active');
        
        // Изменяем иконку
        const icon = this.mobileMenuToggle.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                DOMService.removeClass(icon, 'fa-bars');
                DOMService.addClass(icon, 'fa-times');
            } else {
                DOMService.removeClass(icon, 'fa-times');
                DOMService.addClass(icon, 'fa-bars');
            }
        }
    }
}

export default MobileMenuModule; 