import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Game2048 from "./game2048/game2048";
import Decoration from "./functional/decoration/Decoration";

function App() {
  return (
    <div className="App">
      <Decoration type="cloud"></Decoration>
      <Game2048></Game2048>
    </div>
  );
}

export default App;
