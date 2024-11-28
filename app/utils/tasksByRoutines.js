import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const fetchTasksByRoutine = async (routine_id) => {
  const url = `${apiUrl}${endpoints.routines}/${routine_id}/tasks`;

  try {
    const response = await axios.get(url);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching routine tasks:", error.message);
    throw error;
  }
};

export default fetchTasksByRoutine;
