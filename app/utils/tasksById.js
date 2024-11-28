import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const fetchTaskById = async (task_id) => {
  const url = `${apiUrl}${endpoints.tasks}/${task_id}`;

  try {
    const response = await axios.get(url);
    return response.data.task || [];
  } catch (error) {
    console.error("Error fetching task:", error.message);
    throw error;
  }
};

export default fetchTaskById;
