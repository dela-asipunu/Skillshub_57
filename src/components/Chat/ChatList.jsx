import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { SearchContext } from '../../Context/StoredContext';
import "./ChatList.css"
import { MessageCircle, VideoIcon} from 'lucide-react'
import axiosInstance from '../axiosInstance';

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const {url} = useContext(SearchContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axiosInstance.get(`users/chats/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        const decodedToken = JSON.parse(atob(response.data.access.split('.')[1]));
        localStorage.setItem('token_exp', JSON.stringify({ exp: decodedToken.exp }));
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
          <div key={user.id} >
            <div className='each-user'>
             <p className='name-p'>{user.first_name} {user.last_name.toUpperCase()}</p>
             <p className='subtext'>Message or schedule a video call meeting with friend</p>
             <p className='subtext-email'>{user.email}</p>
            </div>
             <div className='icons'>
             <a href="https://meet.google.com/landing?pli=1" target='blank'><VideoIcon/></a>
             <p onClick={() => handleUserClick(user.id)}><MessageCircle/></p>
             </div>
             

          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
