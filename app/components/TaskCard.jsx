import React from "react";
import { Card, Text, TouchableRipple, useTheme } from "react-native-paper";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TaskCard = ({ task, onSelect, isSelected, disabled }) => {
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={() => onSelect(task)}
      disabled={disabled}
      style={{ marginBottom: 8, width: "100%" }}
    >
      <Card
        mode="elevated"
        style={[
          {
            backgroundColor: isSelected
              ? theme.colors.primaryContainer
              : theme.colors.surface,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
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
                style={{ color: theme.colors.primary, marginLeft: 4 }}
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

export default TaskCard;
