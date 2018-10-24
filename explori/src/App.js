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
import ScannerPage from "./Containers/ScannerPageContainer";
import BadgePage from "./Containers/BadgesPageContainer";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./Store";

//Redux persistence
import { PersistGate } from "redux-persist/integration/react";

//Redux testing DEBUG
import { test, loadInChoicesFromApi } from "./Actions";

//Redux action for loading in faux choices
import { loadInFauxChoicesViaApi } from "./Actions";

//install ApiInterface for DEBUG
import ApiInterface from "./Lib/ApiInterface";

//set up header with router
const AppHeaderWithRouter = withRouter(HeaderBar);

//Declare the App Component
class App extends Component {
  constructor(props) {
    super(props);

    //dispatch a test action to see if redux if functioning properly DEBUG
    store.dispatch(test());

    //Gen _200_ faux choices from via api
    store.dispatch(loadInFauxChoicesViaApi(200));
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
                <div className="routes">
                  <Route exact path="/" component={HomePage} />
                  <Route path="/view-item" component={ViewItemPage} />
                  <Route path="/quiz-page" component={QuizPage} />
                  <Route path="/quiz-failed" component={ItemIncorrectPage} />
                  <Route path="/quiz-complete" component={ItemCompletedPage} />
                  <Route path="/badges" component={BadgePage} />
                  <Route
                    path="/view-collection"
                    component={ViewCollectionPage}
                  />
                  <Route path="/scanner" component={ScannerPage} />
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
