import axios from "axios";

export const login = (credentials) => {
  return axios.post("/api/login", credentials);
};

export const register = (credentials) => {
  return axios.post("/api/register", credentials);
};

export const logout = () => {
  return axios.post("/api/logout");
};
