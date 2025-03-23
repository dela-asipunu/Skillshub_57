import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import './Chat.css';
import { SearchContext } from '../../Context/StoredContext';

const Chat = () => {
  const { userId, receiverId } = useParams(); // Get both IDs from URL params
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const {url} = useContext(SearchContext)

  
  
  // Fetch messages between users
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found. Please log in.');
        return;
      }
  
      if (!receiverId) {
        console.error('Receiver ID is undefined.');
        return;
      }
      const response = await axios.get(`${url}api/message/message/?receiver=${receiverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchReceiverName();
    fetchMessages();
  }, [receiverId]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${url}api/message/message`, {
        text: input,
        receiver: receiver,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with User {receiverId}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === parseInt(userId) ? 'chat-message sent' : 'chat-message received'}>
            <strong>{msg.sender === parseInt(userId) ? 'You' : 'Them'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
