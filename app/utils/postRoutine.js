import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const postRoutines = async (user_id, sendInfo) => {
  const url = `${apiUrl}${endpoints.userTasks}/${user_id}/routines`;

  try {
    const response = await axios.post(url, sendInfo);
    return response;
  } catch (error) {
    console.error("Error posting routines:", error.message);
    throw error;
  }
};

export default postRoutines;
