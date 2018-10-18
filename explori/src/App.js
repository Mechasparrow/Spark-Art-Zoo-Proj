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
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

// Additional components
import HeaderBar from "./Containers/HeaderBarContainer";

//Pages
import HomePage from "./Containers/HomePageContainer";
import ViewItemPage from "./Containers/ViewItemPageContainer";
import QuizPage from "./Containers/QuizPageContainer";
import ItemCompletedPage from "./Containers/ItemCompletePageContainer";
import ItemIncorrectPage from "./Containers/ItemUncompletePageContainer";
import ViewCollectionPage from "./Containers/ViewCollectionPageContainer";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./Store";

//Redux persistence
import { PersistGate } from "redux-persist/integration/react";

//Redux tester
import { test } from "./Actions";

//install ApiInterface for DEBUG
import ApiInterface from "./Lib/ApiInterface";

//set up header with router
const AppHeaderWithRouter = withRouter(HeaderBar);

//Declare the App Component
class App extends Component {
  constructor(props) {
    super(props);

    // DEBUG
    console.log("COLLECTION TEST");
    ApiInterface.getCollections();

    console.log("ITEM TEST");
    ApiInterface.getItems();

    console.log("SOURCE TEST");
    ApiInterface.getSources();

    //dispatch a test action to see if redux if functioning properly DEBUG
    store.dispatch(test());
  }

  //Renders the html of the key root app component
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/** Inject the redux store with Provider **/}
          <div className="App">
            {/** Router component that maps pages to routes**/}
            <Router>
              <div>
                {/** Renders the App Header **/}
                <AppHeaderWithRouter />

                {/** Render the routes **/}
                <div>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/view-item" component={ViewItemPage} />
                  <Route path="/quiz-page" component={QuizPage} />
                  <Route path="/quiz-failed" component={ItemIncorrectPage} />
                  <Route path="/quiz-complete" component={ItemCompletedPage} />
                  <Route
                    path="/view-collection"
                    component={ViewCollectionPage}
                  />
                </div>
              </div>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
