import { FC, useContext } from "react";

import { Grid } from "@mui/material";

import PokemonCard from "../../component/PokemonCard";

import { MyContext } from "../../App";

const PokemonList: FC = () => {
  const pokemonData: any = useContext(MyContext);

  return (
    <Grid container spacing={2}>
      {pokemonData?.length > 0 &&
        pokemonData.map((item: any) => (
          <Grid key={item.id} item xs={2}>
            <PokemonCard id={item.id} image={item.img} name={item.name} />
          </Grid>
        ))}
    </Grid>
  );
};

export default PokemonList;
