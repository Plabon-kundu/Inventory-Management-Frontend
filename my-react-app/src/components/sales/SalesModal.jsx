import SalesForm from "./SalesForm";

// Modal wrapper for the Sales Entry Form (Task 58)
const SalesModal = ({ onSubmit, onClose, loading }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Record New Sale</h2>
            <p className="modal-title-sub">Stock OUT — reduces warehouse inventory</p>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <SalesForm onSubmit={onSubmit} onCancel={onClose} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SalesModal;
