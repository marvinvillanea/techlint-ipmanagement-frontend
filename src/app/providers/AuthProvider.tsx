import { createContext, useContext, useState,useEffect } from "react";
import api from "../../core/api/axios";
import { tokenService } from "../../core/api/tokenService";
import axios from "axios";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const login = async (email: string, password: string) => {

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const { data } = await api.post("/auth/login",formData);

      console.log('login',data);

      if (data?.data) {
          tokenService.setTokens(data.data.token, data.data.refresh_token);
          setUser(data.data.user);
      }

  };


  const logout = async() => {

    const refreshToken = tokenService.getRefreshToken();
    
    const formData = new FormData();
    formData.append("refresh_token", refreshToken ?? "");

    const { data } = await api.post("/auth/logout",formData);
   
    console.log('logout',data);
    
    tokenService.clear();
    setUser(null);

  };

  const hasRole = (role: string) => user?.role?.includes(role);
  const hasPermission = (perm: string) => user?.permission?.includes(perm);



  // // RESTORE LOGIN AFTER REFRESH
    const restoreAuth = async () => {
      const refreshToken = tokenService.getRefreshToken();

      if (!refreshToken) {
        setLoading(false);
        return;
      }

      try {
        console.log('Attempting to restore session...');

        // Gumamit ng direct AXIOS, hindi yung 'api' instance mo
        // para hindi ito dumaan sa interceptor logic.
        const formData = new FormData();
        formData.append("refresh_token", refreshToken);

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/refresh`, 
          formData,
          {
            headers: { 
              "Accept": "application/json",
              "X-Client-Token": import.meta.env.VITE_CLIENT_TOKEN 
            }
          }
        );

        if (data?.data) {
          console.log('Session restored successfully');
          tokenService.setTokens(data.data.token, data.data.refresh_token);
          setUser(data.data.user);
        }
      } catch (err) {
          console.error('Session restoration failed:', err);
          tokenService.clear(); // Tanggalin ang tokens
          setUser(null);        // I-reset ang user state
      } finally {
          setLoading(false);
      }
    };

  useEffect(() => {
    restoreAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, hasRole, hasPermission,loading  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);