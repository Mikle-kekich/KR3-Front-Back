import { useState, useEffect } from 'react';
import './TechnologyCard.css';

function TechnologyNotes({ notes, onNotesChange }) {
  const [localNotes, setLocalNotes] = useState(notes || '');
  const [isExpanded, setIsExpanded] = useState(false);

  // Синхронизируем локальное состояние с пропсами
  useEffect(() => {
    setLocalNotes(notes || '');
  }, [notes]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setLocalNotes(newNotes);
  };

  const handleBlur = () => {
    // Сохраняем заметки при потере фокуса
    if (onNotesChange) {
      onNotesChange(localNotes);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="notes-section">
      <div className="notes-header">
        <button 
          className="notes-toggle"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-label="Переключить заметки"
        >
          <span className="notes-icon">{isExpanded ? '📝' : '📋'}</span>
          <span className="notes-label">Заметки</span>
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </button>
      </div>
      
      {isExpanded && (
        <div className="notes-content">
          <textarea
            className="notes-textarea"
            placeholder="Добавьте заметки о технологии..."
            value={localNotes}
            onChange={handleNotesChange}
            onBlur={handleBlur}
            rows={4}
            aria-label="Заметки о технологии"
          />
          {localNotes.trim() && (
            <div className="notes-info">
              <small>💾 Заметки сохраняются автоматически</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologyNotes;