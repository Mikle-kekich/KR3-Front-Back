import './Modal.css';

/**
 * Компонент универсального модального окна
 */
function Modal({ isOpen, onClose, title, children, size = 'medium', closeButton = true }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Закрываем модальное окно только если клик был на фоне
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="presentation">
      <div className={`modal modal--${size}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          {closeButton && (
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Закрыть модальное окно"
            >
              ✕
            </button>
          )}
        </div>

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;