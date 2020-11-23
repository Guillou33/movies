// Express is already installed
const express = require("express");
// Array of movies
const movies = require("./movies");
// In codesandbox we need to use the default port which is 8080

const appMovies = express();
const port = 8080;
appMovies.listen(port, () => {});

const showMovie = (movie) => {
  return `<div>
    <label>Title : </label><p>${movie.title}</p>
  </div>`;
};
appMovies.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});
appMovies.get("/api/movies", (req, res) => {
  res.status(200).json(movies);
});
appMovies.get("/api/movies/:id", (req, res) => {
  //console.log(movies.find((movie) => movie.id === parseInt(req.params.id)));
  const findMovieById = movies.find(
    (movie) => movie.id === parseInt(req.params.id)
  );
  if (findMovieById) {
    //res.status(200).json(findMovieById);
    res.status(200).send(showMovie(findMovieById));
  } else {
    res.status(404).send("Not Found");
  }
});
appMovies.get("/api/search", (req, res) => {
  const findMovieByQueryDuration = movies.filter(
    (movie) => movie.duration <= parseInt(req.query.maxDuration)
  );
  if (findMovieByQueryDuration) {
    res.status(200).json(findMovieByQueryDuration);
  } else {
    res.status(404).send("Not Found for this duration");
  }
});
appMovies.get("/users", (req, res) => {
  res.status(401).send("Unauthorized");
});
