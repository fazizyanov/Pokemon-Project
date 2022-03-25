import { FC, useCallback, useContext } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import queryString from "query-string";

import { MyContext } from "../../App";

export interface PokemonData {
  name: string;
  id: number;
  img: string;
}

const PokemonDescription: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const pokemonData: PokemonData[] = useContext(MyContext);

  const pokeId = queryString.parse(location.search);

  const handleChange = useCallback(() => {
    history.push("/pokemon-list");
  }, [pokeId]);

  const pokeData = pokemonData.find(
    (item: any) => item.id === Number(pokeId.id)
  );

  return (
    <div>
      <Button onClick={handleChange}>Назад</Button>
      <div>
        <img src={pokeData?.img} alt="pokemon" />
      </div>
      <div>{pokeData?.name}</div>
      <div>{pokeData?.id}</div>
    </div>
  );
};

export default PokemonDescription;
