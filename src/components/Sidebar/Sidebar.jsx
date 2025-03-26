import React, { useState } from 'react';
import { Menu, MessageCircle, User, Calendar, Bell, Upload } from 'lucide-react';
import './Sidebar.css';
import ChatList from '../Chat/ChatList';
import Profile from '../Profile/Profile';
import UploadCourse from '../Upload/Upload';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('Chats');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const renderContent = () => {
        switch (activePage) {
            case 'Chats':
                return <ChatList/>;
            case 'Profile':
                return <Profile/>;
            case 'Schedule':
                return <h1>My Schedule</h1>;
            case 'Upload':
                return <UploadCourse/>;
            default:
                return <h1>Welcome</h1>;
        }
    };

    return (
        <div className="container">
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="logo-container">
                    
                    {isOpen ? <span onClick={toggleSidebar} className="logo-text">Dashboard</span>: <button onClick={toggleSidebar} className="menu-button">
                    <Menu />
                </button>}
                </div>
                <nav className="nav">
                    {[{ icon: <MessageCircle />, label: 'Chats' },
                    { icon: <User />, label: 'Profile' },
                    { icon: <Calendar />, label: 'Schedule' },
                    {icon:<Upload/>, label: 'Upload'},
                    ].map((item, index) => (
                        <div key={index} className={`nav-item ${activePage === item.label ? 'active' : ''}`} onClick={() => setActivePage(item.label)}>
                            {item.icon}
                            {isOpen && <span className="nav-text">{item.label}</span>}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="content1">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Sidebar;
