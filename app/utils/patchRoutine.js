import axios from "axios";
import getEnvVars from "../config/config";

const { apiUrl, endpoints } = getEnvVars();

const patchRoutines = async (routine_id, sendInfo) => {
  const url = `${apiUrl}${endpoints.routines}/${routine_id}`;

  try {
    const response = await axios.patch(url, sendInfo);
    return response || [];
  } catch (error) {
    console.error("Error updating routine:", error.message);
    throw error;
  }
};

export default patchRoutines;
