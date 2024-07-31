import axios from "axios";

export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get("/api/tasks");
      commit("setTasks", response.data);
    },
    async addTask({ commit }, task) {
      const response = await axios.post("/api/tasks", task);
      commit("addTask", response.data);
    },
    async updateTask({ commit }, task) {
      const response = await axios.put(`/api/tasks/${task.id}`, task);
      commit("updateTask", response.data);
    },
    async deleteTask({ commit }, taskId) {
      await axios.delete(`/api/tasks/${taskId}`);
      commit("deleteTask", taskId);
    },
  },
};
