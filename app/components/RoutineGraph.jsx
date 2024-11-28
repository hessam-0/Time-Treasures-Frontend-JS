import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";

export default function RoutineGraph() {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [weekIndex, setWeekIndex] = useState(0);

  const mockData = [
    // Week 1
    [
      { history_id: 1, total_time: 1200000 },
      { history_id: 2, total_time: 1080000 },
      { history_id: 3, total_time: 900000 },
      { history_id: 4, total_time: 780000 },
      { history_id: 5, total_time: 810000 },
      { history_id: 6, total_time: 720000 },
      { history_id: 7, total_time: 540000 },
    ],
    // Week 2
    [
      { history_id: 8, total_time: 1300000 },
      { history_id: 9, total_time: 1150000 },
      { history_id: 10, total_time: 980000 },
      { history_id: 11, total_time: 920000 },
      { history_id: 12, total_time: 870000 },
      { history_id: 13, total_time: 800000 },
      { history_id: 14, total_time: 750000 },
    ],
    // Week 3
    [
      { history_id: 15, total_time: 1100000 },
      { history_id: 16, total_time: 1050000 },
      { history_id: 17, total_time: 1000000 },
      { history_id: 18, total_time: 950000 },
      { history_id: 19, total_time: 900000 },
      { history_id: 20, total_time: 850000 },
      { history_id: 21, total_time: 800000 },
    ],
  ];

  const currentWeekData = mockData[weekIndex];
  const maxTime = Math.max(...currentWeekData.map((d) => d.total_time));
  const barWidth = (screenWidth - 80) / 7;

  const handlePrevWeek = () => {
    setWeekIndex((prev) => (prev > 0 ? prev - 1 : mockData.length - 1));
  };

  const handleNextWeek = () => {
    setWeekIndex((prev) => (prev < mockData.length - 1 ? prev + 1 : 0));
  };

  return (
    <View style={{ height: 400, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 16,
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.primary,
            marginBottom: 24,
            paddingLeft: 16,
          }}
        >
          My Routine
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
          Week {weekIndex + 1}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Button mode="text" onPress={handlePrevWeek} style={{ minWidth: 50 }}>
          ←
        </Button>
        <Button mode="text" onPress={handleNextWeek} style={{ minWidth: 50 }}>
          →
        </Button>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingHorizontal: 16,
          height: 300,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: -12,
            top: 12,
            bottom: 32,
            width: 35,
            justifyContent: "space-between",
          }}
        >
          {[20, 15, 10, 5, 0].map((minutes) => (
            <Text
              key={minutes}
              variant="labelSmall"
              style={{
                color: theme.colors.onSurface,
                fontSize: 10,
              }}
            >
              {minutes}m
            </Text>
          ))}
        </View>

        {currentWeekData.map((data, index) => {
          const height = (data.total_time / maxTime) * 250;
          return (
            <View
              key={data.history_id}
              style={{
                flex: 1,
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: barWidth - 4,
                  height,
                  backgroundColor: theme.colors.primary,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
              <Text
                variant="labelSmall"
                style={{
                  marginTop: 8,
                  color: theme.colors.onSurface,
                }}
              >
                {["M", "T", "W", "T", "F", "S", "S"][index]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
