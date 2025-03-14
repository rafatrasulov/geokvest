// Сервис для миграции данных между версиями приложения
class MigrationService {
    constructor() {
        this.migrations = {};
        this.currentVersion = '1.0.0';
    }
    
    init(app) {
        this.app = app;
        
        // Получаем текущую версию приложения
        this.currentVersion = app.config.app?.version || '1.0.0';
        
        // Проверяем необходимость миграции
        this.checkMigrations();
    }
    
    // Регистрация миграции
    registerMigration(fromVersion, toVersion, migrationFn) {
        const key = `${fromVersion}->${toVersion}`;
        this.migrations[key] = migrationFn;
        return this;
    }
    
    // Проверка необходимости миграции
    async checkMigrations() {
        // Получаем версию из localStorage
        const savedVersion = localStorage.getItem('app_version');
        
        if (!savedVersion || savedVersion !== this.currentVersion) {
            await this.migrateData(savedVersion || '0.0.0', this.currentVersion);
            localStorage.setItem('app_version', this.currentVersion);
        }
    }
    
    // Миграция данных между версиями
    async migrateData(fromVersion, toVersion) {
        if (fromVersion === toVersion) return;
        
        // Сравниваем версии
        const fromParts = fromVersion.split('.').map(Number);
        const toParts = toVersion.split('.').map(Number);
        
        // Находим все подходящие миграции
        const migrationKeys = Object.keys(this.migrations);
        
        for (const key of migrationKeys) {
            const [migFromVersion, migToVersion] = key.split('->');
            
            // Проверяем, подходит ли миграция
            if (this.compareVersions(fromVersion, migFromVersion) >= 0 && 
                this.compareVersions(migToVersion, toVersion) <= 0) {
                
                // Выполняем миграцию
                try {
                    await this.migrations[key](this.app);
                    console.log(`Migration ${key} completed successfully`);
                } catch (error) {
                    console.error(`Error executing migration ${key}:`, error);
                }
            }
        }
    }
    
    // Сравнение версий (возвращает -1, 0, 1)
    compareVersions(versionA, versionB) {
        const partsA = versionA.split('.').map(Number);
        const partsB = versionB.split('.').map(Number);
        
        for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
            const a = partsA[i] || 0;
            const b = partsB[i] || 0;
            
            if (a > b) return 1;
            if (a < b) return -1;
        }
        
        return 0;
    }
}

export default MigrationService; 