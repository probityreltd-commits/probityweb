import { serverFetch } from "../server/server";

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
  return serverFetch(`/api/admin/inquiries${toQueryString(params)}`);
}

export function fetchInquiryStats() {
  return serverFetch(`/api/admin/inquiries/stats`);
}

export function fetchInquiryById(id) {
  return serverFetch(`/api/admin/inquiries/${id}`);
}
