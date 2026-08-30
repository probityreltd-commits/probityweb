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

export const deleteInquiry = async (id, token) => {
  return serverMutation(`/api/admin/inquiries/${id}`, null, token, "DELETE");
};

export const bulkUpdateStatus = async (ids, status) => {
  return serverMutation(
    `/api/admin/inquiries/bulk`,
    { ids, status },
    null,
    "PATCH",
  );
};

export const bulkDeleteInquiries = async (ids, token) => {
  return serverMutation(`/api/admin/inquiries/bulk`, { ids }, token, "DELETE");
};
