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
import HeaderBar from "./Containers/HeaderBarContainer";

//Pages
import HomePage from "./Containers/HomeContainer";
import ViewItemPage from "./Containers/ViewItemContainer";
import QuizPage from "./Containers/QuizPageContainer";
import ItemCompletedPage from "./Components/ItemCompletedPage";
import ItemIncorrectPage from "./Components/ItemIncorrectPage";
import ViewCollectionPage from './Containers/ViewCollectionPageContainer';

// Redux
import {Provider} from 'react-redux';
import {store} from './Store';

//Redux tester
import {test} from './Actions';

//Declare the App Component
class App extends Component {

  constructor(props) {
    super(props);

    store.dispatch(test());
  }

  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <HeaderBar />

          <Router>
            <div>
              <Route exact path="/" component={HomePage} />
              <Route path="/view-item" component={ViewItemPage} />
              <Route path="/quiz-page" component={QuizPage} />
              <Route path = "/quiz-failed" component = {ItemIncorrectPage} />
              <Route path = "/quiz-complete" component = {ItemCompletedPage} />
              <Route path = "/view-collection" component = {ViewCollectionPage} />
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
