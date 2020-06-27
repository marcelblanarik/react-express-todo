import axios from "axios";

const API_URL = "http://localhost:5000/api/todos/";

const addTodo = (userId, todo, token) => {
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
      console.log(response);
      return response.data;
    });
};

const getAllTodos = () => {
  return axios.get(API_URL).then((response) => {
    console.log(response);
    return response.data;
  });
};

export default {
  addTodo,
  getAllTodos,
};
