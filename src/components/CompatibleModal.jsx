import React from "react";
import "./CompatibleModal.css";

function CompatibleModal({ open, baseItem, compatibleItems, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Outfit suggestions for:</h3>
        <h4 className="modal-base">{baseItem?.title}</h4>

        <div className="compatible-grid">
          {compatibleItems.map((it) => (
            <div key={it.id} className="compatible-card">
              <img src={it.image} alt={it.title} />
              <div className="info">
                <p className="title">{it.title}</p>
                <p className="category">{it.category}</p>
                <p className="price">{it.price?.toLocaleString()}₫</p>  {/* 👈 dòng này thêm vào */}
              </div>
            </div>
          ))}
        </div>

        <button className="close-btn" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default CompatibleModal;
