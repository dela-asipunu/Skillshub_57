import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
        if (!token) {
            setError('No token available. Please log in.');
            return;
          }
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          {user.profile_picture ? (
            <img src={user.profile_picture} alt="Profile" />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>
        <h1>{user?.first_name || 'First Name'} {user?.last_name || 'Last Name'}</h1>
        <p>{user?.email || 'No Email'}</p>
      </div>

      <div className="profile-details">
        <h3>Location</h3>
        <p>{user.location || 'Not provided'}</p>

        <h3>About Me</h3>
        <p>{user.bio || 'No bio available'}</p>

        <h3>rating</h3>
        <p>{user.ratings || 'No skills listed'}</p>

        
      </div>
    </div>
  );
};

export default Profile;
