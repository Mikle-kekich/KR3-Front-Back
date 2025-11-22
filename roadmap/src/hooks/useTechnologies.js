import useLocalStorage from './useLocalStorage';

/**
 * Кастомный хук для управления технологиями
 * Включает функции для обновления статусов, заметок и расчета прогресса
 */
function useTechnologies() {
  const initialTechnologies = [
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 3,
      title: 'Props & State',
      description: 'Работа со свойствами и состоянием',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 4,
      title: 'Hooks',
      description: 'Знакомство с React Hooks',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 5,
      title: 'Context API',
      description: 'Управление глобальным состоянием',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 6,
      title: 'Redux',
      description: 'Продвинутое управление состоянием',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 7,
      title: 'Node.js Basics',
      description: 'Основы серверного JavaScript',
      status: 'not-started',
      notes: '',
      category: 'backend'
    },
    {
      id: 8,
      title: 'Express.js',
      description: 'Фреймворк для создания серверов',
      status: 'not-started',
      notes: '',
      category: 'backend'
    },
    {
      id: 9,
      title: 'MongoDB',
      description: 'NoSQL база данных',
      status: 'not-started',
      notes: '',
      category: 'backend'
    },
    {
      id: 10,
      title: 'REST API',
      description: 'Создание и использование REST API',
      status: 'not-started',
      notes: '',
      category: 'backend'
    },
    {
      id: 11,
      title: 'CSS Flexbox',
      description: 'Гибкое позиционирование элементов',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 12,
      title: 'CSS Grid',
      description: 'Сеточная система CSS',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    }
  ];

  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  /**
   * Обновляет статус технологии
   */
  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  /**
   * Обновляет заметки для технологии
   */
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  /**
   * Отмечает все технологии как выполненные
   */
  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  /**
   * Сбрасывает все статусы в начальное состояние
   */
  const resetAll = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  /**
   * Расчитывает общий прогресс в процентах
   */
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  /**
   * Получает статистику по статусам
   */
  const getStatistics = () => {
    return {
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length
    };
  };

  /**
   * Получает технологии отфильтрованные по категории
   */
  const getTechByCategory = (category) => {
    return technologies.filter(tech => tech.category === category);
  };

  /**
   * Экспортирует данные в JSON
   */
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      exportedBy: 'Tech Learning Tracker',
      statistics: getStatistics(),
      technologies: technologies
    };
    return JSON.stringify(data, null, 2);
  };

  /**
   * Импортирует данные из JSON
   */
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      if (Array.isArray(data.technologies)) {
        setTechnologies(data.technologies);
        return { success: true, message: 'Данные успешно импортированы' };
      } else {
        return { success: false, message: 'Неверный формат данных' };
      }
    } catch (error) {
      return { success: false, message: `Ошибка при импорте: ${error.message}` };
    }
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    progress: calculateProgress(),
    statistics: getStatistics(),
    getTechByCategory,
    exportData,
    importData
  };
}

export default useTechnologies;