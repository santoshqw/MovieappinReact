import React, { useState } from 'react'
import { useContext } from 'react'
import { movieContext } from './App'
function SearchBar() {
    const { movieName, setMovieName } = useContext(movieContext);
    return (
        <div className='w-full flex justify-center flex-col items-center '>
            <p>Search you Favourtie Movie!!</p>
            <input type="text" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} placeholder='search movie ...' className='mt-3.5 shadow-lg border-gray-400 p-2 rounded-2xl' />
        </div>
    )
}

export default SearchBar