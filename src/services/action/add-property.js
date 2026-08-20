"use server";

import { serverMutation } from "../server/server";

export const createProperty = async (data) => {
  return serverMutation("/api/property", data);
};
