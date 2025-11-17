import { useState, useEffect, useMemo } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
  const initialTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
    { id: 3, title: 'Props & State', description: 'Работа со свойствами и состоянием', status: 'not-started', notes: '' },
    { id: 4, title: 'Hooks', description: 'Знакомство с React Hooks', status: 'not-started', notes: '' },
    { id: 5, title: 'Context API', description: 'Управление глобальным состоянием', status: 'not-started', notes: '' },
    { id: 6, title: 'Redux', description: 'Продвинутое управление состоянием', status: 'not-started', notes: '' }
  ];

  const [technologies, setTechnologies] = useState(() => {
    // Загружаем из localStorage или используем начальный список
    try {
      const saved = localStorage.getItem('techTrackerData');
      if (saved) {
        const parsedData = JSON.parse(saved);
        // Проверяем, что данные валидны
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          return parsedData;
        }
      }
    } catch (e) {
      console.error("Ошибка при загрузке из localStorage:", e);
    }
    return initialTechnologies;
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Автосохранение в localStorage при изменениях технологий
  useEffect(() => {
    try {
      localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    } catch (e) {
      console.error("Ошибка при сохранении в localStorage:", e);
    }
  }, [technologies]);

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateTechnologyNotes = (id, notes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === id ? { ...tech, notes: notes } : tech
      )
    );
  };

  const handleMarkAllCompleted = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const handleResetAll = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const handleRandomNext = () => {
    if (technologies.length === 0) return;
    const notCompletedTechs = technologies.filter(tech => tech.status !== 'completed');
    
    if (notCompletedTechs.length === 0) {
      // Если все завершены, выбираем случайную из всех
      const randomIndex = Math.floor(Math.random() * technologies.length);
      const randomTech = technologies[randomIndex];
      handleStatusChange(randomTech.id, 'in-progress');
    } else {
      // Выбираем случайную из незавершенных
      const randomIndex = Math.floor(Math.random() * notCompletedTechs.length);
      const randomTech = notCompletedTechs[randomIndex];
      handleStatusChange(randomTech.id, 'in-progress');
    }
  };

  const filteredTechnologies = useMemo(() => {
    let filtered = technologies;

    // Фильтрация по статусу
    if (activeFilter !== 'all') {
      filtered = filtered.filter(tech => tech.status === activeFilter);
    }

    // Поиск по названию и описанию
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(tech => 
        tech.title.toLowerCase().includes(lowerQuery) || 
        tech.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [technologies, activeFilter, searchQuery]);

  // Вычисляем статистику для ProgressHeader
  const stats = useMemo(() => {
    return {
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length
    };
  }, [technologies]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Tech Learning Tracker</h1>
        <p className="app-subtitle">Отслеживайте ваш прогресс в освоении технологий</p>
      </header>

      <ProgressHeader technologies={technologies} />

      <QuickActions 
        onMarkAllCompleted={handleMarkAllCompleted}
        onResetAll={handleResetAll}
        onRandomNext={handleRandomNext}
      />

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Поиск технологий по названию или описанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <FilterTabs 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="technologies-grid">
        {filteredTechnologies.length > 0 ? (
          filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes || ''}
              onStatusChange={handleStatusChange}
              onNotesChange={updateTechnologyNotes}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>Нет технологий с выбранным статусом или совпадением поиска</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;