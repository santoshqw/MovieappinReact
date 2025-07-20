import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const Movie = () => {
  const { id } = useParams(); // id like 'tt3896198'
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdatabyId = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=31bb0e04`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchdatabyId();
    }
  }, [id]);

  if (loading) return <Loading></Loading>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-details p-4 max-w-md mx-auto bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <div className='flex justify-center'>
      {movie.Poster && movie.Poster !== "N/A" && (
        <img src={movie.Poster} alt={movie.Title} className="mt-4 rounded h-80 " />
      )}
      </div>
    </div>
  );
};

export default Movie;
