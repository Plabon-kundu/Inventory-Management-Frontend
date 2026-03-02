import ProductForm from "./ProductForm";

// Modal wrapper used for both Create (Task 21) and Edit (Task 23)
const ProductModal = ({ mode, product, onSubmit, onClose, loading }) => {
  const isEdit = mode === "edit";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <ProductForm
            initialData={isEdit ? product : null}
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
