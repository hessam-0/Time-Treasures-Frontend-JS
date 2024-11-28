import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const fetchTasks = async () => {
  const url = `${apiUrl}${endpoints.tasks}`;
  console.log("Fetching tasks from URL:", url);

  try {
    const response = await axios.get(url);
    return response.data.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw error;
  }
};

export default fetchTasks;
