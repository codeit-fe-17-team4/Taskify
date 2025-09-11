import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // localStorage에서 테마 설정 불러오기 (FOUC 방지)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      // 시스템 테마 감지
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      setTheme(prefersDark ? 'dark' : 'light');
    }

    setIsInitialized(true);
  }, []);

  // 테마 변경 시 HTML 클래스 및 localStorage 업데이트
  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    localStorage.setItem('theme', theme);
    document.documentElement.className = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
