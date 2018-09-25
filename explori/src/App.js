/**
App.js

Main Component that is rendered to the web browser

renders the HeaderBar
handles routing

**/

//Reactjs
import React, { Component } from "react";

//styling
import "./App.css";

// routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Additional components
import HeaderBar from "./Components/HeaderBar";

//Pages
import HomePage from "./Components/HomePage";
import ViewItemPage from "./Components/ViewItemPage";
import QuizPage from "./Components/QuizPage";
import ItemCompletedPage from "./Components/ItemCompletedPage";
import ItemIncorrectPage from "./Components/ItemIncorrectPage";

//Declare the App Component
class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />

        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/view-item" component={ViewItemPage} />
            <Route path="/quiz-page" component={QuizPage} />
            <Route path = "/quiz-failed" component = {ItemIncorrectPage} />
            <Route path = "/quiz-complete" component = {ItemCompletedPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
