import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const baseTheme = {
  fonts: {
    displayLarge: { fontFamily: "System", fontWeight: "400" },
    displayMedium: { fontFamily: "System", fontWeight: "400" },
    displaySmall: { fontFamily: "System", fontWeight: "400" },
    headlineLarge: { fontFamily: "System", fontWeight: "400" },
    headlineMedium: { fontFamily: "System", fontWeight: "400" },
    headlineSmall: { fontFamily: "System", fontWeight: "400" },
    titleLarge: { fontFamily: "System", fontWeight: "400" },
    titleMedium: { fontFamily: "System", fontWeight: "500" },
    titleSmall: { fontFamily: "System", fontWeight: "500" },
    bodyLarge: { fontFamily: "System", fontWeight: "400" },
    bodyMedium: { fontFamily: "System", fontWeight: "400" },
    bodySmall: { fontFamily: "System", fontWeight: "400" },
    labelLarge: { fontFamily: "System", fontWeight: "500" },
    labelMedium: { fontFamily: "System", fontWeight: "500" },
    labelSmall: { fontFamily: "System", fontWeight: "500" },
  },
};

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  ...baseTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: "#379392",
    primaryContainer: "#379392",
    secondary: "#ff8c42",
    secondaryContainer: "#ff8c42",
    tertiary: "#fff275",
    tertiaryContainer: "#fff275",
    background: "#ffffff",
    surface: "#f6f6f6",
    surfaceVariant: "#e8f5f5",
    text: "#17301c",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    onTertiary: "#17301c",
    error: "#B00020",
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  ...baseTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#379392",
    primaryContainer: "#379392",
    secondary: "#ff8c42",
    secondaryContainer: "#ff8c42",
    tertiary: "#fff275",
    tertiaryContainer: "#fff275",
    background: "#17301c",
    surface: "#1e3b24",
    surfaceVariant: "#2a4731",
    text: "#ffffff",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    onTertiary: "#17301c",
    error: "#CF6679",
  },
};

export { CombinedDefaultTheme, CombinedDarkTheme };
