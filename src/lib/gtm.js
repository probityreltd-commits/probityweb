
/**
 * GTM / dataLayer helpers
 * -----------------------
 * - trackEvent(): সাধারণ event push
 * - trackLead():  generate_lead + Meta Event Match Quality (EMQ)-এর জন্য hashed user_data
 *
 * গোপনীয়তা: নাম/ফোন/ইমেইল কখনো plain text-এ dataLayer-এ যায় না।
 * শুধু SHA-256 hash (Meta-র নিয়ম অনুযায়ী normalize করে) যায়।
 * Hash করা না গেলে (যেমন http পেজ) user_data খালি থাকে, plain value কখনো পাঠানো হয় না।
 */

const NOT_SET = "(not set)";

export function pushToDataLayer(payload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// খালি মান "(not set)" হয়ে যায়, যাতে GTM-এর পুরনো মান লেগে না থাকে
function cleanParams(params = {}) {
  const clean = {};
  Object.entries(params).forEach(([key, value]) => {
    clean[key] =
      value === undefined || value === null || value === "" ? NOT_SET : value;
  });
  return clean;
}

// প্রতিটা event-এ event_id যায় (Meta Pixel + Server-side CAPI dedupe-এর জন্য)।
export function trackEvent(event, params = {}) {
  pushToDataLayer({
    event,
    ...cleanParams({ event_id: createEventId(), ...params }),
  });
}

// Meta Pixel + Conversions API dedupe-এর জন্য
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

/* ------------------------------------------------------------------ *
 *  Meta EMQ: normalize + SHA-256
 * ------------------------------------------------------------------ */

// ইমেইল: trim + lowercase, ফরম্যাট ঠিক না হলে null
export function normalizeEmail(raw) {
  if (!raw) return null;
  const v = String(raw).trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : null;
}

// ফোন: শুধু digit, country code সহ (বাংলাদেশ: 8801XXXXXXXXX), '+' বা leading zero ছাড়া
export function normalizePhone(raw) {
  if (!raw) return null;
  let d = String(raw).replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("00")) d = d.slice(2);

  if (d.startsWith("880")) {
    // BD নম্বর হলে ১৩ digit হতে হবে (880 + 10)
    return d.length === 13 ? d : null;
  }
  if (d.startsWith("0") && d.length === 11) return `88${d}`; // 01711675001
  if (d.startsWith("1") && d.length === 10) return `880${d}`; // 1711675001

  // বিদেশি নম্বর (প্রবাসী): country code সহ লিখলে যেমন আছে তেমন, leading zero বাদ
  d = d.replace(/^0+/, "");
  return d.length >= 8 && d.length <= 15 ? d : null;
}

const NAME_PREFIXES = new Set([
  "md",
  "mst",
  "mr",
  "mrs",
  "ms",
  "dr",
  "engr",
  "prof",
]);

// নাম: lowercase, punctuation/সংখ্যা বাদ, Md/Mst/Mr ইত্যাদি prefix বাদ
// প্রথম শব্দ = fn, শেষ শব্দ = ln (একটাই শব্দ হলে ln থাকে না)
export function splitName(raw) {
  if (!raw) return { first: null, last: null };
  let tokens = String(raw)
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\s'-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  while (tokens.length > 1 && NAME_PREFIXES.has(tokens[0])) tokens.shift();
  if (tokens.length === 0) return { first: null, last: null };
  return {
    first: tokens[0],
    last: tokens.length > 1 ? tokens[tokens.length - 1] : null,
  };
}

export async function sha256Hex(value) {
  if (!value) return null;
  try {
    if (typeof crypto === "undefined" || !crypto.subtle) return null;
    const bytes = new TextEncoder().encode(String(value));
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`),
  );
  return m ? decodeURIComponent(m[1]) : null;
}

// Pixel যে _fbc cookie বানায় সেটা, না থাকলে URL-এর fbclid থেকে বানানো
function getFbc() {
  const cookie = getCookie("_fbc");
  if (cookie) return cookie;
  try {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : null;
  } catch {
    return null;
  }
}

async function buildUserData({ name, email, phone } = {}) {
  const em = normalizeEmail(email);
  const ph = normalizePhone(phone);
  const { first, last } = splitName(name);
  // দেশ শুধু ফোন code থেকে ধরা হয়, অনুমান করে না (প্রবাসী লিডের জন্য ভুল হবে না)
  const country = ph && ph.startsWith("880") ? "bd" : null;

  const [hEm, hPh, hFn, hLn, hCountry] = await Promise.all([
    sha256Hex(em),
    sha256Hex(ph),
    sha256Hex(first),
    sha256Hex(last),
    sha256Hex(country),
  ]);
  return { em: hEm, ph: hPh, fn: hFn, ln: hLn, country: hCountry };
}

const EMPTY_USER_DATA = { em: null, ph: null, fn: null, ln: null, country: null };

/**
 * generate_lead + hashed user_data + fbp/fbc
 * কখনো throw করে না (ফর্মের সাবমিট flow যেন না ভাঙে)।
 * @param {object} params  form_type, form_id, project_name ...
 * @param {object} user    { name, email, phone } (plain, এখানেই hash হয়)
 */
export async function trackLead(params = {}, user = {}) {
  try {
    let userData = EMPTY_USER_DATA;
    try {
      // hash দেরি করলে ৪০০ms-এর বেশি অপেক্ষা করে না
      userData = await Promise.race([
        buildUserData(user),
        new Promise((resolve) => setTimeout(() => resolve(EMPTY_USER_DATA), 400)),
      ]);
    } catch {
      userData = EMPTY_USER_DATA;
    }

    pushToDataLayer({
      event: "generate_lead",
      ...cleanParams({ event_id: createEventId(), ...params }),
      user_data: { ...EMPTY_USER_DATA, ...userData },
      fbp: getCookie("_fbp"),
      fbc: getFbc(),
    });

    // পরের event-এ hashed data যেন লেগে না থাকে
    pushToDataLayer({ user_data: { ...EMPTY_USER_DATA } });
  } catch {
    try {
      trackEvent("generate_lead", params);
    } catch {
      // ignore
    }
  }
}
