import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieView = ({ movies, user, token, favoriteMovies, setFavoriteMovies }) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m.Title === movieId);

  const handleAddFavorite = (event) => {
    event.preventDefault();

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (response.ok && favoriteMovies.includes(movieId)) {
        alert("This movie is already in your list");
        return false;
      } else if (response.ok) {
        console.log("movie id:", movieId);
        setFavoriteMovies(prev => [movie, ...prev]);
        alert("This movie has been added to your list");
      } else {
        alert("Something went wrong.");
        return false;
      }
    })
    .catch((e) => alert(e));
  };

  const handleRemoveFavorite = (event) => {
    event.preventDefault();

    fetch(`https://popopolis-f7a904c7cad0.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      if (favoriteMovies.includes(movieId)) {
        setFavoriteMovies(prev => prev.filter(favoriteMovie => favoriteMovie !== movieId));
        alert("This movie has been removed from your list.");
      } else {
        alert("Could not remove the movie from your list.");
      }
    })
    .catch((e) => alert(e));
  };

  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span><h3>{movie.Title}</h3></span>
      </div>
      <div>
        <span>{movie.ReleaseDate}</span><br />
        <span>{movie.Description}</span><br /><br />
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <br />
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <br />
        <span>Actors: </span>
        <span>{movie.Actors.join(", ")}</span>
      </div>
     
      <div className="d-flex flex-wrap">
        <Button onClick={handleAddFavorite} className="p-2" variant="warning">Add to Favorites</Button>
        <Button onClick={handleRemoveFavorite} className="p-2" variant="warning">Remove from Favorites</Button>

        <Link to={`/`}>
          <Button variant="warning" className="p-2 ms-auto">Home</Button>
        </Link>
      </div>

    </div>
  );
};