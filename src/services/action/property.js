"use server";

import { serverMutation } from "../server/server";

export const createProperty = async (data) => {
  return serverMutation("/api/property", data);
};

export const deleteProperty = async (id) => {
  return serverMutation(`/api/property/${id}`, {}, {}, "DELETE");
};
