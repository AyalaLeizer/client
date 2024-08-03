import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './SubscriptionPage.scss';

const SubscriptionPage = () => {
    const { user } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4005/api/members', {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then(response => response.json())
            .then(data => setMembers(data.data))
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:4005/api/movies', {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then(response => response.json())
            .then(data => setMovies(data.data))
            .catch(error => console.error('Error:', error));
    }, [user]);

    const handleSubscribe = (memberId, movieId) => {
        fetch('http://localhost:4005/api/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ memberId, movieId, date: new Date() }),
        })
            .then(response => response.json())
            .then(data => {
                // handle successful subscription
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="subscription-page">
            <div className="members-list">
                {members.map(member => (
                    <div key={member._id} className="member-card">
                        <h2>{member.name}</h2>
                        <p>{member.email}</p>
                        <p>{member.city}</p>
                        <div className="subscription-controls">
                            <select
                                onChange={(e) => handleSubscribe(member._id, e.target.value)}
                            >
                                <option value="">Select a movie to subscribe</option>
                                {movies
                                    .filter(movie => !member.subscriptions.includes(movie._id))
                                    .map(movie => (
                                        <option key={movie._id} value={movie._id}>{movie.title}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPage;
