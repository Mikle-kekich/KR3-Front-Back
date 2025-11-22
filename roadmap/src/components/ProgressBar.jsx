import { useState } from 'react';
import Modal from '../components/Modal';
import './ProgressBar.css';


function ProgressBar({ progress, label, color = '#2d8a96', animated = true, height = 8 }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="progress-bar-wrapper">
        {label && <span className="progress-label">{label}</span>}
        <div
          className={`progress-bar ${animated ? 'animated' : ''}`}
          style={{ height: `${height}px` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${label}: ${progress}%`}
        >
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              backgroundColor: color
            }}
          />
        </div>
        <button
          className="progress-percentage-btn"
          onClick={() => setShowDetails(!showDetails)}
          title="Нажмите для подробнее"
        >
          {progress}%
        </button>
      </div>

      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Подробности прогресса"
        size="small"
      >
        <div className="progress-details">
          <p>Ваш прогресс составляет <strong>{progress}%</strong></p>
          <p>Продолжайте в том же духе! 🚀</p>
        </div>
      </Modal>
    </>
  );
}

export default ProgressBar;