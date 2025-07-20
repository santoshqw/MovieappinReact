import React, { useEffect, useState, useContext } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import { movieContext } from './App';
import Loading from './Loading';

function Home() {
  const { movieName } = useContext(movieContext);
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch default movies when component mounts
    fetchDataByDefault();
  }, []);

  useEffect(() => {
    // fetch movies by search name when movieName changes
    if (movieName && movieName.trim() !== '') {
      fetchByName(movieName);
    } else {
      // If search is empty, fetch default again
      fetchDataByDefault();
    }
  }, [movieName]);

  const fetchDataByDefault = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=batman&apikey=31bb0e04`
      );
      const data = await response.json();
      console.log(data);
      
      setLoading(false);
      if (data.Response === 'True') {
        setMovieDetails(data.Search); // data.Search is the array of movies
      } else {
        setMovieDetails([]); // no results found
      }
    } catch (error) {
      console.log('Internal server error', error);
      setLoading(false);
    }
  };

  const fetchByName = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=31bb0e04`
      );
      const data = await response.json();
      setLoading(false);
      if (data.Response === 'True') {
        setMovieDetails(data.Search);
      } else {
        setMovieDetails([]);
      }
    } catch (error) {
      console.log('Internal server error', error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <SearchBar className="mt-2" />
      <div className="flex flex-wrap gap-8 justify-center mt-5 ">
        {loading ? (
          <Loading></Loading>
        ) : movieDetails.length > 0 ? (
          movieDetails.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
