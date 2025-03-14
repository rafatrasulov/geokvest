import TemplateEngine from '../core/template-engine.js';

// Компонент карточки города
const CityCard = {
    // Шаблон компонента
    template: `
        <div class="city-card" data-city-id="{{id}}">
            <img class="city-image" 
                 src="{{imagePath}}" 
                 alt="{{name}}"
                 onerror="this.src='../assets/images/cities/default.jpg'">
            <div class="city-content">
                <h3 class="city-name">{{name}}</h3>
                {{#if description}}
                    <p class="city-description">{{description}}</p>
                {{/if}}
                {{#if population}}
                    <div class="city-stats">
                        <span>Население: {{populationFormatted}}</span>
                        {{#if founded}}
                            <span>Основан: {{founded}}</span>
                        {{/if}}
                    </div>
                {{/if}}
                <div class="city-actions">
                    {{#if isAvailable}}
                        <a href="{{cityDetailUrl}}" class="city-button primary">Исследовать</a>
                    {{else}}
                        <button class="city-button secondary" disabled>Скоро будет доступно</button>
                    {{/if}}
                </div>
            </div>
            <div class="city-status {{statusClass}}">
                {{statusText}}
            </div>
        </div>
    `,
    
    // Рендеринг карточки города
    render(city, options = {}) {
        const basePath = options.basePath || '';
        const isAvailable = city.id === 'khanty-mansiysk' || options.isAvailable;
        
        const templateData = {
            ...city,
            imagePath: `${basePath}assets/images/cities/${city.id}.jpg`,
            populationFormatted: city.population ? city.population.toLocaleString() : '',
            isAvailable,
            cityDetailUrl: `${basePath}pages/cities/city.html?id=${city.id}`,
            statusClass: isAvailable ? 'available' : 'locked',
            statusText: isAvailable ? 'Доступно' : 'Заблокировано'
        };
        
        // Подготовка данных для условных блоков
        const processedTemplate = this.template
            .replace(/\{\{#if ([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
                const value = templateData[condition];
                return value ? content : '';
            });
        
        // Компиляция шаблона
        return TemplateEngine.compile(processedTemplate, templateData);
    },
    
    // Рендеринг списка городов
    renderList(cities, options = {}) {
        return cities.map(city => this.render(city, options)).join('');
    }
};

export default CityCard; 