import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { jwtDecode } from "jwt-decode";
import './HomePage.scss';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  useEffect(() => {
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      setName(decoded.userName)
    }
  }, [user]);

  return (
    <div className="homepage-container">
      <h1>Welcome, {name || 'Guest'}!</h1>
      <p>This is a movie management project where you can:</p>
      <ul>
        <li>Browse and view a list of movies.</li>
        <li>Add new movies to the collection.</li>
        <li>Manage subscriptions.</li>
      </ul>
      <p>Feel free to explore the features using the navigation bar above.</p>
    </div>
  );
}

export default HomePage;
