import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Board from './board/Board';
import styled from 'styled-components';
import configData from "../config.json";
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled.div`
    display: inline-flex;
    flex: 2 1 auto;
    padding-bottom: 30px;
    background-color: ${configData.THEME_COLORS.BACKGROUND};
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
