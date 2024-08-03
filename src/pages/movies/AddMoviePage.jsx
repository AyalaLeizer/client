import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import './AddMoviePage.scss';
import { jwtDecode } from "jwt-decode";

const AddMoviePage = ({ setShowAddMovie }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = ["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Historical", "Horror", "Philosophical", "Romance", "Thriller"];
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      setUserId(decoded._id);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Year validation
    if (isNaN(year)) {
      toast.error('Year must be a number');
      return;
    }

    fetch('http://localhost:4005/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, year: parseInt(year), genres: selectedGenres, image, userId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Movie added successfully') {
          toast.success(data.message);
          setShowAddMovie(false);
          navigate('/movies');
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        toast.error('An error occurred while adding the movie');
        console.error('Error:', error);
      });
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(prevSelectedGenres =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter(g => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  return (
    <div className="add-movie-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="genre-section">
          <h3>Genres</h3>
          <div className="genre-list">
            {genres.map((genre) => (
              <label key={genre} className="genre-item">
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowAddMovie(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviePage;
