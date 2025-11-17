import './TechnologyCard.css';

function ProgressHeader({ technologies }) {
  const totalTechnologies = technologies?.length || 0;
  const completedTechnologies = technologies?.filter(tech => tech.status === 'completed').length || 0;
  const inProgressTechnologies = technologies?.filter(tech => tech.status === 'in-progress').length || 0;
  
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  return (
    <div className="progress-header">
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-label">Всего</span>
          <span className="stat-value">{totalTechnologies}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">В процессе</span>
          <span className="stat-value stat-in-progress">{inProgressTechnologies}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Завершено</span>
          <span className="stat-value stat-completed">{completedTechnologies}</span>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Прогресс: ${progressPercentage}%`}
        />
        <span className="progress-percentage">{progressPercentage}%</span>
      </div>
    </div>
  );
}

export default ProgressHeader;