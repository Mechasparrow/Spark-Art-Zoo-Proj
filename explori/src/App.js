import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Explori</h1>
        </header>

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
