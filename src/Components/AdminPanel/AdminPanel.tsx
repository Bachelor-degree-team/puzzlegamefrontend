import React from 'react';
import './AdminPanel.css'; // Import the CSS file

const AdminPanel = () => {

    return (
        <div className="admin-panel">
            <aside className="sidebar">
                <ul className="sidebar-menu">
                    <li className="menu-item active">Dashboard</li>
                    <li className="menu-item">Users</li>
                    <li className="menu-item">Settings</li>
                </ul>
            </aside>
            <main className="main-content">
                <h1>Dashboard</h1>
                {/* Add different components for different sections */}
                <div className="content-section">
                    {/* Content for the Dashboard */}
                    <p>Welcome to the Admin Panel Dashboard!</p>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
