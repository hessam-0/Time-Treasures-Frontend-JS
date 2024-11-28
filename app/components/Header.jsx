import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Appbar, Text, useTheme } from "react-native-paper";
import { useAppTheme } from "../context/ThemeContext";

const Header = () => {
  const router = useRouter();
  const { total_gems } = useSelector((state) => state.user);
  const { isDark, toggleTheme } = useAppTheme();
  const theme = useTheme();

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Action
        icon={isDark ? "weather-sunny" : "weather-night"}
        onPress={toggleTheme}
      />
      <Appbar.Content
        title="Time Treasures"
        onPress={() => router.push("/")}
        titleStyle={{ fontFamily: "System", fontWeight: "500" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Ionicons name="diamond" size={25} color={theme.colors.onPrimary} />
          <Text variant="bodyLarge" style={{ marginLeft: 5 }}>
            {total_gems}
          </Text>
        </View>
        <Appbar.Action
          icon="account-circle"
          size={30}
          onPress={() => router.push("/profile")}
        />
      </View>
    </Appbar.Header>
  );
};

export default Header;
