import { FC, useCallback, useContext, useReducer } from "react";
import { Button, Grid } from "@mui/material";

import { MyContext } from "../../services/reducer";

import PokemonCard from "../../components/PokemonCard";

const PokemonsList: FC<any> = ({ getPokemons }) => {
  const { pokemons, next, prev }: any = useContext(MyContext);

  const handleClickPrevButton = useCallback(() => {
    getPokemons(prev);
  }, [prev]);

  const handleClickNextButton = useCallback(() => {
    getPokemons(next);
  }, [next]);

  return (
    <>
      <Grid container spacing={2}>
        {pokemons?.length > 0 &&
          pokemons.map((item: any) => (
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
