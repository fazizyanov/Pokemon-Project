import { FC, useCallback, useContext, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import queryString from "query-string";
import { MyContext } from "../../services/reducer";

export interface PokemonData {
  name: string;
  id: number;
  img: string;
}

const PokemonDescription: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { pokemons } = useContext(MyContext);

  const pokemonId = queryString.parse(location.search);

  const handleClickBackButton = useCallback(() => {
    history.push("/pokemon-list");
  }, [pokemonId]);

  const pokemonDescription = useMemo(
    () =>
      pokemons.find((item: PokemonData) => item.id === Number(pokemonId.id)),
    [pokemons, pokemonId.id]
  );

  return (
    <>
      {pokemonDescription && (
        <div>
          <Button onClick={handleClickBackButton}>Назад</Button>
          <div>
            <img src={pokemonDescription.img} alt="pokemon" />
          </div>
          <div>{pokemonDescription.name}</div>
          <div>{pokemonDescription.id}</div>
        </div>
      )}
    </>
  );
};

export default PokemonDescription;
