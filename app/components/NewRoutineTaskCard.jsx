import React, { useState } from "react";
import { Card, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const NewRoutineTaskCard = ({ task, setSelectedTasksForRoutine }) => {
  const [isSelected, setIsSelected] = useState(false);
  const theme = useTheme();

  const handlePress = () => {
    setIsSelected(!isSelected);
    setSelectedTasksForRoutine((curr) =>
      isSelected
        ? curr.filter((t) => t.task_id !== task.task_id)
        : [...curr, task]
    );
  };

  return (
    <TouchableRipple onPress={handlePress}>
      <Card
        mode="outlined"
        style={{
          margin: 4,
          backgroundColor: isSelected
            ? theme.colors.primaryContainer
            : theme.colors.surface,
        }}
      >
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text variant="titleMedium">{task.task_name}</Text>
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
                {task.gem_value}
              </Text>
            </View>
          </View>
          {isSelected && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={theme.colors.primary}
            />
          )}
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

export default NewRoutineTaskCard;
