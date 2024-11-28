import React from "react";
import { View } from "react-native";
import { Surface, Text, Button, useTheme, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const nextLevelGems = 150;
  const progress = user.total_gems / nextLevelGems;

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <View
        style={{
          flex: 1,
          padding: 24,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={120}
          source={{ uri: user.image_url }}
          style={{ marginTop: 40, marginBottom: 24 }}
        />

        <Text
          variant="headlineMedium"
          style={{ color: theme.colors.onBackground, marginBottom: 16 }}
        >
          {user.username}
        </Text>

        <Text
          variant="titleMedium"
          style={{ color: theme.colors.primary, marginBottom: 8 }}
        >
          Level {user.level}: Landlubber
        </Text>

        <Text
          variant="titleMedium"
          style={{ marginBottom: 8, color: theme.colors.secondary }}
        >
          Gems: {user.total_gems}
        </Text>

        <Text
          variant="bodyMedium"
          style={{ marginBottom: 24, color: theme.colors.onSurfaceVariant }}
        >
          {user.email}
        </Text>

        <Surface
          elevation={1}
          style={{
            width: "80%",
            padding: 24,
            borderRadius: 12,
            backgroundColor: theme.colors.surfaceVariant,
            marginBottom: 32,
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            Next Level: Sailor
          </Text>
          <View style={{ width: "100%" }}>
            <ProgressBar progress={progress} nextLevelGems={nextLevelGems} />
          </View>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Next Level: {nextLevelGems} Gems
          </Text>
        </Surface>

        <Button
          mode="contained"
          onPress={() => router.push("/analytics")}
          style={{ paddingHorizontal: 24 }}
          contentStyle={{ height: 48 }}
        >
          View Analytics
        </Button>
      </View>
    </Surface>
  );
}
