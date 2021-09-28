import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Error from "./components/Error";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/logout" component={HomePage} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
