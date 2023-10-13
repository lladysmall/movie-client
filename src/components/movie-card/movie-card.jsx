import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Title>{movie.Title}</Card.Title>
      <Button onClick={() => {onMovieClick(movie);}}>
        Open
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string,
    ReleaseDate: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape ({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
    Actors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};