import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const statusCycle = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  const handleStatusChange = () => {
    const newStatus = statusCycle[status] || 'not-started';
    onStatusChange(id, newStatus);
  };

  const getStatusText = (currentStatus) => {
    const statusMap = {
      'completed': 'Завершено',
      'in-progress': 'В процессе',
      'not-started': 'Не начато'
    };
    return statusMap[currentStatus] || 'Не начато';
  };

  const handleNotesChange = (newNotes) => {
    onNotesChange(id, newNotes);
  };

  return (
    <div className={`technology-card status-${status}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <button 
          className={`status-badge status-${status}`}
          onClick={handleStatusChange}
          aria-label={`Изменить статус ${title}`}
        >
          <span className="status-text">{getStatusText(status)}</span>
          <span className="status-hint">✎ Нажмите для изменения</span>
        </button>
      </div>
      
      <p className="card-description">{description}</p>
      
      <TechnologyNotes 
        notes={notes || ''}
        onNotesChange={handleNotesChange}
      />
    </div>
  );
}

export default TechnologyCard;