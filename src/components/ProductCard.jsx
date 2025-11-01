import React from "react";
import "./ProductCard.css";

export default function ProductCard({ item, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick?.(item)}>
      <img src={item.image} alt={item.title} className="product-image" />
      <div className="product-info">
        <h4 className="product-title">{item.title}</h4>
        <p className="product-category">{item.category}</p>
        <p className="product-price">{item.price.toLocaleString()}₫</p>
      </div>
    </div>
  );
}
