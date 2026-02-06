let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenService = {
  setTokens: (a: string, r: string) => {
    accessToken = a;
    refreshToken = r;
  },

  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  clear: () => {
    accessToken = null;
    refreshToken = null;
  }
};