import axios from "axios";

const api = axios.create({
  baseURL: typeof window === "undefined" ? process.env.API_URL : "/",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    const cookie = (await import("next/headers"))?.cookies()?.toString();
    config.headers.Cookie = cookie;
  }

  return config;
});

export default api;
