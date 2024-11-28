import React from "react";
import { View, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Text,
  Button,
  useTheme,
  Surface,
  IconButton,
} from "react-native-paper";
import {
  removeSelectedTask,
  markTaskCompleted,
} from "../tasks/selectedTasksSlice";
import { Ionicons } from "@expo/vector-icons";

const SelectedTasksList = ({ onAllTasksCompleted }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state) => state.selectedTasks.tasks);
  const { isRunning } = useSelector((state) => state.timer);

  const handleRemoveTask = (taskId) => {
    if (!isRunning) {
      dispatch(removeSelectedTask(taskId));
    }
  };

  const handleToggleComplete = (taskId) => {
    const allTasksWillBeComplete = selectedTasks.every((task) =>
      task.task_id === taskId ? true : task.completed
    );

    dispatch(markTaskCompleted(taskId));

    if (allTasksWillBeComplete && isRunning) {
      Alert.alert(
        "All Tasks Completed!",
        "Well done! Confirm?",
        [{ text: "Confirm", onPress: onAllTasksCompleted }],
        { cancelable: false }
      );
    }
  };

  if (selectedTasks.length === 0) {
    return (
      <Surface
        style={{
          padding: 16,
          alignItems: "center",
          backgroundColor: theme.colors.surfaceVariant,
        }}
      >
        <Text variant="titleMedium">No tasks selected</Text>
      </Surface>
    );
  }

  const renderItem = ({ item }) => (
    <Card
      style={{
        marginBottom: 8,
        backgroundColor: item.completed
          ? theme.colors.surfaceVariant
          : theme.colors.surface,
      }}
      mode="outlined"
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">{item.task_name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Ionicons name="diamond" size={16} color={theme.colors.primary} />
              <Text
                variant="labelMedium"
                style={{ marginLeft: 4, color: theme.colors.primary }}
              >
                {item.gem_value}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              mode={item.completed ? "contained" : "outlined"}
              onPress={() => handleToggleComplete(item.task_id)}
              style={{ marginRight: 8 }}
              compact
            >
              {item.completed ? "Completed" : "Mark Complete"}
            </Button>

            <IconButton
              icon="close"
              mode="outlined"
              disabled={isRunning}
              onPress={() => handleRemoveTask(item.task_id)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ width: "100%", padding: 16 }}>
      <Text
        variant="titleLarge"
        style={{ marginBottom: 16, color: theme.colors.primary }}
      >
        Selected Tasks
      </Text>
      <FlatList
        data={selectedTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.task_id.toString()}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default SelectedTasksList;
