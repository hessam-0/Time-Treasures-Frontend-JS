import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useSelector } from "react-redux";
import { TextInput, Button, useTheme, Card } from "react-native-paper";
import postTask from "../utils/postTask";

const TextInputBar = ({ onTaskAdded, disabled }) => {
  const theme = useTheme();
  const [taskName, setTaskName] = useState("");
  const [gemValue, setGemValue] = useState("");
  const { userId } = useSelector((state) => state.user);

  const handleAddTask = async () => {
    if (!taskName.trim() || !gemValue.trim()) {
      Alert.alert("Error", "Please fill in both task name and gem value");
      return;
    }

    const numericGemValue = parseInt(gemValue);
    if (isNaN(numericGemValue) || numericGemValue <= 0) {
      Alert.alert("Error", "Please enter a valid gem value");
      return;
    }

    try {
      const taskInfo = {
        task_name: taskName,
        gem_value: numericGemValue,
        duration: 300,
      };

      await postTask(userId, taskInfo);
      Alert.alert("Success", "Task added successfully!");

      setTaskName("");
      setGemValue("");

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add task. Please try again.");
    }
  };

  return (
    <Card style={{ margin: 8 }} mode="outlined">
      <Card.Content>
        <TextInput
          mode="outlined"
          label="Task Name"
          value={taskName}
          onChangeText={setTaskName}
          style={{ marginBottom: 8 }}
          disabled={disabled}
        />
        <TextInput
          mode="outlined"
          label="Gem Value"
          value={gemValue}
          onChangeText={setGemValue}
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
          disabled={disabled}
        />
        <Button
          mode="contained"
          onPress={handleAddTask}
          disabled={disabled || !taskName.trim() || !gemValue.trim()}
          style={{ borderRadius: 4 }}
        >
          Add Task
        </Button>
      </Card.Content>
    </Card>
  );
};

export default TextInputBar;
