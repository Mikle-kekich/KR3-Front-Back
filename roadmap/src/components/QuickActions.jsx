import { useState } from 'react';
import Modal from './Modal';
import './QuickActions-improved.css';

/**
 * Компонент "Быстрые действия" с кнопками для массовых операций
 */
function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [exportData, setExportData] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  /**
   * Обработчик экспорта данных
   */
  const handleExport = () => {
    try {
      const data = {
        exportedAt: new Date().toLocaleString('ru-RU'),
        exportedBy: 'Tech Learning Tracker',
        count: technologies.length,
        statistics: {
          total: technologies.length,
          completed: technologies.filter(t => t.status === 'completed').length,
          inProgress: technologies.filter(t => t.status === 'in-progress').length,
          notStarted: technologies.filter(t => t.status === 'not-started').length
        },
        technologies: technologies
      };

      const dataStr = JSON.stringify(data, null, 2);
      setExportData(dataStr);
      setShowExportModal(true);
    } catch (error) {
      console.error('Ошибка при экспорте:', error);
      alert('Ошибка при экспорте данных');
    }
  };

  /**
   * Копирует данные в буфер обмена
   */
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportData).then(() => {
      setCopyMessage('✓ Скопировано в буфер обмена!');
      setTimeout(() => setCopyMessage(''), 2000);
    }).catch(() => {
      alert('Не удалось скопировать данные');
    });
  };

  /**
   * Скачивает данные как JSON файл
   */
  const handleDownloadJSON = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([exportData], { type: 'application/json' });
      element.href = URL.createObjectURL(file);
      element.download = `tech-tracker-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Ошибка при скачивании:', error);
      alert('Ошибка при скачивании файла');
    }
  };

  /**
   * Обработчик подтверждения "Отметить все"
   */
  const handleConfirmMarkAll = () => {
    if (window.confirm('Вы уверены, что хотите отметить все технологии как выполненные?')) {
      onMarkAllCompleted();
    }
  };

  /**
   * Обработчик подтверждения "Сбросить все"
   */
  const handleConfirmReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все статусы? Это действие нельзя отменить.')) {
      onResetAll();
    }
  };

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  return (
    <>
      <section className="quick-actions-section" aria-label="Быстрые действия">
        <h3 className="quick-actions-title">⚡ Быстрые действия</h3>

        <div className="quick-actions-stats">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Всего</span>
          </div>
          <div className="stat-card stat-completed">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Завершено</span>
          </div>
          <div className="stat-card stat-in-progress">
            <span className="stat-number">{stats.inProgress}</span>
            <span className="stat-label">В процессе</span>
          </div>
          <div className="stat-card stat-not-started">
            <span className="stat-number">{stats.notStarted}</span>
            <span className="stat-label">Не начато</span>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn action-btn-success"
            onClick={handleConfirmMarkAll}
            aria-label="Отметить все как завершенные"
          >
            <span className="btn-icon">✅</span>
            <span className="btn-text">Отметить все</span>
          </button>

          <button
            className="action-btn action-btn-warning"
            onClick={handleConfirmReset}
            aria-label="Сбросить все статусы"
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Сбросить все</span>
          </button>

          <button
            className="action-btn action-btn-info"
            onClick={handleExport}
            aria-label="Экспортировать данные"
          >
            <span className="btn-icon">📤</span>
            <span className="btn-text">Экспорт данных</span>
          </button>
        </div>
      </section>

      {/* Модальное окно экспорта */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="📥 Экспорт данных"
        size="large"
      >
        <div className="export-modal-content">
          <p className="export-description">
            Ниже представлены ваши данные в формате JSON. Вы можете скопировать их в буфер обмена или скачать как файл.
          </p>

          <div className="export-data-box">
            <textarea
              className="export-textarea"
              value={exportData}
              readOnly
              rows={15}
              aria-label="Экспортированные данные в JSON"
            />
          </div>

          {copyMessage && (
            <div className="copy-message">
              {copyMessage}
            </div>
          )}

          <div className="export-actions">
            <button
              className="export-btn export-btn-copy"
              onClick={handleCopyToClipboard}
            >
              📋 Копировать в буфер
            </button>
            <button
              className="export-btn export-btn-download"
              onClick={handleDownloadJSON}
            >
              💾 Скачать файл
            </button>
            <button
              className="export-btn export-btn-close"
              onClick={() => setShowExportModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default QuickActions;