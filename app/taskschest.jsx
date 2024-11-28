import React from "react";
import { Surface, useTheme } from "react-native-paper";
import Header from "./components/Header";
import TaskList from "./components/TasksList";

export default function TasksScreen() {
  const theme = useTheme();

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <TaskList />
    </Surface>
  );
}
