import React, { Component } from "react";
import "./App.css";

// Additional components
import HeaderBar from "./Components/HeaderBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />

        <div className="Items">
          <h2 className="title">Exhibits</h2>
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
