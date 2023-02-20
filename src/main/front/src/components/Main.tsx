import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './board/Board';
import styled from 'styled-components';
import cd from "../config.json";
import Sidebar from './sidebar/Sidebar';
import Gameplay from './gameplay/Gameplay';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux/Hooks';

const MainWrapper = styled.div`
    display: inline-flex;
    flex: 2 1 auto;
    padding-bottom: 30px;
    background-color: ${cd.THEME_COLORS.BACKGROUND};
`;

const Main = () => {
    const uuid = useAppSelector((state) => state.gameplay.uuid)

    return (
        <MainWrapper>
            <Board />
            <Routes>
                <Route path={'/gameplay/' + uuid} element={
                    <Gameplay />
                }/>
            </Routes>
            <Sidebar />
        </MainWrapper>
    );

}

export default Main;
