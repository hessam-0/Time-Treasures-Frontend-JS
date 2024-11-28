import { Stack } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useAppTheme } from "./context/ThemeContext";
import store from "./store";

function LayoutContent() {
  const { theme } = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="taskschest" options={{ title: "Tasks Chest" }} />
        <Stack.Screen name="analytics" options={{ title: "Analytics Page" }} />
        <Stack.Screen name="routines" options={{ title: "Routine Screen" }} />
      </Stack>
    </PaperProvider>
  );
}

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <LayoutContent />
      </ThemeProvider>
    </ReduxProvider>
  );
}
