import { serverFetch } from "../server/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPropertys = async () => {
  return serverFetch("/api/property");
};

export const getPropertyBySlug = async (slug) => {
  return serverFetch(`/api/property/${slug}`);
};
