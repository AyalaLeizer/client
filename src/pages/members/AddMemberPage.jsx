import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './AddMemberPage.scss';

const AddMemberPage = ({ setShowAddMember }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4005/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name, email, city }),
    })
      .then(response => response.json())
      .then(() => {
        setShowAddMember(false);
        navigate('/members');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="add-member-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowAddMember(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberPage;
