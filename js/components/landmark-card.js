import TemplateEngine from '../core/template-engine.js';

// Компонент карточки достопримечательности
const LandmarkCard = {
    // Шаблон компонента
    template: `
        <div class="landmark-card" data-landmark-id="{{id}}">
            <div class="landmark-image">
                <img src="{{imagePath}}" alt="{{name}}" onerror="this.src='{{defaultImage}}'">
            </div>
            <div class="landmark-info">
                <h4>{{name}}</h4>
                <p>{{description}}</p>
                {{#if facts}}
                <div class="landmark-facts">
                    {{#each facts}}
                    <div class="fact-item">
                        <span class="fact-icon">•</span>
                        <span class="fact-text">{{this}}</span>
                    </div>
                    {{/each}}
                </div>
                {{/if}}
            </div>
            <div class="landmark-actions">
                <button class="view-on-map">На карте</button>
                <button class="view-3d">3D тур</button>
            </div>
        </div>
    `,
    
    // Рендеринг карточки достопримечательности
    render(landmark, options = {}) {
        const basePath = options.basePath || '';
        const defaultImage = `${basePath}assets/images/landmarks/default.jpg`;
        
        const templateData = {
            ...landmark,
            imagePath: landmark.image || `${basePath}assets/images/landmarks/${landmark.id}.jpg`,
            defaultImage,
        };
        
        // Обработка условных блоков
        let processedTemplate = this.template
            .replace(/\{\{#if ([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
                const value = this.getNestedProperty(templateData, condition);
                return value ? content : '';
            });
        
        // Обработка циклов {{#each}}
        processedTemplate = processedTemplate
            .replace(/\{\{#each ([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayName, content) => {
                const array = this.getNestedProperty(templateData, arrayName);
                if (!array || !Array.isArray(array)) return '';
                
                return array.map(item => {
                    return content.replace(/\{\{this\}\}/g, item);
                }).join('');
            });
        
        // Компиляция шаблона
        return TemplateEngine.compile(processedTemplate, templateData);
    },
    
    // Получение вложенного свойства объекта по пути
    getNestedProperty(obj, path) {
        const props = path.split('.');
        let result = obj;
        for (const prop of props) {
            if (result === undefined || result === null) return undefined;
            result = result[prop];
        }
        return result;
    }
};

export default LandmarkCard; 