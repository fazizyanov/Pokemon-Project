import { createContext } from "react";
import { PokemonData } from "../App";
import {
  NextPageAction,
  PokemonsAction,
  pokemonsTypes,
  PrevPageAction,
} from "./actions";

export interface PokemonsData {
  pokemons: PokemonData[] | [];
  next: string | any | null;
  prev: string | any | null;
}

export const initialState: PokemonsData = {
  pokemons: [],
  next: null,
  prev: null,
};

export const MyContext = createContext<PokemonsData>(initialState);

export const contextReducer = (
  state: PokemonsData,
  action: PrevPageAction | NextPageAction | PokemonsAction
): PokemonsData => {
  switch (action.type) {
    case pokemonsTypes.CONTEXT_UPDATE:
      return { ...state, pokemons: action.payload };
    case pokemonsTypes.NEXT_PAGE:
      return { ...state, next: action.payload };
    case pokemonsTypes.PREV_PAGE:
      return { ...state, prev: action.payload };
    default:
      return state;
  }
};
