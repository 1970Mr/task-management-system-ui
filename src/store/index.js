import { createStore } from "vuex";
import auth from "./modules/auth";
import tasks from "./modules/tasks";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    tasks,
  },
});
