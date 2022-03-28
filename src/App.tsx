import { FC, useEffect, useReducer } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import { contextReducer, initialState, MyContext } from "./services/reducer";

import PokemonsList from "./pages/PokemonsList";
import PokemonDescription from "./pages/PokemonDescription";

import "./App.css";

type Url = { url: string };

const App: FC = () => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  let urlPages = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";

  const getPokemons = async (urlPages: string): Promise<any> => {
    const result = await axios.get(`${urlPages}`);
    dispatch({ type: "NEXT_PAGE", payload: result.data.next });
    dispatch({ type: "PREV_PAGE", payload: result.data.previous });
    const urls = result.data.results.map(({ url }: Url) => axios.get(url));
    const results = await axios.all(urls);
    const pokemonsData: any = results.map(
      ({ data: { name, id, sprites } }: any) => ({
        name,
        id,
        img: sprites.back_default,
      })
    );
    dispatch({ type: "CONTEXT_UPDATE", payload: pokemonsData });
  };

  useEffect(() => {
    getPokemons(urlPages);
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
