import { useState } from 'react';
import useTechnologies from './hooks/useTechnologies';
import ProgressBar from './components/ProgressBar';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions-improved';
import FilterTabs from './components/FilterTabs';
import './App.css';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes,
    markAllCompleted,
    resetAll,
    progress,
    statistics
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтруем технологии по статусу и поиску
  const filteredTechnologies = technologies.filter(tech => {
    // Фильтр по статусу
    if (activeFilter !== 'all' && tech.status !== activeFilter) {
      return false;
    }

    // Фильтр по поиску
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase().trim();
      return (
        tech.title.toLowerCase().includes(lowerQuery) ||
        tech.description.toLowerCase().includes(lowerQuery)
      );
    }

    return true;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>🎯 Tech Learning Tracker</h1>
        <p className="app-subtitle">Отслеживайте ваш прогресс в освоении технологий</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Progress Bar */}
        <section className="progress-section">
          <ProgressBar
            progress={progress}
            label="Общий прогресс"
            color="#2d8a96"
            animated={true}
            height={20}
          />
        </section>

        {/* Quick Actions */}
        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          technologies={technologies}
        />

        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Поиск технологий по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Technologies Grid */}
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
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>🤔 Нет технологий с выбранным статусом или совпадением поиска</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Tech Learning Tracker © 2024 | Версия 2.0</p>
      </footer>
    </div>
  );
}

export default App;