import { FC, useCallback, useContext } from "react";
import { Button, Grid } from "@mui/material";

import { MyContext } from "../../services/reducer";

import PokemonCard from "../../components/PokemonCard";
import { PokemonData } from "../../App";

interface PropsPokemonsList {
  getPokemons: (arg: string) => void;
}

const PokemonsList: FC<PropsPokemonsList> = ({ getPokemons }) => {
  const { pokemons, next, prev } = useContext(MyContext);

  const handleClickPrevButton = useCallback(() => {
    if (typeof prev !== "string") return;
    getPokemons(prev);
  }, [prev]);

  const handleClickNextButton = useCallback(() => {
    if (typeof next !== "string") return;
    getPokemons(next);
  }, [next]);

  return (
    <>
      <Grid container spacing={2}>
        {pokemons?.length > 0 &&
          pokemons.map((item: PokemonData) => (
            <Grid key={item.id} item xs={2}>
              <PokemonCard id={item.id} image={item.img} name={item.name} />
            </Grid>
          ))}
      </Grid>
      <Button disabled={prev === null} onClick={handleClickPrevButton}>
        Назад
      </Button>
      <Button onClick={handleClickNextButton}>Вперед</Button>
    </>
  );
};

export default PokemonsList;
