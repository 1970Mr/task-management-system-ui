import axios from "../../services/axios";

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
    setUserRole(state, user) {
      state.userRole = user.role;
      localStorage.setItem("userRole", user.role);
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
    async login({ commit, dispatch }, credentials) {
      const response = await axios.post("/login", credentials);
      commit("setToken", response.data.access_token);
      await dispatch("getUser"); // Fetch user data after login
    },
    async register({ commit, dispatch }, credentials) {
      const response = await axios.post("/register", credentials);
      commit("setToken", response.data.access_token);
      await dispatch("getUser"); // Fetch user data after registration
    },
    logout({ commit }) {
      commit("logout");
    },
    async getUser({ commit, state }) {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      commit("setUser", response.data);
      commit("setUserRole", response.data);
    },
    async checkUser({ state, dispatch }) {
      if (!state.user) {
        await dispatch("getUser");
      }
    },
  },
};
