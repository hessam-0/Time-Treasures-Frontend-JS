import React from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { Surface, useTheme } from "react-native-paper";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ isExpanded, children }) => {
  const theme = useTheme();

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isExpanded]);

  return (
    <Surface
      style={{
        overflow: "hidden",
        height: isExpanded ? "auto" : 0,
        backgroundColor: theme.colors.surfaceVariant,
      }}
    >
      {children}
    </Surface>
  );
};

export default Accordion;
