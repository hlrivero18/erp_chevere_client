import type { LoginResponse } from '../types/auth.types';

const TOKEN_KEY = 'access_token';

export const saveToken = (response: LoginResponse) => {
  console.log(TOKEN_KEY)
  localStorage.setItem(TOKEN_KEY, response.data.token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return Boolean(getToken());
};