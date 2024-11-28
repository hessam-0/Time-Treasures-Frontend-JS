// Change this value to switch environments: "dev" | "staging" | "prod"
const CURRENT_ENV = "dev";

const ENV = {
  dev: {
    //apiUrl: "http://10.0.2.2:8080",
    apiUrl: "https://time-treasures-backend.onrender.com",
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
    endpoints: {
      tasks: "/api/tasks",
      userTasks: "/api/users",
      routines: "/api/routines",
    },
  },
  staging: {
    apiUrl: "https://staging-api.example.com",
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
    endpoints: {
      tasks: "/api/tasks",
      userTasks: "/api/users",
      routines: "/api/routines",
    },
  },
  prod: {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
    endpoints: {
      tasks: "/api/tasks",
      userTasks: "/api/users",
      routines: "/api/routines",
    },
  },
};

const getEnvVars = () => {
  const config = ENV[CURRENT_ENV] || ENV.dev;
  console.log("Current API Configuration:", config);
  return config;
};

export default getEnvVars;
