import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

const register = (name, email, password) => {
  // let data = new FormData();
  // data.append("username", username);
  // data.append("email", email);
  // data.append("password", password);
  var config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(API_URL + "register", { name, email, password }, config)
    .then((response) => {
      console.log(response);

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
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
