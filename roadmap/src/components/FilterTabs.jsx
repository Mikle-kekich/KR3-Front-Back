import './TechnologyCard.css';
function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все', icon: '◉' },
    { id: 'not-started', label: 'Не начато', icon: '○' },
    { id: 'in-progress', label: 'В процессе', icon: '◐' },
    { id: 'completed', label: 'Завершено', icon: '◉' }
  ];

  return (
    <div className="filter-tabs">
      <div className="tabs-container">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <span className="tab-icon">{filter.icon}</span>
            <span className="tab-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;