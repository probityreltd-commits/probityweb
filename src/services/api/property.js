import { serverFetch } from "../server/server";

export const getPropertys = async () => {
  return serverFetch("/api/property");
};

export const getPropertyBySlug = async (slug) => {
  return serverFetch(`/api/property/${slug}`);
};
