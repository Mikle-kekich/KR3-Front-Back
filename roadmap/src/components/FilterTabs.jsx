import './TechnologyCard.css';

function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все', icon: '◉' },
    { id: 'not-started', label: 'Не начато', icon: '○' },
    { id: 'in-progress', label: 'В процессе', icon: '◐' },
    { id: 'completed', label: 'Завершено', icon: '✓' }
  ];

  const handleFilterClick = (filterId) => {
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="filter-tabs">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => handleFilterClick(filter.id)}
          aria-pressed={activeFilter === filter.id}
          aria-label={`Фильтр: ${filter.label}`}
        >
          <span className="filter-icon">{filter.icon}</span>
          <span className="filter-label">{filter.label}</span>
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;