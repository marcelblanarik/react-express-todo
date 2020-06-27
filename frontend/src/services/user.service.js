import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getTodos = () => {
  return axios.get(API_URL + "todos");
};

const createTodo = () => {
  return axios.post(API_URL + "todos/create", { headers: authHeader() });
};

export default {
  getTodos,
  createTodo,
};
