import React, { useState } from 'react';
import './SearchTableComponent.css';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';

const SearchTableComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([
        { id: 1, name: 'Link 1', url: 'https://link1.com' },
        { id: 2, name: 'Link 2', url: 'https://link2.com' },
        { id: 3, name: 'Link 3', url: 'https://link3.com' },
        // Add more data as needed
    ]);

    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Search for your game</h1>
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />
            <table className="table">
                <thead>
                <tr>
                    <th>Rating</th>
                    <th>Name</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <Rating name="read-only" defaultValue={2.5} precision={0.5} readOnly /></td>
                        <td>{item.name}</td>
                        <td>
                            <a className="gamelink" href={item.url} target="_blank" rel="noopener noreferrer">
                                {item.url}
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchTableComponent;
