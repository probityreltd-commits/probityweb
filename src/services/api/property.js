import { serverFetch } from "../server/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPropertys = async () => {
  return serverFetch("/api/property");
};
