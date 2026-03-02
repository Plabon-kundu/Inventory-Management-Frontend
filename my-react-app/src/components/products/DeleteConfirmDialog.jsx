// Task 24: Delete Confirmation Dialog
const DeleteConfirmDialog = ({ product, onConfirm, onCancel, loading }) => {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-box delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>

        <h3 className="modal-title">Delete Product?</h3>
        <p className="modal-subtitle">
          You are about to delete{" "}
          <strong>
            {product.name} ({product.sku})
          </strong>
          . This action cannot be undone and all associated data will be
          permanently removed.
        </p>

        <div className="modal-actions">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(product.id)}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Deleting...
              </>
            ) : (
              "Delete Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
