import './TechnologyCard.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
  const handleMarkAll = () => {
    if (onMarkAllCompleted) {
      onMarkAllCompleted();
    }
  };

  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все статусы?')) {
      if (onResetAll) {
        onResetAll();
      }
    }
  };

  const handleRandom = () => {
    if (onRandomNext) {
      onRandomNext();
    }
  };

  return (
    <div className="quick-actions">
      <button 
        className="action-button action-complete"
        onClick={handleMarkAll}
        aria-label="Отметить все как завершенные"
      >
        <span className="action-icon">✓</span>
        <span className="action-text">Завершить все</span>
      </button>
      
      <button 
        className="action-button action-random"
        onClick={handleRandom}
        aria-label="Выбрать случайную технологию"
      >
        <span className="action-icon">🎲</span>
        <span className="action-text">Случайная</span>
      </button>
      
      <button 
        className="action-button action-reset"
        onClick={handleReset}
        aria-label="Сбросить все статусы"
      >
        <span className="action-icon">↺</span>
        <span className="action-text">Сбросить все</span>
      </button>
    </div>
  );
}

export default QuickActions;