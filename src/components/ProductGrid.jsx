import React from "react";
import "./ProductGrid.css";

/**
 * Grid hiển thị danh sách sản phẩm
 * props:
 * - items: danh sách sản phẩm [{ id, title, category, image, price }]
 * - onItemClick: hàm xử lý khi click vào 1 sản phẩm
 */
export default function ProductGrid({ items = [], onItemClick }) {
  if (!items.length) {
    return <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="product-grid">
      {items.map((p) => (
        <div
          key={p.id}
          className="product-card"
          onClick={() => onItemClick?.(p)}
          style={{ cursor: onItemClick ? "pointer" : "default" }}
        >
          {p.image ? (
            <img src={p.image} alt={p.title} className="product-img" />
          ) : (
            <div
              style={{
                width: "100%",
                height: "280px",
                background: "#333",
                borderRadius: "8px",
              }}
            />
          )}

          <div className="product-info">
            <h3 className="product-title">{p.title}</h3>
            <p className="product-category">{p.category}</p>
            <p className="product-price">{p.price.toLocaleString()}₫</p>
          </div>
        </div>
      ))}
    </div>
  );
}
