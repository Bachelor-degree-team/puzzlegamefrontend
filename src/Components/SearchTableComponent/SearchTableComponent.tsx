import React, {useEffect, useState} from 'react';
import './SearchTableComponent.css';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import background from "../Assets/search_page.jpg";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import { motion } from 'framer-motion';

const SearchTableComponent = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")

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
        <div style={{ backgroundImage:`url('${background}')`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, height: `100vh`}}>
            <ButtonAppBar color={'#d58129'} session={session || ''}/>
            <motion.div className="container"
                        initial={{ opacity: 0, y: -100}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <div className="header">
                    <div className="text">Game Search</div>
                    <div className="underline"></div>
                </div>
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
                                <a className="gamelink" href={"http://localhost:3000/gamepanel?id=" + item.id + "&session=" + session} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default SearchTableComponent;
