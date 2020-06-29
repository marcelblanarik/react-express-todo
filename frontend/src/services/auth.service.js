import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

const register = (name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(API_URL + "register", { name, email, password }, config)
    .then((response) => {
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getToken,
  getUser,
};
