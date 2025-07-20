import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import Loading from './Loading';
export const movieContext = createContext();


function App() {
  const [movieName, setMovieName] = useState("");

  return (
    <movieContext.Provider value={{ movieName, setMovieName }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </movieContext.Provider>
    
    );
}

export default App;
