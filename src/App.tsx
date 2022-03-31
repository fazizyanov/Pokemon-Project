import { FC, useEffect, useReducer } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import { contextReducer, initialState, MyContext } from "./services/reducer";

import PokemonsList from "./pages/PokemonsList";
import PokemonDescription from "./pages/PokemonDescription";

import "./App.css";
import pokemonsActions from "./services/actions";

type Url = { url: string };

export interface DestructurizationFetchData {
  data: {
    name: string;
    id: number;
    sprites: { front_default: string };
    img: string;
  };
}

export interface PokemonData {
  name: string;
  id: number;
  img: string;
}

interface FetchData {
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";

const App: FC = () => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  const getPokemons = async (urlPages: string = baseUrl): Promise<void> => {
    const result = await axios.get<FetchData>(`${urlPages}`);
    const { next, previous } = result.data;
    dispatch(pokemonsActions.nextPage(next));
    dispatch(pokemonsActions.prevPage(previous));
    const urls = result.data.results.map(({ url }: Url) => axios.get(url));
    const results = await axios.all(urls);
    const pokemonsData: PokemonData[] = results.map(
      ({ data: { name, id, sprites } }: DestructurizationFetchData) => ({
        name,
        id,
        img: sprites.front_default,
      })
    );
    dispatch(pokemonsActions.pokemonsAction(pokemonsData));
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="App">
      <MyContext.Provider value={state}>
        <Switch>
          <Route path="/pokemon-list">
            <PokemonsList getPokemons={getPokemons} />
          </Route>
          <Route path="/pokemon-description" component={PokemonDescription} />
          <Redirect path="/" to="/pokemon-list" />
        </Switch>
      </MyContext.Provider>
    </div>
  );
};

export default App;
