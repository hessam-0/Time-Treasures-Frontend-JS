import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const postTask = async (user_id, taskInfo) => {
  const url = `${apiUrl}${endpoints.userTasks}/${user_id}/tasks`;

  try {
    const response = await axios.post(url, taskInfo);
    return response.data;
  } catch (error) {
    console.error("Error posting task:", error.message);
    throw error;
  }
};

export default postTask;
