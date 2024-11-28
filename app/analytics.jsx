import React from "react";
import { View } from "react-native";
import { Text, Surface, useTheme } from "react-native-paper";
import Header from "./components/Header";
import RoutineGraph from "./components/RoutineGraph";

export default function AnalyticsScreen() {
  const theme = useTheme();

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.primary,
            marginBottom: 16,
            fontWeight: "500",
          }}
        >
          My Routine Graph
        </Text>
        <RoutineGraph />
      </View>
    </Surface>
  );
}
