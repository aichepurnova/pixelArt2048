import { useEffect, useReducer, useState } from "react";
import TileGrid from "./TileGrid";
import {
  addNewTile,
  checkGameOver,
  compareTwoArrayOfObjects,
  generateNewTiles,
  moveTiles,
} from "./utils";
import { gameReducer, loadState } from "../functional/reducer";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";
import CSS from "./game2048.module.css";
import Alert from "../functional/alert/Alert";

const defState = {
  tiles: generateNewTiles(16, 2),
  points: 0,
  bestScore: 0,
  gameOver: false,
};

const initialState = {
  past: [],
  present: defState,
  future: [],
};

function Game2048() {
  const [state, dispatch] = useReducer(
    gameReducer,
    loadState("gameState", initialState)
  );

  const [alert, setAlert] = useState({
    show: state.present.gameOver,
    message: "",
    type: "",
  });

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state.present));
  }, [state]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const keys = ["up", "down", "left", "right"]; // Arrow keys
    const wasdMapping = { w: "up", s: "down", a: "left", d: "right" };
    let key = e.key.toLowerCase().replace("arrow", "");
    if (wasdMapping[key as keyof typeof wasdMapping]) {
      key = wasdMapping[key as keyof typeof wasdMapping];
    }

    if (keys.includes(key)) {
      let result = moveTiles(state.present.tiles, key);
      let newTiles = result.newTiles;
      let addPoints = result.addPoints;
      let isChanged = !compareTwoArrayOfObjects(newTiles, state.present.tiles);
      if (isChanged) {
        newTiles = addNewTile(newTiles);
      }
      let gameOver = checkGameOver(newTiles);
      if (gameOver) {
        setAlert({ show: true, message: "Game Over", type: "warning" });
      }
      let newPoints =
        state.present.points + addPoints.reduce((a, b) => a + b, 0);
      let bestScore = Math.max(state.present.bestScore, newPoints);
      dispatch({
        type: "MOVE",
        payload: {
          tiles: newTiles,
          points: newPoints,
          bestScore: bestScore,
          gameOver: gameOver,
        },
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={CSS["container"]}>
      <Alert
        show={alert.show}
        message={alert.message}
        type="warning"
        handleClose={() =>
          setAlert({ show: false, message: "Closed", type: "" })
        }
      ></Alert>
      <h1>2048</h1>
      <div className={CSS["rowContainer"]}>
        <IconArrowBackUp
          className={CSS["iconBtn"]}
          onClick={() => {
            dispatch({ type: "UNDO" });
            if (alert.show) {
              setAlert({ show: false, message: "Closed", type: "" });
            }
          }}
        ></IconArrowBackUp>
        <button
          className={CSS["btnNewGame"]}
          onClick={() =>
            dispatch({
              type: "RESET",
              payload: { ...defState, bestScore: state.present.bestScore },
            })
          }
        >
          New Game
        </button>
        <IconArrowForwardUp
          className={CSS["iconBtn"]}
          onClick={() => dispatch({ type: "REDO" })}
        ></IconArrowForwardUp>
      </div>

      <div>
        <div>Score: {state.present.points}</div>
        <div> Best score: {state.present.bestScore}</div>
      </div>

      <TileGrid tiles={state.present.tiles}></TileGrid>
    </div>
  );
}

export default Game2048;
