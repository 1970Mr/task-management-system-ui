import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.user = null;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post("/api/login", credentials);
      commit("setToken", response.data.token);
      commit("setUser", response.data.user);
    },
    async register({ commit }, credentials) {
      const response = await axios.post("/api/register", credentials);
      commit("setToken", response.data.token);
      commit("setUser", response.data.user);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
};
