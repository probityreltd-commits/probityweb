"use server";

import { serverMutation } from "../server/server";

export const addInquiries = async (data) => {
  return serverMutation(`/api/inquiries`, data, null, "POST");
};
