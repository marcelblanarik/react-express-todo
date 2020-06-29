import axios from "axios";

const API_URL = "http://localhost:5000/api/todos/";

const createTodo = (userId, todo, token) => {
  return axios
    .post(
      API_URL + "create",
      { userId, title: todo },
      {
        headers: {
          "x-access-token": token,
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.status;
    });
};

const getAllTodos = (token) => {
  return axios
    .get(API_URL, {
      headers: {
        "x-access-token": token,
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export default {
  createTodo,
  getAllTodos,
};
