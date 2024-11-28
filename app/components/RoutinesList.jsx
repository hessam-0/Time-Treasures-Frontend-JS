import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import {
  Surface,
  Text,
  Button,
  Portal,
  Modal,
  TextInput,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import fetchRoutines from "../utils/routinesApi";
import RoutineCard from "./RoutineCard";
import fetchTasksById from "../utils/userApi";
import NewRoutineTaskCard from "./NewRoutineTaskCard";
import postRoutines from "../utils/postRoutine";

const RoutinesList = () => {
  const theme = useTheme();
  const [userRoutines, setUserRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTasksForRoutine, setSelectedTasksForRoutine] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        setError("No user authenticated");
        setIsLoading(false);
        return;
      }

      try {
        const [routinesData, tasksData] = await Promise.all([
          fetchRoutines(userId),
          fetchTasksById(userId),
        ]);

        setUserRoutines(routinesData);
        setUserTasks(tasksData);
      } catch (err) {
        setError(err.message);
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId, modalVisible]);

  const handleSubmit = async () => {
    try {
      const routineInfo = {
        routine_name: routineName,
        tasks: selectedTasksForRoutine.map((task) => task.task_id),
        target_time: selectedTasksForRoutine.length * 5,
      };

      await postRoutines(userId, routineInfo);
      setRoutineName("");
      setSelectedTasksForRoutine([]);
      setModalVisible(false);
    } catch (err) {
      setError(err.message);
      console.error("Error creating routine:", err);
    }
  };

  if (isLoading) {
    return (
      <Surface
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </Surface>
    );
  }

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={userRoutines}
        renderItem={({ item }) => <RoutineCard routine={item} />}
        keyExtractor={(item) => item.routine_id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListFooterComponent={
          <Button
            mode="contained"
            onPress={() => setModalVisible(true)}
            style={{ marginVertical: 16 }}
          >
            New Routine +
          </Button>
        }
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: theme.colors.surface,
            margin: 20,
            padding: 20,
            borderRadius: 8,
            elevation: 5,
          }}
        >
          <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
            Create New Routine
          </Text>
          <TextInput
            mode="outlined"
            label="Routine Name"
            value={routineName}
            onChangeText={setRoutineName}
            style={{ marginBottom: 16 }}
          />
          <FlatList
            data={userTasks}
            renderItem={({ item }) => (
              <NewRoutineTaskCard
                task={item}
                setSelectedTasksForRoutine={setSelectedTasksForRoutine}
              />
            )}
            keyExtractor={(item) => item.task_id.toString()}
            style={{ maxHeight: 400 }}
            ListFooterComponent={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 16,
                }}
              >
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={routineName.trim().length === 0}
                  style={{ flex: 1, marginRight: 8 }}
                >
                  Submit
                </Button>
                <Button
                  mode="contained-tonal"
                  onPress={() => setModalVisible(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </View>
            }
          />
        </Modal>
      </Portal>
    </Surface>
  );
};

export default RoutinesList;
