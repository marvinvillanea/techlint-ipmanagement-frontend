let accessToken: string | null = null;
let refreshToken: string | null = null;


export const tokenService = {
  setTokens: (a: string, r: string) => {
    accessToken = a;
    refreshToken = r;
    localStorage.setItem("refresh_token", r);
  },

  getAccessToken: () => accessToken,


  getRefToken: () => refreshToken,

  getRefreshToken: () => localStorage.getItem("refresh_token"),

  clearRefreshToken: () => localStorage.removeItem("refresh_token"),

  clear: () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem("refresh_token");
  }
};