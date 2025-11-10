import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
  const initialTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
    { id: 3, title: 'Props & State', description: 'Работа со свойствами и состоянием', status: 'not-started' },
    { id: 4, title: 'Hooks', description: 'Знакомство с React Hooks', status: 'not-started' },
    { id: 5, title: 'Context API', description: 'Управление глобальным состоянием', status: 'not-started' },
    { id: 6, title: 'Redux', description: 'Продвинутое управление состоянием', status: 'not-started' }
  ];

  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [activeFilter, setActiveFilter] = useState('all');

  // Функция для изменения статуса технологии по id
  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Отметить все как выполненные
  const handleMarkAllCompleted = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Сбросить все статусы
  const handleResetAll = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Выбрать случайную технологию и установить статус "в процессе"
  const handleRandomNext = () => {
    const randomIndex = Math.floor(Math.random() * technologies.length);
    const randomTech = technologies[randomIndex];
    handleStatusChange(randomTech.id, 'in-progress');
  };

  // Фильтрация технологий
  const getFilteredTechnologies = () => {
    if (activeFilter === 'all') {
      return technologies;
    }
    return technologies.filter(tech => tech.status === activeFilter);
  };

  const filteredTechnologies = getFilteredTechnologies();

  return (
    <>
      <div className="roadmap-container">
        <h1>Дорожная карта изучения React</h1>
        <p>Отслеживайте ваш прогресс в освоении технологий</p>
        
        <ProgressHeader technologies={technologies} />
        
        <QuickActions 
          technologies={technologies}
          onMarkAllCompleted={handleMarkAllCompleted}
          onResetAll={handleResetAll}
          onRandomNext={handleRandomNext}
        />

        <FilterTabs 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <div className="technologies-grid">
          {filteredTechnologies.length > 0 ? (
            filteredTechnologies.map((tech) => (
              <TechnologyCard
                key={tech.id}
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>Нет технологий с выбранным статусом</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;