import axios from "axios";

export const fetchTasks = () => {
  return axios.get("/api/tasks");
};

export const addTask = (task) => {
  return axios.post("/api/tasks", task);
};

export const updateTask = (task) => {
  return axios.put(`/api/tasks/${task.id}`, task);
};

export const deleteTask = (taskId) => {
  return axios.delete(`/api/tasks/${taskId}`);
};
