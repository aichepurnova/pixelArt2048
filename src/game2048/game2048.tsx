import { use, useEffect, useReducer, useState } from "react";
import TileGrid from "./TileGrid";
import { TileProps } from "./types";
import {
  addNewTile,
  checkGameOver,
  compareTwoArrayOfObjects,
  generateNewTiles,
  moveTiles,
} from "./utils";
import { gameReducer, loadState } from "../functional/reducer";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";
import CSS from "./styles.module.css";

interface GameStateProps {
  tiles: TileProps[];
  points: number;
  bestScore: number;
}

const defState = {
  tiles: generateNewTiles(16, 2),
  points: 0,
  bestScore: 0,
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

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state.present));
  }, [state]);

  const handleKeyDown = (e: KeyboardEvent) => {
    let keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (keys.includes(e.key)) {
      let key = e.key.toLowerCase().replace("arrow", "");
      let result = moveTiles(state.present.tiles, key);
      let newTiles = result.newTiles;
      let addPoints = result.addPoints;
      let isChanged = !compareTwoArrayOfObjects(newTiles, state.present.tiles);
      if (isChanged) {
        newTiles = addNewTile(newTiles);
      }
      if (checkGameOver(newTiles)) {
        alert("Game Over");
      }
      let newPoints =
        state.present.points + addPoints.reduce((a, b) => a + b, 0);
      let bestScore = Math.max(state.present.bestScore, newPoints);
      dispatch({
        type: "MOVE",
        payload: { tiles: newTiles, points: newPoints, bestScore: bestScore },
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
      <h1>2048</h1>
      <div className={CSS["rowContainer"]}>
        <IconArrowBackUp
          className={CSS["iconBtn"]}
          onClick={() => dispatch({ type: "UNDO" })}
        ></IconArrowBackUp>
        <button
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
