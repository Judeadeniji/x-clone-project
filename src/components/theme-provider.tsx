/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from "react";
import { useStorage, usepreferredColorScheme } from "rc-extended/use";
import { $watch } from "rc-extended/store";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "rc-extended-example-theme",
  ...props
}: ThemeProviderProps) {
  const theme = useStorage(storageKey, { theme: defaultTheme }, undefined, {
    listenToStorageChanges: true,
  });
  const colorScheme = usepreferredColorScheme();

  $watch(colorScheme, (scheme) => {
    theme.value = { theme: scheme };
  });

  useEffect(() => {
    // const root = window.document.documentElement;

    // root.classList.remove("light", "dark");

    // console.log(theme, theme.peek(), colorScheme.value);
    // if ((theme.peek()?.theme || colorScheme.value) === "system") {
    //   // const systemTheme = colorScheme.value;

    //   // root.classList.add(systemTheme);
    //   return;
    // }

    // root.classList.add(theme.peek()?.theme || colorScheme.value);
  }, []);

  const value = {
    get theme() {
      return theme.value.theme;
    },
    setTheme: (newTheme: Theme) => {
      theme.value = { theme: newTheme };
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
