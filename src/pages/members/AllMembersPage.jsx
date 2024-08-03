import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import AddMemberPage from './AddMemberPage';
import './AllMembersPage.scss';

const AllMembersPage = () => {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [showAddMember, setShowAddMember] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4005/api/members', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(data => setMembers(data.data))
      .catch(error => console.error('Error:', error));
  }, [user]);

  const handleAddMemberClick = () => {
    setShowAddMember(!showAddMember);
  };

  return (
    <div className="members-page">
      <div className="header">
        <div className="header">
          {!showAddMember && <button className="back-btn" onClick={handleAddMemberClick}>Add Member</button>}
        </div>
      </div>
      {showAddMember && <AddMemberPage setShowAddMember={setShowAddMember} />}
      <ul>
        {members.map(member => (
          <li key={member._id}>
            <h2>{member.name}</h2>
            <p>{member.email}</p>
            <p>{member.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMembersPage;
