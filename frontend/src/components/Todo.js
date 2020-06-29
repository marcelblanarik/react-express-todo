import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authService from "../services/auth.service";
import todoService from "../services/todo.service";
import "./Styles.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Todo = () => {
  const form = useRef();
  const checkBtn = useRef();
  const token = authService.getToken();
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  async function fetchTodos() {
    const query = await todoService.getAllTodos(token);
    setAllTodos(query.data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeTodo = (e) => {
    const todo = e.target.value;
    setTodo(todo);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const user = authService.getUser();
      const userId = user._id;
      todoService.createTodo(userId, todo, token).then(setLoading(false));
      fetchTodos();
    }
  };

  const completeTodo = (todo) => {
    todo.setCompleted(!completed);
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div>
        <h1 className="text-center">Awesome ToDo App</h1>
        <h2 className="text-center">Add new ToDo item</h2>
        <Form onSubmit={handleCreateTodo} ref={form}>
          <div className="form-group">
            <label htmlFor="email">ToDo</label>
            <Input
              type="text"
              className="form-control"
              name="todo"
              value={todo}
              onChange={onChangeTodo}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <ul>
        {!!allTodos &&
          allTodos.map((todo) => (
            <li key={todo._id} onClick={(todo) => completeTodo(todo)}>
              {todo.title}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Todo;
