import { PokemonData } from "../App";

export enum pokemonsTypes {
  CONTEXT_UPDATE = "CONTEXT_UPDATE",
  NEXT_PAGE = "NEXT_PAGE",
  PREV_PAGE = "PREV_PAGE",
}

export type PokemonsAction = {
  type: string;
  payload: PokemonData[];
};

export type PrevPageAction = {
  type: pokemonsTypes.PREV_PAGE;
  payload: string;
};

export type NextPageAction = {
  type: pokemonsTypes.NEXT_PAGE;
  payload: string;
};

const nextPage = (value: string): NextPageAction => {
  return {
    type: pokemonsTypes.NEXT_PAGE,
    payload: value,
  };
};

const prevPage = (value: string): PrevPageAction => {
  return {
    type: pokemonsTypes.PREV_PAGE,
    payload: value,
  };
};

const pokemonsAction = (value: PokemonData[]): PokemonsAction => {
  return {
    type: pokemonsTypes.CONTEXT_UPDATE,
    payload: value,
  };
};

const pokemonsActions = { nextPage, prevPage, pokemonsAction };

export default pokemonsActions;
