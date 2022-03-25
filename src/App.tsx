import { FC, useEffect, useState, createContext } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import PokemonList from "./Page/PokemonList";
import PokemonDescription from "./Page/PokemonDescription";

import "./App.css";

export const MyContext = createContext([]);

const App: FC = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const getPokemon = async () => {
    const result = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=16&offset=16"
    );
    const urls = result.data.results.map(({ url }: any) => axios.get(url));
    const results = await axios.all(urls);
    const pokemonData: any = results.map(
      ({ data: { name, id, sprites } }: any) => ({
        name,
        id,
        img: sprites.back_default,
      })
    );
    setPokemonData(pokemonData);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="App">
      <MyContext.Provider value={pokemonData}>
        <Switch>
          <Route path="/pokemon-list" component={PokemonList} />
          <Route path="/pokemon-description" component={PokemonDescription} />
          <Redirect path="/" to="/pokemon-list" />
        </Switch>
      </MyContext.Provider>
    </div>
  );
};

export default App;
