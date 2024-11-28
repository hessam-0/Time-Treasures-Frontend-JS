import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import {
  Card,
  Text,
  Button,
  IconButton,
  useTheme,
  List,
} from "react-native-paper";
import { setSelectedTasks } from "../tasks/selectedTasksSlice";
import { setTimeLeft } from "../tasks/timerSlice";
import fetchTasksByRoutine from "../utils/tasksByRoutines";
import fetchTasksById from "../utils/userApi";
import patchRoutines from "../utils/patchRoutine";
import formatTime from "../utils/formatTime";

const RoutineCard = ({ routine }) => {
  const theme = useTheme();
  const [tasksInRoutine, setTasksInRoutine] = useState([]);
  const [userTasksNotInRoutine, setUserTasksNotInRoutine] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const routineTasks = await fetchTasksByRoutine(routine.routine_id);
        setTasksInRoutine(routineTasks.tasks || []);

        const allUserTasks = await fetchTasksById(routine.user_id);
        const taskInRoutineIds =
          routineTasks.tasks?.map((t) => t.task_id) || [];
        setUserTasksNotInRoutine(
          allUserTasks.filter((t) => !taskInRoutineIds.includes(t.task_id))
        );
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, [routine.routine_id, routine.user_id]);

  const handleRoutineSelect = () => {
    dispatch(setSelectedTasks(tasksInRoutine));
    const totalDuration = tasksInRoutine.reduce(
      (sum, t) => sum + (t.duration || 300),
      0
    );
    dispatch(setTimeLeft(totalDuration));
    router.replace("/");
  };

  const handleTaskToggle = async (task, isAdding) => {
    try {
      const updatedTasksInRoutine = isAdding
        ? [...tasksInRoutine, task]
        : tasksInRoutine.filter((t) => t.task_id !== task.task_id);

      await patchRoutines(routine.routine_id, {
        tasks: updatedTasksInRoutine.map((t) => t.task_id),
      });

      setTasksInRoutine(updatedTasksInRoutine);
      setUserTasksNotInRoutine((curr) =>
        isAdding
          ? curr.filter((t) => t.task_id !== task.task_id)
          : [task, ...curr]
      );
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  const renderTaskItem = (task, isInRoutine) => (
    <List.Item
      key={task.task_id}
      title={task.task_name}
      description={`Gems: ${task.gem_value}`}
      right={() => (
        <Button
          mode="outlined"
          onPress={() => handleTaskToggle(task, !isInRoutine)}
          style={{ marginVertical: 4 }}
        >
          {isInRoutine ? "Remove" : "Add"}
        </Button>
      )}
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        marginVertical: 4,
        borderRadius: 8,
      }}
    />
  );

  return (
    <Card style={{ margin: 8 }} mode="outlined">
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge">{routine.routine_name}</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
              Target Time: {formatTime(routine.target_time)}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleRoutineSelect}
            style={{ marginLeft: 8 }}
          >
            Start
          </Button>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button mode="text" onPress={() => setExpanded(!expanded)}>
          {expanded ? "Hide Tasks" : "Edit Tasks"}
        </Button>
      </Card.Actions>

      {expanded && (
        <Card.Content style={{ paddingTop: 8 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Current Tasks
          </Text>
          {tasksInRoutine.map((task) => renderTaskItem(task, true))}

          <Text
            variant="titleMedium"
            style={{ marginTop: 16, marginBottom: 8 }}
          >
            Available Tasks
          </Text>
          {userTasksNotInRoutine.map((task) => renderTaskItem(task, false))}
        </Card.Content>
      )}
    </Card>
  );
};

export default RoutineCard;
