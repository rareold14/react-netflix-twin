import {React, useState, useEffect} from 'react'
import { getMovies } from '../api';
import './Row.css'
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

const imageHost = "https://image.tmdb.org/t/p/original/";
export const Row = ({title, path, isLarge}) => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const handleOnClick = (movie) => {
    if (trailer) {
      setTrailer("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          setTrailer(url);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer: ", error);
        });
    }
  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      console.log("data ", data);
      setMovies(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map((movie) => {
          return (
            <img
              className={`movie-card ${isLarge && "movie-card-large"}`}
              onClick={() => handleOnClick(movie)}
              key={movie.id}
              src={`${imageHost}${
                isLarge ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            ></img>
          );
        })}
      </div>
      {trailer && <ReactPlayer url={trailer} playing={false} />}
    </div>
  );
}
