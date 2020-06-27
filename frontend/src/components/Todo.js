import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import ToDoService from "../services/todo.service";
import authService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Todo = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const token = authService.getToken();
      const user = authService.getUser();
      const userId = user._id;
      console.log(token);
      ToDoService.addTodo(userId, todo, token).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <div className="col-md-12">
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
    </div>
  );
};
export default Todo;
