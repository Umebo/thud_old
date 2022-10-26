import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Board from './board/Board';
import styled from 'styled-components';
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled.div`
    display: flex;
    background-color: #DCD7C9;
    width: 100%;
    height: 100%;
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
        <MainWrapper>
            <Board />
            <Sidebar />
        </MainWrapper>
    );

}

export default Main;
