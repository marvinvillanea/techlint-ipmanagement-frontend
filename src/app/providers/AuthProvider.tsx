import { createContext, useContext, useState } from "react";
import api from "../../core/api/axios";
import { tokenService } from "../../core/api/tokenService";
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });

    tokenService.setTokens(data.access_token, data.refresh_token);
    setUser(data.user);
  };

  const logout = () => {
    tokenService.clear();
    setUser(null);
  };

  const hasRole = (role: string) => user?.roles?.includes(role);
  const hasPermission = (perm: string) => user?.permissions?.includes(perm);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, hasRole, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);