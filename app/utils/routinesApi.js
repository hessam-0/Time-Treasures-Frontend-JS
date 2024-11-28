import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const fetchRoutines = async (user_id) => {
  const url = `${apiUrl}${endpoints.userTasks}/${user_id}/routines`;

  try {
    const response = await axios.get(url);
    return response.data.routines || [];
  } catch (error) {
    console.error("Error fetching routines:", error.message);
    throw error;
  }
};

export default fetchRoutines;
