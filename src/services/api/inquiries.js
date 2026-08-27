const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // sends the admin session/JWT cookie
    ...options,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok || body.success === false) {
    throw new Error(body.message || `Request failed (${res.status})`);
  }

  return body;
}

function toQueryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
}

export function fetchInquiries(params) {
  return request(`/api/admin/inquiries${toQueryString(params)}`);
}

export function fetchInquiryStats() {
  return request(`/api/admin/inquiries/stats`);
}

export function fetchInquiryById(id) {
  return request(`/api/admin/inquiries/${id}`);
}

export function updateInquiry(id, data) {
  return request(`/api/admin/inquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function addInquiryNote(id, text) {
  return request(`/api/admin/inquiries/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export function deleteInquiry(id) {
  return request(`/api/admin/inquiries/${id}`, { method: "DELETE" });
}

export function bulkUpdateStatus(ids, status) {
  return request(`/api/admin/inquiries/bulk`, {
    method: "PATCH",
    body: JSON.stringify({ ids, status }),
  });
}

export function bulkDeleteInquiries(ids) {
  return request(`/api/admin/inquiries/bulk`, {
    method: "DELETE",
    body: JSON.stringify({ ids }),
  });
}
