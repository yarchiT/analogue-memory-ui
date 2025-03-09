export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export const lightTheme: ThemeColors = {
  primary: '#0ea5e9', // primary-500
  secondary: '#8b5cf6', // secondary-500
  background: '#f9fafb', // gray-50
  surface: '#ffffff', // white
  text: '#111827', // gray-900
  textSecondary: '#4b5563', // gray-600
  border: '#e5e7eb', // gray-200
  error: '#ef4444', // red-500
  success: '#10b981', // green-500
  warning: '#f59e0b', // amber-500
};

export const darkTheme: ThemeColors = {
  primary: '#38bdf8', // primary-400
  secondary: '#a78bfa', // secondary-400
  background: '#111827', // gray-900
  surface: '#1f2937', // gray-800
  text: '#f9fafb', // gray-50
  textSecondary: '#d1d5db', // gray-300
  border: '#374151', // gray-700
  error: '#f87171', // red-400
  success: '#34d399', // green-400
  warning: '#fbbf24', // amber-400
};

export const getThemePreference = (): ThemeMode => {
  // Check if user has explicitly set a theme preference
  const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
  
  if (storedTheme) {
    return storedTheme;
  }
  
  // Otherwise, use system preference
  return 'system';
};

export const setThemePreference = (theme: ThemeMode): void => {
  localStorage.setItem('theme', theme);
  
  applyTheme(theme);
};

export const applyTheme = (theme: ThemeMode): void => {
  const root = window.document.documentElement;
  
  // Remove any existing theme classes
  root.classList.remove('light', 'dark');
  
  // Apply the appropriate theme
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

// Initialize theme on load
export const initializeTheme = (): void => {
  const theme = getThemePreference();
  applyTheme(theme);
  
  // Listen for system theme changes if using system preference
  if (theme === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      applyTheme('system');
    });
  }
}; 