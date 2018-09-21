import React, { Component } from "react";
import "./App.css";

// Additional components
import HeaderBar from "./Components/HeaderBar";
import ExhibitItem from "./Components/ExhibitItem";

// Grid component
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />

        <div className="Items">
          <h2 className="title">Exhibits</h2>

          <Grid container>
            <Grid item>
              <ExhibitItem></ExhibitItem>
            </Grid>
          </Grid>

          <ul className="list">
            <li>American Art</li>
            <li>Contemporary Art</li>
            <li>European Art</li>
            <li>Asian Art</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
