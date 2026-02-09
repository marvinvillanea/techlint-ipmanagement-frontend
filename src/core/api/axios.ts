import axios from "axios";
import { tokenService } from "./tokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken:true,
  headers: {
    Accept: "application/json",
    "X-Client-Token": import.meta.env.VITE_CLIENT_TOKEN
  },
});

api.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // config.headers["X-Client-Token"] = import.meta.env.VITE_CLIENT_TOKEN;
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
      
      // const refreshToken = tokenService.getRefreshToken() ;


      if (isRefreshing) {
        // [IMPORTANT] Queueing: I-hold ang requests habang may ongoing refresh
        return new Promise(resolve => {
          queue.push((token: string) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      const refreshToken = tokenService.getRefreshToken();



      try {
          const formData = new FormData();
          formData.append("refresh_token", refreshToken ?? "");
          
          // Gamitin ang axios (hindi 'api') para iwas infinite loop
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}auth/refresh`, formData, {
            headers: { Accept: "application/json" }
          });

          const newToken = data.data.token;
          const newRefresh = data.data.refresh_token;

          tokenService.setTokens(newToken, newRefresh);

          // 1. I-update ang header ng current request (yung unang nag-fail)
          original.headers.Authorization = `Bearer ${newToken}`;

          // 2. I-release ang lahat ng naka-queue na requests gamit ang bagong token
          queue.forEach(callback => callback(newToken));
          queue = [];

          // 3. I-retry ang original request
          return api(original);

        } catch (refreshErr) {
          // Pag fail ang refresh (e.g. expired na talaga ang refresh token)
          queue = [];
          tokenService.clear(); // O logout user
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);
  }
);

export default api;