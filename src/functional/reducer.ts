import { useReducer } from "react";

export const loadState = (key: string, initialState: any) => {
  try {
    let savedState = localStorage.getItem(key);
    if (savedState) savedState = JSON.parse(savedState);
    if (savedState) {
      return { past: [], present: savedState, future: [] };
    } else return initialState;
  } catch (error) {
    console.error("Failed to load state:", error);
    return initialState;
  }
};

// Reducer function to manage game state & history
export const gameReducer = (
  state: any,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        past: [],
        present: action.payload,
        future: [],
      };
    case "MOVE":
      const newGameState = action.payload;
      return {
        ...state,
        past: [...state.past, state.present], // Store previous state for undo
        present: newGameState,
        future: [], // Clear redo history on new move
      };

    case "UNDO":
      if (state.past.length === 0) return state; // No undo available
      const previousState = state.past[state.past.length - 1];
      return {
        ...state,
        past: state.past.slice(0, -1),
        present: previousState,
        future: [state.present, ...state.future], // Store for redo
      };

    case "REDO":
      if (state.future.length === 0) return state; // No redo available
      const nextState = state.future[0];
      return {
        ...state,
        past: [...state.past, state.present],
        present: nextState,
        future: state.future.slice(1),
      };

    default:
      return state;
  }
};
