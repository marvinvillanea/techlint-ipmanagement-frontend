import axios from "axios";
import { tokenService } from "./tokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["X-Client-Token"] = import.meta.env.VITE_CLIENT_TOKEN;
  return config;
});

let isRefreshing = false;
let queue: any[] = [];

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refresh = tokenService.getRefreshToken();
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { refresh_token: refresh }
          );

          tokenService.setTokens(data.access_token, data.refresh_token);

          queue.forEach(cb => cb(data.access_token));
          queue = [];
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise(resolve => {
        queue.push((token: string) => {
            original.headers.Authorization = `Bearer ${token}`;

          resolve(api(original));
        });
      });
    }

    return Promise.reject(err);
  }
);

export default api;