# YaMe Clone – Animated Fashion Recommendation Web

## ⚙️ Tổng quan dự án

- **AI Model:** Sử dụng **ResNet50 (pretrained on ImageNet)** để trích xuất đặc trưng ảnh.  
- **FAISS Index:** Tìm kiếm nhanh các ảnh tương tự theo vector embedding.  
- **Dataset:** Tập dữ liệu **Polyvore Outfits** (hơn 250k ảnh, chia theo loại quần áo).  
- **Frontend:** React hiển thị sản phẩm, banner động, tìm kiếm, và gợi ý outfit.  
- **Triển khai:** Dễ dàng deploy lên **Vercel** (frontend) và **Uvicorn/FastAPI** (backend).

---

## Cấu trúc thư mục & Mô tả file của frontend

| Tên thư mục / file | Mô tả nội dung | Mục đích sử dụng |
|--------------------|----------------|------------------|
| `src/` | Chứa mã nguồn React | Toàn bộ logic & UI của web |
| ├── `components/` | Các thành phần giao diện (Header, Hero, ProductGrid, Footer) | Hiển thị web theo từng phần |
| ├── `App.jsx` | Gắn kết toàn bộ các component | Chạy luồng chính của frontend |
| ├── `index.css` | Tùy chỉnh giao diện, hiệu ứng CSS | Làm hiệu ứng vàng ánh kim, banner động |
| `public/` | Lưu hình ảnh, JSON metadata, icon... | Dữ liệu tĩnh hiển thị trên web |
| ├── `polyvore_outfits/` | Thư mục dataset Polyvore | Gốc chứa hình ảnh & metadata |
| ├── `polyvore_merged_items2.json` | Merged JSON metadata | Dữ liệu frontend load khi render |
| `mergeddata.ipynb` | Notebook xử lý dữ liệu Polyvore | Gộp JSON, chuẩn hoá metadata |
| `index.html` | File gốc HTML để React mount | Giao diện chính khi chạy web |
| `vite.config.js` | Cấu hình Vite | Tối ưu build và đường dẫn file |
| `package.json` | Khai báo thư viện React, Tailwind, Vite... | Quản lý dependencies frontend |
| `package-lock.json` | Ghi chi tiết phiên bản libs | Dùng cho npm install chính xác |
| `.gitattributes` | Định dạng dòng và file Git | Giữ đồng bộ cấu trúc repo |

---

##  Cấu trúc thư mục & Mô tả file của backend

Dự án sử dụng **mô hình học sâu ResNet50** để trích xuất đặc trưng (feature embeddings) của hình ảnh trong **dataset Polyvore**, sau đó lưu dưới dạng các file `.pkl` và `.pt`.  
Phần này mô tả vai trò của từng thư mục và file chính trong hệ thống.

---

### Thư mục `embeddings/`
Chứa các vector đặc trưng (feature vectors) được trích xuất từ ảnh quần áo.

| Tên file | Nội dung | Mục đích |
|-----------|-----------|----------|
| `embeddings_part_0.pkl` → `embeddings_part_5.pkl` | Dữ liệu embedding chia nhỏ theo phần | Nạp vào **FAISS Index** để tìm kiếm ảnh tương tự |
| `resnet50_proj512_best.pt` | Trọng số mô hình ResNet50 đã tinh chỉnh | Dùng để sinh vector đặc trưng cho ảnh mới |
| `inspect_metadata.py` | Script kiểm tra metadata và vector embeddings | Đảm bảo dữ liệu đồng nhất, không lỗi |
### Thư mục `models/`
| Tên file | Nội dung | Mục đích |
|-----------|-----------|----------|
| `resnet50_proj512_best.pt` | Mô hình ResNet50 (fine-tuned) | Backbone trích xuất đặc trưng 512 chiều |
| `faiss_index.bin` *(nếu có)* | FAISS Index chứa toàn bộ vectors | Dùng để truy vấn **Top-K ảnh tương tự** cực nhanh |
### Các file Python chính
| File | Vai trò |
|------|----------|
| `app.py` | Tạo API với **FastAPI** – load model + embeddings để phục vụ frontend |
| `inspect_metadata.py` | Kiểm tra, thống kê cấu trúc và tính toàn vẹn của metadata |
| `requirements.txt` | Danh sách thư viện cần thiết (torch, faiss, fastapi, pillow, numpy, v.v.) |

---

Mô hình AI & Chức năng

| Thành phần | Mô tả | Vai trò |
|-------------|--------|----------|
| **ResNet50** | Mạng CNN đã huấn luyện sẵn (ImageNet) | Trích xuất đặc trưng hình ảnh quần áo |
| **FAISS (Facebook AI Similarity Search)** | Thư viện tìm kiếm vector nhanh | Tìm ảnh tương tự theo khoảng cách cosine/L2 |
| **Polyvore Dataset** | Bộ dữ liệu outfit thực tế | Cung cấp ảnh & nhãn (tops, bottoms, dress...) |
| **FastAPI Backend** | API phục vụ ảnh & metadata | Nhận ảnh từ frontend → trả về top-k ảnh tương tự |
| **React Frontend** | Giao diện hiển thị sản phẩm và gợi ý | Cho phép tìm kiếm, xem sản phẩm, tải thêm ảnh |

---

## Cách chạy dự án local
## B1: Chạy backend (API model):
cd FINALPROJECT_RECOMMEND_SYS-1
python app.py
## B2: Chạy frontend (React)
Mở một terminal khác, trở lại thư mục gốc YaMe Clone – Animated và gõ:
npm install
npm run dev
Sau đó mở trình duyệt local tại:
👉 http://localhost:5173

Link trang web đã được deploy: https://yame-clone-animated-o7tp.vercel.app/





