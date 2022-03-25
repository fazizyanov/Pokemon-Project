import { FC, useCallback } from "react";

import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface CardProps {
  name: string;
  id: number;
  image: string;
}

const PokemonCard: FC<CardProps> = ({ name, id, image }) => {
  const history = useHistory();

  const handleChangeButton = useCallback(() => {
    history.push(`/pokemon-description?id=${id}`);
  }, [id]);

  return (
    <Card>
      <CardMedia component="img" alt="pokemon" height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleChangeButton} size="small">
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
