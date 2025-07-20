import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const { Title, Year, Poster, imdbID } = movie;

  return (
    <Link to={`/movie/${imdbID}`}>
      <div className="w-70 border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between bg-white cursor-pointer">
        <div>
          <p className="text-center font-semibold text-lg mb-1">🎬 {Title}</p>
          <p className="text-center text-sm">📅 Year: {Year}</p>
        </div>
        <div className="flex justify-center mt-2  ">
          <img
            src={Poster}
            alt={Title}
            className="w-full h-60 object-contain rounded-md "
          />
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
