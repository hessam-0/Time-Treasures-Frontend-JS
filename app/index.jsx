import { useGlobalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { Button, Text, Card, Divider } from "react-native-paper";
import Header from "./components/Header";
import SelectedTasksList from "./components/SelectedTasksList";
import {
  setTimeLeft,
  setIsRunning,
  decrementTimer,
  resetTimer,
} from "./tasks/timerSlice";
import { resetTaskCompletionStatus } from "./tasks/selectedTasksSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { timeLeft: initialTime } = useGlobalSearchParams();
  const { timeLeft, isRunning } = useSelector((state) => state.timer);
  const selectedTasks = useSelector((state) => state.selectedTasks.tasks);

  useEffect(() => {
    if (initialTime) {
      dispatch(setTimeLeft(Number(initialTime)));
      dispatch(setIsRunning(true));
    }
  }, [initialTime, dispatch]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      if (timeLeft <= 1) {
        const allTasksCompleted = selectedTasks.every((task) => task.completed);
        if (!allTasksCompleted) {
          Alert.alert(
            "Time's Up!",
            "Out of time! For now...",
            [{ text: "OK", onPress: () => dispatch(resetTimer()) }],
            { cancelable: false }
          );
        }
      }
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, dispatch, selectedTasks]);

  const handleAllTasksCompleted = () => {
    dispatch(setIsRunning(false));
    dispatch(setTimeLeft(0));
    dispatch(resetTaskCompletionStatus());
  };

  const handleCancelTimer = () => {
    dispatch(resetTimer());
    dispatch(resetTaskCompletionStatus());
    router.push("/taskschest");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e3dff2" }}>
      <Header />
      <View style={{ flex: 1, padding: 16 }}>
        <Card style={{ marginBottom: 16, padding: 16 }}>
          <Text
            style={{ textAlign: "center", fontSize: 16, fontFamily: "System" }}
          >
            Time Left
          </Text>
          <Divider style={{ marginVertical: 8 }} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontFamily: "System",
              fontWeight: "700",
            }}
          >
            {formatTime(timeLeft)}
          </Text>
        </Card>

        <SelectedTasksList onAllTasksCompleted={handleAllTasksCompleted} />

        {isRunning ? (
          <Button
            mode="contained"
            buttonColor="#ff4444"
            onPress={handleCancelTimer}
            style={{ marginTop: 16 }}
          >
            Cancel Timer
          </Button>
        ) : selectedTasks.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Button
              mode="contained"
              onPress={() => dispatch(setIsRunning(true))}
              style={{ flex: 1, marginRight: 8 }}
            >
              Start Timer
            </Button>
            <Button
              mode="contained"
              buttonColor="#212121"
              onPress={() => router.push("/taskschest")}
              style={{ flex: 1 }}
            >
              Go to Tasks
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            buttonColor="#212121"
            onPress={() => router.push("/taskschest")}
            style={{ marginTop: 16 }}
          >
            Go to Tasks
          </Button>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
