import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  const statusCycle = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  const handleStatusChange = () => {
    const newStatus = statusCycle[status];
    onStatusChange(id, newStatus);
  };

  const getStatusText = (currentStatus) => {
    const statusMap = {
      'completed': 'Завершено',
      'in-progress': 'В процессе',
      'not-started': 'Не начато'
    };
    return statusMap[currentStatus] || 'Неизвестно';
  };

  return (
    <div className="technology-card" data-status={status}>
      <div 
        className="tech-status" 
        onClick={handleStatusChange}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleStatusChange()}
      >
        <p>{getStatusText(status)}</p>
        <span className="click-hint">✎ Нажмите для изменения</span>
      </div>
      <div className="tech-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TechnologyCard;