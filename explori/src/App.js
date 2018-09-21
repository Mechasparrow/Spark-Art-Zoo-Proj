import React, { Component } from "react";
import "./App.css";

// Additional components
import HeaderBar from "./Components/HeaderBar";
import ExhibitGrid from "./Components/ExhibitGrid";

//Models
import Collection from './Models/Collection';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collections: [
        new Collection ("African Art", 20),
        new Collection ("European Art", 30),
        new Collection ("Modern Art", 100),
        new Collection ("Modern Art", 100),
      ]
    }

  }

  render() {
    return (
      <div className="App">
        <HeaderBar />

        <div className="Items">
          <h2 className="title">Exhibits</h2>
          <ExhibitGrid collections = {this.state.collections} rowlength = {2}></ExhibitGrid>
        </div>
      </div>
    );
  }
}

export default App;
