import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <Route path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/todo" component={Todo} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
