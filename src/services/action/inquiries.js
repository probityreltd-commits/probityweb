"use server";

import { serverMutation } from "../server/server";

export const addInquiries = async (data) => {
  return serverMutation(`/api/inquiries`, data, null, "POST");
};

export const updateInquiry = async (id, data) => {
  return serverMutation(`/api/admin/inquiries/${id}`, data, null, "PATCH");
};

export const addInquiryNote = async (id, text) => {
  return serverMutation(
    `/api/admin/inquiries/${id}/notes`,
    { text },
    null,
    "POST",
  );
};

export const deleteInquiry = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/${id}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();
  return data;
};

export const bulkUpdateStatus = async (ids, status) => {
  return serverMutation(
    `/api/admin/inquiries/bulk`,
    { ids, status },
    null,
    "PATCH",
  );
};

export const bulkDeleteInquiries = async (ids) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/bulk`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Bulk delete failed");
  }
  return data;
};
