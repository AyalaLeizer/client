import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import AddMoviePage from './AddMoviePage';
import './MoviesPage.scss';
import { jwtDecode } from "jwt-decode";

const MoviesPage = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [userId, setUserId] = useState("");

  const fetchMovies = () => {
    fetch('http://localhost:4005/api/movies', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(data => setMovies(data.data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchMovies();
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      setUserId(decoded._id);
    }
  }, [user]);

  const handleAddMovieClick = () => {
    setShowAddMovie(!showAddMovie);
  };

  const handleDeleteMovie = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      fetch(`http://localhost:4005/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => response.json())
        .then(() => {
          setMovies(movies.filter(movie => movie._id !== movieId));
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="movies-page">
      <div className="header">
        {!showAddMovie && <button className="add-movie-btn" onClick={handleAddMovieClick}>Add Movie</button>}
      </div>
      {showAddMovie && <AddMoviePage setShowAddMovie={setShowAddMovie} fetchMovies={fetchMovies} />}
      <ul>
        {movies.map(movie => (
          <li key={movie._id} className="movie-card">
            {movie.userId === userId && (
              <button className="delete-movie-btn" onClick={() => handleDeleteMovie(movie._id)}>X</button>
            )}
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{Array.isArray(movie.genres) ? movie.genres.join(', ') : 'No genres available'}</p>
            <img src={movie.image} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
