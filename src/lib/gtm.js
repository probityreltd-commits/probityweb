/**
 * GTM / dataLayer helpers
 * -----------------------
 * শুধু এই ফাইল দিয়েই সব event dataLayer-এ push হবে।
 * GTM-এ stale value এড়াতে: যে key পাঠানো হয় তার মান খালি হলে "(not set)" যায়।
 */

const NOT_SET = "(not set)";

export function pushToDataLayer(payload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackEvent(event, params = {}) {
  const clean = {};
  Object.entries(params).forEach(([key, value]) => {
    clean[key] =
      value === undefined || value === null || value === "" ? NOT_SET : value;
  });
  pushToDataLayer({ event, ...clean });
}

// Meta Pixel / Conversions API dedupe-এর জন্য (generate_lead-এ ব্যবহার হয়)
export function createEventId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    // ignore
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getFileNameFromUrl(url, fallback = "") {
  try {
    const last = new URL(url).pathname.split("/").filter(Boolean).pop();
    return last ? decodeURIComponent(last) : fallback;
  } catch {
    return fallback;
  }
}

// Property object থেকে standard project parameters
export function getProjectParams(property) {
  return {
    project_name: property?.title,
    location: property?.locationName,
    property_type: property?.propertyType,
    status: property?.status,
  };
}
