import './TechnologyCard.css';

function ProgressHeader({ technologies }) {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const progressPercentage = totalTechnologies > 0 ? (completedTechnologies / totalTechnologies) * 100 : 0;

  return (
    <div className="progress-header">
      <div className="progress-info">
        <div className="info-item">
          <span className="info-label">Всего технологий:</span>
          <span className="info-value">{totalTechnologies}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Изучено:</span>
          <span className="info-value completed">{completedTechnologies}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Прогресс:</span>
          <span className="info-value">{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-background">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;