import { createContext } from "react";
export const MyContext = createContext([]);

export const initialState = {
  pokemons: [],
  next: "",
  prev: "",
};

export const contextReducer = (
  initialState: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "CONTEXT_UPDATE":
      return { ...initialState, pokemons: action.payload };
    case "NEXT_PAGE":
      return { ...initialState, next: action.payload };
    case "PREV_PAGE":
      return { ...initialState, prev: action.payload };
    default:
      return initialState;
  }
};
