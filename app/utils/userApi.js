import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const fetchTasksById = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch tasks.");
  }
  const url = `${apiUrl}${endpoints.userTasks}/${userId}/tasks`;

  try {
    const response = await axios.get(url);
    return response.data.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks by user ID:", error.message);
    throw error;
  }
};

export default fetchTasksById;
