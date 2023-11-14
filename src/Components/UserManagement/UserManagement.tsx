import React from 'react';
import './UserManagement.css'; // Import the CSS file

const UserManagement = () => {
    // Dummy user data (replace this with real user data from your backend)
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
        // Add more user data as needed
    ];

    return (
        <div className="user-management">
            <aside className="sidebar">
                <ul className="sidebar-menu">
                    <li className="menu-item">Dashboard</li>
                    <li className="menu-item active">Users</li>
                    <li className="menu-item">Settings</li>
                </ul>
            </aside>
            <main className="main-content">
                <h1>User Management</h1>
                <div className="user-list">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default UserManagement;
