import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { SearchContext } from '../../Context/StoredContext';
import "./ChatList.css"

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const {url} = useContext(SearchContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${url}api/users/chats/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="user-list-container">
      <h2>Connect with friends</h2>
      <div className='OtherUsers'>
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user.id)}>
            <h1>{user.email}</h1>
             <p>{user.first_name} {user.last_name.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
