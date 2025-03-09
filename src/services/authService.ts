import api, { ApiResponse } from './api';
import { User, AuthResponse, UserProfileResponse } from '../types/api';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  birthYear?: number;
  location?: {
    country?: string;
    region?: string;
  };
}

// Re-export User type from api.ts
export type { User };

// Token management
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const REMEMBER_ME_KEY = 'auth_remember_me';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string, rememberMe: boolean = false): void => {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const setUser = (user: User, rememberMe: boolean = false): void => {
  if (rememberMe) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const setRememberMe = (value: boolean): void => {
  localStorage.setItem(REMEMBER_ME_KEY, String(value));
};

export const getRememberMe = (): boolean => {
  return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
};

// Authentication API calls
export const login = async (credentials: LoginCredentials, rememberMe: boolean = false): Promise<User> => {
  try {
    const response = await api.post<ApiResponse<AuthResponse>>('/users/login', credentials);
    
    if (response.status === 'success' && response.data) {
      const authData = response.data as unknown as AuthResponse;
      setToken(authData.token, rememberMe);
      setUser(authData.user, rememberMe);
      setRememberMe(rememberMe);
      return authData.user;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  try {
    const response = await api.post<ApiResponse<AuthResponse>>('/users/register', credentials);
    
    if (response.status === 'success' && response.data) {
      const authData = response.data as unknown as AuthResponse;
      setToken(authData.token);
      setUser(authData.user);
      return authData.user;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = (): void => {
  removeToken();
  removeUser();
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const getUserProfile = async (): Promise<User | null> => {
  try {
    const token = getToken();
    if (!token) return null;
    
    const response = await api.get<ApiResponse<UserProfileResponse>>('/users/profile');
    
    if (response.status === 'success' && response.data) {
      const profileData = response.data as unknown as UserProfileResponse;
      return profileData.user;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

export default {
  login,
  register,
  logout,
  getToken,
  getUser,
  isAuthenticated,
  getUserProfile,
}; 