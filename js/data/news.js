// Данные о новостях
const news = [
    {
        id: 'launch',
        title: 'Запуск проекта "ГеоКвест по ХМАО-Югре"',
        date: '2024-03-15',
        content: 'Мы рады сообщить о запуске нашего нового образовательного проекта "ГеоКвест по ХМАО-Югре". Теперь школьники и все желающие могут исследовать города нашего региона в интерактивном формате.',
        image: '../../assets/images/news/launch.jpg',
        category: 'announcement',
        isImportant: true,
        tags: ['запуск', 'образование', 'интерактив']
    },
    {
        id: 'new-cities',
        title: 'Добавлены новые города в квест',
        date: '2024-03-20',
        content: 'В проект добавлены новые города: Нижневартовск, Сургут и Ханты-Мансийск. Теперь участники могут исследовать больше интересных мест и узнавать историю нашего края.',
        image: '../../assets/images/news/new-cities.jpg',
        category: 'update',
        isImportant: true,
        tags: ['города', 'обновление', 'расширение']
    },
    {
        id: 'contest',
        title: 'Конкурс "Лучший исследователь Югры"',
        date: '2024-03-25',
        content: 'Объявляем конкурс среди участников проекта! Поделитесь своими впечатлениями о посещенных городах и выиграйте ценные призы. Подробности в разделе "Конкурсы".',
        image: '../../assets/images/news/contest.jpg',
        category: 'event',
        isImportant: true,
        tags: ['конкурс', 'призы', 'исследование']
    },
    {
        id: 'interface-update',
        title: 'Обновление интерфейса',
        date: '2024-03-30',
        content: 'Мы улучшили пользовательский интерфейс проекта. Теперь навигация стала более удобной, а карта городов - интерактивной. Попробуйте новые функции!',
        image: '../../assets/images/news/interface-update.jpg',
        category: 'update',
        isImportant: false,
        tags: ['интерфейс', 'обновление', 'удобство']
    },
    {
        id: 'educational-program',
        title: 'Новая образовательная программа',
        date: '2024-04-05',
        content: 'Разработана специальная образовательная программа для школ. Теперь учителя могут использовать наш проект в учебном процессе.',
        image: '../../assets/images/news/educational-program.jpg',
        category: 'education',
        isImportant: true,
        tags: ['образование', 'школы', 'программа']
    },
    {
        id: 'achievements',
        title: 'Система достижений',
        date: '2024-04-10',
        content: 'Добавлена новая система достижений! Теперь участники могут получать награды за различные действия в проекте.',
        image: '../../assets/images/news/achievements.jpg',
        category: 'feature',
        isImportant: false,
        tags: ['достижения', 'награды', 'нововведение']
    }
];

// Категории новостей
const newsCategories = {
    announcement: {
        name: 'Анонсы',
        description: 'Важные объявления о проекте',
        icon: '📢'
    },
    update: {
        name: 'Обновления',
        description: 'Обновления функционала и контента',
        icon: '🔄'
    },
    event: {
        name: 'События',
        description: 'События и мероприятия проекта',
        icon: '🎉'
    },
    education: {
        name: 'Образование',
        description: 'Новости об образовательных программах',
        icon: '📚'
    },
    feature: {
        name: 'Функции',
        description: 'Новые функции и возможности',
        icon: '✨'
    }
};

// Экспорт данных
export default {
    news,
    newsCategories
}; 