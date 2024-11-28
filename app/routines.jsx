import React from "react";
import { Surface, useTheme } from "react-native-paper";
import Header from "./components/Header";
import RoutinesList from "./components/RoutinesList";

const Routines = () => {
  const theme = useTheme();

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <RoutinesList />
    </Surface>
  );
};

export default Routines;
