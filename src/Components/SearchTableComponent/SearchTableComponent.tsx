import React, {useEffect, useState} from 'react';
import './SearchTableComponent.css';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';

const SearchTableComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState<any[]>([])

    useEffect(() => {
        fetch("http://localhost:8080/game/public/getAll")
            .then(res => res.json())
            .then(result => {
                setGames(result);
            })
    }, [])

    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = games.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <Rating name="read-only" defaultValue={item.rating} precision={0.5} readOnly/>
                        </td>
                        <td>
                            <a className="gamelink" href={"http://localhost:3000/gamepanel?id=" + item.id} target="_blank" rel="noopener noreferrer">
                                {item.title}
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
