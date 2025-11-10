import './TechnologyCard.css';

function QuickActions({ technologies, onMarkAllCompleted, onResetAll, onRandomNext }) {
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-buttons">
        <button 
          className="action-btn mark-all"
          onClick={onMarkAllCompleted}
          title="Отметить все технологии как выполненные"
        >
          ✓ Отметить все
        </button>
        <button 
          className="action-btn reset-all"
          onClick={onResetAll}
          title="Сбросить статус всех технологий"
        >
          ↻ Сбросить все
        </button>
        <button 
          className="action-btn random-next"
          onClick={onRandomNext}
          title="Выбрать случайную технологию для изучения"
        >
          🎲 Случайная
        </button>
      </div>
    </div>
  );
}

export default QuickActions;