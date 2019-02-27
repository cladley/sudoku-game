import React, { Component } from "react";
import Board from "./components/Board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board rows="9" columns="9" />
      </div>
    );
  }
}

export default App;
