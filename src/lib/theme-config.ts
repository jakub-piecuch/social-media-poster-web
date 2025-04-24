// Theme configuration
// This file allows us to define color themes that can be easily swapped

export type ThemeColor = {
  name: string;
  colors: {
    primary: string;   // Main accent color
    hover: string;     // Hover state
    light: string;     // Lighter version for text/borders
    dark: string;      // Darker version
    text: string; 
  };
}

// Available themes
export const themes: Record<string, ThemeColor> = {
  green: {
    name: "Green",
    colors: {
      primary: "bg-emerald-600 border-emerald-500",
      hover: "hover:bg-emerald-700 hover:border-emerald-500",
      light: "text-emerald-400 border-emerald-400",
      dark: "bg-emerald-800",
      text: "text-white",
    }
  },
  blue: {
    name: "Blue",
    colors: {
      primary: "bg-blue-600",
      hover: "hover:bg-blue-700",
      light: "text-blue-400 border-blue-400",
      dark: "bg-blue-800",
      text: "text-white",
    }
  },
  purple: {
    name: "Purple",
    colors: {
      primary: "bg-purple-600",
      hover: "hover:bg-purple-700",
      light: "text-purple-400 border-purple-400",
      dark: "bg-purple-800",
      text: "text-white",
    }
  },
  amber: {
    name: "Amber",
    colors: {
      primary: "bg-amber-600",
      hover: "hover:bg-amber-700",
      light: "text-amber-400 border-amber-400",
      dark: "bg-amber-800",
      text: "text-gray-900",

    }
  },
  rose: {
    name: "Rose",
    colors: {
      primary: "bg-rose-600",
      hover: "hover:bg-rose-700",
      light: "text-rose-400 border-rose-400",
      dark: "bg-rose-800",
      text: "text-white",
    }
  }
};

// Default theme - now explicitly set to green
export const defaultTheme: string = "green";

// Get a theme by name, falling back to default if not found
export function getTheme(themeName?: string): ThemeColor {
  return themes[themeName || defaultTheme] || themes[defaultTheme];
}