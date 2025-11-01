export const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function searchImage(file, { topk = 10, rerank = true } = {}) {
  const form = new FormData();
  form.append("file", file);

  const qs = new URLSearchParams({ topk: String(topk), rerank: String(rerank) });
  const url = API_BASE.endsWith("/api")
    ? `/api/search_image?${qs}` 
    : `${API_BASE}/search_image?${qs}`;

  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Backend error ${res.status}`);
  return res.json();
}
