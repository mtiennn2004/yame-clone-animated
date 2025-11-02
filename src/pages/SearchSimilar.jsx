
import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import CompatibleModal from "../components/CompatibleModal.jsx";
import "./SearchSimilar.css";
import { Link } from "react-router-dom";

// --- Cấu hình API base ---
const API_BASE = "https://yame-api-deploy.onrender.com";

function fixPath(p) {
  return (p || "").replace(/^public[\\/]/, "").replaceAll("\\", "/");
}

export default function SearchSimilar() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [baseItem, setBaseItem] = useState(null);
  const [compatible, setCompatible] = useState([]);

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // --- Feature 1: Tìm ảnh tương tự ---
  async function handleSearch() {
    if (!file) {
      setError("Please select a photo first.");
      return;
    }

    setError("");
    setLoading(true);
    setItems([]);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API_BASE}/search_image?topk=10&rerank=true`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Lỗi khi gọi API search_image");

      const data = await res.json();
      const results = data.results || [];

      // --- Load metadata local (để map ảnh) ---
      const localRes = await fetch("/polyvore_outfits/polyvore_merged_items2.json");
      const localData = await localRes.json();
      const imageMap = {};
      for (const it of localData) imageMap[it.item_id] = fixPath(it.image_path);

      const mapped = results.map((r) => ({
        id: r.item_id,
        title: r.title || "Sản phẩm",
        category: r.main_category || "Khác",
        image: imageMap[r.item_id]
          ? `/${imageMap[r.item_id]}`
          : "/polyvore_outfits/images/notfound.jpg",
        price: Math.floor(Math.random() * 400000) + 150000, // 💰 random giá từ 150k–550k
      }));

      setItems(mapped);
    } catch (err) {
      console.error("❌ Lỗi khi tìm kiếm ảnh tương tự:", err);
      setError("Có lỗi khi tìm kiếm ảnh tương tự.");
    } finally {
      setLoading(false);
    }
  }

  // --- Khi click vào 1 item: gọi API /compatible/{item_id} ---
  async function handleItemClick(item) {
    setBaseItem(item);
    setShowModal(true);
    setCompatible([]);

    try {
      const url = `${API_BASE}/compatible/${item.id}?topk=3&candidates=50000`;
      const res = await fetch(url, { method: "POST" });

      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu phối đồ");

      const data = await res.json();
      const results = data.results || [];

      // --- Load metadata local ---
      const localRes = await fetch("/polyvore_outfits/polyvore_merged_items2.json");
      const localData = await localRes.json();
      const imageMap = {};
      for (const it of localData) imageMap[it.item_id] = fixPath(it.image_path);

      const mapped = results.map((r) => ({
        id: r.item_id,
        title: r.title || "Sản phẩm",
        category: r.main_category || "Khác",
        image: imageMap[r.item_id]
          ? `/${imageMap[r.item_id]}`
          : "/polyvore_outfits/images/notfound.jpg",
        price: Math.floor(Math.random() * 400000) + 150000,
      }));

      setCompatible(mapped);
    } catch (err) {
      console.error("❌ Lỗi khi gọi /compatible:", err);
    }
  }

  return (
    <div className="search-similar">
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" className="back-btn">
          ← Back to main page
        </Link>
      </div>

      <div className="search-header">
        <h2>Find similar photos (Feature 1)</h2>
        <p>
          Upload a photo of an outfit to find similar products.
          Click on a product to see matching items.
        </p>
      </div>

      {/* Upload area */}
      <div className="upload-area">
        <label htmlFor="upload" className="dropzone">
          {preview ? (
            <img src={preview} alt="preview" className="preview" />
          ) : (
            <div className="placeholder">
              <div>📷</div>
              <div>Drag & drop photos here or click to select</div>
              <small>JPG/PNG file, ≤ 10MB</small>
            </div>
          )}
        </label>
        <input id="upload" type="file" accept="image/*" onChange={onSelect} hidden />
        <button
          className="btn btn-primary search-btn"
          onClick={handleSearch}
          disabled={!file || loading}
        >
          {loading ? "Looking for..." : "Find similar photos"}
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      {/* Kết quả sản phẩm */}
      <div className="result-area">
        <div className="result-head">
          <h3>Suggested results</h3>
          <span className="hint">Click on the product to see outfit suggestions</span>
        </div>

        {loading ? (
          <p style={{ textAlign: "center" }}>Processing, please wait…</p>
        ) : items.length ? (
          <ProductGrid items={items} onItemClick={handleItemClick} />
        ) : (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            No results yet. Upload a photo and click “Find similar photos”.
          </p>
        )}
      </div>

      {/* Modal hiển thị các item phối đồ */}
      <CompatibleModal
        open={showModal}
        baseItem={baseItem}
        compatibleItems={compatible}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
