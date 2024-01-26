import { createContext, useContext } from 'react';

export const ThemeContext = createContext<string | null>(null);
export const { Consumer: ThemeConsumer } = ThemeContext;

export interface ThemeProviderProps extends React.PropsWithChildren {
  theme: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
