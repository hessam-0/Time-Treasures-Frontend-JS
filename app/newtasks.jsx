import { View } from "react-native";
import { Text, Surface, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import TextInputBar from "./components/TextInputBar";

const NewTasksScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <View
        style={{
          flex: 1,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.primary,
            marginBottom: 24,
          }}
        >
          Add New Task
        </Text>
        <TextInputBar />
      </View>
    </Surface>
  );
};

export default NewTasksScreen;
