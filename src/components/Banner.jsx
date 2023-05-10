import {React, useState, useEffect}  from 'react'
import './Banner.css'
import { categories, getMovies } from '../api';

export default function Banner() {
    const [movie, setMovie] = useState({});
    const fetchRandomMovie = async() => {
      try{
        const netflixOriginals = categories.find((category) => category.name === "netflixOriginals");
        const data = await getMovies(netflixOriginals.path
        ); const movies = data?.results;
        const randomMovie = Math.floor(Math.random() * data.results.length);
        setMovie(movies[randomMovie])
      } catch (error) {
       console.log("Banner fetchRandomMovie error:", error);
      }
    }
    
    useEffect(() => {
      fetchRandomMovie();
    }, []);
  
    function truncate(str, n) {
      return str?.length > n ? str.substring(0, n - 1) + "..." : str;
    }
  
    return (
      <header
        className="banner-container"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundRepeat: 'no-repeat',
          backgroundOpacity: 0.8,
        width: '100vw',
        }}
      >
        <div className="banner-content">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner-buttons-container">
            <button className="banner-button">Assistir</button>
            <button className="banner-button">Minha Lista</button>
          </div>
          <div className="banner-description">
            <h2>{truncate(movie?.overview, 300)}</h2>
          </div>
        </div>
      </header>
    );
  }
  

