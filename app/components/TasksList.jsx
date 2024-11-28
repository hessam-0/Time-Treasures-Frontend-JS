import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Button,
  Text,
  Surface,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import TaskCard from "./TaskCard";
import TextInputBar from "./TextInputBar";
import fetchTasksById from "../utils/userApi";
import {
  addSelectedTask,
  removeSelectedTask,
} from "../tasks/selectedTasksSlice";
import { setTimeLeft, setIsRunning } from "../tasks/timerSlice";

const TaskList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state) => state.selectedTasks.tasks);
  const { isRunning, timeLeft } = useSelector((state) => state.timer);
  const { userId } = useSelector((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchTasksById(userId)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSelectTask = (task) => {
    if (isRunning) return;

    const isTaskSelected = selectedTasks.some(
      (t) => t.task_id === task.task_id
    );
    if (isTaskSelected) {
      dispatch(removeSelectedTask(task.task_id));
      const remainingTasks = selectedTasks.filter(
        (t) => t.task_id !== task.task_id
      );
      dispatch(
        setTimeLeft(
          remainingTasks.reduce((sum, t) => sum + (t.duration || 300), 0)
        )
      );
    } else {
      dispatch(addSelectedTask(task));
      dispatch(
        setTimeLeft(
          selectedTasks.reduce((sum, t) => sum + (t.duration || 300), 0) +
            (task.duration || 300)
        )
      );
    }
  };

  const handleStartTimer = () => {
    dispatch(setIsRunning(true));
    router.push({ pathname: "/", params: { timeLeft } });
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (event.type === "dismissed") return;
    if (selectedTime) {
      dispatch(
        setTimeLeft(
          (selectedTime.getHours() * 60 + selectedTime.getMinutes()) * 60
        )
      );
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (loading) {
    return (
      <Surface
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </Surface>
    );
  }

  const baseDate = new Date();
  baseDate.setHours(Math.floor(timeLeft / 3600));
  baseDate.setMinutes((timeLeft % 3600) / 60);
  baseDate.setSeconds(0);

  return (
    <Surface
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        width: "100%",
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          textAlign: "center",
          marginTop: 16,
          marginBottom: 8,
          color: theme.colors.primary,
        }}
      >
        Available Tasks
      </Text>

      <TouchableRipple onPress={() => !isRunning && setShowPicker(true)}>
        <Text
          variant="displayLarge"
          style={{
            textAlign: "center",
            color: theme.colors.primary,
            marginVertical: 16,
            fontSize: 48,
          }}
        >
          {formatTime(timeLeft)}
        </Text>
      </TouchableRipple>

      {showPicker && (
        <DateTimePicker
          value={baseDate}
          mode="time"
          is24Hour={true}
          onChange={handleTimeChange}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 16,
          paddingHorizontal: 24,
          width: "100%",
        }}
      >
        <Button
          mode="contained"
          onPress={handleStartTimer}
          disabled={selectedTasks.length === 0 || isRunning}
          style={{ flex: 1, marginRight: 8 }}
        >
          Start Timer
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => router.push("/routines")}
          style={{ flex: 1 }}
        >
          View Routines
        </Button>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onSelect={handleSelectTask}
            isSelected={selectedTasks.some((t) => t.task_id === item.task_id)}
            disabled={isRunning}
          />
        )}
        keyExtractor={(item) => item.task_id.toString()}
        contentContainerStyle={{ padding: 24, width: "100%" }}
        ListFooterComponent={
          <TextInputBar
            disabled={isRunning}
            onTaskAdded={() => {
              fetchTasksById(userId).then(setTasks).catch(console.error);
            }}
          />
        }
      />
    </Surface>
  );
};

export default TaskList;
