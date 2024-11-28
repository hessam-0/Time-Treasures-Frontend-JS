import React from "react";
import { View } from "react-native";
import {
  ProgressBar as PaperProgressBar,
  Text,
  Surface,
  useTheme,
} from "react-native-paper";

const ProgressBar = ({ progress, nextLevelGems }) => {
  const theme = useTheme();

  return (
    <Surface
      style={{
        width: "80%",
        padding: 16,
        borderRadius: 8,
        elevation: 1,
      }}
    >
      <PaperProgressBar
        progress={progress}
        color={theme.colors.primary}
        style={{
          height: 8,
          borderRadius: 4,
          marginVertical: 8,
        }}
      />
      <Text
        variant="labelLarge"
        style={{
          textAlign: "center",
          color: theme.colors.primary,
        }}
      >
        Next Level: {nextLevelGems} Gems
      </Text>
    </Surface>
  );
};

export default ProgressBar;
