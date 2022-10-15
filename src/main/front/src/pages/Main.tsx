import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/AppNavbar';
import Board from '../components/Board';
import styled from 'styled-components';

const MAIN = styled.div`
    background-color: #DCD7C9;
    position: static;
    height: 100vh;
`;

const Main = () => {

    const [response, getResponse] = useState([]);

    useEffect(() => {
    
        axios
        .get("http://localhost:8080/thud")
        .then(res => {
            console.log(res);
            getResponse(res.data);
        });
    }, []);

    return (
        <MAIN>
            <Navbar />
            <Board />
            <div>{response}</div>
        </MAIN>
    );

}

export default Main;
