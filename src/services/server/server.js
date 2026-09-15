const baseUrl = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
  constructor(message, status, code = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const handelResponse = async (res) => {
  let data = null;

  try {
    data = await res.json();
  } catch (error) {
    data = null;
  }
  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      code: data?.code || "UNKNOWN_ERROR",
      message: data?.message || "Something went wrong.",
    };
  }
  return {
    success: true,
    ...data,
  };
};

export const serverMutation = async (path, data, token, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    ...(data !== null && data !== undefined
      ? { body: JSON.stringify(data) }
      : {}),
  });
  return handelResponse(res);
};

export const serverFetch = async (path, token = null) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },

      cache: "no-store",
    });

    return await handelResponse(res);
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      success: false,
      status: 500,
      code: "NETWORK_ERROR",
      message: "Network error or server is unreachable.",
    };
  }
};
