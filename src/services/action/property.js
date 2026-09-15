"use server";

import { serverMutation } from "../server/server";

export const createProperty = async (data, token) => {
  return serverMutation("/api/property", data, token);
};

export const updateProperty = async (id, data, token) => {
  return serverMutation(`/api/property/${id}`, data, token, "PATCH");
};

export const deleteProperty = async (id, token) => {
  return serverMutation(`/api/property/${id}`, null, token, "DELETE");
};
